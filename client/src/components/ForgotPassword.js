import React from 'react';
// import {
//   BrowserRouter as Router,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom';
import Footer from './Footer';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid pl-0 pr-0 overflow-hidden">
        <div className="row login">
          <div className="col-md-5  ml-md-auto mr-md-auto mt-10">
            <div className="card card-border">
              <div className="card-body text-center">
                <div className="text-center brain-icon">
                  <img src="img/icon/brain.png" alt="" />
                </div>
                <p className="enter-email">
                  Please enter your email address.
                  <br />
                  Reset link will be sent to you.
                </p>
                <form onSubmit={this.handleSubmit} ref="signInForm">
                  <div className="input-group mb-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img src="img/icon/forgot_envlp.svg" alt="" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="forg_topassword"
                      placeholder="Your email"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary log-in-btn btn-block mt-5"
                  >
                    Reset password
                  </button>
                </form>
                {this.state.isLoading ? (
                  <div className="d-flex justify-content-center center-spinner">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                {this.state.isLoginError ? (
                  <div className="alert alert-info api-response-alert" role="alert">
                    <strong>Failed! </strong> {this.state.loginError}.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ForgotPassword;
