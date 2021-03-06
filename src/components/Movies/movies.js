import React from 'react';
import Lodash from 'lodash';
import MoviesList from './movies-list';
import CreateMovie from './create-movie';

const movies = [
  {
    "name": "Inception",
    "director": "Christopher Nolan",
    "synopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore",
    "trailerLink":"https://www.youtube.com/watch?v=B4nIVh1yvvc",
    "alreadySeen": true
  },
  {
    "name": "LaLaLand",
    "director": "Unknown",
    "synopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore",
    "trailerLink": "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    "alreadySeen": false
  },
  {
    "name": "La Cité de la Peur",
    "director": "Alain Berbérian",
    "synopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore",
    "trailerLink": "https://www.youtube.com/watch?v=CItygwB9mfY",
    "alreadySeen": false
  }
];

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies // es6 for movies: movies
    }
  }

  render() {
    console.log("List of movies : ");
    console.log(JSON.stringify(this.state.movies));
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