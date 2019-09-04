import React from 'react';
import { withRouter } from 'react-router-dom';

class PenstateUniversity extends React.Component{
  constructor() {
    super();
    this.state = {
      impactCount: 2,
      avgLoad: 0.02,
      alerts: 0
    };
  }

  render() {
    return (
      <div className="row">
      <div className="col-md-7">
          <p className="penstate">York tech Football</p>
          {this.props.location.pathname === '/CommanderTeamView' ?
            <div className="sport-roster-container d-flex justify-content-center justify-content-sm-start">
              <div className="sport text-center">
                <p>Sport</p>
                <img src="/img/icon/football.svg" alt="" />
              </div>
              <div className="roster text-center">
                <p>Rostered</p>
                <p>2</p>
              </div>
            </div>
            :
            ''
          }
      </div>
      <div className="col-md-5 d-flex mt-3 justify-content-center align-items-center">
        <div className="counter-container ml-md-auto mr-md-auto text-center">
          <div className="team-view-counter mb-2 ">
            <p>{this.state.impactCount}</p>
          </div>
          <p>Impacts</p>
        </div>
        <div className="counter-container ml-md-auto mr-md-auto text-center">
          <div className="team-view-counter mb-2 ">
            <p> {this.state.avgLoad} </p>
          </div>
          <p>Avg Load</p>
        </div>
        <div className="counter-container ml-md-auto mr-md-auto text-center">
          <div className="team-view-counter mb-2 ">
            <p> {this.state.alerts} </p>
          </div>
          <p>Alerts</p>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(PenstateUniversity);