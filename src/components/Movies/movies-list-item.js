import React, { Component } from 'react';

class MoviesListItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  renderAlreadySeen() {
    const nameStyle = {
      color: this.props.alreadySeen ? 'green' : 'red',
      cursor: 'pointer'
    };

    if(this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text"
                   defaultValue={this.props.name}
                   ref="editInput"
            />
          </form>
        </td>
      );
    }

    return (
      <td style={nameStyle}
          onClick={this.props.seenChange.bind(this, this.props.name)}
      >{this.props.name}</td>
    );
  }

  renderActionsSection() {
    if(this.state.isEditing) {
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    }
    return (
      <td>
        <button onClick={this.onEditClick.bind(this)}>Edit</button>
        <button onClick={this.props.deleteMovie.bind(this, this.props.name)}>
          Delete
        </button>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderAlreadySeen()}
        {this.renderActionsSection()}
      </tr>
    );
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
    this.props.saveMovie(oldMovie, newMovie);
    this.setState(
      {
        isEditing: false
      }
    );
  }
}

export default MoviesListItem;
