import React from 'react';
// import { getStatusOfDarkmode } from '../../reducer';
// import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';

import {
  Link,
  // Redirect
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

// import axios from 'axios';
import grater_icon from "./grater_icon.png"

// let sigPad = {};
class ModelValidation extends React.Component {

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
                  <h1>Model Validation</h1>
                  <h4>(How we established trust in the brain model predictions)</h4>
                </Col>
                <Col sm={12} className="model-validation-subhead">
                  <p>Our validation strategy is based on three approaches and we continual look for new opportunities to verify and validate the brain simulations. To examine the predictive capability of the model, we evaluate the ability of the models to match pressure, relative displacements and strain.</p>
                </Col>
              </Row>
            </Container>
            {/*Body Section start here*/}
            <Container>
              <Row className="modael-validation-body">
                <h4>Pressure Response</h4>
                <Link to="/model-pressure-response">
                  <Col sm={12} className="modael-validation-box">
                    <Col sm={10} style={{'float':'left'}}>Intracranial pressure traces are compared with experimental results.</Col>
                    <Col sm={2} style={{'float':'left'}}><img src={grater_icon} alt="greater icon"/></Col>
                  </Col>
                </Link>
              </Row>
            </Container>
            <Container>
              <Row className="modael-validation-body">
                <h4>Brain Displacement Response</h4>
                <Link to="/model-displacement-response">
                  <Col sm={12} className="modael-validation-box">
                    <Col sm={10} style={{'float':'left'}}>Relative brain-skull motion is compared with experimental results.</Col>
                    <Col sm={2} style={{'float':'left'}}><img src={grater_icon} alt="greater icon"/></Col>
                  </Col>
                </Link>
              </Row>
            </Container>
            <Container>
              <Row className="modael-validation-body">
                <h4>Brain Strain Response</h4>
                <Link to="/model-strain-response">
                  <Col sm={12} className="modael-validation-box">
                    <Col sm={10} style={{'float':'left'}}>Intracranial strains are cimpared to live human Magnetic Resonance Image tagging.</Col>
                    <Col sm={2} style={{'float':'left'}}><img src={grater_icon} alt="greater icon"/></Col>
                  </Col>
                </Link>
              </Row>
            </Container>
            {/*Body Section end here*/}
          </div>
        </div>
        
        <Footer />
      </React.Fragment>
  );
}
}

export default ModelValidation;
