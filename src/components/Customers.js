import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';

const Customers = (props) => {

  const listCustomers = props.customers.map((customerObj, i) => {
    
    return <Customer key={i} {...customerObj} currCustomerCallback={props.currCustomerCallback}/>
  })

  

  return(
    <section>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">CurrCustomer</th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Account Credit</th>
            <th scope="col"># Movies checked out</th>
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
