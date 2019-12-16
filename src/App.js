import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">VIDEO STORE!!!</h1>
        </header>
        <p className="App-intro">
          <a href="https://www.cnn.com" target="_blank">cnn.com</a>
        </p>
      </div>
    );
  }
}

export default App;
