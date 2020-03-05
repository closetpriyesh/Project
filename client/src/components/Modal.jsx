
import React, { Component, useState,useEffect } from "react";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function Modal(props) {
  const [post, setPost] = useState({
    title: props.title,
    content: props.content
  });

  useEffect(() => {
    document.getElementById("title").addEventListener('input', handler);
    document.getElementById("content").addEventListener('input', handler);
    return () => {
       document.getElementById("title").removeEventListener('input', handler);
       document.getElementById("content").removeEventListener('input', handler);
    }
}, []);

function handler(event) {
  console.log("input");
  const  {id,innerText} =event.target;
console.log("change");
  setPost(prevPost => {
    return {
      ...prevPost,
      [id]: innerText
    };
  });
}


  function submitPost() {
    console.log(post.title);
    console.log(post.content);
    props.updatePost({
      id:props.id,
      title: post.title,
      content: post.content
    });
}




return (
  <div>

<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">

      <div className="modal-header" >

        <h5 id="title" className="modal-title" contentEditable="true" suppressContentEditableWarning="transparenttextures"
          value={post.title} >{props.title}</h5>


      </div>
      <div className="modal-body">
      <p id="content" contentEditable="true" suppressContentEditableWarning="transparenttextures"
        value={post.content} >  {props.content} </p>
      </div>

      <div className="modal-footer">
    <button type="button"  data-dismiss="modal"><CancelIcon /></button>
        <button type="button" data-dismiss="modal" onClick={submitPost}><SaveIcon/></button>
      </div>
    </div>
  </div>
</div>
</div>
);
}

export default Modal;
