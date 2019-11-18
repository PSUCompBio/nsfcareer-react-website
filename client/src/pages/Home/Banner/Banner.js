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

  isBrowser() {
    if(this.props.screenWidth >= screenWidth[4].screen1024) return true;
    else {
      return false;
    }
  }

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
                          style={{ overflow: 'hidden', paddingRight : "10%" }}
                          className={`centrify-mobile col-md-10 col-lg-10 header-heading`}
                        >
                          <h1
                            className={`mobile-head-title animated ${
                              inView
                                ? this.removeAnimationMobileView('fadeInLeft')
                                : ''
                            }`} style = {{ paddingRight : this.isBrowser() ? '30%' : '' }}
                          >
                            TRANSFORM YOUR SENSOR DATA
                          </h1>
                          <h4

                            className={`mobile-head-section mobile-section-mt-1 animated ${
                              inView ? this.removeAnimationMobileView('fadeInRight') : ''
                            }`} style = {{ paddingRight : this.isBrowser() ? '25%' : '' }}
                          >
                            Accurate brain simulations help extend your sensor data research.
                          </h4>
                          <div
                            className={`underlined-text ${
                              inView ? 'fadeIn' : ''
                            }`}
                          >
                            <p
                              className={` hide-element mobile-head-sub-section animated ${
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

                  <div className="row hide-element">
                    <div className="col-md-12 image-padding">
                      <InView>
                        {({ inView, ref, entry }) => (
                          <React.Fragment>
                            <img
                              ref={ref}
                              className={`mobile-head-sub-section-image  img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/NSF.png"
                              alt=""
                            />

                            <img
                              ref={ref}
                              className={` img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/penState.png"
                              alt=""
                            />
                        {/*<img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? this.removeAnimationMobileView('fadeIn') : ''
                              }`}
                              src="/img/BannerImg/ibm.png"
                              alt=""
                            />
                            */}
                          </React.Fragment>
                        )}
                      </InView>
                    </div>
                  </div>
                  <div className="row-margin row hide-element padding-mobile">
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
