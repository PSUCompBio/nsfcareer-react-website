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
              <div className="sport-roster-container d-flex items-align-center jsutify-content-center">
                <div className="sport text-center">
                  <p>Sport</p>
                  <img src="/img/icon/football.svg" alt=""/>
                </div>
                <div className="roster text-center">
                  <p>Rostered</p>
                  <p>2</p>
                </div>
              </div>
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
                <div className="col-md-12 commander-view-card mb-5 mt-4 p-0">
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
            <div className="col-md-4 pt-5 mb-3">
              <div className="row">
                <div className="col-md-12 text-left">
                  <button type="btn" className="impact-sumary-btn">Impact Summary</button>
                </div>
              </div>
              <div className="impact-summary-card">
              <img className="img-fluid" src="/img/icon/impactSummary.svg" alt=""/>
                </div>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="col-md-12">
              <div className="text-left">
              <button type="btn" className="impact-sumary-btn">Impact History</button>
              </div>
              <div className="impact-history-card p-4">
              <img src="/img/icon/impactHistory.svg" alt=""/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CommanderTeamView;
