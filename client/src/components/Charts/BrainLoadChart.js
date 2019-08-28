import React from 'react';

class BrainLoadChart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="card acc-card acc-brain-load pt-4 pb-3 pl-2 pr-2">
        <img className="svg img-fluid" src="/img/icon/brainLoad.svg" alt="" />
      </div>
    );
  }
}

export default BrainLoadChart;
