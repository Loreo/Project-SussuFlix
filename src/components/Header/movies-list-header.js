import React, { Component } from 'react';

class MoviesListHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  }
}

export default MoviesListHeader;
