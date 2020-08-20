import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class verifyNumber extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}

export default withRouter(verifyNumber);