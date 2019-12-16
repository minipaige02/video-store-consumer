import React from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';

const Customers = (props) => {

  const listCustomers = props.customers.map((customerObj, i) => {
    
    return <Customer key={i} customerObj={customerObj} />
  })

  

  return(
    <section>
      {listCustomers}
    </section>
  );
};

// Customers.propTypes = {

// }

export default Customers;
