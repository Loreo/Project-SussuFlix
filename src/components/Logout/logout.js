import React from 'react';
import AuthService from '../../services/authentification';

export default class Home extends React.Component {
  componentDidMount() {
    AuthService.logout()
  }

  render() {
    return (
      <p>Logout</p>
    )
  }
}