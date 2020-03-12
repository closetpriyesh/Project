import React, {useState} from "react";
import Input from "./Input";
function Register(props) {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: ""
  });

function handleChange(event) {
  const { name, value } = event.target;
console.log(name+' '+value);
  setUser(prevUser => {
    return {
      ...prevUser,
      [name]: value
    };
  });
 }

 function resetUser(userName) {
   setUser({
     userName: userName,
     password: "",
     confirmPassword: ""
   });
 }

 function registerUser() {
   console.log(user.userName);
   if(user.password === user.confirmPassword) {
   props.onAdd({
     userName: user.userName,
     password: user.password,
   });
  resetUser("");
 }
 else {
alert("Passwords do not match.");
   resetUser(user.userName);
}

 }




  return (
    <div>
    <form className="signUpForm">
      <Input type="text" name="userName" onChange={handleChange} value={user.userName} placeholder="Username"  />
      <Input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Password"  />
      <Input type="password" name="confirmPassword" onChange={handleChange} value={user.confirmPassword} placeholder="Confirm Password" />
      <button type="button" onClick={registerUser}>Register</button>
    </form>
    </div>
  );

}

export default Register;
