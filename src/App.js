import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages/index";

class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
        </Fragment>
      </Router>
    );
  }
}

export default App;
