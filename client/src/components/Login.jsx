import React, { Component, useState } from "react";
import Input from "./Input";
import history from "../history";
import UserService from '../services/UserService';
function Login() {

  const userService = new UserService();

  const [user, setUser] = useState({
    username: "",
    password: "",
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
   });
 }

 function signInUser(event) {
     userService.signInUser(user);
     event.preventDefault();
}

function  signUpClick(event) {
    history.push("/register");
    event.preventDefault();
}


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 left">
          <img
            className="home-image"
            src="https://www.rd.com/wp-content/uploads/2017/10/This-Is-How-Long-It-Takes-To-Read-The-Whole-Dictionary_509582812-Billion-Photos_FB-e1574101045824.jpg"
            alt="book"
          />
        </div>
        <div className="col-sm-6 right">

        <div className="row">

          <div className="card">
            <div className="card-body">
              <a className="btn btn-block btn-social btn-google" href="http://localhost:5000/auth/google" role="button">
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
            <div className="card-body">
              <a className="btn btn-block btn-social btn-facebook" href="http://localhost:5000/auth/facebook" role="button">
                <i className="fab fa-facebook"></i>
                Sign In with Facebook
              </a>
            </div>
          </div>

          <form className="form">
            <Input type="text" name="username" onChange={handleChange} value={user.username} placeholder="Username" />
            <Input type="password" name="password" onChange={handleChange} value={user.password} placeholder="Password" />
            <button type="submit" onClick={signInUser}>
              Login
            </button>
                 <br />
                 <p className="member">Not a member? <span className="pull-right">
                 <br />
                 <button type="submit" className="btn btn-default btn-small signUp" onClick={signUpClick}>Sign Up</button></span></p>
                 <br />
          </form>
        </div>

      </div>
      </div>
    </div>
  );

}

export default Login;
