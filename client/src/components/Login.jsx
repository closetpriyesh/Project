import React, { Component } from "react";
import Input from "./Input";
import history from "../history";


class Login extends Component {
  constructor() {
  super();
  this.state = {
    customers: []
  };
  this.handleClick = this.handleClick.bind(this);
}

handleClick(event) {
   history.push("/about");
   event.preventDefault();
 }

 componentDidMount() {
    fetch('/Posts')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

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
          <form className="form">
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <button type="submit" onClick={this.handleClick}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
}

export default Login;
