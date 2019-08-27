import React from 'react';
import { svgToInline } from '../../config/InlineSvgFromImg';
import BrainStrainChart from '../Charts/BrainStrainChart';
import BrainLoadChart from '../Charts/BrainLoadChart';

class CumulativeEvents extends React.Component {

  constructor() {
    super();
    this.state = {};
  }


  componentDidMount() {
    svgToInline();
  }


  render() {
    return (
      <div className="row cumm mb-5">
        <div className="col-md-6 col-lg-7">
          <BrainStrainChart/>
        </div>
        <div className="col-md-6 col-lg-5  ">
          <BrainLoadChart/>
        </div>
      </div>
    );
  }
}

export default CumulativeEvents;
