import React from "react";

function Input(props) {
  return <input type={props.type} name={props.name} onChange={props.onChange} value={props.value} placeholder={props.placeholder} />;
}

export default Input;
