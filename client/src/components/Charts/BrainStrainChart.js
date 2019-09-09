import React from 'react';

class BrainStrainChart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="card  pt-3 pb-3 pl-2 pr-2 mb-5 acc-card acc-card-before">
        <div className="row text-center">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              className="svg img-fluid"
              src="/img/icon/accBrain.svg"
              alt=""
            />
          </div>
          <div className="col-md-8 mb-5">
            <img
              className="svg img-fluid"
              src="/img/icon/accBrainChart.svg"
              alt=""
            />
            <p ref="h3">Time</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BrainStrainChart;
