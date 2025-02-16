import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './Customers.css';

class Customers extends React.Component {

  componentDidMount() {
    this.props.refreshStatesCallback();
  }

  componentWillMount() {
    this.props.deselectCallback("custDetails");
  }

  listCustomers = () => {
    return (this.props.customers.map((customerObj, i) => {
      let checkedOut = [];
      let display = false;

      if (this.props.custDetails) {
        if (this.props.custDetails === customerObj.id) {
          const rentals = this.props.allRentals;
          checkedOut = rentals.filter((rental) => {
            return rental.customer_id === customerObj.id
          });
          display = true;
        }
      }
      return <Customer key={i} {...customerObj} checkedOut={checkedOut} detailsDisplay={display} currCustomerCallback={this.props.currCustomerCallback} setCustDetails={this.props.setCustDetailsCallback}/>
    }));
  }

  render() {
    return(
    <section className="component-container" >
      <h3 className="primary-color">Customer List</h3>
      <table className="table table-striped">
        <thead className="table-header-row">
          <tr>
            <th></th>
            <th></th>
            <th>ID</th>
            <th className="customer-name">Name</th>
            <th>Account Credit</th>
            <th># Checked Out</th>
          </tr>
        </thead>
        
        <tbody>
          {this.listCustomers()}
        </tbody> 
      </table>
    </section>
  );
  }
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  allRentals: PropTypes.array,
  custDetails: PropTypes.number,
  setCustDetailsCallback: PropTypes.func.isRequired,
  currCustomerCallback: PropTypes.func,
  refreshStatesCallback: PropTypes.func,
  deselectCallback: PropTypes.func,
}

export default Customers;
