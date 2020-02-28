import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
function About() {

function onCreatePost() {

}

    return (
      <div>
        <Header />
        <CreatePost onAdd={onCreatePost} />
        <Footer />
      </div>
    );
  }


 export default About;

 //
 // {this.posts.map((post, index) => {
 //   return (
 //     <Post
 //       key={index}
 //       id={index}
 //       title={post.title}
 //       content={post.content}
 //       onDelete={this.deletePost}
 //     />
 //   );
 // })}
