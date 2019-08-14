import React from 'react';


class ResearchArea extends React.Component{
    render() {
        return (

            <div className="section-three-container">
              <div className="research-area-bg">
                <div className="container">
                  <div className="section-three text-center py-5">
                    <h1 className="font-weight-bold pt-5">RESEARCH AREAS</h1>
                    <hr />
                    <div className="row text-center  ">
                      <div className="col-md-6 col-lg-6 px-5 py-5">
                        <div className="card mx-4 rounded-img">
                          <img className="card-img-top" src="/img/ResearchAreaImg/Group-2491.svg" alt="Card image cap" />
                          <div className="card-body">
                            <h5>For Soldiers</h5>
                            <p className="card-text px-4 mt-3 color">We use sensor-enabled, cloud-based platform for individualized
                              brain modeling of <br /> Soldiers. <a href=""> Read More</a> </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 px-5 py-5">
                        <div className="card mx-4 rounded-img">
                          <img className="card-img-top" src="/img/ResearchAreaImg/Group-2492.svg" alt="Card image cap" />
                          <div className="card-body">
                            <h5>For Athletes</h5>
                            <p className="card-text px-4 mt-3 color">We utilize data from the customized computer models to approximate
                              an Athlete's brain’s response to injuries.<a href=""> Read More</a> </p>
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

export default ResearchArea;