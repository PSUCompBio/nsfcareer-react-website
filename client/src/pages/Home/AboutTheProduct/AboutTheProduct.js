import React from 'react';


class AboutTheProduct extends React.Component {

  render() {
    return (
      <div className="section-two-container">
        <div className="container">
          <div className={`section-two ${this.props.screenWidth >= 2560 ? 'pt-4' : 'pt-4'}`}>
            <div className="row">
              <div className={`col-md-12 col-lg-12 pt-5 text-center ${this.props.screenWidth <= 768 ? 'mb-5' : ''}`}>
                <h1 className="font-weight-bold pt-2">ABOUT THE PROJECT</h1>
                <hr />
                <p className={`${this.props.screenWidth > 425 && this.props.screenWidth < 768 ? 'pt-5 mt-5' : ''}`}>Brain injuries are a significant health concern for civilian and military populations.
                  This Faculty Early Career Development Program (CAREER) project will contribute to the understanding of brain
                  trauma by developing advanced computer models that link neuroimaging results, biomechanical assessments, and
                  computational modeling of the brain. More broadly, the continued pursuit of the development and validation
                        of numerical diagnostics is anticipated to advance the emerging field of computational medicine.</p>
              </div>
            </div>
            <div className="img-container">
              <div className="row">
                <div className="col-md-12 col-lg-12 text-center">
                  <div className="bashed-border">
                    <ul>
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                      <li />
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row text-center shift-top">
                <div className="col-md-4 col-lg-4 icon">
                  <div>
                    <img src="/img/AboutTheProductImg/Cloud_White.svg" alt="" />
                    <img src="/img/AboutTheProductImg/Cloud_Blue.svg" alt="" />
                  </div>
                  <h4>
                    SENSOR ENABLED <br />
                    CLOUD-BASED BRAIN <br />
                    MODELING
                  </h4>
                </div>
                <div className="col-md-4 col-lg-4 icon">
                  <div>
                    <img
                      src="/img/AboutTheProductImg/Monitor_White.svg"
                      alt=""
                    />
                    <img
                      src="/img/AboutTheProductImg/Monitor_Blue.svg"
                      alt=""
                    />
                  </div>
                  <h4>
                    MONITOR AND TRACK BRAIN <br />
                    RESPONSE OVER TIME
                  </h4>
                </div>
                <div className="col-md-4 col-lg-4 icon">
                  <div>
                    <img
                      src="/img/AboutTheProductImg/Analysis_White.svg"
                      alt=""
                    />
                    <img
                      src="/img/AboutTheProductImg/Analysis_Blue.svg"
                      alt=""
                    />
                </div>
                  <h4>
                    TURN YOUR SENSOR DATA <br />
                    INTO MEANINGFUL BRAIN <br />
                    INJURY ANALYSIS
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutTheProduct;