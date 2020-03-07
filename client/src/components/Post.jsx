import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

function Post(props) {

  function handleDelete() {
    props.onDelete(props.id);
  }


  return (
    <div className="post">
      <h1>{props.title}</h1>
      <p> {props.content} </p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button  data-toggle="modal" data-target={"#p"+props.id}>
      <EditIcon />
      </button>
      {console.log(props.id)}

    </div>
  );
}

export default Post;
