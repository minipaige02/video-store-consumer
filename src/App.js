import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './components/Customers';
import Search from './components/Search';
import Library from './components/Library';
import Home from './components/Home';
import Alert from './components/Alert';
import Rentals from './components/Rentals';
import {getCustomerNameFromId, BASE_URL} from './components/Helpers';
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
      currMovie: null,
      currCustomer: null,
      custDetails: null,
    }
  }

  getFromBackend = (endpointURL, destinationState, successMsg="") => {
    // HELPER FCN
    axios.get(endpointURL)
    .then(response => {
      this.setState({ [destinationState]: response.data, success: successMsg });
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    })
  }

  componentDidMount() {
    this.getFromBackend(`${BASE_URL}movies`, 'inventory');
    this.getFromBackend(`${BASE_URL}customers`, 'customers');
    this.getFromBackend(`${BASE_URL}rentals`, 'allRentals');
    this.getFromBackend(`${BASE_URL}rentals/overdue`, 'overdueRentals');
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

  setCustDetails = (customerId) => {
    const currCustDetails = this.state.custDetails;
    if (currCustDetails !== customerId){
      this.setState({custDetails: customerId});
    } else {
      this.deselect("custDetails");
    }
  }

  deselect = (item) => {
    const resetState = {};
    resetState[item] = null;
    this.setState(resetState);
  }

  addToLibrary = (movieObj) => {
    axios.post(`${BASE_URL}movies`, movieObj)
    .then(response => {
      // send new api call to backend to get latest data
      this.getFromBackend(`${BASE_URL}movies`, 'inventory', `${movieObj.title} added to inventory!`);
    })
    .catch(error => {
      this.setState({ error: error.response.data.railsErrorMsg, success: "" })
    })
  }

  eraseAlerts = () => {
    this.setState({ error: "", success: "" })
  }

  refreshStates = () => {
    this.eraseAlerts();
    // get latest backend db data via API
    this.getFromBackend(`${BASE_URL}movies`, 'inventory');
    this.getFromBackend(`${BASE_URL}customers`, 'customers');
    this.getFromBackend(`${BASE_URL}rentals`, 'allRentals');
    this.getFromBackend(`${BASE_URL}rentals/overdue`, 'overdueRentals');
  }

  createRental = () => {
    if (this.state.currCustomer && this.state.currMovie) {
      const movieTitle = this.state.currMovie.title
      const custId = this.state.currCustomer.id
      const custName = this.state.currCustomer.name
      let dueDate = new Date();
      dueDate.setDate(new Date().getDate()+7);
      axios.post(`${BASE_URL}rentals/${movieTitle}/check-out`, {customer_id: custId, due_date: dueDate} )
        .then(response => {
          // send new api call to backend to get latest data
          this.getFromBackend(`${BASE_URL}customers`, 'customers', `${movieTitle} successfully checked-out to ${custName}!`);
          this.getFromBackend(`${BASE_URL}rentals`, 'allRentals');
          this.setState({ currCustomer: "", currMovie: "" })
        })
        .catch(error => {
          this.setState({ error: error.response.data.railsErrorMsg, success: "" })
        })
    } else {
      this.setState({success: "", error: "Movie and customer must be selected to create rental."})
    }
  }

  checkIn = (customer_id, title) => {
    const customerName = getCustomerNameFromId(customer_id, this.state.customers);

    axios.post(`${BASE_URL}rentals/${title}/return`, {customer_id: customer_id})
    .then( response => {
      // refresh both rentals lists
      this.getFromBackend(`${BASE_URL}rentals`, 'allRentals', `${title} successfully returned by customer ${customerName}`);
      this.getFromBackend(`${BASE_URL}rentals/overdue`, 'overdueRentals');
    })
    .catch(error => {
      this.setState({ error: error.message, success: "" });
    });

  }


  render() {
    const iconUrl = "https://www.pngrepo.com/png/284024/170/vhs.png"
    
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
            <img src={iconUrl} className="App-logo" alt="logo" />
            <h1 className="App-title secondary-color">Old-Timey Motion Picture Dispensary</h1>
            <img src={iconUrl} className="App-logo" alt="logo" />
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
            {this.state.currMovie && this.state.currCustomer ? <button type="button" id="rental-button" className="btn btn-primary" onClick={this.createRental}>Create Rental</button> : ""}
            </div>
          </section>

          { this.state.error ? <Alert message={this.state.error} alertStyle="alert-danger"/> : null }
          { this.state.success ? <Alert message={this.state.success} alertStyle="alert-success"/> : null }

          <Switch>
            <Route path="/search">
              <Search className="search-bar" addToLibraryCallback={this.addToLibrary} refreshStatesCallback={this.refreshStates}/>
            </Route>
            <Route path="/library">
              <Library inventory={this.state.inventory} setCurrMovieCallback={this.setCurrMovie} refreshStatesCallback={this.refreshStates}/>
            </Route>
            <Route path="/customers">
              <Customers 
                customers={this.state.customers} 
                allRentals={this.state.allRentals} 
                custDetails={this.state.custDetails} 
                setCustDetailsCallback={this.setCustDetails} 
                currCustomerCallback={this.setCurrCustomer} 
                refreshStatesCallback={this.refreshStates}
                deselectCallback={this.deselect}
                />
            </Route>
            <Route path="/rentals">
              <Rentals allRentals={this.state.allRentals} overdueRentals={this.state.overdueRentals} checkInCallback={this.checkIn} refreshStatesCallback={this.refreshStates}/>
            </Route>
            <Route path="/">
              <Home refreshStatesCallback={this.refreshStates}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
