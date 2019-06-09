import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color=" blue darken-4" className="font-small pt-4 mt-4">
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
							<a href="/home">home</a>
						</li>
              <li className="list-unstyled">
                <a href="/about">about</a>
              </li>
              <li className="list-unstyled">
                <a href="/sports">sports</a>
              </li>
              <li className="list-unstyled">
                <a href="/military">military</a>
              </li>
              <li className="list-unstyled">
                <a href="/contact">contact</a>
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
