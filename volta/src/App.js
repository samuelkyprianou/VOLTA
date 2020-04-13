import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Home from "./components/Home";
import RoutePlanner from "./components/RoutePlanner";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.currentLocation(position.coords);
    });
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/RoutePlanner" component={() => <RoutePlanner />} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    currentLocation: position =>
      dispatch({ type: "SET_POSITION", payload: { position } })
  };
};

export default connect(null, mapDispatchToProps)(App);
