import React from 'react';
import { InView } from 'react-intersection-observer'

class AboutTheProduct extends React.Component {

  render() {
    return (

      <div className="section-two-container">
        <div className="container">
          <div id="ptf-laptop" className={`section-two pt-4 `}>
            <div className="row">
              <div className={`col-md-12 col-lg-12 pt-5 text-center ${this.props.screenWidth <= 768 ? 'mb-5' : ''}`}>
                <InView>
                {({ inView, ref, entry }) => (
                  <div ref={ref}>
                    <h1 className="font-weight-bold pt-2">ABOUT THE PROJECT</h1>
                    <hr className={`animated ${inView ? 'zoomIn' : ''}`} />
                    <p className={` animated ${inView?'pulse':''} ${this.props.screenWidth > 425 && this.props.screenWidth < 768 ? 'pt-5 mt-5' : ''}`}>Brain injuries are a significant health concern for civilian and military populations.
                        This Faculty Early Career Development Program (CAREER) project will contribute to the understanding of brain
                        trauma by developing advanced computer models that link neuroimaging results, biomechanical assessments, and
                        computational modeling of the brain. More broadly, the continued pursuit of the development and validation
                        of numerical diagnostics is anticipated to advance the emerging field of computational medicine.</p>
                  </div>
                  )}
                </InView>
              </div>
            </div>
            <InView>
              {({ inView, ref, entry }) => (

                <div ref={ref}>
                  <div className="img-container">
                    <div className="row">
                      <div className="col-md-12 col-lg-12 text-center">
                        <div className="bashed-border">
                          <ul>
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row text-center shift-top">
                      <div className={`col-md-4 animated ${inView ? 'fadeInLeft' : ''}`}>
                        <img className="svg hvr-bounce-in" src="/img/AboutTheProductImg/Cloud_white.svg" alt="" />
                        <h4 >SENSOR ENABLED <br />
                          CLOUD-BASED BRAIN <br />
                          MODELING</h4>
                      </div>
                      <div className={`col-md-4 animated ${inView ? 'fadeInUp' : ''}`}>
                        <img className="svg hvr-bounce-in" src="/img/AboutTheProductImg/Moniter_white.svg" alt="" />
                        <h4>MONITOR AND TRACK BRAIN <br />
                          RESPONSE OVER TIME</h4>
                      </div>
                      <div className={`col-md-4 animated ${inView ? 'fadeInRight' : ''}`}>
                        <img className="svg hvr-bounce-in" src="/img/AboutTheProductImg/Analysis_White.svg" alt="" />
                        <h4>TURN YOUR SENSOR DATA <br />
                          INTO MEANINGFUL BRAIN <br />
                          INJURY ANALYSIS</h4>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </InView>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutTheProduct;