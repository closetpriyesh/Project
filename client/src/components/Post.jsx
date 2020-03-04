import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Modal from './Modal';
function Post(props) {

  const [showComponent, setShowComponent] = useState(false);

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleUpdate() {
    setShowComponent(()=>{return true});
    console.log(showComponent);
  return  <div>  <Modal /> </div>
    // props.onUpdate(props.id);
  }

  return (
    <div className="post">
      <h1>{props.title}</h1>
      <p> {props.content} </p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleUpdate}>
      <EditIcon />
      <Modal />
      </button>
    </div>
  );
}

export default Post;
