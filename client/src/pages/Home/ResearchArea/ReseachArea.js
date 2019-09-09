import React from 'react';
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function ResearchArea(props) {
  // const animateOnDesktop = props.screenWidth > 725 ? 'hvr-bounce-in' : '';

  return (
    <div className="research-area-bg">
      <div className="container section">
        <div className="section-three">
          <div className="col-md-12 col-lg-12 text-center">
            <InView>
              {({ inView, ref }) => (
                <div ref={ref}>
                  <div className={`${inView ? 'section-title animated zoomIn' : ''}`}>
                    <h1 id="color" className="font-weight-bold">RESEARCH AREAS</h1>
                  </div>
                </div>
              )}
            </InView>
          </div>
          <div className="row text-center center-card">
            <InView>
              {({ inView, ref }) => (
                <div ref={ref} className={`col-md-6 col-lg-6 ${inView ? 'animated slideInLeft' : ''}`}>
                  <div className="card mx-4 research-card rounded-img">
                    <img
                      className="card-img-top"
                      src="/img/ResearchAreaImg/Group-2491.svg"
                      alt=""
                    />
                    <div className="card-body text-center">
                      <h5>For Soldiers</h5>
                      <p className="card-text px-3 mt-3 color">
                        We use sensor-enabled, cloud-based platform for
                        individualized brain modeling of
                        Soldiers. 
                      </p>
                      <a href="/Military">Read More</a>
                    </div>
                  </div>
                </div>
              )}
            </InView>
            <InView>
              {({ inView, ref }) => (
                <div ref={ref} className={`col-md-6 col-lg-6 ${inView ? 'animated slideInRight' : ''}`}>
                  <div className="card mx-4 research-card rounded-img">
                    <img
                      className="card-img-top"
                      src="/img/ResearchAreaImg/Group-2492.svg"
                      alt=""
                    />
                    <div className="card-body text-center">
                      <h5>For Athletes</h5>
                      <p className="card-text mt-3 color">
                        We utilize data from the customized computer models to
                        approximate an Athlete&apos;s brain’s response to
                        injuries. 
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
              )}
            </InView>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResearchArea;
