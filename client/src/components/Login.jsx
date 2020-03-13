import React, { Component } from "react";
import Input from "./Input";
import history from "../history";


class Login extends Component {
  constructor() {
  super();
  this.state = {
    customers: []
  };
    this.signUpClick = this.signUpClick.bind(this);
    this.signInClick = this.signInClick.bind(this);
}

signInClick(event) {
   history.push("/about");
   event.preventDefault();
 }

 signUpClick(event) {
    history.push("/register");
    event.preventDefault();
  }


 // componentDidMount() {
 //    fetch('/Posts')
 //      .then(res => res.json())
 //      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
 //  }

render() {
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
              <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
          </div>
      
        </div>

    <div className="row">
          <form className="form">

            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <button type="submit" onClick={this.signInClick}>
              Login
            </button>
                 <br />
                 <p className="member">Not a member? <span className="pull-right">
                 <br />
                 <button type="submit" className="btn btn-default btn-small signUp" onClick={this.signUpClick}>Sign Up</button></span></p>
                 <br />
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
}

export default Login;
