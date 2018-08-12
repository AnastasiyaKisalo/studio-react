import React, { Component } from "react";
import App from './App';
import { BrowserRouter } from "react-router-dom";

class CentralRoot extends Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };
}

export default CentralRoot;
