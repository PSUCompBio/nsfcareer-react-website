import React from 'react';
import { InView } from 'react-intersection-observer';
import { Link, withRouter } from 'react-router-dom';
import screenWidth from '../../../utilities/ScreenWidth';


function ResearchArea(props) {

  function removeAnimationMobileView(animation){
    if (props.screenWidth > screenWidth[0].screen425)
      return animation;
    else {
      return ''
    }
  }

  function gotoPage(pageName) {
    props.history.push(pageName)
  }

  function detectScroll(e) {
    if (props.screenWidth < screenWidth[1].screen725) {
      const scrollHeight = e.currentTarget.scrollHeight;
      const scrollTop = e.currentTarget.scrollTop;
      const clientHeight = e.currentTarget.clientHeight;
      console.log("clientheight + scrollTOp==>",Math.floor(clientHeight + scrollTop),"scrollheight==>",scrollHeight)
      if (scrollHeight === Math.floor(scrollTop + clientHeight) || scrollHeight === Math.floor(scrollTop + clientHeight)+1 ) {
        console.log("inside bottmo")
        props.scrollBarTouchBottom();
      } else if (scrollTop === 0) {
        console.log("inside top")

        props.scrollBarTouchTop();
      }
    }
  }


  return (
    <div className={props.hideTitle ? 'research-area-bg hide-background' : 'research-area-bg'}>
      <div className="container section">
        <div onWheel={(e)=>detectScroll(e)} className="section-three">
          <div className="col-md-12 col-lg-12 text-center">
                  {props.hideTitle ? null : <InView>
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
               }

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
                  <div onClick={()=>gotoPage('/Military')}  className={"card mx-4 research-card rounded-img " + (props.hideTitle ? 'show-shadow' : '') }>
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
                  <div onClick={()=>gotoPage('/Sports')} className={"card mx-4 research-card rounded-img " + (props.hideTitle ? 'show-shadow' : '') }>
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
