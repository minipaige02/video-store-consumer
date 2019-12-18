import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  render() {
    return(
    <section>
      <img src="https://live.staticflickr.com/4098/4943160683_37e9fb2830_m.jpg" alt="VHS" className="home-img"/>
    </section>
    );
  }
};

export default Home;
