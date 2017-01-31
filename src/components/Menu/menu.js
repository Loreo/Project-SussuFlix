import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class AppMenu extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home'
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    let logMenu = null;

    if(!this.props.authenticated) {
      logMenu = <Menu.Item name='login'
                           as={Link}
                           to="login"
                           active={activeItem === 'login'}
                           onClick={this.handleItemClick} />
    } else {
      logMenu = <Menu.Item name='logout'
                           as={Link}
                           to="logout"
                           active={activeItem === 'logout'}
                           onClick={this.handleItemClick} />
    }

    return(
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name='movies'
                     as={Link}
                     to="movies"
                     active={activeItem === 'movies'}
                     onClick={this.handleItemClick} />
          <Menu.Item name='profile'
                     as={Link}
                     to="profile"
                     active={activeItem === 'profile'}
                     onClick={this.handleItemClick} />
          {logMenu}
        </Menu>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch({
      type: "SIGN_OUT_USER"
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);