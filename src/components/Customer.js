import React from 'react';
import { formatDate } from './Helpers'
import PropTypes from 'prop-types';


const Customer = ({id, name, registered_at, address, city, state, postal_code, phone, account_credit, movies_checked_out_count, detailsDisplay, checkedOut, currCustomerCallback}) => {

  const showDollars = (float) => {
    return `$${float.toFixed(2)}`;
  }
  
  if (detailsDisplay) {
    const rentalsList = checkedOut.map((rental, i) => {
    return <li key={i}><strong>{rental.title}</strong> | Checked-out: {formatDate(rental.checkout_date)} | Due: {formatDate(rental.due_date)}</li>
    });
  
    return(
        <tr>
          <td><button value={id} name={name} onClick={()=>currCustomerCallback(id)} className="btn btn-info">Select</button></td>
          <td><button value="details" name="details" className="btn btn-info">-</button></td>
          <td>{id}</td>
          <td className="customer-name">{name}
            <ul>
              <li>Phone: {phone}</li>
              <li>Address: {address}, {city}, {state} {postal_code}</li>
              <li>Registered: {formatDate(registered_at)}</li>
              <li><strong>Currently checked-out:</strong></li>
              {rentalsList}
            </ul>
          </td>
          <td>{showDollars(account_credit)}</td>
          <td>{movies_checked_out_count}</td>
        </tr>
      );
  } else {
    return(
      <tr>
        <td><button value={id} name={name} onClick={()=>currCustomerCallback(id)} className="btn btn-info">Select</button></td>
        <td><button value="details" name="details" className="btn btn-info">+</button></td>
        <td>{id}</td>
        <td className="customer-name">{name}</td>
        <td>{showDollars(account_credit)}</td>
        <td>{movies_checked_out_count}</td>
      </tr>
    );
  }

  
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registered_at: PropTypes.string.isRequired,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal_code: PropTypes.string,
  account_credit: PropTypes.number,
  movies_checked_out_count: PropTypes.number,
  detailsDisplay: PropTypes.bool.isRequired,
  currCustomerCallback: PropTypes.func.isRequired,
}

export default Customer;
