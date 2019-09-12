import React from 'react';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../DashboardEventsChart/CumulativeEvents';
import HeadAccelerationEvents from '../DashboardEventsChart/HeadAccelerationEvents';
import { svgToInline } from '../../config/InlineSvgFromImg';
import DarkMode from '../DarkMode';
import Footer from '../Footer';
import 'jquery';
import '../Buttons/Buttons.css';
import './Dashboard.css';
import { getUserDetails } from '../../apis';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null
    };
  }

  componentWillMount() {
    getUserDetails()
      .then((response) => {
        this.setState({ user: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  render() {
    const isLoaded = this.state.user;
    if (!isLoaded) return null;
    return (
      <React.Fragment>
        <div id="dashboard" className="container dashboard">
          <PlayerDetails user={this.state.user} />
          <CumulativeEvents />
          <HeadAccelerationEvents />
          <HeadAccelerationEvents />
          <div className="row text-center pt-5 pb-5 mt-5 mb-5">
            <div className="col-md-12 goto-top d-flex align-items-center justify-content-center position-relative">
              <div
                onClick={this.gotoTop}
                className=" d-flex align-items-center justify-content-center "
              >
                <img src="/img/icon/arrowUp.svg" alt="" />
              </div>
              <p>Back to top</p>
            </div>
          </div>
        </div>
        <DarkMode isDarkMode={this.props.isDarkModeSet} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Dashboard;
