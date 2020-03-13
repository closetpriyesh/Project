import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
const rootElement = document.getElementById("root");

// const express = require("express");
// const app = express();
// //
console.log(__dirname);
// app.use(express.static(__dirname+"/public"));


ReactDOM.render(<App />, rootElement);
