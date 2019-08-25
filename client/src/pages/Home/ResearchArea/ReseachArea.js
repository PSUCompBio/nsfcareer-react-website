import React from 'react';
import { InView } from 'react-intersection-observer';

function ResearchArea() {
  return (
    <div className="research-area-bg">
      <div className="container section">
        <div className="section-three">
          <div className="col-md-12 col-lg-12 text-center">
            <InView>
              {({ inView, ref }) => (
                <div ref={ref}>
                  <div className={`${inView ? 'section-title' : ''}`}>
                    <h1 className="font-weight-bold">RESEARCH AREAS</h1>
                  </div>
                </div>
              )}
            </InView>
          </div>
          <div className="row text-center center-card">
            <div className="col-md-6 col-lg-6">
              <a
                className="card mx-4 research-card rounded-img"
                href="/Military"
              >
                <img
                  className="card-img-top"
                  src="/img/ResearchAreaImg/Group-2491.svg"
                  alt=""
                />
                <div className="card-body text-center">
                  <h5>For Soldiers</h5>
                  <p className="card-text px-4 mt-3 color">
                    We use sensor-enabled, cloud-based platform for
                    individualized brain modeling of Soldiers.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-6">
              <a className="card mx-4 research-card rounded-img">
                <img
                  className="card-img-top"
                  src="/img/ResearchAreaImg/Group-2492.svg"
                  alt=""
                />
                <div className="card-body text-center">
                  <h5>For Athletes</h5>
                  <p className="card-text px-4 mt-3 color">
                    We utilize data from the customized computer models to
                    approximate an Athlete&apos;s brain’s response to injuries.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResearchArea;
