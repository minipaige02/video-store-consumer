import React from 'react';
import Movie from './Movie'
import PropTypes from 'prop-types';
import './Library.css';

class Library extends React.Component {
  getMovies = (inventory, setCurrMovieCallback) => {

    const sortedInventory = inventory.sort(function(a, b) {
      const titleA=a.title, titleB=b.title
      if (titleA < titleB ) {
        return -1
      } else if (titleB < titleA) {
        return 1
      } else {
        return 0
      }
    });

    return sortedInventory.map((movie, i) => {
      return <Movie 
        key={i}
        {...movie}
        buttonText="Select"
        selectMovieCallback={() => setCurrMovieCallback(movie.id)}
      />
    });
  }

  displayMovies = (inventory, setCurrMovieCallback) => {
    if (inventory.length > 0) {
      return (
        <section>
          <h3>Rental Library</h3>
          <table className="table table-striped">
            <thead className="table-header-row">
              <tr>
                <th></th>
                <th></th>
                <th>Title</th>
                <th className="w-25">Release Date</th>
                <th>Overview</th>
              </tr>
            </thead>
  
            <tbody>
              {this.getMovies(inventory, setCurrMovieCallback)}
            </tbody>
          </table>
        </section>
      ) 
    } else {
      return (
        <h4>No Movies Added to Library</h4>
      )
    }
  }

  componentDidMount() {
    this.props.refreshStatesCallback();
  }

  render() {
    return this.displayMovies(this.props.inventory, this.props.setCurrMovieCallback);
  }
}



Library.propTypes = {
  inventory: PropTypes.array,
  setCurrMovieCallback: PropTypes.func.isRequired,
}

export default Library;
