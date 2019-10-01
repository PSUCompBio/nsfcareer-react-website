import React from 'react';
import WebFont from 'webfontloader';
import { InView } from 'react-intersection-observer';
import screenWidth from '../../../utilities/ScreenWidth'

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});
class Banner extends React.Component {
  removeAnimationMobileView(animation) {
    if (this.props.screenWidth > screenWidth[0].screen425) return animation;
    else {
      return '';
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="section-one-container">
          <div className="container-fluid pl-0 pr-0">
            <div className="section-one">
              <div className="image-container__banner">
                <div className="left-bubble-img">
                  <img className="svg img-fluid" src="/img/icon/bubble.png" alt=""/>
                </div>
                <div className="right-brain-img">
                    <img className="svg img-fluid" src="/img/BannerImg/b2.png" alt=""/>
                </div>
              </div>
              <div className="downpointer" >
              <i style={{color : "white"}} class="fa fa-angle-down fa-2x" aria-hidden="true"></i>
              </div>
              <div className="header-navbar">
                <div className="container-fluid heading-container">
                  <div className="row">
                    <InView>
                      {({ inView, ref, entry }) => (
                        <div
                          ref={ref}
                          style={{ overflow: 'hidden' }}
                          className={`col-md-10 col-lg-10 header-heading`}
                        >
                          <h1
                            className={`animated ${
                              inView
                                ? this.removeAnimationMobileView('fadeInLeft')
                                : ''
                            }`}
                          >
                            TRANSFORM YOUR SENSOR DATA
                          </h1>
                          <h4
                            className={`animated ${
                              inView ? this.removeAnimationMobileView('fadeInRight') : ''
                            }`}
                          >
                            Accurate brain simulations help extend your{' '}
                          </h4>
                          <h4
                            className={`animated ${
                              inView
                                ? this.removeAnimationMobileView('fadeInUp')
                                : ''
                            }`}
                          >
                            sensor data research.{' '}
                          </h4>
                          <div
                            className={`underlined-text ${
                              inView ? 'fadeIn' : ''
                            }`}
                          >
                            <p
                              className={`animated ${
                                inView
                                  ? this.removeAnimationMobileView('fadeInUp')
                                  : ''
                              }`}
                            >
                              Supported By
                            </p>
                          </div>
                        </div>
                      )}
                    </InView>
                    <div className="col-md-2 " />
                  </div>

                  <div className="row">
                    <div className="col-md-12 image-padding">
                      <InView>
                        {({ inView, ref, entry }) => (
                          <React.Fragment>
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/NSF.png"
                              alt=""
                            />

                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/penState.png"
                              alt=""
                            />
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/ibm.png"
                              alt=""
                            />
                          </React.Fragment>
                        )}
                      </InView>
                    </div>
                  </div>
                  <div className="row padding-mobile">
                    <div className="col-md-12   image-padding">
                      <InView>
                        {({ inView, ref, entry }) => (
                          <React.Fragment>
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/amazon.png"
                              alt=""
                            />
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/cyberscience.png"
                              alt=""
                            />
                          </React.Fragment>
                        )}
                      </InView>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Banner;
