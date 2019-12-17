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
      <Button value={id} name={name} onClick={selectCurrCustomer} className="btn btn-secondary">Select</Button>
      <section>{id}</section>
      <section>{name}</section>
      <section>{address}</section>
    </section>
  );
};

// Customer.propTypes = {

// }

export default Customer;