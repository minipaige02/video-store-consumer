import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './components/Customers';
import Search from './components/Search';
import Library from './components/Library';
import Home from './components/Home';
import Alert from './components/Alert';
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
      error: "",
      success: "",
      currMovie: "",
      currCustomer: "",
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2999/movies')
    .then(response => {
      this.setState({ inventory: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    })

    axios.get('http://localhost:2999/customers')
    .then(response => {
      this.setState({ customers: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    })
  }

  setCurrCustomer = (customerId) => {
    const {customers} = this.state;
    const currCustomer = customers.find((customer) => {
      return customer.id === customerId;
    });

    this.setState( {currCustomer} )
  }

  setCurrMovie = (movieId) => {
    const {inventory} = this.state;
    const currMovie = inventory.find((movie) => {
      return movie.id === movieId;
    });

    this.setState({currMovie});
  }

  deselect = (item) => {
    const resetState = {};
    resetState[item] = "";
    this.setState(resetState);
  }

  addToLibrary = (movieObj) => {

    axios.post(`http://localhost:2999/movies`, movieObj)
    .then(response => {
      // send new api call to backend to get latest data
      axios.get('http://localhost:2999/movies')
      .then(response => {
        this.setState({ inventory: response.data, success: `${movieObj.title} added to inventory!`, error: ""  });
      })
      .catch(error => {
        this.setState({ error: error.message, success: "" });
      })
    })
    .catch(error => {
      this.setState({ error: error.response.data.railsErrorMsg, success: "" })
    })
  }

  eraseAlerts = () => {
    console.log(`APP will erase alerts!!!!`);
    this.setState({ error: "", success: "" })
  }

  createRental = () => {
    console.log("I'm creating a rental!")
  }

  render() {
    
    return (
      <div className="App">
      
        <Router className="App-intro">
          <nav className="navbar navbar-light">
            <Link to="/">Home</Link>
            <Link to="/search">Movie Search</Link>
            <Link to="/library">Rental library</Link>
            <Link to="/customers">Customers</Link>
          </nav>

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Paige & Caroline's Old-Timey Homegrown Motion Picture Dispensary</h1>
          </header>

          <section className="rental-select-container">
            <div className="select-movie">
              <p className="select-movie-text">{this.state.currMovie ? `Selected movie: ${this.state.currMovie.title}` : ""}</p>
              {this.state.currMovie ? <button type="button" className="btn btn-secondary" onClick={() => this.deselect("currMovie")}>Deselect</button> : ""}
            </div>
            <div className="select-customer">
              <p className="select-customer-text">{this.state.currCustomer ? `Selected customer: ${this.state.currCustomer.name}` : ""}</p>
              {this.state.currCustomer ? <button type="button" className="btn btn-secondary" onClick={() => this.deselect("currCustomer")}>Deselect</button> : ""}
            </div>
            {this.state.currMovie && this.state.currCustomer ? <button type="button" className="btn btn-success rental-button" onClick={this.createRental}>Create Rental</button> : ""}
          </section>

          { this.state.error ? <Alert message={this.state.error} alertStyle="alert-danger"/> : null }
          { this.state.success ? <Alert message={this.state.success} alertStyle="alert-success"/> : null }

          <Switch>
            <Route path="/search">
              <Search addToLibraryCallback={this.addToLibrary} eraseAlertsCallback={this.eraseAlerts}/>
            </Route>
            <Route path="/library">
              <Library inventory={this.state.inventory} setCurrMovieCallback={this.setCurrMovie} eraseAlertsCallback={this.eraseAlerts}/>
            </Route>
            <Route path="/customers">
              <Customers customers={this.state.customers} currCustomerCallback={this.setCurrCustomer} eraseAlertsCallback={this.eraseAlerts}/>
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
