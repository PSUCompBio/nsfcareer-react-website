import React from 'react';
import LoginComponent from '../../components/Authentication/LoginComponent';
import { withRouter, Redirect } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    const checkIfUserLoggedIn = JSON.parse(localStorage.getItem('state'));

    return (
      <React.Fragment>
        {checkIfUserLoggedIn.isSignedInSuccess === true ? (
          <Redirect to="/Dashboard" />
        ) : (
          <LoginComponent isAuthenticated={this.props.isAuthenticated} />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
