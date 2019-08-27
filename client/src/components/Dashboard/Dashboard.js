import React from 'react';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../DashboardEventsChart/CumulativeEvents';
import HeadAccelerationEvents from '../DashboardEventsChart/HeadAccelerationEvents';
import HeadAccelerationEventsTwo from '../DashboardEventsChart/HeadAccelerationEvents';
import Footer from '../Footer';
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
      <React.Fragment>
        <div className={`container dashboard`}>
          <PlayerDetails />
          <CumulativeEvents />
          </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
