import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import DashboardDropdownSelector from './DashboardDropdownSelector';
import { getStatusOfDarkmode } from '../reducer';
import CommanderDataTable from './CommanderDataTable';


class OrganizationAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      highestLoadCount: 0.046,
      impactCount: 3,
      tabActive: 0,
      targetBtn: '',
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
      
      this.refs.parentChildTop1.style.borderBottom = '0.5px solid #e8e8e8'
      this.refs.parentChildTop2.style.borderBottom = '0.5px solid #e8e8e8'
      this.refs.parentChildLeft1.style.borderRight = '0.5px solid #e8e8e8'
      this.refs.parentChildLeft2.style.borderRight = '0.5px solid #e8e8e8'
      
      for (let i = 1; i <= 10; i++){
        this.refs['h' + i].style.color = '#fff';
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div ref="rosterContainer" className="container t-roster pt-5 mt-5">
        <PenstateUniversity/>
          <div className="row text-center">
            <div className="col-md-9">
              <DashboardDropdownSelector/>
               <div className="row">
                <div ref="cardContainer" className="col-md-12 current-roster-card mb-5 mt-4 p-0">
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
                    <div ref="smCard1" className="tech-football m-3">
                      <div ref="parentChildTop1" className="football-header">
                        <p ref="h1">York tech football <img src="/img/icon/football.svg" alt=""/></p>
                        <p ref="h2">2 Athletes </p>
                      </div>
                      <div className="football-body d-flex">
                        <div ref="parentChildLeft1" className="body-left-part">
                          <p>1</p>
                          <p ref="h3">Impacts</p>
                        </div>
                        <div className="body-right-part">
                          <p>0</p>
                          <p ref="h4">Alerts</p>
                        </div>
                      </div>
                    </div>
                    <div ref="smCard2" className="tech-football m-3">
                      <div ref="parentChildTop2" className="football-header">
                        <p ref="h5">York tech football <img src="/img/icon/football.svg" alt=""/></p>
                        <p ref="h6">2 Athletes </p>
                      </div>
                      <div className="football-body d-flex">
                        <div ref="parentChildLeft2" className="body-left-part ">
                          <p >2</p>
                          <p ref="h7">Impacts</p>
                        </div>
                        <div className="body-right-part">
                          <p>1</p>
                          <p ref="h8">Alerts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 pt-5 mb-3">
              <div className="highest-load mb-5">
                <div ref="loadCardParent" className="card">
                  <div ref="loadCard" className="load-heading">HIGHEST LOAD</div>
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
                  <div ref="impactCard" className="impact-heading">MOST IMPACTS</div>
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
