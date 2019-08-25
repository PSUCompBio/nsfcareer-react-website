import React from 'react';
import { InView } from 'react-intersection-observer';

class ResearchArea extends React.Component {
 
  render() {
    const resetHeight = {
      height: 'auto',
    }


    return (

      <div className="section-three-container">
        <div id="ptf-sol-laptop" className={`research-area-bg ${this.props.screenWidth>=1024?'ptf-laptop':''}`} style={this.props.screenWidth < 725 ? resetHeight : {}}>
          <div className="container">
            <div className="section-three text-center py-5">
              <h1 className="font-weight-bold pt-5">RESEARCH AREAS</h1>
              <InView>
                {({ inView, ref, entry }) => (
                  <div ref={ref}>
                    <hr className={`animated ${inView?'zoomIn':''}`}/>
                  </div>
                )}
              </InView>
              <div className="row text-center center-card  ">
                <div className={`col-md-6 col-lg-6 ${this.props.screenWidth < 769 ? 'px-2 py-2' : 'px-5'}`} >
                  <a className="card mx-4 research-card rounded-img" href="/Military">
                    <img className="card-img-top" src="/img/ResearchAreaImg/Group-2491.svg" alt={''} />
                    <div className="card-body text-center">
                      <h5>For Soldiers</h5>
                      <p className="card-text px-4 mt-3 color">We use sensor-enabled, cloud-based platform for individualized
                              brain modeling of Soldiers.</p>
                    </div>
                  </a>
                </div>
                <div className={`col-md-6 col-lg-6 ${this.props.screenWidth < 769 ? 'px-2 py-2' : 'px-5'}`}>
                  <a className="card mx-4 research-card rounded-img">
                    <img className="card-img-top" src="/img/ResearchAreaImg/Group-2492.svg" alt={''} />
                    <div className="card-body text-center">
                      <h5>For Athletes</h5>
                      <p className="card-text px-4 mt-3 color">We utilize data from the customized computer models to approximate
                              an Athlete's brain’s response to injuries.</p>
                    </div>
                  </a>
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