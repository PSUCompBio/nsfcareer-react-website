import React from 'react';
import { MDBContainer, MDBRow, MDBIcon, MDBCol, MDBBtn, MDBAlert, MDBInputGroup, MDBInput, MDBCard, MDBCardBody, MDBCardFooter } from 'mdbreact';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Index from "../../index"
import Footer from '../Footer'

import { formDataToJson } from '../../utilities/utility'
import SignUpComponent from './SignUpComponent';
import { logIn, logInFirstTime } from '../../apis';

import "../../mixed_style.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      toSignUp: true,
      tempPasswordRequired: false,
      isLoginError: false,
      loginErrorCode: "",
      isLoading: false
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
    if (userType == "Admin") {
      return true;
    }
    else {
      return false;
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    e.persist()
    console.log("LOGIN API CALLED");
    const formData = new FormData(e.target);
    this.setState({

      isLoginError: false,
      isLoading: true
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

              <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)} />
            </Router>
            ,
            document.getElementById('root')
          );
        }
        else {
          // show error
          this.setState({
            loginError: response.data.error,
            isLoginError: true,
            isLoading: false
          })

        }
      }).catch((err) => {
        console.log(err);

      })
    }
    else {
      logIn(formJsonData).then((response) => {
        this.refs.signInForm.reset();
        console.log("Login ", response);
        if (response.data.message == "success") {
          if (response.data.status == "FORCE_CHANGE_PASSWORD") {
            this.setState({
              tempPasswordRequired: true,
              isLoading: false
            })
          }
          else {
            // login redirect code here

            ReactDOM.render(
              <Router>
                <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)} />
              </Router>
              ,
              document.getElementById('root')
            );
          }
        }
        else {

          this.setState({
            isLoginError: true,
            isLoading: false,
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
    return (
      <div className="container-fluid pl-0 pr-0 overflow-hidden">
        <div className="row login">
          <div className="col-md-6 col-lg-6 offset-md-3 mt-10">
            <div className="card card-border">
              <div className="card-body">
                  <div className="text-center brain-icon-container">
                    <div className="text-center brain-icon">
                      <img src="img/icon/brain.png" alt="" />
                    </div>
                  </div>
                  <div className="input-group mb-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1"><img src="img/icon/user.svg" alt="" /></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1"><img src="img/icon/lock.svg" alt="" /></span>
                    </div>
                    <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                  </div>
                  <div>
                    <a className="float-right forgot-pswd" >Forgot password?</a>
                  </div>
                  <button type="button" className="btn btn-primary log-in-btn btn-block mt-5">LOG IN</button>
                  <div className="text-center">
                    <p className="mt-4 sign-up-link">Don't have an account? <Link className="sign-up" to='SignUp' > Sign Up </Link></p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    )
  }
}

export default withRouter(Login);
