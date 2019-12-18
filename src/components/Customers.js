import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './Customers.css';

class Customers extends React.Component {

  listCustomers = () => {
    this.props.customers.map((customerObj, i) => {
    return <Customer key={i} {...customerObj} currCustomerCallback={this.props.currCustomerCallback}/>
  })};

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  render() {
    return(
      <section>
        <table className="table table-striped">
          <thead className="table-header-row">
            <tr>
              <th>CurrCustomer</th>
              <th>Id</th>
              <th>Name</th>
              <th>Account Credit</th>
              <th># Movies checked out</th>
            </tr>
          </thead>
          
          <tbody>
            {this.listCustomers()}
          </tbody> 
        </table>
      </section>
    );
  }

  
};

// Customers.propTypes = {

// }

export default Customers;
