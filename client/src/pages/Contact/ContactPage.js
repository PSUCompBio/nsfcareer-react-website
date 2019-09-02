import React, { Fragment } from 'react';
import Footer from '../../components/Footer';
import WebFont from 'webfontloader';
import { InView } from 'react-intersection-observer';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});
const ContactPage = () => (
  <React.Fragment>
    <div className="container pt-5 mt-5">
      <div className="row  animated zoomIn text-center">
        <div className="col-md-12">
          <div className={`w-100 section-title`}>
            <h1 className="font-weight-bold">SEND A MESSAGE</h1>
          </div>
          <p className="leave-us">
            Leave us a message to let us know you are interested in what we are
            doing.
          </p>
        </div>
        <div className="col-md-5 ml-md-auto mr-md-auto">
          <form action="">
            <div className="row mt-3">
              <div className="col-sm-6 mb-4">
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Full Name"
                />
              </div>
              <div className="col-sm-6 mb-4">
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Email id"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 mb-4">
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Subject"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 mb-5">
                <textarea
                  rows="5"
                  className="contact-input-text-area"
                  placeholder="Message"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-sm-12 animated zoomInUp">
                <button type="text" className="submit-now">
                  SUBMIT NOW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row mb-4 text-center">
        <div className="col-md-4 ml-md-auto animated zoomInLeft">
          <div className="card-contact">
            <p className="get-in-touch">GET IN TOUCH</p>

            <p>info at nsfcareer.io</p>
          </div>
        </div>
        <div className="col-md-4 mr-md-auto animated zoomInRight">
          <div className="card-contact">
            <p className="get-in-touch">OUR ADDRESS</p>

            <p>United States</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </React.Fragment>
);

export default ContactPage;
