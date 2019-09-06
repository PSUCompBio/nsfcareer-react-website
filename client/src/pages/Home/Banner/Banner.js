import React from 'react';
import WebFont from 'webfontloader';
import { InView } from 'react-intersection-observer';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});
class Banner extends React.Component {
 
  render() {
    return (
      <div>
        <div className="section-one-container">
          <div className="container-fluid pl-0 pr-0">
            <div className="section-one">
              <img src="/img/BannerImg/Brain.png" alt="" />
              <div className="header-navbar">
                <div className="container-fluid heading-container">
                  <div className="row">
                    <InView>
                      {({ inView, ref, entry }) => (
                        <div
                          ref={ref}
                          style={{ overflow: 'hidden' }}
                          className={`col-md-10 col-lg-10 header-heading ${
                            this.props.screenWidth < 725 ? '' : ''
                          }`}
                        >
                          <h1
                            className={`${inView ? 'animated fadeInLeft' : ''}`}
                          >
                            TRANSFORM YOUR SENSOR DATA
                          </h1>
                          <h4
                            className={`${
                              inView ? 'animated fadeInRight' : ''
                            }`}
                          >
                            Accurate brain simulations help extend your{' '}
                          </h4>
                          <h4
                            className={`${inView ? 'animated fadeInUp' : ''}`}
                          >
                            sensor data research.{' '}
                          </h4>
                          <div
                            className={`underlined-text ${
                              inView ? 'fadeIn' : ''
                            }`}
                          >
                            <p
                              className={`${inView ? 'animated fadeInUp' : ''}`}
                            >
                              Supported By
                            </p>
                            <hr
                              className={`${inView ? 'animated zoomIn' : ''}`}
                            />
                          </div>
                        </div>
                      )}
                    </InView>
                    <div className="col-md-2 " />
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-6  image-padding">
                      <InView>
                        {({ inView, ref, entry }) => (
                          <React.Fragment>
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? 'fadeIn' : ''
                              }`}
                              src="/img/BannerImg/NSF.png"
                              alt=""
                            />

                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? 'fadeIn' : ''
                              }`}
                              src="/img/BannerImg/penState.png"
                              alt=""
                            />
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? 'fadeIn' : ''
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
                    <div className="col-md-12 col-sm-6  image-padding">
                      <InView>
                        {({ inView, ref, entry }) => (
                          <React.Fragment>
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? 'fadeIn' : ''
                              }`}
                              src="/img/BannerImg/amazon.png"
                              alt=""
                            />
                            <img
                              ref={ref}
                              className={`img-fluid animated ${
                                inView ? 'fadeIn' : ''
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
      </div>
    );
  }
}

export default Banner;
