import React from 'react';
import Movie from './Movie'
import PropTypes from 'prop-types';


const getMovies = (inventory) => {
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
    />
  });
}

const Library = ({ inventory }) => {

  return(
    <section>
      <h2>Library HERE!!!!</h2>
      {inventory.length > 0 ? getMovies(inventory) : "No movies added to inventory."}
    </section>
  )
};

Library.propTypes = {
  inventory: PropTypes.array,
}

export default Library;
