import React from 'react';
import { svgToInline } from '../../config/InlineSvgFromImg';

class HeadAccelerationEvnt extends React.Component {

  constructor() {
    super();
    this.state = {};
  }


  componentDidMount() {
    svgToInline();
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-lg-7">
          <div className="card  pt-3 pb-3 acc-card acc-card-before">
            <div className="row text-center">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img className="svg" src="/img/icon/accBrain.svg" alt="" />
              </div>
              <div className="col-md-8">
                <img className="svg" src="/img/icon/accBrainChart.svg" alt="" />
                <p>Time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-5  ">
          <div className="card acc-card acc-brain-load pt-4 pb-3">
            <img className="svg" src="/img/icon/brainLoad.svg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default HeadAccelerationEvnt;
