import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';



class Rentals extends React.Component {

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  showAllOverdues = (overdueRentals) => {
    return ( overdueRentals.map((entry, i) => {
      return (<tr key={i}>
      <td>{entry.title}</td>
      <td>{entry.name}</td>
      <td>{formatDate(entry.checkout_date)}</td>
      <td>{formatDate(entry.due_date)}</td>
      <td>check in button here???</td>
      </tr>)
    })
    );
  }

  render() {
    return(
      <section>
          <h3>Rental Library</h3>
          <table className="table table-striped">
            <thead className="table-header-row">
              <tr>
                <th>Movie</th>
                <th>Customer</th>
                <th>Checkout Date</th>
                <th>Due Date</th>
                <th>Check in</th>
              </tr>
            </thead>
  
            <tbody>
              {this.showAllOverdues(this.props.overdueRentals)}
            </tbody>
          </table>
        </section>

    );
  }
}

Rentals.propTypes = {
  overdueRentals: PropTypes.array.isRequired,
  eraseAlertsCallback: PropTypes.func.isRequired,
}

export default Rentals;
