import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
function About(props) {

// function onCreatePost() {
//   this.clearState();
//   this.postService.createPost(newpost).then(post => {
//       this.getposts();
//     }
//   );
// }

    return (
      <div>
        <Header />
        <CreatePost  onAdd={props.onAdd}/>
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
