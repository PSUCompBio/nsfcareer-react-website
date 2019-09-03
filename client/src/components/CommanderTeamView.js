import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';

class CommanderTeamView extends React.Component {
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
      <React.Fragment>
        <div className="container t-roster pt-5 mt-5">
          <div className="row">
            <div className="col-md-7">
              <p className="penstate">York tech Football</p>
            </div>
            <div className="col-md-5 d-flex justify-content-center align-items-center">
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

          <div className="row text-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="season-position text-right ">
                    <select name="" id="">
                      <option value="">All session</option>
                      <option value="">York tech football</option>
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                    </select>
                    <select name="" id="">
                      <option value="">All position</option>
                      <option value="">York tech football</option>
                      <option value="">Lorem lipsum</option>
                      <option value="">York tech football</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 current-roster-card mb-5 mt-4 p-0">
                  <div className="rostar-selector">
                    <RostarBtn
                      tabActive={this.toggleTab}
                      makeActive={this.state.tabActive}
                      getBtn={this.getTargetBtn}
                      currentBtn={this.state.targetBtn}
                      content="Overview"
                    />
                    <RostarBtn
                      tabActive={this.toggleTab}
                      makeActive={this.state.tabActive}
                      getBtn={this.getTargetBtn}
                      currentBtn={this.state.targetBtn}
                      content="Roster"
                    />
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-6">
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
                    </div>

                    <div className="col-md-6">
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
              </div>
            </div>
            <div className="col-md-4 pt-5 mb-3"></div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CommanderTeamView;
