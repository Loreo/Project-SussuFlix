import React, { Component } from 'react';
import Lodash from 'lodash';
//import logo from '../../logo.svg';
//import '../../App.css';
import MoviesList from '../Movies/movies-list';
import CreateMovie from '../Movies/create-movie';


const movies = require('../../../public/Database.json');


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

export default App;
