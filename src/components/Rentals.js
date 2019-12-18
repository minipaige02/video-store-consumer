import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';



class Rentals extends React.Component {

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  showRentals = (rentalObjs, checkInCallback) => {
    return ( rentalObjs.map((rental, i) => {
      return (<tr key={i}>
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
          <h3>All Active Rentals (red=overdue)</h3>
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
              <h1>ALL RENTALS BELOW</h1>
              {this.showRentals(this.props.allRentals, this.props.checkInCallback)}
              <hr />
              <h1>OVERDUES BELOW</h1>
              {this.showRentals(this.props.overdueRentals, this.props.checkInCallback)}
            </tbody>
          </table>
        </section>

    );
  }
}



// Rentals.propTypes = {
// }

export default Rentals;
