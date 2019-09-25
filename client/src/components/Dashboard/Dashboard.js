import React from 'react';
import { Redirect } from 'react-router-dom';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../DashboardEventsChart/CumulativeEvents';
import HeadAccelerationEvents from '../DashboardEventsChart/HeadAccelerationEvents';
import { svgToInline } from '../../config/InlineSvgFromImg';
import DarkMode from '../DarkMode';
import Footer from '../Footer';
import 'jquery';
import '../Buttons/Buttons.css';
import './Dashboard.css';
import {
  getUserDetails,
  isAuthenticated,
  getCumulativeEventPressureData,
  getHeadAccelerationEvents,
  getCumulativeEventLoadData
} from '../../apis';
import Spinner from '../Spinner/Spinner';
import { getStatusOfDarkmode } from '../../reducer';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,
      cumulativeEventData: {},
      headAccelerationEventsData: {},
      cumulativeEventLoadData: {}
    };
  }

  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  render() {
    const isLoaded = this.state.user;
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    if (!isLoaded) return <Spinner />;
    return (
      <React.Fragment>
        <div id="dashboard" className="container dashboard">
          <PlayerDetails user={this.state.user} />

          <CumulativeEvents
            loadData={this.state.cumulativeEventLoadData}
            data={this.state.cumulativeEventData}
          />
          <HeadAccelerationEvents
            data={this.state.headAccelerationEventsData}
          />
          <div className="row text-center pt-5 pb-5 mt-5 mb-5 animated fadeInUp">
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
  componentDidMount() {
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        if (value.data.message === 'success') {
          getCumulativeEventPressureData(JSON.stringify({}))
            .then((response) => {
              console.log(response.data.data);
              this.setState({
                cumulativeEventData: {
                  ...this.state.cumulativeEventData,
                  ...response.data.data
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });

          getHeadAccelerationEvents(JSON.stringify({}))
            .then((response) => {
              console.log('Head aceleration data', response.data.data);
              this.setState({
                headAccelerationEventsData: {
                  ...this.state.headAccelerationEventsData,
                  ...response.data.data
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });

          getCumulativeEventLoadData(JSON.stringify({}))
            .then((response) => {
              console.log('Load event data', response.data.data);
              this.setState({
                cumulativeEventLoadData: {
                  ...this.state.cumulativeEventLoadData,
                  ...response.data.data
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });

          getUserDetails()
            .then((response) => {
              console.log(response.data);
              this.setState({
                user: response.data.data,
                isLoading: false,
                isAuthenticated: true,
                isCheckingAuth: false
              });

              // User is authenticate hence load chart data
            })
            .catch((error) => {
              this.setState({
                user: {},
                isLoading: false,
                isCheckingAuth: false
              });
            });
        } else {
          this.setState({ isAuthenticated: false, isCheckingAuth: false });
        }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
    if (getStatusOfDarkmode().status) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
    }
  }
}

export default Dashboard;
