import React from 'react';
import Lodash from 'lodash';
import MoviesList from './movies-list';
import CreateMovie from './create-movie';

const movies = require('../../../public/DatabaseMovies.json');


class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies // es6 for movies: movies
    }
  }

  render() {
    return (
      <p>
        <CreateMovie createMovie={this.createMovie.bind(this)}
                     movies={this.state.movies}
        />
        <MoviesList movies={this.state.movies}
                    seenChange={this.seenChange.bind(this)}
                    saveMovie={this.saveMovie.bind(this)}
                    deleteMovie={this.deleteMovie.bind(this)}
        />
      </p>
    )
  }



  seenChange(name) {
    const selectedMovie = Lodash.find(this.state.movies, function(movie) {
      return movie.name === name
    });
    selectedMovie.alreadySeen = !selectedMovie.alreadySeen;
    // refresh the page
    this.setState({
      movies: this.state.movies
    });
  }

  createMovie(movie) {
    this.state.movies.push(movie);
    this.setState({
      movies: this.state.movies
    });
  }

  saveMovie(oldMovieName, newMovie){
    console.log(oldMovieName);
    console.log("New Movie : ");
    console.log(newMovie);

    const selectedMovie = Lodash.find(this.state.movies, (movie) => {
      return movie.name === oldMovieName;
    });

    for (let key in selectedMovie) {
      if (selectedMovie.hasOwnProperty(key)) {
        console.log(key + " -> " + selectedMovie[key]);
        if(newMovie.hasOwnProperty(key)) {
          selectedMovie[key] = newMovie[key];
        }
      }
    }

    this.setState({
      movies: this.state.movies
    })
  }

  deleteMovie(movieToDelete) {
    Lodash.remove(this.state.movies, function(movie) {
      return movie.name === movieToDelete
    });
    this.setState({
      movies: this.state.movies
    });
  }
}

export default Movies;