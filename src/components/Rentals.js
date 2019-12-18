import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';



class Rentals extends React.Component {

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
        <td><button onClick={() => {checkInCallback(rental.customer_id, rental.title)}} className="btn btn-info">Check In</button></td>
      </tr>)
    })
    );
  }

  render() {
    return(
      <section>
          <h3>ALL RENTALS(red=overdue) *or* OVERDUES </h3>
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
              <h3>ALL RENTALS</h3>
              {this.showRentals(this.props.allRentals, this.props.checkInCallback)}
              
              <h3>OVERDUES</h3>
              {this.showRentals(this.props.overdueRentals, this.props.checkInCallback)}
            </tbody>
          </table>
        </section>

    );
  }
}

Rentals.propTypes = {
  overdueRentals: PropTypes.array.isRequired,
  refreshStatesCallback: PropTypes.func.isRequired,
}

export default Rentals;
