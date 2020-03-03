
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({origin: 'http://localhost:3000'}))

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true , useUnifiedTopology:  true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

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

app.route("/posts/:postId")

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

  Post.update(
    {title: req.params.PostTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected Post.");
      }
    }
  );
})

.patch(function(req, res){

  Post.update(
    {title: req.params.PostTitle},
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
console.log("id:"+req.body.id);
  Post.deleteOne(
    {id: req.body.id},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding post.");
      } else {
        res.send(err);
      }
    }
  );
});

const port = 5000;

app.listen(port, () => 'Server running on port ${port}');
