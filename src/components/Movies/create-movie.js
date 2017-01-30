import React, { Component } from 'react';
import Lodash from 'lodash';
import {Button, Input} from 'semantic-ui-react'

class CreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
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

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <Input type="text"
               placeholder="Enter the movie's name"

        ><input ref="createInput"/></Input>
        <Button basic color='green'>Add movie !</Button>
        {this.renderError()}
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault(); //to prevent page from reloading

    const movie = this.refs.createInput.value;
    const validate = this.validateInput(movie);

    console.log(movie);
    console.log(this.props.createMovie);

    if (validate) {
      this.setState(
        {
          error: validate
        }
      );
      return;
    }

    this.setState({error: null});
    this.props.createMovie(movie);
    this.refs.createInput.value = '';
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

export default CreateMovie;
