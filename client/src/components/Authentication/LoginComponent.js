import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardFooter } from 'mdbreact';
import SignUpComponent from './SignUpComponent';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      toSignUp : true  
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      toSignUp: false
    }));
  }
  render() {

    if(this.state.toSignUp){
      return <MDBContainer>
      <MDBRow >
        <MDBCol middle md="6" className="offset-md-3">
          <MDBCard>
            <MDBCardBody>
            <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn color="light-green">Login</MDBBtn>
            </div>
          </form>
            </MDBCardBody>
            <MDBCardFooter>
            <div className="text-center grey-text">
              Don't have an account ? <a className="light-green-text" onClick={this.handleClick}>Sign Up</a>
            </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    }
   return (
     <SignUpComponent></SignUpComponent>
   ); 
  
  }
}

export default Login;
