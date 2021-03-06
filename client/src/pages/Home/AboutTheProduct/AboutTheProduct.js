import React from 'react';
import { InView } from 'react-intersection-observer';
import screenWidth from '../../../utilities/ScreenWidth';


function AboutTheProduct(props) {
  const dashes = [];
  // For
  for (let i = 0; i < 19; i += 1) {
    dashes.push(<li key={i} />);
  }
  const animateOnDesktop = props.screenWidth > screenWidth[1].screen725 ? 'hvr-bounce-in' : '';

  function removeAnimationMobileView(animation){
    if (props.screenWidth > screenWidth[0].screen425)
      return animation;
    else {
      return ''
    }
  }

  function detectScroll(e) {
    if (props.screenWidth < screenWidth[1].screen725) {
      const scrollHeight = e.currentTarget.scrollHeight;
      const scrollTop = e.currentTarget.scrollTop;
      const clientHeight = e.currentTarget.clientHeight;
      if (scrollHeight === Math.floor(scrollTop + clientHeight)) {
        props.scrollBarTouchBottom();
      } else if (scrollTop === 0) {
        props.scrollBarTouchTop();
      }
    }
  }

  return (
    <div className="container section">
      <div onWheel={(e)=>detectScroll(e)} className="section-two">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center">
            <InView >
              {({ inView, ref }) => (
                <div className="mb-3" ref={ref}>
                  <h1
                    className={`font-weight-bold animated ${
                      inView ? removeAnimationMobileView('zoomIn') : ''
                    }`}
                  >
                    ABOUT THE PROJECT
                  </h1>

                  <div className="w-100 d-flex justify-content-center">
                    <div className={inView ? 'line_container' : ''}>
                      <div></div>
                    </div>
                  </div>
                  <p className={` animated ${inView ? removeAnimationMobileView('fadeInUp') : ''}`}>
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
              <InView>
                {({ inView, ref }) => (
                  <div
                    ref={ref}
                    className={`col-md-4 col-xs-4 col-sm-4 inline-row-divs animated ${
                      inView ? removeAnimationMobileView('slideInLeft') : ''
                    }`}
                  >
                    <img
                      className={`inline-row-divs-svg svg ${animateOnDesktop}`}
                      src="/img/AboutTheProductImg/Cloud_white.svg"
                      alt=""
                    />
                <h4 className="inline-row-divs-heading-four">
                      SENSOR ENABLED <br />
                      CLOUD-BASED BRAIN <br />
                      MODELING
                    </h4>
                  </div>
                )}
              </InView>
              <InView>
                {({ inView, ref }) => (
                  <div
                    ref={ref}
                    className={`col-md-4 col-xs-4 col-sm-4 inline-row-divs animated ${inView ? removeAnimationMobileView('zoomIn') : ''}`}
                  >
                    <img
                      className={`inline-row-divs-svg svg ${animateOnDesktop}`}
                      src="/img/AboutTheProductImg/Moniter_white.svg"
                      alt=""
                    />
                    <h4 className="inline-row-divs-heading-four">
                      MONITOR AND TRACK BRAIN <br />
                      RESPONSE OVER TIME
                    </h4>
                  </div>
                )}
              </InView>
              <InView>
                {({ inView, ref }) => (
                  <div
                    ref={ref}
                    className={`col-md-4 col-xs-4 col-sm-4 inline-row-divs  animated ${
                      inView ? removeAnimationMobileView('slideInRight') : ''
                    }`}
                  >
                    <img
                      className={`inline-row-divs-svg svg ${animateOnDesktop}`}
                      src="/img/AboutTheProductImg/Analysis_White.svg"
                      alt=""
                    />
                    <h4 className="inline-row-divs-heading-four">
                      TURN YOUR SENSOR DATA <br />
                      INTO MEANINGFUL BRAIN <br />
                      INJURY ANALYSIS
                    </h4>
                  </div>
                )}
              </InView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTheProduct;
