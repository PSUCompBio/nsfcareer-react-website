import React from 'react';
import { getStatusOfDarkmode } from '../../../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from '../.././Footer';

import {
  Link,
  Redirect
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';

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
            
        }
    }

 
  componentDidMount() {
    // API to get the details of user whose consent is being approves
    
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
                            placeholder="Enter your account email"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                      </div>
                       <button
                        type="submit"
                        className="btn btn-primary log-in-btn btn-block mt-5"
                      >
                        Submit
                      </button>
                    </form>
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
