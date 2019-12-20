import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';

class Rentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "allRentals",
    }
  }

  componentDidMount() {
    this.props.refreshStatesCallback();
  }

  isOverdue = (due_date) => {
    const today = new Date();
    return (formatDate(today) > formatDate(due_date));
  }

  showRentals = (rentalObjs, checkInCallback) => {
    return ( rentalObjs.map((rental, i) => {
      
      return (
      <tr key={i} className={ this.isOverdue(rental.due_date) ? "overdue":null}>
        <td>{rental.title}</td>
        <td>{rental.name}</td>
        <td>{formatDate(rental.checkout_date)}</td>
        <td>{formatDate(rental.due_date)}</td>
        <td><button onClick={() => {checkInCallback(rental.customer_id, rental.title)}} className="btn btn-primary">Check In</button></td>
      </tr>)
    })
    );
  }

  showCorrectTable = () => {
    if (this.state.active === "allRentals") {
      return (this.showRentals(this.props.allRentals, this.props.checkInCallback));
    } else if (this.state.active === "overdueRentals") {
      return (this.showRentals(this.props.overdueRentals, this.props.checkInCallback));
    }
  }

  chooseTable = (event) => {
    this.setState({ active: event.target.id})
  }

  

  render() {
    const currTable = this.state.active;

    const activeTab = "nav-link active";
    const inactiveTab = "nav-link";

    return(
      <section className="component-container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <h3 id="allRentals" className={ currTable === "allRentals"? activeTab:inactiveTab} onClick={this.chooseTable}>All Rentals</h3>
          </li>
          <li className="nav-item">
            <h3 id="overdueRentals" className={currTable ==="overdueRentals"? activeTab:inactiveTab} onClick={this.chooseTable}>Overdue Rentals</h3>
          </li>
        </ul>

          <table className="table table-striped">
            <thead className="table-header-row">
              <tr>
                <th>Movie</th>
                <th>Customer</th>
                <th>Checkout Date</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {this.showCorrectTable()}
            </tbody>
          </table>
      </section>

    );
  }
}

Rentals.propTypes = {
  overdueRentals: PropTypes.array.isRequired,
  allRentals: PropTypes.array.isRequired,  
  refreshStatesCallback: PropTypes.func.isRequired,
  checkInCallback: PropTypes.func.isRequired,
}

export default Rentals;
