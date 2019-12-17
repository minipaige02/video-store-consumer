import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  showCurrCustomer = () => {
    if (this.state.currCustomerId) {
      return (`Selected Customer = #${this.state.currCustomerId}, ${this.state.currCustomerName}`);
    } else {
      return (`Please click 'Select' on a customer`);
    }
  }

  showCurrMovie = () => {
    if (this.state.currMovieId) {
      return (`Selected movie = #${this.state.currMovieId}, ${this.state.currMovieName}`);
    } else {
      return (`Please click 'Select' on a movie`);
    }
  }

  render() {
    return (
      <div className="App">
      
        <Router className="App-intro">
          <nav class="navbar navbar-light">
            <Link to="/">Home</Link>
            <Link to="/search">Movie Search</Link>
            <Link to="/library">Rental library</Link>
            <Link to="/customers">Customers</Link>
          </nav>

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Paige & Caroline's Old-Timey Homegrown Motion Picture Dispensary</h1>
          </header>

          <div class="card bg-light text-dark">
              <h5 class="card-title">Checking Out   (add checkout button later)</h5>
              <p class="card-text">{this.showCurrMovie()}</p>
              <p class="card-text">{this.showCurrCustomer()}</p>
            
          </div>

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
