import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({id, name, registered_at, address, city, state, postal_code, phone, account_credit, movies_checked_out_count, currCustomerCallback}) => {

  const showDollars = (float) => {
    return `$${float.toFixed(2)}`;
  }

  return(
    <tr>
      
        <td><button value={id} name={name} onClick={()=>currCustomerCallback(id, name)} className="btn btn-info">Select</button></td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{showDollars(account_credit)}</td>
        <td>{movies_checked_out_count}</td>

    </tr>
  );
};

// Customer.propTypes = {

// }

export default Customer;