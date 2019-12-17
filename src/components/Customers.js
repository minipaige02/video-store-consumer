import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './Customers.css';

const Customers = (props) => {

  const listCustomers = props.customers.map((customerObj, i) => {
    return <Customer key={i} {...customerObj} currCustomerCallback={props.currCustomerCallback}/>
  })

  const noCustomers = (
      <tr>
        <th>No Customers</th>
        <th>No Customers</th>
        <th>No Customers</th>
        <th>No Customers</th>
        <th>No Customers</th>
      </tr>
    );


  

  return(
    <section>

      <table className="table table-striped">
        <thead className="table-header-row">
          <tr>
            <th>Checking Out</th>
            <th>Id</th>
            <th>Name</th>
            <th>Account Credit</th>
            <th># Movies checked out</th>
          </tr>
        </thead>
        
        <tbody>
          {props.customers.length === 0 ? noCustomers:listCustomers}
        </tbody>
          
        
      </table>

      
    </section>
  );
};

// Customers.propTypes = {

// }

export default Customers;
