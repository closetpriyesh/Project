import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Login from "./Login";
import Register from './Register';
import { Router, Switch, Route } from "react-router-dom";
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import history from "../history";
import Modal from './Modal';
function App() {

  const [posts, setPosts] = useState([]);
  const postService = new PostService();
  const userService = new UserService();
  useEffect(() => {
      getPosts()}, []
    );

  function updatePost(post) {
    console.log(post);
    postService.updatePost(post).then(res => {
    getPosts();
    });
  }

  function deletePost(id) {
    postService.deletePost(id).then(res => {
    getPosts();
    });

    setPosts(prevPosts => {
      return prevPosts.filter((postItem, index) => {
        return index !== id;
      });
    });
  }

function  addPost(newPost) {
//clearState();
console.log("asdfsdfasdfasdfa");
  postService.createPost(newPost).then(post => {
    getPosts();
    }
  );
}

function getPosts() {
  postService.retrievePosts().then(posts => {
    setPosts(posts);
  });
}

function  addUser(newUser) {
// clearState();
  userService.createUser(newUser);
}



  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
          <Route path="/register">
          <Header />
          <Register  onAdd={addUser}/>
          <Footer />
          </Route>
          <Route path="/about">
          <Header />
            <CreatePost onAdd={addPost} />

                {posts.map((postItem, index) => {
              return (
              <Modal key= {index} id={postItem._id} title={postItem.title} content={postItem.content} updatePost={updatePost}/>
            );})}

            {posts.map((postItem, index) => {
      return (
        <Post
          key={index}
          id={postItem._id}
          title={postItem.title}
          content={postItem.content}
          onUpdate={updatePost}
          onDelete={deletePost}
        />
      );
    })}
    <Footer />
            </Route>
            <Route path="/">
            <Header />
            <Login />
            <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
