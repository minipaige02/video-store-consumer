import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {
  return(
    <div>
      <img src={props.image_url} alt={props.title} />
      <p>{props.title}</p>
      <p>{props.release_date}</p>
      <p>{props.overview}</p>
    </div>
  )
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number.isRequired,
}

export default Movie;
