import React, { Component ,useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Login from "./Login";
import { Router, Switch, Route, Link } from "react-router-dom";
import PostService from '../services/PostService'
import history from "../history";
import About from './About';
import Modal from './Modal';
function App() {

  const [posts, setPosts] = useState([]);
const postService = new PostService();
  useEffect(() => {
      getPosts()}, []
    );


  // function addPost(newPost) {
  //   setPosts(prevPosts => {
  //     return [...prevPosts, newPost];
  //   });
  // }


  function updatePost(id) {

    // postService.updatePost(id).then(res => {
    // getPosts();
    // });
    //
    // setPosts(prevPosts => {
    //   return prevPosts.filter((postItem, index) => {
    //     return index !== id;
    //   });
    // });
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

// function  clearState() {
//     this.setState({
//       showDetails: false,
//       selectedItem: null,
//       editItem: false,
//       newItem: null
//     });
//   }




  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
          <Route path="/about">
          <Header />
            <CreatePost onAdd={addPost} />
              <Modal />
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
