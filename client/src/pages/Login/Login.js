import React from 'react';
import LoginComponent from '../../components/Authentication/LoginComponent';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {


    return (
      <React.Fragment>
        {/*checkIfUserLoggedIn === null ? (
          <LoginComponent isAuthenticated={this.props.isAuthenticated} />
        ) : checkIfUserLoggedIn.isSignedInSuccess ? (
          <Redirect to="/Dashboard" />
        ) : (
          */<LoginComponent {...this.props} isAuthenticated={this.props.isAuthenticated} />
        }
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
