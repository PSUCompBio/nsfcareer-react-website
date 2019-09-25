import React from 'react';
import { withRouter } from 'react-router-dom';
import { getStatusOfDarkmode } from '../reducer';
import { getTeamAdminData } from '../apis';
import DashboardDropdownSelector from './DashboardDropdownSelector';
import { compose } from 'redux';
import { connect } from 'react-redux';

class PenstateUniversity extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
        adminData : {},
        circleValues : [],
      isFetching: true,
      penBg: { background: 'transparent' }
    }


  }

  organizationType = () => {
    if (this.props.location.pathname === '/OrganizationAdmin') {
      return 'Team';
    } else if (this.props.location.pathname === '/TeamAdmin') {
      return 'Impact';
    }
  };

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
    var elementStart = 1;
    if (getStatusOfDarkmode().status === true) {
      console.log(this.refs)
      if (this.props.isMilitaryVersionActive) {
        elementStart = 5;
        this.refs.h1.style.color = '#fff';
      }
      for (let i = elementStart; i <= 7; i++) {
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

  checkIfMilitaryModeOn = () => {};

  render() {
      if(!this.state.isFetching){
          return <div></div>
      }
    return (
      <div
        style={this.props.isMilitaryVersionActive ? {} : this.state.penBg}
        className={`row  penstate-university-bg organization-pad__military`}
      >
        <div className="col-md-7 my-auto">
          <p ref="h1" className="penstate">
            {this.props.location.pathname === '/OrganizationAdmin'
              ? 'Penn State University Research'
              : 'York tech Football'}
          </p>

          {this.props.isMilitaryVersionActive ? (
            ''
          ) : (
            <div className="sport-roster-container d-flex justify-content-center justify-content-sm-start">
              <div className="sport text-center">
                <p ref="h2">Sport</p>
                <img src="/img/icon/americanFootball.svg" alt="" />
              </div>
              <div className="roster text-center">
                <p ref="h3">Rostered</p>
                <p ref="h4">{this.state.adminData.roster_count}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-5 d-flex mt-3 justify-content-center align-items-center">
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p>{this.state.adminData.impacts}</p>
            </div>
            <p ref="h5">
              {this.props.isMilitaryVersionActive ? 'Units' : 'Teams'}
            </p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.adminData.avg_load} </p>
            </div>
            <p ref="h6">
              {this.props.isMilitaryVersionActive ? 'soldiers' : 'Athelets'}
            </p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.adminData.alerts} </p>
            </div>
            <p ref="h7">Staff</p>
          </div>
        </div>
        {this.props.location.pathname === '/OrganizationAdmin' &&
        this.props.isMilitaryVersionActive === false ? (
          <DashboardDropdownSelector />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    isMilitaryVersionActive: state.militaryVersion
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(PenstateUniversity);
