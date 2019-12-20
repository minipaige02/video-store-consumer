import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import { formatDate } from './Helpers';

const Movie = (props) => {

  
  return(
    <tr>
      <td><button value={props.id} name={props.title} onClick={props.selectMovieCallback} className="btn btn-primary">{props.buttonText}</button></td>
      <td><img src={props.image_url} alt={props.title} /></td>
      <td>{props.title}</td>
      <td>{formatDate(props.release_date)}</td>
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
  selectMovieCallback: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
}

export default Movie;
