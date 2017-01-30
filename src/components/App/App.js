import React, { Component } from 'react';
import Lodash from 'lodash';
//import logo from '../../logo.svg';
//import '../../App.css';
import MoviesList from '../Movies/movies-list';
import CreateMovie from '../Movies/create-movie';

const movies = [
  {
    name: "Inception",
    director: "Christopher Nolan",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est " +
    "laborum.",
    alreadySeen: true
  },
  {
    name: "LaLaLand",
    director: "Unknown",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est " +
    "laborum.",
    alreadySeen: false
  },
  {
    name: "La Cité de la Peur",
    director: "Alain Berbérian",
    synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est " +
    "laborum.",
    alreadySeen: false
  }
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies // es6 for movies: movies
    }
  }

  render() {
    return (
      <div>
        <CreateMovie createMovie={this.createMovie.bind(this)}
                     movies={this.state.movies}
        />
        <MoviesList movies={this.state.movies}
                    seenChange={this.seenChange.bind(this)}
                    saveMovie={this.saveMovie.bind(this)}
                    deleteMovie={this.deleteMovie.bind(this)}
        />
      </div>
    );
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
    let moviesName = this.state.movies.map(movie => {
      return movie.name;
    });
    const indexFilm = moviesName.indexOf(oldMovieName);

    if (indexFilm) {
      const movies = this.state.movies;
      movies[indexFilm] = newMovie;
      this.setState({
        movies: this.state.movies
      })
    }
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

export default App;
