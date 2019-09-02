import React from 'react';
import RostarBtn from './Buttons/RostarBtn';


class TeamRoaster extends React.Component {
  constructor() {
    super();
    this.state = {
      team: 2,
      athletes: 6,
      staff: 8,
      highestLoadCount: 0.046,
      impactCount: 3
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 mt-5">
          <div className="row">
            <div className="col-md-7">
              <p className="penstate">Penn State University Research</p>
            </div>
            <div className="col-md-5 d-flex justify-content-center align-items-center">
              <div className="counter-container ml-md-auto mr-md-auto text-center">
                <div className="counter mb-2 ">
                  <p>{this.state.team}</p>
                </div>
                <p>Team</p>
              </div>
              <div className="counter-container ml-md-auto mr-md-auto text-center">
                <div className="counter mb-2 ">
                  <p> {this.state.athletes} </p>
                </div>
                <p>thletes</p>
              </div>
              <div className="counter-container ml-md-auto mr-md-auto text-center">
                <div className="counter mb-2 ">
                  <p> {this.state.staff} </p>
                </div>
                <p>Staff</p>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <div className="current-rostar-selector d-flex">
                    <p>Current roster</p>
                    <select name="" id="">
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="season-position d-flex">
                  <select name="" id="">
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                    </select>
                    <select name="" id="">
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 current-roster-card p-0">
                  <div className="rostar-selector">
                    <RostarBtn content="Overview" />
                    <RostarBtn content="staff" />                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 tech-fotball">

                </div>
                <div className="col-sm-4 tech-fotball"></div>
                <div className="col-sm-4"></div>
              </div>
            </div>
            <div className="col-md-3 pt-5 mb-3">
              <div className="highest-load mb-5">
                <div className="card">
                  <div className="load-heading">HIGHEST LOAD</div>
                  <p className="mt-4 ">
                    John Sylvester <span>- York Tech football</span>
                  </p>
                  <div className="load-count mt-3 mb-3">
                    {this.state.highestLoadCount}
                  </div>
                </div>
              </div>

              <div className="most-impacts">
                <div className="card">
                  <div className="impact-heading">MOST IMPACTS</div>
                  <p className="mt-4">
                    John Sylvester <span>- York Tech football</span>
                  </p>
                  <div className="impact-count mt-3 mb-3">
                    {this.state.impactCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TeamRoaster;
