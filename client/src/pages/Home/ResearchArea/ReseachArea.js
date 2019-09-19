import React from 'react';
import { InView } from 'react-intersection-observer';
import { Link, withRouter } from 'react-router-dom';

function ResearchArea(props) {

  function removeAnimationMobileView(animation){
    if (props.screenWidth > 425)
      return animation;
    else {
      return ''
    }
  }

  function gotoPage(pageName) {
    props.history.push(pageName)
  }


  return (
    <div className="research-area-bg">
      <div className="container section">
        <div className="section-three">
          <div className="col-md-12 col-lg-12 text-center">
            <InView>
              {({ inView, ref }) => (
                <div className="mb-3" ref={ref}>
                  <h1
                    className={`font-weight-bold animated ${
                      inView ? removeAnimationMobileView('zoomIn') : ''
                    }`}
                  >
                    RESEARCH AREA
                  </h1>

                  <div className="w-100 d-flex justify-content-center">
                    <div className={inView ? 'line_container' : ''}>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
            </InView>
          </div>
          <div className="row text-center center-card">
            <InView>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={`col-md-6 col-lg-6 animated ${
                    inView ? removeAnimationMobileView('slideInLeft') : ''
                  }`}
                >
                  <div onClick={()=>gotoPage('/Military')}  className="card mx-4 research-card rounded-img">
                    <img
                      className="card-img-top"
                      src="/img/ResearchAreaImg/Group-2491.svg"
                      alt=""
                    />
                    <div className="card-body text-center">
                      <h5>For Soldiers</h5>
                      <p className="card-text px-3 mt-3 color">
                        We use sensor-enabled, cloud-based platform for
                        individualized brain modeling of Soldiers.
                      </p>
                      <a href="/Military">Read More</a>
                    </div>
                  </div>
                </div>
              )}
            </InView>
            <InView>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={`col-md-6 col-lg-6 animated ${
                    inView ? removeAnimationMobileView('slideInRight') : ''
                  }`}
                >
                  <div onClick={()=>gotoPage('/Sports')} className="card mx-4 research-card rounded-img">
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
                      <Link to="/Sports">Read More</Link>
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
export default withRouter(ResearchArea);
