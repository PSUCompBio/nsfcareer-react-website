import React from 'react';

class HeadAccelerationEvents extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div  className="position-relative  bg-white acc-evnt">
      <div  data-descr={'Head Acceleration Events      07/30/2019        13  :  15  :  26'} className="position-relative head-acc-evnt-chart pl-2 pr-2">
        <div className="row pl-4 pr-4 pb-4 dark-bg   text-center">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img className={`img fluid ${'svg'}`} src="/img/icon/brainEvnt.svg" alt="" />
          </div>
          <div className="col-md-6 text-right">
              <img className={`img-fluid ${'svg'}`} src="/img/icon/accBrainChart.svg" alt="" />
              <p ref="h4">Time</p>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default HeadAccelerationEvents;
