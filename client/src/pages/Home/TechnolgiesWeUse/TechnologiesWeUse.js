import React from 'react';
import { InView } from 'react-intersection-observer';
import GetUpdates from '../../../components/GetUpdates';


class TechnologiesWeUse extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showAndHideFooter: '',
      isDisplay: { display: 'none' }
    };
  }

  makeVisible = (data) => {
    this.setState({ isDisplay: data });
  }

  showModal = () => {
    if (this.state.isDisplay.display === 'none') {
      this.setState({ isDisplay: {display:'flex'} });
    } else {
      this.setState({ isDisplay: {display:'none'} });
    }
  };


   removeAnimationMobileView(animation){
    if (this.props.screenWidth > 425)
      return animation;
    else {
      return ''
    }
  }


  render = (props) => {
    const makeFooterVisibeForSmallDevice = {
      reset: {
        marginTop: 10 + '%',
        position: 'relative',
        bottom: 0,
        display: 'block!important'
      }
    };

    const redirectToOther = () => {
      window.location.href = 'https://psucompbio.org/';
    };

    return (
      <React.Fragment>
        <div className={`section-four-container`} onWheel={this.props.onWheel}>
          <div className="container section">
         
            <div
              className={`section-four text-center ${
                this.props.screenWidth >= 725
                  ? this.props.mouseScroll > 0 && this.props.currentPage === 4
                    ? 'shift-technology-section'
                    : ''
                  : ''
              }`}
            >
              <div className="col-md-12 col-lg-12 text-center">
                <InView>
                  {({ inView, ref }) => (
                    <div ref={ref}>
                      <h1
                    className={`font-weight-bold animated ${
                      inView ? this.removeAnimationMobileView('zoomIn') : ''
                    }`}
                  >
                    TECHNOLOGIES THAT WE USE
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
              <div
                className={`row ${
                  this.props.screenWidth > 425 && this.props.screenWidth < 769
                    ? ''
                    : ' py-5'
                }`}
              >
                <InView>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={`col-md-4 animated   ${
                        this.props.screenWidth <= 768
                          ? 'text-center'
                          : 'text-left'
                      } ${inView ? this.removeAnimationMobileView('slideInLeft') : ''}`}
                    >
                      <img
                        className="py-3"
                        src="/img/TechnologiesWeUseImg/noun_Wireless_1210449.svg"
                        alt=""
                      />
                      <h4 className="font-weight-bold">
                        Wireless Wearable Sensors
                      </h4>
                      <p>
                        We partner with leading impact and blast sensor
                        companies to provide real-time brain response analytics.
                        We help transform their data into meaningful brain
                        health monitoring. Looking for a sensor? See our{' '}
                        {this.props.screenWidth > 1024 ? '' : ''} recommended
                        providers here.
                      </p>
                    </div>
                  )}
                </InView>
                <InView>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={`col-md-4 animated   pt-5 ${
                        this.props.screenWidth < 768 ? 'order-first' : ''
                      } ${inView ? this.removeAnimationMobileView('zoomIn') : ''}`}
                    >
                      <img
                        className="mb-5 img-fluid terminology-img"
                        src="/img/TechnologiesWeUseImg/cloud.svg"
                        alt=""
                      />
                    </div>
                  )}
                </InView>
                <InView>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={`col-md-4 animated  ${
                        this.props.screenWidth <= 768
                          ? 'text-center'
                          : 'text-right'
                      } ${inView ? this.removeAnimationMobileView('slideInRight') : ''}`}
                    >
                      <img
                        className="py-3"
                        src="/img/TechnologiesWeUseImg/laptop.svg"
                        alt=""
                      />
                      <h4 className="font-weight-bold">
                        Computational Brain Medicine
                      </h4>
                      <p>
                        Computational Brain Medicine (CBM) is a transformative
                        and emerging discipline that uses computers to
                        understand, diagnose, develop treatment options, and
                        monitor brain health. It leverages engineering,
                        mathematics and computational science to develop
                        quantitative approaches for brain health applications.
                      </p>
                    </div>
                  )}
                </InView>
              </div>
              <div className="row text-center">
                <div className="col-md-12 mb-3 col-lg-12">
                  <button
                    type="button"
                    className="btn btn-outline-blue  px-5 mt-5"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer
            style={
              this.props.screenWidth < 725
                ? makeFooterVisibeForSmallDevice.reset
                : {}
            }
            className={`show-footer-mobile ${
              this.props.mouseScroll > 0 && this.props.screenWidth >= 725
                ? 'show-footer'
                : this.props.screenWidth < 725
                ? ''
                : 'hide-footer'
            }`}
          >
            <div className="container">
              <div className="row pt-4">
                <div className="col-sm-6 col-md-6 ">
                  <img className="logo" src="/img/icon/logo.png" alt="" />
                </div>
                <div className="col-sm-6  col-md-6 ">
                  <button onClick={()=>this.props.showmodal()} type="button" className="btn btn-primary float-right">
                    Get Updates
                  </button>
                </div>
                <hr />
              </div>
              <div className="row">
                <div className="col-sm-9 col-md-6 ">
                  <p>
                    Contact Us: info@NSFCAREER.IO <br />
                    <span onClick={()=>window.open('')}>  IP </span> | Privacy Policy &amp; <span onClick={()=>window.open('')}>  IRB </span> | Collaborate
                  </p>
                </div>
                <div className="col-sm-3 col-md-6 ">
                  {/* <div className="icon-container">
                    <a href="">
                      <img
                        className="px-2"
                        src="/img/FooterImg/facebook-logo.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="px-2"
                        src="/img/FooterImg/twitter-logo-silhouette.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="px-2"
                        src="/img/FooterImg/icon.svg"
                        alt=""
                      />
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="row text-center">
                <div className="col-md-12 pb-3 ">
                  <p onClick={redirectToOther} className="copyright">
                    © 2019 Copyright: Penn State Computational Biomechanics
                    Group
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  };
}

export default TechnologiesWeUse;
