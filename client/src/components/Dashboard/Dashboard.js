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

  gotoTop = () => {
    window.scrollTo({top:'0', behavior:'smooth'})
  }

  render() {
    return (
      <React.Fragment>
        <div id="dashboard" className={`container dashboard`}>
          <PlayerDetails />
          <CumulativeEvents />
          <HeadAccelerationEvents />
          <HeadAccelerationEventsTwo />
          <div className="row text-center pt-5 pb-5 mt-5 mb-5">
            <div className="col-md-12 goto-top d-flex align-items-center justify-content-center position-relative">
              <div onClick={this.gotoTop} className=" d-flex align-items-center justify-content-center ">
                <img src="/img/icon/arrowUp.svg" alt="" />
              </div>
              <p>Back to top</p>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Dashboard;
