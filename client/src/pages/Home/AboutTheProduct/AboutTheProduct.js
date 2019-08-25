import React from 'react';
import { InView } from 'react-intersection-observer';

function AboutTheProduct(props) {
  const dashes = [];
  // For
  for (let i = 0; i < 19; i += 1) {
    dashes.push(<li key={i} />);
  }
  const animateOnDesktop = props.screenWidth > 725 ? 'hvr-bounce-in' : '';

  return (
    <div className="container section">
      <div className="section-two">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center">
            <InView>
              {({ inView, ref }) => (
                <div ref={ref}>
                  <div className={`${inView ? 'section-title' : ''}`}>
                    <h1 className="font-weight-bold">ABOUT THE PROJECT</h1>
                  </div>
                  <p>
                    Brain injuries are a significant health concern for civilian
                    and military populations. This Faculty Early Career
                    Development Program (CAREER) project will contribute to the
                    understanding of brain trauma by developing advanced
                    computer models that link neuroimaging results,
                    biomechanical assessments, and computational modeling of the
                    brain. More broadly, the continued pursuit of the
                    development and validation of numerical diagnostics is
                    anticipated to advance the emerging field of computational
                    medicine.
                  </p>
                </div>
              )}
            </InView>
          </div>
        </div>
        <div>
          <div className="img-container">
            <div className="row">
              <div className="col-md-12 col-lg-12 text-center">
                <div className="dashed-border">
                  <ul>{dashes}</ul>
                </div>
              </div>
            </div>
            <div className="row text-center shift-top">
              <div className="col-md-4 animated">
                <img
                  className={`svg ${animateOnDesktop}`}
                  src="/img/AboutTheProductImg/Cloud_white.svg"
                  alt=""
                />
                <h4>
                  SENSOR ENABLED <br />
                  CLOUD-BASED BRAIN <br />
                  MODELING
                </h4>
              </div>
              <div className="col-md-4 animated">
                <img
                  className={`svg ${animateOnDesktop}`}
                  src="/img/AboutTheProductImg/Moniter_white.svg"
                  alt=""
                />
                <h4>
                  MONITOR AND TRACK BRAIN <br />
                  RESPONSE OVER TIME
                </h4>
              </div>
              <div className="col-md-4 animated">
                <img
                  className={`svg ${animateOnDesktop}`}
                  src="/img/AboutTheProductImg/Analysis_White.svg"
                  alt=""
                />
                <h4>
                  TURN YOUR SENSOR DATA <br />
                  INTO MEANINGFUL BRAIN <br />
                  INJURY ANALYSIS
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTheProduct;
