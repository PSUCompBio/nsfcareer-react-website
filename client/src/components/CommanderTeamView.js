import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';

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
          <PenstateUniversity />
          <div className="row text-center">
            <div className="col-md-8">
              <div className="row mt-3">
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
                      <div className="highest-load ml-3 mr-3 mt-3 mb-5">
                        <div className="card">
                          <div className="load-heading highest-load-height">HIGHEST LOAD</div>
                          <p className="mt-4 ">
                            John Sylvester <span>- York Tech football</span>
                          </p>

                          <div className="text-center">
                          <div className="progress--circle progress--5">
                            <div className="progress__number">0.046</div>
                          </div>
                          </div>

                          <div className="load-count mt-3 mb-3">
                            {this.state.highestLoadCount}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="most-impacts ml-3 mr-3 mt-3 mb-5">
                        <div className="card commander-tv-height">
                          <div className="impact-heading most-impacts-height">MOST IMPACTS</div>
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
              <div className="row mt-2">
                <div className="col-md-12 pb-2  text-left">
                  <button type="btn" className="impact-sumary-btn">
                    Impact Summary
                  </button>
                </div>
              </div>
              <div className="impact-summary-card">
                <img
                  className="img-fluid"
                  src="/img/icon/impactSummary.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="col-md-12">
              <div className="text-left">
                <button type="btn" className="impact-sumary-btn">
                  Impact History
                </button>
              </div>
              <div className="impact-history-card p-4">
                <img className="img-fluid" src="/img/icon/impactHistory.svg" alt="" />
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
