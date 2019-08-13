import React from 'react';

class Footer extends React.Component{
    render() {

      return (

        <div className="section-four-container" onWheel={this.props.onWheel}>
                  <div className="container-fluid pl-0 pr-0">
                    <div className="container no-gutter">
                      <div className="section-four text-center">
                        <div className="row">
                          <div className="col-md-4 col-lg-4 text-left">
                            <img className="py-3" src="/img/TechnologiesWeUseImg/noun_Wireless_1210449.svg" alt="" />
                            <h4 className="font-weight-bold">Wireless Wearable Sensors</h4>
                            <p>
                              We partner with leading impact and blast <br /> sensor companies to provide real-time <br /> brain response
                              analytics. We help <br /> transform their data into <br />
                              meaningful brain health monitoring. <br /> Looking for a sensor? See our <br /> recommended providers here.
                            </p>
                          </div>
                          <div className="col-md-4 col-lg-4 pt-5 ">
                            <img className="mb-5 img-fluid terminology-img" src="/img/FooterImg/terminology.png" alt="" />
                          </div>
                          <div className="col-md-4 col-lg-4 text-right">
                            <img className="py-3" src="/img/TechnologiesWeUseImg/laptop.svg" alt="" />
                            <h4 className="font-weight-bold">Computational Brain Medicine</h4>
                            <p>
                              Computational Brain Medicine (CBM) is a transformative and emerging discipline that <br /> uses computers to
                              understand, diagnose,<br /> develop treatment options, and monitor <br /> brain health. It leverages
                              engineering,<br /> mathematics and computational science to <br /> develop quantitative approaches for brain
                              <br />health applications.
                            </p>
                          </div>
                        </div>
                        <div className="row text-center">
                          <div className="col-md-12 col-lg-12">
                            <button type="button" className="btn btn-outline-blue px-5 mt-5">Read More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <footer>
                      <div className="container">
                        <div className="row pt-4">
                          <div className="col-sm-6 col-md-6 col-lg-6">
                            <h4>NSFCAREER.IO</h4>
                          </div>
                          <div className="col-sm-6  col-md-6 col-lg-6">
                            <button type="button" className="btn btn-primary float-right">Get Updates</button>
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
                            <div className="icon-container">
                              <a href="">
                                <img className="px-2" src="/img/FooterImg/facebook-logo.svg" alt="" />
                              </a>
                              <a href="">
                                <img className="px-2" src="/img/FooterImg/twitter-logo-silhouette.svg" alt="" />
                              </a>
                              <a href="">
                                <img className="px-2" src="/img/FooterImg/icon.svg" alt="" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="row text-center">
                          <div className="col-md-12 col-lg-12">
                            <p>© 2019 Copyright: Penn State Computational Biomechanics Group</p>
                          </div>
                        </div>
                      </div></footer>
                  </div>
                </div>
              );
    }
}

export default Footer;