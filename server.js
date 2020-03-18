require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const app = express();
const passport = require("passport");
const path = require('path');
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');

require('./models/model.js').initialize();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
// app.use(cors({origin: ['https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fyourquote&scope=profile&client_id=557384401247-2cis1mlh110b0hk351j8uri882fbhl4s.apps.googleusercontent.com','http://localhost:3000']}))
app.use(cors());
app.options("*",cors());


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("UserRegistered", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


const postSchema = {
  title: String,
  content: String
};



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/yourquote",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




const Post = mongoose.model("Post", postSchema);

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/yourquote",
  passport.authenticate('google', { failureRedirect: "http://localhost:3000/" }),
  function(req, res) {
    console.log("authenticated");
    res.redirect("http://localhost:3000/admin");
  });



  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/yourquote"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));

  app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/yourquote',
  passport.authenticate('facebook', { failureRedirect: "http://localhost:3000/" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/admin");
  });

///////////////////////////////////Requests Targetting all Posts////////////////////////

app.route("/posts")

.get(function(req, res){
  Post.find(function(err, foundPosts){
    if (!err) {
      res.send(foundPosts);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

console.log(req.body);
console.log("title: "+req.body.title);
console.log("content: "+req.body.content);
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

newPost.save(function(err, doc){
    if (!err){
      res.send("Successfully added a new Post."+ doc);

    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Post.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all Posts.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific Post////////////////////////

app.route("/posts/:id")

.get(function(req, res){

  Post.findOne({title: req.params.PostTitle}, function(err, foundPost){
    if (foundPost) {
      res.send(foundPost);
    } else {
      res.send("No Posts matching that title was found.");
    }
  });
})

.put(function(req, res){
console.log("update post");
console.log(req.params.id);
console.log(req.body.title);
console.log(req.body.content);
  Post.updateOne(
    {_id: req.params.id},
    {title: req.body.title, content: req.body.content},
    function(err){
      if(!err){
        console.log("Successfully updated the selected Post");
        res.send("Successfully updated the selected Post.");
      }
      else {
        console.log(err);
      }
    }
  );
})

.patch(function(req, res){

  Post.update(
    {title: req.params.id},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated Post.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){
console.log("id:"+req.params.id);
  Post.deleteOne(
    {_id: req.params.id},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding post.");
      } else {
        res.send(err);
      }
    }
  );
});

///////////////////////////////////Requests Targetting all Users////////////////////////

app.route("/users")

.get(function(req, res){
  User.find(function(err, foundUsers){
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

console.log("title: "+req.body.username);
console.log("content: "+req.body.password);
User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.send({redirect:"http://localhost:3000/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.send({redirect:"http://localhost:3000/admin"});
      });
    }
  });
})

.delete(function(req, res){

  User.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all Users.");
    } else {
      res.send(err);
    }
  });
});

////////////////////signin user////////////////////////

app.post("/signin", function(req, res){

  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  User.findOne({username:username}, (err, foundUser) => {
    if(err)
    console.log(err);
    else {
      console.log(foundUser);
      if(foundUser) {
        if(foundUser.password === password) {
          res.send({redirect:"http://localhost:3000/admin"});
        }
      }
    }
  })


});


const port = 5000;

app.listen(port, () => 'Server running on port ${port}');
