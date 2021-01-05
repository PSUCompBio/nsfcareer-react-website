import React from 'react';
// import { getStatusOfDarkmode } from '../../reducer';
// import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';

import {
  Link,
  // Redirect
} from "react-router-dom";
import { Container, Row, Col , Card, Button} from 'react-bootstrap';

// import axios from 'axios';
// import grater_icon from "./grater_icon.png"
import C288_T3 from "./subpages/C288_T3"
// let sigPad = {};
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
          isHardypage: true,
          pathname:this.props.location.pathname,
      }
      this.test = this.test.bind(this);
  }
  contentBody =()=>{
    console.log('pathname',this.state.pathname)
    if(this.state.pathname === '/Hardy-et-al' || this.state.pathname === '/Hardy-et-al/'){
      return <React.Fragment>  
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
            <Col sm={9} className="Hardy_et_al-buttons">
              <Button variant="danger">Unacceptable</Button>
              <Button variant="warning">Marginal</Button>
              <Button className="orange">Fair</Button>
              <Button className="good">Good</Button>
              <Button variant="success">Excellent</Button>
            </Col>
          </Row>
        </Container>
        <Container style={{'margin-top': '30px'}}>
          <Row className="Hardy_et_al-card">
            <Col sm>
              <Link to="Hardy-et-al/C288-T3" >
                <Card className="bg-warning">
                  <Card.Body>
                    <Card.Title>C288-T3</Card.Title>
                    <Card.Text>
                      CORA: TBD
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="Hardy_et_al-card">
            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card>
                <Card.Body>
                  <Card.Title>TBD</Card.Title>
                  <Card.Text>
                    CORA: TBD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    }else{
      console.log('case',this.props.match.params.cases)
      if(this.props.match.params.cases === 'C288-T3'){
        return <C288_T3/>
      }else{
        return null
      }
    }
  }
  test=()=>{
    console.log('test')
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
            <>
              <Container>
                <Row>
                  <Col className="Hardy_et_al-header">
                    <p>
                      This validation data is from: Hardy, W.N., Mason, M.J., Foster, C.D., Kopacz, J.M., Yang, K.H., King, A.I., Bishop, J., Bey, M., Anderst, W. and Tashman, S., 2007. A study of the response of the human cadaver head to impact. <i>Stapp car crash jourmal, 51, p.17.</i>
                    </p>
                  </Col>
                </Row>
              </Container>
              <this.contentBody/>
            </>
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
