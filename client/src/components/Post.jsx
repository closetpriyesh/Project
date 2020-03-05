import React, {useState,useEffect} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Modal from './Modal';
function Post(props) {

  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
      setShowComponent(true)}, []
    );

  function handleDelete() {
    props.onDelete(props.id);
  }



  function handleUpdate(post) {
      props.onUpdate(post);
  }

  return (
    <div className="post">
      <h1>{props.title}</h1>
      <p> {props.content} </p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button  data-toggle="modal" data-target="#exampleModalCenter">
      <EditIcon />
      </button>
      {showComponent && <Modal id= {props.id} title={props.title} content={props.content} updatePost={handleUpdate}/>}
    </div>
  );
}

export default Post;
