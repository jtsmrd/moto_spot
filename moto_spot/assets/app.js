import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.css";
import Home from "./components/Home";
import MapContainer from "./components/Map";
// start the Stimulus application
// import './bootstrap';

ReactDOM.render(
  <Router>
    <MapContainer />
  </Router>,
  document.getElementById("root")
);
