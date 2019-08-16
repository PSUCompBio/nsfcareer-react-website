import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert, MDBCard, MDBCardBody, MDBCardFooter } from 'mdbreact';
import LoginComponent from './LoginComponent';
import { Link } from 'react-router-dom';
import { formDataToJson } from '../../utilities/utility'
import { signUp } from '../../apis';
import "../../mixed_style.css";
import Footer from '../Footer';
import CountryCode from '../../config/CountryCode.json'
class SignUpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      toLogIn: false,
      isSignUpConfirmed: false,
      isSignUpConfirmed: false,
      isSignUpError: false,
      signUpError: "",
      isLoading: false,
      CountryCode: [CountryCode]
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      toLogIn: true
    });

  }
  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    this.setState({
      isSignUpError: false,
      isSignUpConfirmed: false,
      isLoading: true
    })
    // converting formData to JSON 
    const formJsonData = formDataToJson(formData)
    signUp(formJsonData).then((response) => {
      this.refs.signUpForm.reset();
      // Now update the state with data that we added
      if (response.data.message == "success") {
        // show alert
        this.setState({
          isSignUpError: false,
          isSignUpConfirmed: true,
          isLoading: false
        })
      }
      else {
        this.setState({
          isSignUpError: true,
          isSignUpConfirmed: false,
          isLoading: false,
          signUpError: response.data.error
        })
      }

    }).catch((err) => {
      e.target.reset();
      // catch error 
      console.log("error : ", err);

    })
  }
  render() {
    if (this.state.toLogIn) {
      return <LoginComponent></LoginComponent>
    }
    return (
      <div className="container-fluid pl-0 pr-0 overflow-hidden">
        <div className="row singup">
          <div className="col-md-6 col-lg-6 offset-md-3">
            <div className="card card-border">
              <div className="card-body">
                <div className="text-center brain-icon-container">
                  <table className="text-center brain-icon">
                    <tr>
                      <td><img src="img/icon/brain.png" alt="" /></td>
                    </tr>
                  </table>
                </div>
                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><img src="img/icon/user.svg" alt="" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="First name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><img src="img/icon/user.svg" alt="" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Last name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><img className="age" src="img/icon/age.svg" alt="" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Age" aria-label="age" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <select class="custom-select country-code" name="" id="">
                        {this.state.CountryCode.map(function (index) {
                          return (
                            index.countries.map(function (key, value) {
                              return <option value="">{key.code}</option>
                            }))
                        })}
                      </select>
                    </span>
                  </div>
                  <input type="text" className="form-control" placeholder="Contact number" aria-label="contact number" aria-describedby="basic-addon1" />
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className="input-group mb-5">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><img src="img/icon/user.svg" alt="" /></span>
                      </div>
                      <input type="text" className="form-control" placeholder="Last name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                  </div>
                  <div className="col">
                    <button type="button" className="btn float-right btn-primary">Verification code sent</button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <div className="input-group mb-5">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><img src="img/icon/lock.svg" alt="" /></span>
                      </div>
                      <input type="text" className="form-control" placeholder="Last name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                  </div>
                  <div className="col pl-3">
                    <button type="button" className="btn float-right btn-primary">Send again</button>
                    <button type="button" className="btn float-right mr-2 btn-primary">Verify</button>
                  </div>
                </div>
                <div className="form-row mb-3">
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              
                <div className="form-row">
                  <div className="col">
                    <input type="checkbox"/>
                  </div>
                </div>
                <div>
                  <a className="float-right forgot-pswd" >Forgot password?</a>
                </div>
                <button type="button" className="btn btn-primary log-in-btn btn-block mt-5">LOG IN</button>
                <div className="text-center">
                  <p className="mt-4">Don't have an account? <Link className="sign-up" to='SignUp' > Sign Up </Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default SignUpComponent;
