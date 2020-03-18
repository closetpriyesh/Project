import React, {useState} from "react";
import Input from "./Input";
import UserService from '../services/UserService';
function Register(props) {
  const userService = new UserService();

  const [user, setUser] = useState({
    username: "",
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

 function resetUser(username) {
   setUser({
     username: username,
     password: "",
     confirmPassword: ""
   });
 }

 function registerUser() {
   if(user.password === user.confirmPassword) {
     userService.createUser({username: user.username,password: user.password});
 }
 else {
alert("Passwords do not match.");
   resetUser(user.username);
}

 }




  return (
    <div>
    <form className="signUpForm">
      <Input type="text" name="username" onChange={handleChange} value={user.username} placeholder="Username"  />
      <Input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Password"  />
      <Input type="password" name="confirmPassword" onChange={handleChange} value={user.confirmPassword} placeholder="Confirm Password" />
      <button type="button" onClick={registerUser}>Register</button>
    </form>
    </div>
  );

}

export default Register;
