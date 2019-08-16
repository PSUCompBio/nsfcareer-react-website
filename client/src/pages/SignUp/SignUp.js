import React from 'react';
import SignUpComponent from '../../components/Authentication/SignUpComponent';
import { withRouter } from 'react-router-dom';
import "./SignUp.css";

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <React.Fragment>

          <SignUpComponent/>
        </React.Fragment>
    );
  }
}

export default withRouter(SignUp);
