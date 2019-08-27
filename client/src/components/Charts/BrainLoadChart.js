import React from 'react';

class BrainLoadChart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="card acc-card acc-brain-load pt-4 pb-3">
        <img className="svg" src="/img/icon/brainLoad.svg" alt="" />
      </div>
    );
  }
}

export default BrainLoadChart;
