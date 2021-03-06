import React from 'react';
// import { getStatusOfDarkmode } from '../../reducer';
// import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';

import {
  Link,
} from "react-router-dom";
import { Container, Row, Col ,Card} from 'react-bootstrap';

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
              <Row className="model-validation-head">
                <Col sm={6}>
                  <Link to='/Hardy-et-al'>
                    <Card>
                      <Card.Header>Validation<br/>Group 1</Card.Header>
                    </Card>
                  </Link>
                </Col>
                <Col sm={6}>
                  <Card>
                    <Card.Header>Validation<br/>Group 2</Card.Header>
                  </Card>
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

export default ModelValidationDisplacementResponse;
