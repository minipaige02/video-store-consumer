import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './Helpers';



class Rentals extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currList: props.allRentals,
  //   }
  // }


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

  showCorrectTable = () => {
    if (true) {
      return (this.showRentals(this.props.allRentals, this.props.checkInCallback));
    } else if (false) {
      return (this.showRentals(this.props.overdueRentals, this.props.checkInCallback));
    }
  }

  wassup = () => {
    console.log(`wassup`);
    
  }

  render() {
    return(
      <section>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" value="allRentals" onClick={this.wassup}>All Rentals</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" value="overdueRentals" onClick={this.wassup}>Overdue Rentals</a>
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
  refreshStatesCallback: PropTypes.func.isRequired,
}

export default Rentals;
