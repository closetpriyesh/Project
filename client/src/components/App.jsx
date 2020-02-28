import React, { Component ,useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Login from "./Login";
import { Router, Switch, Route, Link } from "react-router-dom";
import PostService from '../configuration/PostService'
import history from "../history";
import About from './About';

class App extends Component {

  constructor(props) {
    super(props);
    this.postService = new PostService();
    this.onSelect = this.onSelect.bind(this);
    this.onNewpost = this.onNewpost.bind(this);
    this.onEditpost = this.onEditpost.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCreatePost = this.onCreatePost.bind(this);
    this.onUpdatePost = this.onUpdatePost.bind(this);
    this.onDeletePost = this.onDeletePost.bind(this);
    this.state = {
      showDetails: false,
      editpost: false,
      selectedpost: null,
      newpost: null
    };

  }

  componentDidMount() {
      this.getposts();
  }

deletePost(id) {
    this.setPost(prevPosts => {
      return prevPosts.filter((post, index) => {
        return index !== id;
      });
    });
  }



render() {
  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );}

  getposts() {
      this.postService.retrievePosts().then(posts => {
            this.setState({posts: posts});
          }
      );
    }

    onSelect(postLink) {
      this.clearState();
      this.postService.getPost(postLink).then(post => {
        this.setState({
            showDetails: true,
            selectedpost: post
          });
        }
      );
    }

    onCancel() {
      this.clearState();
    }

    onNewpost() {
      this.clearState();
      this.setState({
        newpost: true
      });
    }

    onEditpost() {
      this.setState({
        showDetails: false,
        editpost: true,
        newpost: null
      });
    }

    onCancelEdit() {
      this.setState({
        showDetails: true,
        editpost: false,
        newpost: null
      });
    }

    onUpdatePost(post) {
      this.clearState();
      this.postService.updatepost(post).then(post => {
          this.getposts();
        }
      );
    }

 onCreatePost(newpost) {
      this.clearState();
      this.postService.createPost(newpost).then(post => {
          this.getposts();
        }
      );
    }

    onDeletePost(postLink) {
      this.clearState();
      this.postService.deletepost(postLink).then(res => {
          this.getposts();
        }
      );
    }

    clearState() {
      this.setState({
        showDetails: false,
        selectedpost: null,
        editpost: false,
        newpost: null
      });
    }
}




export default App;
