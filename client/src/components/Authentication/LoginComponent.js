import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Index from '../../index';
import Footer from '../Footer';

import { formDataToJson } from '../../utilities/utility';
import { logIn, logInFirstTime } from '../../apis';

import '../../mixed_style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('PROP SRECIVED', props);
    this.state = {
      tempPasswordRequired: false,
      isLoginError: false,
      loginErrorCode: '',
      isLoading: false,
      isSignInSuccessed: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isAdminType = (userType) => {
    if (userType === 'Admin') {
      return true;
    } else {
      return false;
    }
  };

  // componentWillUpdate() {}
  // hideDashboardView = () => {
  //   document.getElementById('dashboard-view').style.display = 'none';
  //   document.getElementById('make-full-width').style.display = 'none';
  // };

  handleSubmit(e) {
    console.log('SIGNIN IN CLICKED');
    e.preventDefault();
    e.persist();
    //temporary setting authentication to change nav bar tabs
    this.props.isAuthenticated(true);
    console.log('LOGIN API CALLED');
    const formData = new FormData(e.target);
    this.setState({
      isLoginError: false,
      isLoading: true
    });
    // converting formData to JSON
    const formJsonData = formDataToJson(formData);
    if (this.state.tempPasswordRequired) {
      // call API of first Time Login with Temporary Password
      logInFirstTime(formJsonData)
        .then((response) => {
          if (response.data.message === 'success') {
            this.setState({
              isLoading: false,
              isSignInSuccessed: true
            });
            // login user
            // ReactDOM.render(
            //
            //   <Router>
            //
            //     <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)} />
            //   </Router>
            //   ,
            //   document.getElementById('root')
            // );
          } else {
            // show error
            this.setState({
              loginError: response.data.error,
              isLoginError: true,
              isLoading: false
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      logIn(formJsonData)
        .then((response) => {
          // this.refs.signInForm.reset();
          console.log('Login ', response);
          if (response.data.message === 'success') {
            if (response.data.status === 'FORCE_CHANGE_PASSWORD') {
              this.setState({
                tempPasswordRequired: true,
                isLoading: false
              });
            } else {
              // login redirect code here
              this.setState({
                isLoading: false,
                isSignInSuccessed: true
              });

              // ReactDOM.render(
              //   <Router>
              //     <Index isAuthenticated={true} isAdmin={this.isAdminType(response.data.user_type)} />
              //   </Router>
              //   ,
              //   document.getElementById('root')
              // );
            }
          } else {
            this.setState({
              isLoginError: true,
              isLoading: false,
              loginError: response.data.error
            });
          }

          // Now update the state with data that we added
        })
        .catch((err) => {
          e.target.reset();
          // catch error
          console.log('error : ', err);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          // onClick={this.hideDashboardView}
          className="container pl-0 pr-0 overflow-hidden"
        >
          {this.state.isSignInSuccessed ? <Redirect to="/Profile" /> : null}
          <div className="row login">
            <div className="col-md-6 mb-5 ">
              <div className="card card-border">
                <div className="card-body">
                  <div className="text-center brain-icon">
                    <img src="img/icon/brain.png" alt="" />
                  </div>

                  <form onSubmit={this.handleSubmit} ref="signInForm">
                    <div className="input-group mb-5">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <img src="img/icon/user.svg" alt="" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="user_name"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <img src="img/icon/lock.svg" alt="" />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    {this.state.tempPasswordRequired ? (
                      <div className="input-group mb-1">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <img src="img/icon/lock.svg" alt="" />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          name="new_password"
                          placeholder="New Password (Min. 8 digit password)"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    ) : null}

                    <div>
                      <Link
                        to="/Forgot-Password"
                        className="float-right forgot-pswd"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary log-in-btn btn-block mt-5"
                    >
                      LOG IN
                    </button>
                  </form>
                  {this.state.isLoading ? (
                    <div className="d-flex justify-content-center center-spinner">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}
                  {this.state.isLoginError ? (
                    <div
                      class="alert alert-info api-response-alert"
                      role="alert"
                    >
                      <strong>Failed! </strong> {this.state.loginError}.
                    </div>
                  ) : null}
                  <div className="text-center">
                    <p className="mt-4 sign-up-link">
                      Don't have an account?{' '}
                      <Link className="sign-up" to="SignUp">
                        {' '}
                        Sign Up{' '}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-5">
              <div id="dashboard-view" className="text-right dashboard-mock">
                <img
                  className="img-fluid"
                  src="/img/dashboardMock.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
