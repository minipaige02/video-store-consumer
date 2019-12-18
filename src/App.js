import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './components/Customers';
import Search from './components/Search';
import Library from './components/Library';
import Home from './components/Home';
import Alert from './components/Alert';
import Rentals from './components/Rentals';
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
      allRentals: [],
      overdueRentals: [],
      error: "",
      success: "",
      currMovie: "",
      currCustomer: "",
    }
  }

  getFromBackend = (endpointURL, destinationState) => {
    axios.get(endpointURL)
    .then(response => {
      this.setState({ [destinationState]: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    })
  }

  componentDidMount() {
    const baseURL = 'http://localhost:2999/';

    this.getFromBackend(`${baseURL}movies`, 'inventory');
    this.getFromBackend(`${baseURL}customers`, 'customers');
    this.getFromBackend(`${baseURL}rentals`, 'allRentals');
    this.getFromBackend(`${baseURL}rentals/overdue`, 'overdueRentals');
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
    this.setState({ error: "", success: "" })
  }

  createRental = () => {
    if (this.state.currCustomer && this.state.currMovie) {
      const movieTitle = this.state.currMovie.title
      const custId = this.state.currCustomer.id
      const custName = this.state.currCustomer.name
      let dueDate = new Date();
      dueDate.setDate(new Date().getDate()+7);
      axios.post(`http://localhost:2999/rentals/${movieTitle}/check-out`, {customer_id: custId, due_date: dueDate} )
        .then(response => {
          // send new api call to backend to get latest data
          axios.get('http://localhost:2999/customers')
            .then(response => {
              this.setState({ 
                customers: response.data,
                success: `${movieTitle} successfully checked-out to ${custName}!`, 
                error: "",
                currMovie: "",
                currCustomer: ""
              });
            })
            .catch(error => {
              this.setState({ error: error.message, success: "" });
          })
        })
        .catch(error => {
          this.setState({ error: error.message, success: "" })
        })
    } else {
      this.setState({success: "", error: "Movie and customer must be selected to create rental."})
    }
  }

  checkIn = (customer_id, title) => {
    console.log(`App.js will checkIN() on ${customer_id} & ${title}`);

    axios.post(`http://localhost:2999/rentals/${title}/return`, {customer_id: customer_id})
    .then( response => {
      console.log(`need to refresh rentals list!!!`);
      // refresh rentals list
      


      
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    });

  }


  render() {
    
    return (
      <div className="App">
      
        <Router className="App-intro">
          <nav className="navbar navbar-light">
            <Link to="/">Home</Link>
            <Link to="/search">Movie Search</Link>
            <Link to="/library">Library</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/rentals">Rentals</Link>
          </nav>

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Paige & Caroline's Old-Timey Homegrown Motion Picture Dispensary</h1>
          </header>

          <section className="rental-select-container">
            <div className="movie-customer__rows">
            <div className="select-movie">
              <p className="select-movie-text">{this.state.currMovie ? `Selected movie: ${this.state.currMovie.title}` : ""}</p>
              <p>{this.state.currMovie ? <button type="button" className="btn btn-secondary" onClick={() => this.deselect("currMovie")}>Deselect</button> : ""}</p>
            </div>
            <div className="select-customer">
              <p className="select-customer-text">{this.state.currCustomer ? `Selected customer: ${this.state.currCustomer.name}` : ""}</p>
              <p>{this.state.currCustomer ? <button type="button" className="btn btn-secondary" onClick={() => this.deselect("currCustomer")}>Deselect</button> : ""}</p>
            </div>
            </div>

            <div className="rental-button__container">
            {this.state.currMovie && this.state.currCustomer ? <button type="button" className="btn btn-success rental-button" onClick={this.createRental}>Create Rental</button> : ""}
            </div>
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
            <Route path="/rentals">
              <Rentals allRentals={this.state.allRentals} overdueRentals={this.state.overdueRentals} checkInCallback={this.checkIn} eraseAlertsCallback={this.eraseAlerts}/>
            </Route>
            <Route path="/">
              <Home eraseAlertsCallback={this.eraseAlerts}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
