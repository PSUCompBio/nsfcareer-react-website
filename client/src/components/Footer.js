import React from 'react';

const Footer = () => {
  const redirectToOther = () => {
    window.location.href = 'https://psucompbio.org/';
  };
  return (
    <div className="footer about__page">
      <div style={{background:''}} className="container">
        <div className="row pt-4">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="logo" src="/img/icon/logo.png" alt="" />
          </div>
          <div className="col-sm-6  col-md-6 col-lg-6">
            <button type="button" className="btn btn-primary float-right">
              Get Updates
            </button>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-9 col-md-6 col-lg-6">
            <p>
              Contact Us: info@NSFCAREER.IO <br />
              IP | Privacy Policy &amp; IRB | Collaborate
            </p>
          </div>
          <div className="col-sm-3 col-md-6 col-lg-6">
            {/* <div className="icon-container">
            <a href="">
              <img className="px-2" src="/img/FooterImg/facebook-logo.svg" alt="" />
            </a>
            <a href="">
              <img className="px-2" src="/img/FooterImg/twitter-logo-silhouette.svg" alt="" />
            </a>
            <a href="">
              <img className="px-2" src="/img/FooterImg/icon.svg" alt="" />
            </a>
          </div> */}
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12 col-lg-12">
            <p onClick={redirectToOther} className="copyright">
              © 2019 Copyright: Penn State Computational Biomechanics Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
