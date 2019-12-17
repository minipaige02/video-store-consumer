import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = (props) => {
  return(
    <tr>
      <td><button value={props.id} name={props.title} onClick={props.selectMovie} className="btn btn-info">Select</button></td>
      <td><img src={props.image_url} alt={props.title} /></td>
      <td>{props.title}</td>
      <td>{props.release_date}</td>
      <td>{props.overview}</td>
    </tr>
  )
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number.isRequired,
}

export default Movie;
