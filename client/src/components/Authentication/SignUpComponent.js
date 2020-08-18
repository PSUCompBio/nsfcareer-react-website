import React from 'react';
import LoginComponent from './LoginComponent';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { formDataToJson } from '../../utilities/utility';
import { signUp,singUpWithToken, getUserDBDetails, getUserTokenDBDetails } from '../../apis';
import { useParams } from "react-router";
import '../../mixed_style.css';
import Footer from '../Footer';
import CountryCode from '../../config/CountryCode.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';
import { getStatusOfDarkmode } from '../../reducer';
import Spinner from '../Spinner/Spinner';
import DarkMode from '../DarkMode';
import moment from 'moment';


class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toLogIn: false,
      isSignUpConfirmed: false,
      isSignUpError: false,
      signUpError: '',
      isLoading: false,
      CountryCode: [CountryCode],
      selectedCountryCode: '+1',
      slectedCountryName: 'USA',
      startDate: '',
      signupOrElse: { email: '', sex: '' },
      userType : "StandardUser",
      selectedAge: null,
      singupWithToken: false,
      isFetching: false,
      first_name: '',
      last_name: '',
      Invaliduser: false,
      email: '',
      level: '',
      sensor:'',
      team: '',
      organization:'',
      baseUrl: window.location.origin.toString()
    };
    if(this.props.location.state && this.props.location.state.message ) {
      this.state.message = this.props.location.state.message;
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuardianEmailChange = this.handleGuardianEmailChange.bind(this);
    this.handleSubmitTokenForm = this.handleSubmitTokenForm.bind(this);
    this.usernameEmail = React.createRef();
    this.guardianEmail = React.createRef();
  }

  handleGuardianEmailChange(e){
      console.log("Vioolent");
      if (this.usernameEmail.current.value == this.guardianEmail.current.value) {
          alert("Guardian/Parent Email can't be same as your personal email.")
          this.guardianEmail.current.value = "";

      } 
  }

  handleClick() {
    this.setState({
      toLogIn: true
    });
  }

  componentDidMount() {
      // Scrolling the screen to top
      window.scrollTo(0, 0)

    if (this.props.location.pathname === '/SignUp') {
      this.setState({
        signupOrElse: { email: 'XYZ@something.com', sex: 'Select your sex' }
      });
    } else if (this.props.location.pathname === '/SignUpElse') {
      this.setState({
        signupOrElse: {
          email: 'Contact email for this individual',
          sex: "Select the individual's sex"
      },
      userType : "Admin"
      });
    }else{
      var user_cognito_id = this.props.match.params.token;
     this.setState({
        signupOrElse: { email: 'XYZ@something.com', sex: 'Select your sex' },
        singupWithToken: true,
        isFetching: true,
        user_cognito_id: user_cognito_id
      });
     
      getUserTokenDBDetails({InviteToken:user_cognito_id}).then((response) => {
        console.log('response',response);
        if(response.data.data){
          var data = response.data.data;
          this.setState({
            isFetching: false,
            first_name: data.first_name, 
            last_name: data.last_name,
            email: data.email,
            level:data.level,
            sensor: data.sensor,
            organization: data.organization,
            team: data.team ? data.team : '' 
          });
        }else{
          this.setState({isFetching: false,Invaliduser: true})
        }
      }).catch((err) => {
        this.setState({isFetching: false});
        console.log('err',err)
      })
    }
  }

  handeChange = (e) => {
    const eventValue = e.target.value.split(' ');
    this.setState({
      selectedCountryCode: eventValue[0],
      slectedCountryName: eventValue[1]
    });
  };
   handleInputChange = (e) =>{
    const name = e.target.name;
    console.log(e.target.value)
    if(name == 'phone_number'){
       var value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
       if(value.length < 11){
         this.setState({[name]: [value]});
        }
    }else{
      this.setState({[name]: [e.target.value]});
    }
  }
  handleDateChange = (date) => {
      console.log("Received date is ", date, "Actual date is", this.state.startDate);
      const startDate = moment(date);
      const timeEnd =moment();
      const diff = timeEnd.diff(startDate);
      const diffDuration = moment.duration(diff);
      const year =diffDuration.years();
      console.log(year, timeEnd, diff)
      this.setState({
        startDate: date,
        selectedAge : year
      });
    console.log("Changed value is ", this.state.startDate);
  };

  getCountryName = (e) => {};
  handleSubmitTokenForm =( e ) =>{
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(formData);
      const formJsonData = formDataToJson(formData);
      console.log(formJsonData);
         this.props.history.push({
          pathname : '/IRB',
          state : { formData : formJsonData }
      });
  }
  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    this.setState({
      isSignUpError: false,
      isSignUpConfirmed: false,
      isLoading: true,
      isSignUpInProgress : true
    });
    // converting formData to JSON
    const formJsonData = formDataToJson(formData);
    console.log(formJsonData);
    // signUp(formJsonData)
    //   .then((response) => {
    //     this.refs.signUpForm.reset();
    //     // Now update the state with data that we added
    //     if (response.data.message === 'success') {
    //       // show alert
    //       this.setState({
    //         isSignUpError: false,
    //         isSignUpConfirmed: true,
    //         isLoading: false
    //       });
    //     } else {
    //       this.setState({
    //         isSignUpError: true,
    //         isSignUpConfirmed: false,
    //         isLoading: false,
    //         signUpError: response.data.error
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     e.target.reset();
    //     // catch error
    //     console.log('error : ', err);
    //   });

    // Redirect User to IRB form
    this.props.history.push({
        pathname : '/IRB',
        state : { formData : formJsonData }
    });

  }

  forJsx = (imgSrc, placeholder, name) => {
    return (
      <div className="input-group mb-5">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <img src={imgSrc} alt="" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          name={name}
          aria-label={name}
          aria-describedby="basic-addon1"
          required
        />
      </div>
    );
  };
  forJsx2 = (imgSrc, placeholder, name,value) => {
    return (
      <div className="input-group mb-5">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <img src={imgSrc} alt="" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          name={name}
          value={value}
          aria-label={name}
          aria-describedby="basic-addon1"
          required
        />
      </div>
    );
  };

  forJsxRole = (imgSrc) => {
    return (
      <div className="input-group mb-5">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <img src={imgSrc} alt="" />
          </span>
        </div>
        <select
          type="text"
          name="role"
          className="custom-select select-gender"
          aria-label="role"

        >
          <option defaultValue>Select your Role</option>
          <option value="staff"> Staff</option>
          <option value="administrator"> Administrator</option>
          <option value="coach"> Coach</option>
          <option value="militiary_unit_leader"> Militiary Unit Leader</option>
        </select>
      </div>
    );
  };

  getForm = () => {
    return (
      <form className="mt-5" onSubmit={this.handleSubmit} ref="signUpForm">
        {this.forJsx('img/icon/user.svg', 'First name', 'first_name')}
        {this.forJsx('img/icon/user.svg', 'Last name', 'last_name')}
        {(this.props.location.pathname === '/SignUpElse')? this.forJsx('img/icon/user.svg', 'Organization', 'organization'): null}
        {(this.props.location.pathname === '/SignUpElse')? this.forJsxRole('img/icon/arrowDown.svg'): null}

        <div className="input-group mb-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <img className="age" src="img/icon/age.svg" alt="" />
            </span>
          </div>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="form-control"
            name="dob"
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            maxDate={subYears(new Date(), 10)}
            placeholderText="Birthdate"
            
          />
        </div>
        <div className="input-group mb-5">
          <div className="input-group-prepend">
            <span
              className="input-group-text country-code-container"
              id="basic-addon1"
            >
              <select
                className="custom-select country-code"
                defaultValue={this.state.selectedCountryCode}
                onChange={this.handeChange}
                name="country_code"
                id=""
                required
              >
                {this.state.CountryCode.map(function(index) {
                  return index.countries.map(function(key, value) {
                    if (key.code === '+1')
                      return (
                        <option key={value} defaultValue={key.code + ' USA'}>
                          {key.code}
                        </option>
                      );
                    else
                      return (
                        <option key={value} value={key.code + ' ' + key.name}>
                          {key.code}
                        </option>
                      );
                  });
                })}
              </select>
            </span>

            <span className="input-group-text" id="basic-addon1">
              <span className="country-name">
                {this.state.slectedCountryName}
              </span>
            </span>
          </div>
          <input
            type="text"
            className="form-control contact-number"
            placeholder="1111111111"
            name="phone_number"
            value={this.state.phone_number} 
            onChange={this.handleInputChange}
            aria-label="contact number"
            aria-describedby="basic-addon1"
            required
          />
        </div>
        <div className="form-row">
          <div className="input-group mb-5">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src="img/icon/envelop.svg" alt="" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={this.state.signupOrElse.email}
              name="user_name"
              required
              aria-label="Username"
              aria-describedby="basic-addon1"
              ref={this.usernameEmail}
              
            />
          </div>
        </div>

        {this.props.location.pathname === '/SignUp' ?
            (this.state.selectedAge != null && this.state.selectedAge < 18) ?

                <div className="form-row">
                  <div className="input-group mb-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img src="img/icon/envelop.svg" alt="" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Parent/Guardian mail ID"
                      name="guardian_mail"
                      aria-label="Parent/Guardian Mail"
                      aria-describedby="basic-addon1"
                      ref={this.guardianEmail}
                      onChange={this.handleGuardianEmailChange}
                    />
                  </div>
                </div>
                : null
            : null
        }

        <div className="form-row">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src="img/icon/gender.svg" alt="" />
              </span>
            </div>
            <input type="hidden" name="user_type" defaultValue={this.state.userType} />
            <select
              type="text"
              name="gender"
              className="custom-select select-gender"
              aria-label="age"
              aria-describedby="basic-addon1"
              required
            >
              <option defaultValue>{this.state.signupOrElse.sex}</option>
              <option value="male"> Male</option>
              <option value="female"> Female</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary sign-up-btn btn-block mt-5"
        >
          Register
        </button>
      </form>
    );
  };
  getTokenSignupForm = () => {
    return (
      <form className="mt-5" onSubmit={this.handleSubmitTokenForm} ref="signUpForm">
        {this.forJsx2(this.state.baseUrl+'/'+'img/icon/user.svg', 'First name', 'first_name',this.state.first_name)}
        {this.forJsx2(this.state.baseUrl+'/'+'img/icon/user.svg', 'Last name', 'last_name',this.state.last_name)}
        {(this.props.location.pathname === '/SignUpElse')? this.forJsx('img/icon/user.svg', 'Organization', 'organization'): null}
        {(this.props.location.pathname === '/SignUpElse')? this.forJsxRole('img/icon/arrowDown.svg'): null}

        <div className="input-group mb-5">
          <input type="hidden" name="InviteToken" id="InviteToken" value={this.state.user_cognito_id} />
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <img className="age" src={this.state.baseUrl+'/'+"img/icon/age.svg"} alt="" />
            </span>
          </div>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="form-control"
            name="dob"
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            maxDate={subYears(new Date(), 10)}
            placeholderText="Birthdate"
          />
        </div>
        <input type="hidden" name="level" id="level" value={this.state.level}/>
        <input type="hidden" name="sensor" id="sensor" value={this.state.sensor}/>
        <input type="hidden" name="organization" id="organization" value={this.state.organization}/>
        <input type="hidden" name="team" id="team" value={this.state.team}/>



        <div className="input-group mb-5">
          <div className="input-group-prepend">
            <span
              className="input-group-text country-code-container"
              id="basic-addon1"
            >
              <select
                className="custom-select country-code"
                defaultValue={this.state.selectedCountryCode}
                onChange={this.handeChange}
                name="country_code"
                id=""
              >
                {this.state.CountryCode.map(function(index) {
                  return index.countries.map(function(key, value) {
                    if (key.code === '+1')
                      return (
                        <option key={value} defaultValue={key.code + ' USA'}>
                          {key.code}
                        </option>
                      );
                    else
                      return (
                        <option key={value} value={key.code + ' ' + key.name}>
                          {key.code}
                        </option>
                      );
                  });
                })}
              </select>
            </span>

            <span className="input-group-text" id="basic-addon1">
              <span className="country-name">
                {this.state.slectedCountryName}
              </span>
            </span>
          </div>
          <input
            type="text"
            className="form-control contact-number"
            placeholder="Contact number"
            name="phone_number"
            aria-label="contact number"
            required
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="form-row">
          <div className="input-group mb-5">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src={this.state.baseUrl+'/'+"img/icon/envelop.svg"} alt="" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={this.state.signupOrElse.email}
              name="user_name"
              value={this.state.email}
              required
              aria-label="Username"
              aria-describedby="basic-addon1"
              ref={this.usernameEmail}
            />
          </div>
        </div>

        {this.props.location.pathname === '/SignUp' ?
            (this.state.selectedAge != null && this.state.selectedAge < 18) ?

                <div className="form-row">
                  <div className="input-group mb-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={this.state.baseUrl+'/'+"img/icon/envelop.svg"} alt="" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Parent/Guardian mail ID"
                      name="guardian_mail"
                      aria-label="Parent/Guardian Mail"
                      aria-describedby="basic-addon1"
                      ref={this.guardianEmail}
                      onChange={this.handleGuardianEmailChange}
                    />
                  </div>
                </div>
                : null
            : null
        }

        <div className="form-row">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src={this.state.baseUrl+'/'+"img/icon/gender.svg"} alt="" />
              </span>
            </div>
            <input type="hidden" name="user_type" defaultValue={this.state.userType} />
            <select
              type="text"
              name="gender"
              className="custom-select select-gender"
              aria-label="age"
              aria-describedby="basic-addon1"
              required
            >
              <option defaultValue>{this.state.signupOrElse.sex}</option>
              <option value="male"> Male</option>
              <option value="female"> Female</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary sign-up-btn btn-block mt-5"
        >
          Register
        </button>
      </form>
    );
  };
  render() {

    if(this.state.isSignUpInProgress) {
      return <Spinner/>
    }
    if(this.state.isSignUpConfirmed){
        return <Redirect to="/IRB" />
    }
    if (this.state.toLogIn) {
      return <LoginComponent></LoginComponent>;
    }
    if (this.state.isFetching) {
          return <Spinner />;
      }
    return (
        <React.Fragment>
          <div className="dynamic__height">
      <div className="container-fluid pl-0 pr-0 overflow-hidden">
        <div style={{ padding : "4% 0% 5% 0%"}} className="row singup">
            <div className="col-md-6 col-lg-6 offset-md-3 mb-5">
              <div className="text-center">
                <p style={{  fontSize: "20px",
                  fontWeight: "900"}} className="top-heading__login animated fadeInUp">
                 Thanks for your interest.
                 In order to obtain an account, you must agree to our terms,
                 policies and complete the Penn State University Institutional
                 Review Board (IRB) consent form.
                 This will be explained during the signup process.
                 If you do not want to create an account, you can see demos
                 {' '}
                 <Link to="Details" className="underline">
                   here
                 </Link>
                </p>
              </div>
            </div>
          <div className="col-md-6 col-lg-6 offset-md-3">
            <div style={{marginLeft : "3%", marginRight : "3%"}}className="card card-border">
              <div className="card-body">
              {this.state.message ? (
                <div
                  className="alert alert-info api-response-alert"
                  role="alert"
                >
                  <strong > Failure !</strong> {this.state.message}.
                </div>
              ) : this.state.Invaliduser ? 

              (
                <div
                  className="alert alert-info api-response-alert"
                  role="alert"
                >
                  <strong > Invalid Token !</strong> {this.state.message}.
                </div>
              )
               : null}
                <div className="text-center brain-icon">
                  <img src={this.state.baseUrl+'/'+"img/icon/brain.png"} alt="" />
                </div>
                {this.state.singupWithToken ? this.state.Invaliduser ? '' : this.getTokenSignupForm() :  this.getForm()}
                {this.state.isLoading ? (
                  <div className="d-flex justify-content-center center-spinner">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                {this.state.isSignUpConfirmed ? (
                  <div
                    className="alert alert-info api-response-alert-success"
                    role="alert"
                  >
                    <strong>Account created Successfully! </strong> Check your
                    mail for temporary password .
                  </div>
                ) : null}
                {this.state.isSignUpError ? (
                  <div
                    className="alert alert-info api-response-alert"
                    role="alert"
                  >
                    <strong>Failed! </strong> {this.state.signUpError}.
                  </div>
                ) : null}
                <div className="text-center">
                  <p className="mt-4 already-account">
                    Already have an account?{' '}
                    <Link className="sign-up" to="Login">
                      {' '}
                      Log in{' '}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="footer-mobile-fix" >
          {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}
          <Footer/>
  </div>
  </div>
</React.Fragment>

    );
  }
}

export default withRouter(SignUpComponent);
