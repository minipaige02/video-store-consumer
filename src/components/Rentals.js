import React from 'react';
import PropTypes from 'prop-types';

class Rentals extends React.Component {

  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  render() {
    return("lol");
  }
}

Rentals.propTypes = {
  rentals: PropTypes.array.isRequired,
  eraseAlertsCallback
}

export default Rentals;
