import React from 'react';
import PropTypes from 'prop-types';

const Customers = (props) => {

  const listCustomers = props.customers.map((customerObj, i) => {
      return <p key={i}>{customerObj.name}</p>
  })

  

  return(
    <section>
      {listCustomers}
    </section>
  );
};

export default Customers;
