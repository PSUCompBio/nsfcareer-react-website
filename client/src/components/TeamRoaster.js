import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';

class TeamRoaster extends React.Component {
  constructor() {
    super();
    this.state = {
      team: 2,
      athletes: 6,
      staff: 8,
      highestLoadCount: 0.046,
      impactCount: 3,
      tabActive: 0,
      targetBtn: '',
      rosterValue: 'Lorem ipsum',
      visibilityRosterValueSelector: { display: 'none' }
    };
  }
  toggleTab = (value) => {
    this.setState({ tabActive: value });
  };

  getTargetBtn = (value) => {
    this.setState({ targetBtn: value });
  };
  setRosterValue = (e) => {
    this.setState({
      rosterValue: e.currentTarget.dataset.item
    });
  };
  makeVisibleSelector = () => {
    if (this.state.visibilityRosterValueSelector.display === 'none')
      this.setState({ visibilityRosterValueSelector: { display: 'block' } });
    else this.setState({ visibilityRosterValueSelector: { display: 'none' } });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container t-roster pt-5 mt-5">
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
                    <span>
                      <img
                        className="w-75"
                        src="/img/icon/breadcrumb.svg"
                        alt=""
                      />
                    </span>
                    <div
                      onClick={this.makeVisibleSelector}
                      className="roster-value-container"
                    >
                      {this.state.rosterValue}
                      <div
                        style={this.state.visibilityRosterValueSelector}
                        className="roster-value-set"
                      >
                        <div className="roster-arrow"></div>
                        <ul>
                          <li
                            data-item="Lorem lipsum"
                            onClick={this.setRosterValue}
                          >
                            Lorem lipsum
                          </li>
                          <li
                            data-item="York tech football"
                            onClick={this.setRosterValue}
                          >
                            York tech football
                          </li>
                          <li
                            data-item="Lorem lipsum"
                            onClick={this.setRosterValue}
                          >
                            Lorem lipsum
                          </li>
                          <li
                            data-item="York tech football"
                            onClick={this.setRosterValue}
                          >
                            York tech football
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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
                      content="staff"
                    />
                  </div>
                  <div className="football-container pt-5 d-flex">
                    <div className="tech-football m-3">
                      <div className="football-header">
                        <p>York tech football</p>
                        <p>2 Athletes </p>
                      </div>
                      <div className="football-body d-flex">
                        <div className="body-left-part">
                          <p>1</p>
                          <p>Impacts</p>
                        </div>
                        <div className="body-right-part">
                          <p>0</p>
                          <p>Alerts</p>
                        </div>
                      </div>
                    </div>
                    <div className="tech-football m-3">
                      <div className="football-header">
                        <p>York tech football</p>
                        <p>2 Athletes </p>
                      </div>
                      <div className="football-body d-flex">
                        <div className="body-left-part ">
                          <p>2</p>
                          <p>Impacts</p>
                        </div>
                        <div className="body-right-part">
                          <p>1</p>
                          <p>Alerts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        <Footer />
      </React.Fragment>
    );
  }
}

export default TeamRoaster;
