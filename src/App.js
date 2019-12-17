import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/Customers';
import Search from './components/Search';
import Library from './components/Library';
import Home from './components/Home';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
  constructor() {
    super();

    this.state = {
      inventory: [],
      customers: [],
      errorCustomers: "",
      errorInventory: "",
      currMovieId: null,
      currMovieName: null,
      currCustomerId: null,
      currCustomerName: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2999/movies')
    .then(response => {
      this.setState({ inventory: response.data });
    })
    .catch(error => {
      this.setState({ errorInventory: error.message });
    })

    axios.get('http://localhost:2999/customers')
    .then(response => {
      this.setState({ customers: response.data });
    })
    .catch(error => {
      this.setState({ errorCustomers: error.message });
    })
  }

  setCurrCustomer = (currCustomerId, currCustomerName) => {
    console.log(`App.js received ${currCustomerId} as new currCustomer`);
    this.setState( {currCustomerId, currCustomerName} )
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">VIDEO STORE!!!</h1>
        </header>

  <h3>CurrMovieId = {this.state.currMovieId}  & currMovieName = {this.state.currMovieName}</h3>
  <h3>CurrCustomerId = {this.state.currCustomerId}  &  currCustomerName = { this.state.currCustomerName}</h3>
    
        <Router className="App-intro">
              <Link to="/">Home</Link>
              <Link to="/search">Movie Search</Link>
              <Link to="/library">Rental library</Link>
              <Link to="/customers">Customers</Link>

        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/library">
            <Library inventory={this.state.inventory}/>
          </Route>
          <Route path="/customers">
            <Customers customers={this.state.customers} currCustomerCallback={this.setCurrCustomer}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>


      </div>
    );
  }
}

export default App;
