import React, { Component } from 'react';
import Lodash from 'lodash';
import {Button, Table, Card, Message, Form, Embed} from 'semantic-ui-react';

class MoviesListItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false,
      error: null,
      formData: {}
    };
  }

  handleSubmit = (event, { formData }) => {
    event.preventDefault();
    this.setState({ formData });
    console.log(formData);
    const oldMovieName = this.props.name;
    const newMovieName = formData.name;
    const validate = this.validateInput(newMovieName);

    console.log(newMovieName);

    if (validate) {
      this.setState(
        {
          error: validate
        }
      );
      return;
    }

    this.setState({error: null});
    this.props.saveMovie(oldMovieName, formData);
    this.setState(
      {
        isEditing: false
      }
    );
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState(
      {
        isEditing: false
      }
    );
  };

  convertLinkToID = (link) => {
    var ID = '';
    let url = link.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  };


  renderMoviesSection() {
    const nameStyle = {
      color: this.props.alreadySeen ? 'green' : 'red',
      cursor: 'pointer'
    };

    if(this.state.isEditing) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label="Name" name="name" placeholder="Name" required />
          <Form.Input label="Director" name="director" placeholder="Director" />
          <Form.TextArea name="synopsis" label="Synopsis" placeholder="This movie is about..." rows="3" />
          <Form.Checkbox name="alreadySeen" label="I have already seen this movie." />
          <div className='ui two buttons'>
            <Button primary basic positive type="submit">Save</Button>
            <Button basic negative onClick={this.handleCancel}>Cancel</Button>
          </div>
          <Message>
            {this.renderError()}
          </Message>
        </Form>
      );
    }

    return (
      <Card.Content>
        <Card.Header>
          <div style={nameStyle}
               onClick={this.props.seenChange.bind(this, this.props.name)}>
            {this.props.name}
          </div>
        </Card.Header>
        <Card.Meta>
          {this.props.director}
        </Card.Meta>
        <Card.Description>
          {this.props.synopsis}
          <br>
          </br>
          <Embed
          id={this.convertLinkToID(this.props.trailerLink)}
          placeholder='http://semantic-ui.com/images/image-16by9.png'
          source='youtube'
          />
        </Card.Description>
      </Card.Content>
    );
  }

  renderActionsSection() {
    if(!(this.state.isEditing)) {
      return (
        <div className='ui two buttons'>
          <Button basic color="blue" onClick={this.onEditClick.bind(this)}>Edit</Button>
          <Button basic negative onClick={this.props.deleteMovie.bind(this, this.props.name)}>
            Delete
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Card.Group>
            <Card>
              {this.renderMoviesSection()}
              <Card.Content extra>{this.renderActionsSection()}</Card.Content>
            </Card>
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
