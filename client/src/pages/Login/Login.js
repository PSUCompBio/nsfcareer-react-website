import React from 'react';
import LoginComponent from '../../components/Authentication/LoginComponent';
import SignUpComponent from '../../components/Authentication/SignUpComponent';

import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
        <React.Fragment>
            <div className="container topspace ">
                    <LoginComponent></LoginComponent>
            </div>

        </React.Fragment>
    );
  }
}

export default Login;
