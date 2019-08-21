import React from 'react';
import LoginComponent from './LoginComponent';
import { Link } from 'react-router-dom';
import { formDataToJson } from '../../utilities/utility'
import { signUp } from '../../apis';
import "../../mixed_style.css";
import Footer from '../Footer';
import CountryCode from '../../config/CountryCode.json';

class SignUpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      toLogIn: false,
      isSignUpConfirmed: false,
      isSignUpError: false,
      signUpError: "",
      isLoading: false,
      CountryCode: [CountryCode],
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
      if (response.data.message === "success") {
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
                  <div className="text-center brain-icon">
                    <img src="img/icon/brain.png" alt="" />
                  </div>
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
                    <span className="input-group-text country-code-container" id="basic-addon1">

                      <select className="custom-select country-code" name="" id="">
                        {this.state.CountryCode.map(function (index) {
                          let i = 0;
                          return (
                            index.countries.map(function (key, value) {
                              if (key.code === '+91')
                                return <option key={i++ } defaultValue value="">{key.code}</option>
                              else 
                                return <option key={i++ } value="">{key.code}</option>
                            }))
                        })}
                      </select>
                    </span>

                  </div>
                  <input type="text" className="form-control contact-number" placeholder="Contact number" aria-label="contact number" aria-describedby="basic-addon1" />
                </div>
                <div className="form-row">
                  <div className="col-7">
                    <div className="input-group mb-5">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><img src="img/icon/envelop.svg" alt="" /></span>
                      </div>
                      <input type="text" className="form-control" placeholder="XYZ@nsf.com" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                  </div>
                  <div className="col-5">
                    <button type="button" className="btn float-right sign-up-btn verification-btn-bg btn-primary">Send verification code</button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-7">
                    <div className="input-group mb-5">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><img src="img/icon/lock.svg" alt="" /></span>
                      </div>
                      <input type="text" className="form-control" placeholder="Verification code" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                  </div>
                  <div className="col-5 pl-3">
                    <button type="button" className="btn float-right send-again-btn sign-up-btn btn-primary">Send again</button>
                    <button type="button" className="btn float-right  sign-up-btn mr-2 btn-primary">Verify</button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1"><img src="img/icon/gender.svg" alt="" /></span>
                    </div>
                    <select type="text" className="custom-select select-gender" aria-label="age" aria-describedby="basic-addon1" >
                      <option defaultValue>Select your sex</option>
                      <option value="male"> Male</option>
                      <option value="male"> Female</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col pl-0">
                    <input id="checkbox-1" className="checkbox-custom" name="checkbox-3" type="checkbox" />
                    <label htmlFor="checkbox-1" className="checkbox-custom-label">I agree to the <a className="sign-up">Terms and conditions</a> </label>
                  </div>
                </div>

                <button type="button" className="btn btn-primary sign-up-btn btn-block mt-5">Register</button>
                <div className="text-center">
                  <p className="mt-4 already-account">Already have an account? <Link className="sign-up" to='Login' > Log in </Link></p>
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
