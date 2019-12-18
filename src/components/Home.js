import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    this.props.eraseAlertsCallback();
  }

  render() {
    return(
    <section>
      <img src="https://ih0.redbubble.net/image.591029586.5228/flat,550x550,075,f.jpg" alt="Be kind rewind VHS tape" className="home-img"/>
    </section>
    );
  }
};

export default Home;
