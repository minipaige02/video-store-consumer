import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';



class Rentals extends React.Component {

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  showAllOverdues = (overdueRentals, checkInCallback) => {
    return ( overdueRentals.map((entry, i) => {
      return (<tr key={i}>
      <td>{entry.title}</td>
      <td>{entry.name}</td>
      <td>{formatDate(entry.checkout_date)}</td>
      <td>{formatDate(entry.due_date)}</td>
      <td><button onClick={() => {checkInCallback(entry.customer_id, entry.title)}} className="btn btn-info">Check In</button></td>
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
              {this.showAllOverdues(this.props.overdueRentals, this.props.checkInCallback)}
            </tbody>
          </table>
        </section>

    );
  }
}



// Rentals.propTypes = {
// }

export default Rentals;
