import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Footer from '../Footer';
import { formDataToJson } from '../../utilities/utility';
import { logIn, logInFirstTime } from '../../apis';
import { connect } from 'react-redux';
import store from '../../Store';
import '../../mixed_style.css';
import { getStatusOfDarkmode } from '../../reducer';
import { setIsSignedInSucceeded, userDetails } from '../../Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
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

  componentWillReceiveProps(nextProps) {
    this.setState({ isSignInSuccessed: nextProps.signedIn });
  }

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
      this.refs.loginForm.style.background = "rgb(35, 40, 56)";
      this.refs.dashboardView.src = "/img/icon/dashboardViewDark.png";
      this.refs.brainIcon.style.border = "5px solid rgb(23, 27, 37)";
      for (let i = 1; i <= 2; i++){
        this.refs[`p${i}`].style.color = "#fff";
      }
    }
  }

  handleSubmit(e) {
    console.log('SIGNIN IN CLICKED');
    e.preventDefault();
    e.persist();
    //temporary setting authentication to change nav bar tabs

    console.log('LOGIN API CALLED');
    const formData = new FormData(e.target);
    this.setState({
      isLoginError: false,
      isLoading: true
    });
    // converting formData to JSON
    const formJsonData = formDataToJson(formData);
    console.log(formJsonData)
    if (this.state.tempPasswordRequired) {
      // call API of first Time Login with Temporary Password
      logInFirstTime(formJsonData)
        .then((response) => {
          if (response.data.message === 'success') {
            this.setState({
              isLoading: false,
              isSignInSuccessed: true
            });
            this.props.isAuthenticated(true);
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
              store.dispatch(setIsSignedInSucceeded());
              store.dispatch(userDetails(response.data.user_type));
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
    console.log(JSON.parse(localStorage.getItem('state')));
    return (
      <React.Fragment>
        <div className="dynamic__height">
          <div className="container  pl-0 pr-0 login-height overflow-hidden">
            {this.state.isSignInSuccessed ? <Redirect to="/dashboard" /> : null}
            <div style={{marginTop: "5vh", marginBottom: "2vh"}} className="row login">
              <div className="col-md-12  mb-5">
                <div className="text-center">
                  <p style={{  fontSize: "20px",
                    fontWeight: "900"}} className="top-heading__login animated fadeInUp">
                    The Dashboard gives users and administrators a cumulative
                    overview, as well as an in-depth analysis on each head
                    acceleration event.
                  </p>
                </div>
              </div>

              {/*<div className="col-md-6 mb-5 p-3 animated fadeInLeft">
                <div id="dashboard-view" className="text-right dashboard-mock">
                  <div className="text-center dashboard-example">
                    Dashboard Example
                  </div>
                  <img ref="dashboardView"
                    className="img-fluid"
                    src="/img/dashboardMock.png"
                    alt=""
                  />
                </div>
              </div>
              // Default div for Sign In section
              <div className="col-md-6 mb-5 p-3 animated fadeInRight">
              */
          }
              <div className="col-md-6 mb-6  offset-md-3 p-3 animated fadeInRight">
                <div style={{paddingLeft : "0% !important"}}ref="loginForm" style={{margin: "3%"}} className="card card-border">
                  <div className="card-body">
                    <div ref="brainIcon" className="text-center brain-icon">
                      <img src="img/icon/brain.png" alt="" />
                    </div>

                    <form onSubmit={this.handleSubmit} ref="signInForm">
                      <div className="input-group mt-3 mb-5">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <img src="img/icon/user.svg" alt="" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="user_name"
                          placeholder="E-mail"
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
                        <div style={{marginTop : "2rem"}} className="input-group mb-1">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
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
                          <span  className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : null}
                    {this.state.isLoginError ? (
                      <div
                        className="alert alert-info api-response-alert"
                        role="alert"
                      >
                        <strong >Failed! </strong> {this.state.loginError}.
                      </div>
                    ) : null}
                    <div className="text-center">
                      <p ref="p1" className="mt-4 sign-up-link">
                        Don't have an account?{' '}
                        <Link className="sign-up" to="SignUp">
                          {' '}
                          Sign Up{' '}
                        </Link>
                      </p>
                    </div>

                    <div className="option-or">
                      <div className="or-img text-center">
                        <img src="/img/icon/or.png" className="" alt="" />
                      </div>
                      <div className="text-center">
                        <p ref="p2" className="sign-up-link">
                          Are you an administrator including coach, parent,
                          trainer, or military unit leader? <br />
                          <Link className="sign-up" to="SignUpElse">
                            {' '}
                            Sign Up for Someone Else.
                          </Link>{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    // dispatching actions
    signedIn: state.isSignedInSuccess
  };
}

export default connect(mapStateToProps)(withRouter(Login));
