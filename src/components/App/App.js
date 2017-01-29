import React, { Component } from 'react';
import Lodash from 'lodash';
import logo from '../../logo.svg';
import '../../App.css';
import MoviesList from '../Movies/movies-list';
import CreateMovie from '../Movies/create-movie';

const movies = [
  {
    name: "Inception",
    alreadySeen: true
  },
  {
    name: "LaLaLand",
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>My Movie List</h2>
        </div>
        <p className="App-intro">
          <CreateMovie createMovie={this.createMovie.bind(this)}
                       movies={this.state.movies}
          />
          <MoviesList movies={this.state.movies}
                      seenChange={this.seenChange.bind(this)}
                      saveMovie={this.saveMovie.bind(this)}
                      deleteMovie={this.deleteMovie.bind(this)}
          />
        </p>
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
    this.state.movies.push({
      name: movie,
      alreadySeen: false
    });
    this.setState({
      movies: this.state.movies
    });
  }

  saveMovie(oldMovie, newMovie){
    const selectedMovie = Lodash.find(this.state.movies, function(movie) {
      return movie.name === oldMovie
    });
    selectedMovie.name = newMovie;
    this.setState({
      movies: this.state.movies
    });
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
