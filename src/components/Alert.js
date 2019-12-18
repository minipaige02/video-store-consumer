import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, alertStyle }) => {
  // alertStyles can be any of these: 
  // ['alert-primary', 'alert-secondary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-light', 'alert-dark' ]
  // if bogus alertStyle props passed in, then className will just be regular 'alert'

  return(
    <section className={`alert ${alertStyle}`} role="alert" >
      {message}
    </section>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  alertStyle: PropTypes.string,
}

export default Alert;
