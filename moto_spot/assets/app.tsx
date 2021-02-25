import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.css";
import Home from "./components/Home";
import MapContainer from "./components/Map";
// start the Stimulus application
// import './bootstrap';
import Header from "./components/Header";

ReactDOM.render(
  <Router>
    <div>
      {/*<Header />*/}
      <div
        style={{ height: "50px", width: "100%", backgroundColor: "lightblue" }}
      >
        <h1>MotoSpot</h1>
      </div>
      <MapContainer />
    </div>
  </Router>,
  document.getElementById("root")
);
