import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie'


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      searchTerm: "",
      error: "",
      searchResults: [],
    }
  }

  getInput = (event) => {
    this.setState({ searchTerm: event.target.value});
  }

  sendAPI = (event) => {
    event.preventDefault();

    axios.get(`http://localhost:2999/movies?query=${this.state.searchTerm}`)
    .then(response => {
      this.setState({ searchTerm: "", searchResults: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message });
    })

  }


  render(){
    const results = this.state.searchResults.map((movie, i) => {
      return <Movie 
        key={i}
        {...movie}
      />
    });
    
  return(
    <section>
      <form onSubmit={this.sendAPI}>
        <input type="text" value={this.state.searchTerm} placeholder="search term" onChange={this.getInput}/>
        <input type="submit"/>
      </form>

      {results}
    </section>
  )};
};

Search.propTypes = {
  
}

export default Search;
