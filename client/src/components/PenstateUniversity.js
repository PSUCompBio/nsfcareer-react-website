import React from 'react';
import { withRouter } from 'react-router-dom';

class PenstateUniversity extends React.Component {
  constructor() {
    super();
    this.state = {
      circleValues: []
    };
  }

  impactLoadAlertsValue = ()=>{
    if (this.props.location.pathname === '/TeamRoster')
      this.setState({circleValues:[2,6,8]})
    else if (this.props.location.pathname === '/CommanderTeamView')
      this.setState({ circleValues: [2, 0.02, 0] })
      else if (this.props.location.pathname === '/CommanderDataTable')
      this.setState({circleValues:[2,0.02,0]})
  }
  componentWillMount() {
    this.impactLoadAlertsValue();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-7">
          <p className="penstate">
            {this.props.location.pathname === '/TeamRoster' ||
            this.props.location.pathname === '/CommanderDataTable'
              ? 'Penn State University Research'
              : 'York tech Football'}
          </p>
          {this.props.location.pathname === '/CommanderTeamView' ? (
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
          ) : (
            ''
          )}
        </div>
        <div className="col-md-5 d-flex mt-3 justify-content-center align-items-center">
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p>{this.state.circleValues[0]}</p>
            </div>
            <p>Impacts</p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.circleValues[1]} </p>
            </div>
            <p>Avg Load</p>
          </div>
          <div className="counter-container ml-md-auto mr-md-auto text-center">
            <div className="team-view-counter mb-2 ">
              <p> {this.state.circleValues[2]} </p>
            </div>
            <p>Alerts</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PenstateUniversity);
