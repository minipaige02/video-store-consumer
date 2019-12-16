import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

const Customer = (props) => {

  const selectCurrCustomer = (event)=> {
    console.log(`selected customer ${event.target.value}, ${event.target.name}`);
    
  }

  return(
    <section className="customer-container">
      <input type="checkbox" value={props.customerObj.id} name={props.customerObj.name} onChange={selectCurrCustomer}/>
      <section>{props.customerObj.id}</section>
      <section>{props.customerObj.name}</section>
      <section>{props.customerObj.address}</section>
    </section>
  );
};

// Customer.propTypes = {

// }

export default Customer;