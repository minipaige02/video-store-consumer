import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie'
import './Search.css'
import { BASE_URL } from './Helpers';


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

    axios.get(`${BASE_URL}movies?query=${this.state.searchTerm}`)
    .then(response => {
      this.setState({ searchTerm: "", searchResults: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message });
    })

  }

  componentDidMount() {
    this.props.refreshStatesCallback();
  }


  render(props){
    const results = this.state.searchResults.map((movie, i) => {
      return <Movie 
        key={i}
        {...movie}
        buttonText="Add to Library"
        selectMovieCallback={() => this.props.addToLibraryCallback(movie)}
      />
    });
    
  return(
    <section className="component-container" >
      <form onSubmit={this.sendAPI} className="input-group input-group-lg">
        <input type="text" value={this.state.searchTerm} placeholder="Search The Movie Database" onChange={this.getInput} className="form-control" />
        <input className="input-group-text submit-button" type="submit"/>
      </form>

      <table className="table table-striped search-table">
        <thead className="table-header-row">
          <tr>
            <th></th>
            <th></th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Overview</th>
          </tr>
        </thead>

        <tbody>
          {results}
        </tbody>
      </table>

    </section>
  )};
};

Search.propTypes = {
  addToLibraryCallback: PropTypes.func.isRequired,
}

export default Search;
