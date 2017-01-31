import React, { Component } from 'react';
import Lodash from 'lodash';
import MoviesListHeader from '../Header/movies-list-header'
import MoviesListItem from './movies-list-item';
import { Table } from 'semantic-ui-react';

class MoviesList extends Component {
  renderItems() {
    // We don't need to pass 'movies' props to MovieListItem
    const props = this.props;

    return Lodash.map(this.props.movies, function(movie, index) {
      return <MoviesListItem key={index}
                             {...movie} // name = {this.props.name}
                             {...props} // weird es6
      />
    });
  }

  render() {
    return (
      <Table celled inverted selectable>
        <MoviesListHeader/>
        <Table.Body>
          {this.renderItems()}
        </Table.Body>
      </Table>
    );
  }
}

export default MoviesList;
