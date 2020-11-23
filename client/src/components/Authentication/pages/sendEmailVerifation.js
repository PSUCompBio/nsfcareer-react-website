import React from 'react';
import { getStatusOfDarkmode } from '../../../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from '../.././Footer';

import {
  Link,
  Redirect
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { reSendVerficationEmail } from '../../../apis';

let sigPad = {};
class sendEmailVerifation extends React.Component {

  constructor(props){
      super(props);
      let search = window.location.search;
      let params = new URLSearchParams(search);

      let token = params.get('key') ;
      if(!token){
          token = '';
      }
      this.state = {
          consent_token : token,
          user_name: ''
      }
  }

 
  componentDidMount() {
    // API to get the details of user whose consent is being approves
    
  }
  handleChange=(e)=>{
    this.setState({user_name: e.target.value})
  }

  handleSubmit =(e)=>{
    e.preventDefault();
    this.setState({
      isLoading: true,
    })
    reSendVerficationEmail({user_name:this.state.user_name})
    .then(res=>{
      console.log(res);
      if(res.data.message == "success"){
        this.setState({
          isLoading:false,
          error: false,
          message: res.data.message_details
        })
      }
      else if(res.data.message = "failure"){
        this.setState({
          isLoading:false,
          error: res.data.error,
          message: false
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  }


  render() {
    console.log("Props are - ", this.props);
    return (
      <React.Fragment> 
        <div className="container-fluid pl-0 pr-0 overflow-hidden bottom-margin">
          <div style={{ padding : "4% 0% 5% 0%"}} className="row singup">  
            {/*Body Section start here*/}
              <div className="col-md-6 mb-6  offset-md-3 p-3 animated fadeInRight">
                <div style={{ paddingLeft: "0% !important" }} ref="loginForm" style={{ margin: "3%" }} className="card card-border">
                  <div className="card-body">
                    <div ref="brainIcon" className="text-center brain-icon">
                      <img src="img/icon/brain.png" alt="" />
                    </div>
                      <form onSubmit={this.handleSubmit} ref="signInForm">
                        <div>
                          <h5 style={{'color': '#0e7bd2','margin-top': '13px'}}>Submit your account email to get new verfiation link.</h5>
                        </div>
                        {this.state.error ?  (
                        <div
                          className="alert alert-info api-response-alert"
                          role="alert"
                        >
                          <strong >Failed! </strong> {this.state.error}
                        </div> 
                      ) : null}
                      {this.state.message ? (
                        <div
                          className="alert alert-info api-response-alert-success"
                          role="alert"
                        >
                          <strong > Success !</strong> {this.state.message}
                        </div>
                      ) : null}
                        <div className="input-group mt-3 mb-5">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                              <img src="img/icon/user.svg" alt="" />
                            </span>
                          </div>
                          <input
                            type="email"
                            onChange={this.handleChange}
                            className="form-control"
                            name="user_name"
                            placeholder="Enter your account email"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            required
                          />
                      </div>
                       <button
                        type="submit"
                        className="btn btn-primary log-in-btn btn-block mt-5"
                      >
                        Submit
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
                  </div>
                </div>
              </div>
            {/*Body Section end here*/}
          </div>
        </div>
        
       <div style={{
            position: "absolute",
            width: "100%",
            bottom: '0'
          }}>
          <Footer />
        </div>
      </React.Fragment>
  );
}
}

export default sendEmailVerifation;
