import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
function CreatePost(props) {
  const [post, setPost] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function expand() {
    setExpanded(true);
  }

  function submitPost() {
    props.onAdd({
      title: post.title,
      content: post.content
    });

    setPost({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="create-post">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={post.title}
            placeholder="Title"
          />
        )}

        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={post.content}
          placeholder="Create a post"
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitPost}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreatePost;
