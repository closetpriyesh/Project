import React, { useState,  useEffect} from "react";
import PostService from '../services/PostService';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Modal from './Modal';

function Admin(props) {
  const [posts, setPosts] = useState([]);
  const postService = new PostService();

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

return <div>
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
</div>

}

export default Admin;
