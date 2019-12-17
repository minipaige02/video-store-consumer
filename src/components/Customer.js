import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

const Customer = ({id, name, address, currCustomerCallback}) => {

  const selectCurrCustomer = (event)=> {
    console.log(`selected customer ${event.target.value}, ${event.target.name}`);
    currCustomerCallback(event.target.value, event.target.name);
  }

  return(
    <section className="customer-container">
      <input type="checkbox" value={id} name={name} onChange={selectCurrCustomer}/>
      <section>{id}</section>
      <section>{name}</section>
      <section>{address}</section>
    </section>
  );
};

// Customer.propTypes = {

// }

export default Customer;