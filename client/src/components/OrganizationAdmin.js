import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import DashboardDropdownSelector from './DashboardDropdownSelector';
import { getStatusOfDarkmode } from '../reducer';

class OrganizationAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      highestLoadCount: 0.046,
      impactCount: 3,
      tabActive: 0,
      targetBtn: ''
    };
  }
  toggleTab = (value) => {
    this.setState({ tabActive: value });
  };

  getTargetBtn = (value) => {
    this.setState({ targetBtn: value });
  };

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      this.refs.rosterContainer.style.background = '#171b25';
      this.refs.cardContainer.style.background = '#232838';

      this.refs.smCard1.style.background = '#171b25';
      this.refs.smCard2.style.background = '#171b25';

      this.refs.loadCardParent.style.background = 'transparent';

      this.refs.loadCardParent.style.border = '0.5px solid #e8e8e8';
      this.refs.impactCardParent.style.border = '0.5px solid #e8e8e8';

      this.refs.impactCardParent.style.background = 'transparent';

      this.refs.loadCard.style.background = '#171b25';
      this.refs.impactCard.style.background = '#171b25';

      this.refs.parentChildTop1.style.borderBottom = '0.5px solid #e8e8e8';
      this.refs.parentChildTop2.style.borderBottom = '0.5px solid #e8e8e8';
      this.refs.parentChildLeft1.style.borderRight = '0.5px solid #e8e8e8';
      this.refs.parentChildLeft2.style.borderRight = '0.5px solid #e8e8e8';

      for (let i = 1; i <= 10; i++) {
        this.refs['h' + i].style.color = '#fff';
      }
    }
  }

  smallCards = (reference, noOfAthletes, noOfAlerts, noOfImpacts) => {
    return (
      <div ref={reference[0]} className="tech-football m-3">
        <div ref={reference[1]} className="football-header">
          <p ref={reference[2]}>
            York tech football <img src="/img/icon/football.svg" alt="" />
          </p>
          <p ref={reference[3]}>{noOfAthletes} Athletes </p>
        </div>
        <div className="football-body d-flex">
          <div ref={reference[4]} className="body-left-part ">
            <p>{noOfImpacts}</p>
            <p ref={reference[5]}>Impacts</p>
          </div>
          <div className="body-right-part">
            <p>{noOfAlerts}</p>
            <p ref={reference[6]}>Alerts</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div ref="rosterContainer" className="container t-roster pt-5 mt-5">
          <PenstateUniversity />
          <div className="row text-center">
            <div className="col-md-9">
              <DashboardDropdownSelector />
              <div className="row">
                <div
                  ref="cardContainer"
                  className="col-md-12 current-roster-card mb-5 mt-4 p-0"
                >
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
                    {this.smallCards(
                      [
                        'smCard1',
                        'parentChildTop1',
                        'h1',
                        'h2',
                        'parentChildLeft1',
                        'h3',
                        'h4'
                      ],
                      2,
                      2,
                      1
                    )}
                    {this.smallCards(
                      [
                        'smCard2',
                        'parentChildTop2',
                        'h5',
                        'h6',
                        'parentChildLeft2',
                        'h7',
                        'h8'
                      ],
                      2,
                      1,
                      2
                    )}

                    <div className="tech-football m-3">
                      <div className="addTeam text-center">
                        <div className="plus">+</div>
                        <p>Add Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 pt-5 mb-3">
              <div className="highest-load mb-5">
                <div ref="loadCardParent" className="card">
                  <div ref="loadCard" className="load-heading">
                    HIGHEST LOAD
                  </div>
                  <p ref="h9" className="mt-4 ">
                    John Sylvester <span>- York Tech football</span>
                  </p>
                  <div className="load-count mt-3 mb-3">
                    {this.state.highestLoadCount}
                  </div>
                </div>
              </div>

              <div className="most-impacts">
                <div ref="impactCardParent" className="card">
                  <div ref="impactCard" className="impact-heading">
                    MOST IMPACTS
                  </div>
                  <p ref="h10" className="mt-4">
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

export default OrganizationAdmin;
