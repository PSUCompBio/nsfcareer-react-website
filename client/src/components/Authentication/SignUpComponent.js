import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardFooter } from 'mdbreact';
import LoginComponent from './LoginComponent'

class SignUpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      toLogIn : false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      toLogIn: true
    });
  }
  render() {
    if(this.state.toLogIn){
     return  <LoginComponent></LoginComponent>
    }
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol middle md="6" className="offset-md-3">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
            <MDBCardFooter>
            <div className="text-center grey-text">
              Already have an account ? <a className="cyan-text" onClick={this.handleClick}>Log In</a>
            </div>
            </MDBCardFooter>
          </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignUpComponent;
