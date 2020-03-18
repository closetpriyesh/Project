import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from './Register';
import { Router, Switch, Route} from "react-router-dom";
import UserService from '../services/UserService';
import history from "../history";
import Admin from './Admin';

function App(props) {
  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
          <Route path="/register">
          <Header />
          <Register/>

          <Footer />
          </Route>
          <Route path="/admin">
          <Header />
          <Admin />
          <Footer />
            </Route>
            <Route path="/">
            <Header />
            <Login />
            <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
