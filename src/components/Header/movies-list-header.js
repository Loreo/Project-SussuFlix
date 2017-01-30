import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class MoviesListHeader extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Films</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default MoviesListHeader;
