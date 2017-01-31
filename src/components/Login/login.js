import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react'
import {connect} from 'react-redux'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: ""
    };
  }


  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  login(e) {
    e.preventDefault();
    this.props.login(this.state.user, this.state.password);

  }

  render() {
    const loginStyle = {
      container : {
        marginTop : "10px",
      }
    }

    return (
      <div className="ui middle aligned center aligned grid" style={loginStyle.container}>
        <Form>
          <Form.Field>
            <Input type="text" name="user" value={this.state.user}
                   placeholder="Username"
                   onChange={this.handleChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <Input type="password" name="password" value={this.state.password}
                   placeholder="Password"
                   onChange={this.handleChange.bind(this)}/>
          </Form.Field>
          <Button type="submit" onClick={this.login.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  login : (username, password) => {
    dispatch({
      type: "SIGN_IN_USER",
      username,
      password
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)