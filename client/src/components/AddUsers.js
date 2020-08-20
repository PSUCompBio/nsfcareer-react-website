import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { svgToInline } from '../config/InlineSvgFromImg';
import CountryCode from '../config/CountryCode.json';
import DarkMode from './DarkMode';
import Footer from './Footer';
import 'jquery';
import './Buttons/Buttons.css';
import './Dashboard/Dashboard.css';

import {
  getUserDBDetails,
  isAuthenticated,
  VerifyVerificationCode
} from '../apis';

// import { Form } from 'react-bootstrap';
import { UncontrolledAlert,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Col,
    Row
} from 'reactstrap';




import "react-responsive-carousel/lib/styles/carousel.min.css";

import Spinner from './Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../reducer';


class numberVerification extends React.Component {
  constructor(props) {
    super(props);
    // console.log('User Dashboard For Admin Is ',this.props);
    console.log("USER DASHBOARD PROPS", this.props)
    this.state = {
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,
      linearUnit: 'gs',
      linearUnitGsActive: true,
      linearUnitMsActive: false,
      cumulativeEventData: {},
      isLoading: false,
      isFetching: false,
      message: false,
      numberVerificationCode: '',
      isRedirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e) =>{
    const name = e.target.name;
    console.log(e.target.value)
    if(name == 'numberVerificationCode'){
       var value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
       if(value.length < 7){
         this.setState({'numberVerificationCode': [value]});
        }
    }
  }
 
  handleSubmit(e) {
      console.log('Update user details clicked');
      e.preventDefault();
      this.setState({isLoading: true})
      VerifyVerificationCode({user_cognito_id:this.props.location.state.data.user_cognito_id, numberVerificationCode:this.state.numberVerificationCode})
      .then(res=>{
          console.log('res',res);
          if(res.data.message == 'success'){
            this.setState({
              isLoading: false,
              message: 'Number Verification completed successfully.'
            });
            var the = this;
            setTimeout(function(){
              the.setState({isRedirect: true})
            },2000)
          }else{
            this.setState({
              isLoading: false,
              isLoginError: true,
              loginError: res.data.error
            })
          }
      }).catch(err => {
        console.log('err',err)
        this.setState({
          isLoading: false,
          isLoginError: true,
          loginError: 'Somthing went wrong! Please try later.'
        })
      })

  }
  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };


 
  render() {
    const isLoaded = this.state.user;
    console.log('this',this.props)

    if (!this.state.isAuthenticated && !this.state.isCheckingAuth && !this.props.location.state.data) {
      return <Redirect to="/Login" />;
    }
    if (!isLoaded) return <Spinner />;

    if(this.state.isRedirect) {
      return   <Redirect to={'/Profile?id='+this.props.location.state.data.user_cognito_id}/>
    }

    if (this.state.isFetching) {
          return <Spinner />;
      }
    return (
      <React.Fragment>
        <div className="center-scroll-up-mobile">
          <ScrollToTop

            showUnder={120}
            style={{
              zIndex: "99"
            }}
          >
            <div

              className=" d-flex align-items-center justify-content-center "
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#0f81dc",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.14)",
                alignItems: "center !important"

              }}
            >
              <img src="/img/icon/arrowUp.svg" alt="" />
            </div>
            <div
              style={{

                color: "#0f81dc",
                backgroundColor: "transparent",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <p className="hide-widget-in-mobile">Back to top</p>
            </div>


          </ScrollToTop>
        </div>

        <div className="container pl-5 pr-5 profile-mt animated zoomIn mb-5 pb-2" style={{'margin-top': '10%'}}>

            <div class="section-title animated zoomIn profile-section-title" style={{'align-content': 'center', 'text-align': 'center'}}>
              <h1 class="font-weight-bold">Number Verification</h1>
            </div>
            <div className="row profile-container" style={{'border': '2px solid rgb(15, 129, 220)', 'border-radius': '1.8rem'}}>
              <div className="col-md-10 ml-4 mt-2 pt-2 ">
               <div className="backbutton" style={{'position': 'inherit','margin-top': '11px','width': '158px'}}>
              <Link 
                to={'/Profile?id='+this.props.location.state.data.user_cognito_id}
              >&lt; Back To Profile
              </Link>
            </div>
                <p class="player-dashboard-sub-head" style={{'padding-left':'0px'}}>Enter Your Verification Code</p>
                <Form className="mt-2" onSubmit={this.handleSubmit}>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Code</Label>
                    <Col sm={8}>
                      <div className="input-group">
                        <input  name="numberVerificationCode" id="numberVerificationCode" placeholder="------" type="text" className="profile-input form-control" style={{'letter-spacing': '20px','text-align': 'center'}} value={this.state.numberVerificationCode} onChange={this.handleInputChange} required/>
                      </div>
                    </Col>
                  </FormGroup>
                  <div style={{'margin-bottom': '24px'}}>
                    <button class="btn btn-primary">Complete Verification</button>
                    
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
                  {this.state.message ? (
                      <div
                          className="alert alert-success"
                          style={{'margin-top': '8px'}}
                          role="alert">
                          <strong > Success !</strong> {this.state.message}
                          </div>
                      ) : null}
                      {this.state.isLoginError ? (
                          <div
                              className="alert alert-info api-response-alert"
                              role="alert"
                              >
                              <strong >Failed! </strong> {this.state.loginError}
                              </div>
                          ) : null}
                  </div>
                </Form>

              </div>
            </div>

        </div>
        <Footer />
      </React.Fragment>
    );
  }
  componentDidMount() {
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        
          if (value.data.message === 'success') {
            getUserDBDetails()
              .then((response) => {
                  this.setState({
                      user: true,
                      userDetails: response.data.data,
                       isAuthenticated: true,
                        isCheckingAuth: false
                  })
              }).catch((error) => {
                  this.setState({
                      userDetails: {},
                      isCheckingAuth: false
                  });
              });
          }
          else {
             this.setState({
                userDetails: {},
                isCheckingAuth: false
            });
          }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
  }
}

export default numberVerification;
