import React from 'react';
import { getStatusOfDarkmode } from '../../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';

import {
  Link,
  Redirect
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
import grater_icon from "./grater_icon.png"

let sigPad = {};
class ModelValidationDisplacementResponse extends React.Component {

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
        <div className="container-fluid pl-0 pr-0 overflow-hidden">
          <div style={{ padding : "4% 0% 5% 0%"}} className="row singup">
            <Container>
              <Row className="model-validation-head">
                <Col sm={12}>
                  <h1>Brain Displacement Response</h1>
                  <h4>Relative brain-skull motion is compared with experimental results.</h4>
                </Col>
              </Row>
            </Container>
            {/*Body Section start here*/}
          
            {/*Body Section end here*/}
          </div>
        </div>
        
        <Footer />
      </React.Fragment>
  );
}
}

export default ModelValidationDisplacementResponse;
