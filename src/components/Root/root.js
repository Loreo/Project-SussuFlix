import React from 'react';
import App from '../App/app';
import Login from '../Login/login';
import Logout from '../Logout/logout';
import Home from '../Home/home';
import Movies from '../Movies/movies';
import RequireAuth from '../Authentification/auth';
import Profile from '../Profile/profile';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {createStore} from "redux";
import {Provider} from "react-redux";

//Reducer
import reducer from '../../reducers/index';

const store = createStore(reducer);

export default class Root extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="profile" component={RequireAuth(Profile)} />
            <Route path="movies" component={Movies} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
          </Route>
        </Router>
      </Provider>
    )
  }
}