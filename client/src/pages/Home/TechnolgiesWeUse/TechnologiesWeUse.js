import React from 'react';
import { InView } from 'react-intersection-observer';
import screenWidth from '../../../utilities/ScreenWidth';
import { withRouter, Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
class TechnologiesWeUse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAndHideFooter: '',
      isDisplay: { display: 'none' },
      bottomTouched: false
    };
  }

  makeVisible = (data) => {
    this.setState({ isDisplay: data });
  };

  showModal = () => {
    if (this.state.isDisplay.display === 'none') {
      this.setState({ isDisplay: { display: 'flex' } });
    } else {
      this.setState({ isDisplay: { display: 'none' } });
    }
  };

  removeAnimationMobileView(animation) {
    if (this.props.screenWidth > screenWidth[0].screen425) return animation;
    else {
      return '';
    }
  }

  detectScroll(e) {
    if (this.props.screenWidth < screenWidth[1].screen725) {
      const scrollHeight = e.currentTarget.scrollHeight;
      const scrollTop = e.currentTarget.scrollTop;
      const clientHeight = e.currentTarget.clientHeight;
      if (scrollHeight === Math.floor(scrollTop + clientHeight)) {
        this.props.scrollBarTouchBottom();
        this.setState({ bottomTouched: true });
      } else if (scrollTop === 0) {
        this.setState({ bottomTouched: false });
        this.props.scrollBarTouchTop();
      } else {
        this.setState({ bottomTouched: false });
      }
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
              onWheel={(e) => this.detectScroll(e)}
              className={`section-four text-center ${
                this.props.screenWidth >= screenWidth[1].screen725
                  ? this.props.mouseScroll > 0 && this.props.currentPage === 4
                    ? 'shift-technology-section'
                    : ''
                  : ''
              } ${this.state.bottomTouched === true ? 'shift-technology-ms' : ''}`}
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
                  this.props.screenWidth > screenWidth[0].screen425 &&
                  this.props.screenWidth < screenWidth[2].screen769
                    ? ''
                    : ''
                }`}
              >
                <InView>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={`col-md-4 animated   ${
                        this.props.screenWidth <= screenWidth[3].screen768
                          ? 'text-center'
                          : 'text-left'
                      } ${
                        inView
                          ? this.removeAnimationMobileView('slideInLeft')
                          : ''
                      }`}
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
                      </p>
                    </div>
                  )}
                </InView>
                <InView>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={`col-md-4 animated   pt-5 ${
                        this.props.screenWidth < screenWidth[3].screen768
                          ? ''
                          : ''
                      } ${
                        inView ? this.removeAnimationMobileView('zoomIn') : ''
                      }`}
                    >
                      <img
                        className="img-fluid terminology-img"
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
                        this.props.screenWidth <= screenWidth[3].screen768
                          ? 'text-center order-first'
                          : 'text-right'
                      } ${
                        inView
                          ? this.removeAnimationMobileView('slideInRight')
                          : ''
                      }`}
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
                        Computational Brain Medicine leverages engineering,
                        mathematics and computational science to develop
                        quantitative approaches for brain health applications.
                      </p>
                    </div>
                  )}
                </InView>
              </div>
              <div className="row text-center">
                <div className="col-md-12 mb-3 col-lg-12">
                <Link to="/Details">
                  <button
                    type="button"
                    className="btn btn-outline-blue  px-5 mt-2"
                  >
                    Read More
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
        <Footer makeVisible={this.props.makeVisible} showGetUpdateModal={this.props.showGetUpdateModal} screenWidth={this.props.screenWidth} goToPage={this.props.goToPage}/>
      </React.Fragment>
    );
  };
}

export default withRouter(TechnologiesWeUse);
