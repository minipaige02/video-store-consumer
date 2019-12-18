import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './Customers.css';

class Customers extends React.Component {

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  listCustomers = () => {
    return (this.props.customers.map((customerObj, i) => {
      return <Customer key={i} {...customerObj} currCustomerCallback={this.props.currCustomerCallback}/>
    }));
  }

  render() {
    return(
    <section>
      <table className="table table-striped">
        <thead className="table-header-row">
          <tr>
            <th></th>
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
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  currCustomerCallback: PropTypes.func,
  eraseAlertsCallback: PropTypes.func,
}

export default Customers;
