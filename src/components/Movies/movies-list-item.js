import React, { Component } from 'react';
import Lodash from 'lodash';
import {Button, Table, Card} from 'semantic-ui-react';

class MoviesListItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false,
      error: null
    };
  }

  renderAlreadySeen() {
    const nameStyle = {
      color: this.props.alreadySeen ? 'green' : 'red',
      cursor: 'pointer'
    };

    if(this.state.isEditing) {
      return (
        <form onSubmit={this.onSaveClick.bind(this)}>
          <input type="text"
                 defaultValue={this.props.name}
                 ref="editInput"
          />
        </form>
      );
    }

    return (
      <Card.Header>
      <div style={nameStyle}
          onClick={this.props.seenChange.bind(this, this.props.name)}
      >{this.props.name}</div>
      </Card.Header>
    );
  }

  renderActionsSection() {
    if(this.state.isEditing) {
      return (
        <div className='ui two buttons'>
            <Button basic positive onClick={this.onSaveClick.bind(this)}>Save</Button>
            <Button basic onClick={this.onCancelClick.bind(this)}>Cancel</Button>
            {this.renderError()}
        </div>
      );
    }
    return (
      <div className='ui two buttons'>
        <Button basic color="blue" onClick={this.onEditClick.bind(this)}>Edit</Button>
        <Button basic negative onClick={this.props.deleteMovie.bind(this, this.props.name)}>
          Delete
        </Button>
      </div>
    );
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
        <Card.Group>
          <Card.Content>{this.renderAlreadySeen()}</Card.Content>
          <Card.Content extra>{this.renderActionsSection()}</Card.Content>
        </Card.Group>
        </Table.Cell>
      </Table.Row>
    );
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }
    return (
      <div style={{color: 'red'}}>
        {this.state.error}
      </div>
    )
  }

  onEditClick() {
    this.setState(
      {
        isEditing: true
      }
    );
  }

  onCancelClick() {
    this.setState(
      {
        isEditing: false
      }
    );
  }

  onSaveClick(event) {
    event.preventDefault();
    const oldMovie = this.props.name;
    const newMovie = this.refs.editInput.value;
    const validate = this.validateInput(newMovie);

    console.log(newMovie);

    if (validate) {
        this.setState(
            {
                error: validate
            }
        );
        return;
    }

    this.setState({error: null});
    this.props.saveMovie(oldMovie, newMovie);
    this.refs.editInput.value = this.props.name;
    this.setState(
      {
        isEditing: false
      }
    );
  }

  validateInput(text) {
      if (!text) {
          return 'Enter the name of a movie';
      } else if (Lodash.find(this.props.movies, movie => movie.name === text)) {
          return 'This movie is already in the list';
      } else {
          return null;
      }
  }


}

export default MoviesListItem;
