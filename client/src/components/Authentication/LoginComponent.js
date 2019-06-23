import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAlert, MDBInput, MDBCard, MDBCardBody, MDBCardFooter } from 'mdbreact';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "../../index"


import { formDataToJson } from '../../utilities/utility'
import SignUpComponent from './SignUpComponent';
import { logIn, logInFirstTime } from '../../apis';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      toSignUp: true,
      tempPasswordRequired: false,
      isLoginError: false,
      loginErrorCode: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      toSignUp: false
    }));
  }
  isAdminType = (userType) => {
    if(userType == "Admin"){
      return true ; 
    }
    else{
      return false;
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    e.persist()
    console.log("LOGIN API CALLED");
    const formData = new FormData(e.target);
    this.setState({

      isLoginError : false
    })
    // converting formData to JSON 
    const formJsonData = formDataToJson(formData)
    if (this.state.tempPasswordRequired) {
      // call API of first Time Login with Temporary Password
      logInFirstTime(formJsonData).then((response) => {
        if (response.data.message == "success") {
          // login user
          ReactDOM.render(   
            
            <Router>
              
            <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)}/>
          </Router>  
            ,
            document.getElementById('root')        
          );
        }
        else {
          // show error
          this.setState({
            loginError: response.data.error,
            isLoginError : true
          })

        }
      }).catch((err) => {
        console.log(err);

      })
    }
    else {
      logIn(formJsonData).then((response) => {
        this.refs.signInForm.reset();
        console.log("Login ",response);
        if (response.data.message == "success") {
          if (response.data.status == "FORCE_CHANGE_PASSWORD") {
            this.setState({
              tempPasswordRequired: true
            })
          }
          else {
            // login redirect code here

            ReactDOM.render(  
              <Router>
              <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)}/>
            </Router>  
              ,
              document.getElementById('root')        
            );
          }
        }
        else {

          this.setState({
            isLoginError : true,
            loginError: response.data.error
          })

        }

        // Now update the state with data that we added


      }).catch((err) => {
        e.target.reset();
        // catch error 
        console.log("error : ", err);

      })

    }
  }
  render() {

    if (this.state.toSignUp) {
      return <MDBContainer>
        <MDBRow >
          <MDBCol middle md="6" className="offset-md-3">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit} ref="signInForm">
                  <p className="h5 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Your registered email"
                      name="user_name"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your password"
                      name="password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                    {
                      this.state.tempPasswordRequired ?
                        <MDBInput
                          label="Enter New Password"
                          name="new_password"
                          icon="lock"
                          group
                          type="password"
                          validate
                        />
                        : null
                    }
                  </div>
                  <div className="text-center">
                    <MDBBtn color="light-green" type="submit">Login</MDBBtn>
                  </div>
                  {this.state.isLoginError ?
                    <MDBAlert color="warning" dismiss>
                      <strong>Failed! </strong> {this.state.loginError}.
                  </MDBAlert>
                    : null
                    }
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
