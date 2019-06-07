
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">NSFCAREER.IO</h5>
            <p>
              Multiscale Modelng of Axonal Fiber Tracts in the Brain.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">about</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">sports</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">military</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">contact</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.PSUCompBio.org"> Penn State Computational Biomechanics Group </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
