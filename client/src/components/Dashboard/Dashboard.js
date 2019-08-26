import React from 'react';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import HeadAcceleratedEvnt from '../HeadAccelerationEvents/HeadAccelerationEvnt';
import 'jquery';

import { svgToInline } from '../../config/InlineSvgFromImg';

import '../Buttons/Buttons.css';
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }

 
  componentDidUpdate() {
    svgToInline();
  }

  render() {
    return (
      <div className={`container dashboard`}>
        <PlayerDetails />
        <HeadAcceleratedEvnt/>
      </div>
    );
  }
}

export default Dashboard;
