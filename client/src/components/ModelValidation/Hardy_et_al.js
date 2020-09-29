import React from 'react';
import { getStatusOfDarkmode } from '../../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';

import {
  Link,
  Redirect
} from "react-router-dom";
import { Container, Row, Col , Card, Button} from 'react-bootstrap';

import axios from 'axios';
import grater_icon from "./grater_icon.png"

let sigPad = {};
class Hardy_et_al extends React.Component {

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
            <Container>
              <Row className="model-validation-head">
                <Col sm={12}>
                  <h1>Brain Displacement Response</h1>
                  <h4>Relative brain-skull motion is compared with experimental results.</h4>
                </Col>
              </Row>
            </Container>
            {/*Body Section start here*/}
            <Container>
              <Row>
                <Col className="Hardy_et_al-header">
                  <p>
                    This validation data is from: Hardy, W.N., Mason, M.J., Foster, C.D., Kopacz, J.M., Yang, K.H., King, A.I., Bishop, J., Bey, M., Anderst, W. and Tashman, S., 2007. A study of the response of the human cadaver head to impact. <i>Stapp car crash jourmal, 51, p.17.</i>
                  </p>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm={12} className="text-center mt-4">
                  <h1>Validation Cases</h1>
                </Col>
               
              </Row>
              <Row  className=" mt-4">
                <Col sm={3}>
                  <p><b>Cora</b> (CORrelation and Analysis) <b>Biofidelic Scale:</b></p>
                </Col>
                <Col sm={9}>
                  <Button variant="danger">Unacceptable</Button>
                  <Button variant="warning">Marginal</Button>
                  <Button variant="warning">Fair</Button>
                  <Button variant="success">Good</Button>
                  <Button variant="success">Excellent</Button>
                </Col>
              </Row>
            </Container>
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

export default Hardy_et_al;
