import React from 'react';
import { withRouter } from 'react-router-dom';
import { getStatusOfDarkmode } from '../reducer';
import { getTeamAdminData } from '../apis';
import DashboardDropdownSelector from './DashboardDropdownSelector';

class PenstateUniversity extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
        adminData : {},
        circleValues : [],
        isFetching : true
    }


  }

  organizationType = () => {
    if (this.props.location.pathname === '/OrganizationAdmin') {
      return 'Team';
    } else if (this.props.location.pathname === '/TeamAdmin') {
      return 'Impact'
    }
  }

  impactLoadAlertsValue = () => {
    if (this.props.location.pathname === '/TeamAdmin') {
      this.setState({ circleValues: [2, 6, 8] });
    } else if (this.props.location.pathname === '/OrganizationAdmin') {
      this.setState({ circleValues: [2, 0.02, 0] });
    }
  };
  componentWillMount() {
    this.impactLoadAlertsValue();
  }
  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      for (let i = 1; i <= 3; i++) {
        this.refs['h' + i].style.color = '#fff';
      }
    }
    getTeamAdminData(JSON.stringify({}))
    .then(response => {
        console.log(response.data.data)
        this.setState({
            adminData : { ...this.state.adminData, ...response.data.data },
            isFetching : false
        });
    })
    .catch(err => {
        console.log(err);
    })
  }

  render() {
      if(this.state.isFetching){
          return <div></div>
      }
    return (
      <div className="row organization-pad__military">
        <div className="col-md-7">
          <p className="penstate">
            {this.props.location.pathname === '/OrganizationAdmin'
              ? 'Penn State University Research'
              : 'York tech Football'}
          </p>

          <div className="sport-roster-container d-flex justify-content-center justify-content-sm-start">
            <div className="sport text-center">
              <p>Sport</p>
              <img src="/img/icon/americanFootball.svg" alt="" />
            </div>
            <div className="roster text-center">
              <p>Rostered</p>
              <p>{this.state.adminData.roster_count}</p>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-flex mt-3 justify-content-center align-items-center">
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p>{this.state.adminData.impacts}</p>
            </div>
            <p ref="h1">Teams</p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.adminData.avg_load} </p>
            </div>
            <p ref="h2">Athelets</p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.adminData.alerts} </p>
            </div>
            <p ref="h3">Staff</p>
          </div>
        </div>
        {this.props.location.pathname === '/OrganizationAdmin' ?
          < DashboardDropdownSelector />
          :
          ''
        }
      </div>
    );
  }
}

export default withRouter(PenstateUniversity);
