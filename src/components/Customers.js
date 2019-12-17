import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './Customers.css';

const Customers = (props) => {

  const listCustomers = props.customers.map((customerObj, i) => {
    
    return <Customer key={i} {...customerObj} currCustomerCallback={props.currCustomerCallback}/>
  })

  

  return(
    <section>

      <table class="table table-striped">
        <thead class="table-header-row">
          <tr>
            <th>CurrCustomer</th>
            <th>Id</th>
            <th>Name</th>
            <th>Account Credit</th>
            <th># Movies checked out</th>
          </tr>
        </thead>
        
        <tbody>
          {listCustomers}
        </tbody>
          
        
      </table>

      
    </section>
  );
};

// Customers.propTypes = {

// }

export default Customers;
