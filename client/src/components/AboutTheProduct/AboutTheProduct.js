import React from 'react';
import Cloud from './AboutTheProductImg/Cloud_white.svg'
import Analysis from './AboutTheProductImg/Analysis_White.svg'
import Monitor from './AboutTheProductImg/Moniter_white.svg'

class AboutTheProduct extends React.Component{
    render() {
        return (

            <div className="section-two-container">
              <div className="container">
                <div className="section-two pt-2 ">
                  <div className="row">
                    <div className="col-md-12 col-lg-12 pt-5 text-center">
                      <h1 className="font-weight-bold">ABOUT THE PROJECT</h1>
                      <hr />
                      <p className="pt-5 mt-5">Brain injuries are a significant health concern for civilian and military populations.
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
                      <div className="col-md-4 col-lg-4">
                        <img src={Cloud} alt="" />
                        <h4>SENSOR ENABLED <br />
                          CLOUD-BASED BRAIN <br />
                          MODELING</h4>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <img src={Monitor} alt="" />
                        <h4>MONITOR AND TRACK BRAIN <br />
                          RESPONSE OVER TIME</h4>
                      </div>
                      <div className="col-md-4 col-lg-4">
                        <img src={Analysis} alt="" />
                        <h4>TURN YOUR SENSOR DATA <br />
                          INTO MEANINGFUL BRAIN <br />
                          INJURY ANALYSIS</h4>
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