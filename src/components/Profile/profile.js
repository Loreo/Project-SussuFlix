import React from 'react';
import AuthService from '../../services/authentification';

export default class Profile extends React.Component {
  render(){
    return (
      <div>
        <h2>  Token :  {AuthService.getToken()} </h2>
      </div>
    )
  }
}