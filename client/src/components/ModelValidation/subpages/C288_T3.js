import React from 'react';
import SignatureCanvas from 'react-signature-canvas'
import C288_T3_chart from '../charts/C288_T3_chart'

import {
  Link,
  Redirect
} from "react-router-dom";
import { Container, Row, Col , Card, Button} from 'react-bootstrap';

import axios from 'axios';

let sigPad = {};
class C288_T3 extends React.Component {
  constructor(props){
      super(props);
    
      this.state = {
      }
  }
 
  
  componentDidMount() {
    // API to get the details of user whose consent is being approves

  }
  


  render() {
    console.log("Props are - ", this.props);
    return (
      <React.Fragment> 
        <Container>
          <Row>
            <Col sm={12} className="text-center mt-4">
              <h1>C288-T3</h1>
            </Col>
           
          </Row>
          <Row  className=" mt-4">
            <Col sm={3}>
              <p><b>Cora</b> (CORrelation and Analysis) <b>Biofidelic Scale:</b></p>
            </Col>
            <Col sm={9} className="Hardy_et_al-buttons">
              <Button variant="danger">Unacceptable</Button>
              <Button variant="warning">Marginal</Button>
              <Button className="orange">Fair</Button>
              <Button className="good">Good</Button>
              <Button variant="success">Excellent</Button>
            </Col>
          </Row>
        </Container>
        {/*============== Chats section start here ===============*/}
          <Container style={{'margin-top': '30px'}}>
            <Row className="Hardy_et_al-card-Chart">
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
              <Col sm>
                <C288_T3_chart />
              </Col>
            </Row>
          </Container>
        {/*============== Chats section end ===============*/}
      </React.Fragment>
  );
}
}

export default C288_T3;
