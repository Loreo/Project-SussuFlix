import React, { Component } from 'react';
import Lodash from 'lodash';
import {Button, Form, Message } from 'semantic-ui-react'

class CreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      formData: {}
    };
  }

  handleSubmit = (e, { formData }) => {
    e.preventDefault();
    this.setState({ formData });
    console.log(formData);
    const movieName = formData.name;
    const validate = this.validateName(movieName);

    console.log(movieName);
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
    this.props.createMovie(formData);
  };

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input label="Name" name="name" placeholder="Name" required />
          <Form.Input label="Director" name="director" placeholder="Director" />
        </Form.Group>
        <Form.TextArea name="synopsis" label="Synopsis" placeholder="This movie is about..." rows="3" />
        <Form.Checkbox name="alreadySeen" label="I have already seen this movie." />

        <Button primary basic color='green' type="submit">Add movie !</Button>
        <Message>
        {this.renderError()}
        </Message>
      </Form>
    );
  }

  validateName(text) {
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
