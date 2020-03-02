import React, { Component ,useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Login from "./Login";
import { Router, Switch, Route, Link } from "react-router-dom";
import PostService from '../services/PostService'
import history from "../history";
import About from './About';

function App() {

  const [posts, setPosts] = useState([]);
const postService = new PostService();


  // function addPost(newPost) {
  //   setPosts(prevPosts => {
  //     return [...prevPosts, newPost];
  //   });
  // }

  function deletePost(id) {
    setPosts(prevPosts => {
      return prevPosts.filter((noteItem, index) => {
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
