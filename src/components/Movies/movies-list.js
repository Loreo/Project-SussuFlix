import React, { Component } from 'react';
import Lodash from 'lodash';
import MoviesListHeader from '../Header/movies-list-header'
import MoviesListItem from './movies-list-item';

class MoviesList extends Component {
  renderItems() {
    // We don't need to pass 'movies' props to MovieListItem
    const props = this.props;

    return Lodash.map(this.props.movies, function(movie, index) {
      return <MoviesListItem key={index}
                             name={movie.name}
                             alreadySeen={movie.alreadySeen}
                             {...props} // weird es6
      />
    });
  }

  render() {
    return (
      <table>
        <MoviesListHeader/>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}

export default MoviesList;
