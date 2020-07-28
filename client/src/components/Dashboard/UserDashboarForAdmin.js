import React from 'react';
import { Redirect } from 'react-router-dom';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../DashboardEventsChart/CumulativeEvents';
import CumulativeEventsAccelerationEvents from '../DashboardEventsChart/CumulativeEventsAccelerationEvents';
import HeadAccelerationEvents from '../DashboardEventsChart/HeadAccelerationEvents';
import HeadAccelerationAllEvents from '../DashboardEventsChart/HeadAccelerationAllEvents';
import { svgToInline } from '../../config/InlineSvgFromImg';
// import DarkMode from '../DarkMode';
import Footer from '../Footer';
import 'jquery';
import '../Buttons/Buttons.css';
import './Dashboard.css';
import {
  getUserDetails,
  isAuthenticated,
  getCumulativeAccelerationData,
  getSimulationFilesOfPlayer,
  getAllCumulativeAccelerationTimeRecords
} from '../../apis';

import { Form } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../reducer';


class UserDashboarForAdmin extends React.Component {
  constructor(props) {
    super(props);
    // console.log('User Dashboard For Admin Is ',this.props);
    console.log("USER DASHBOARD PROPS", this.props)
    this.state = {
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,
      linearUnit: 'gs',
      linearUnitGsActive: true,
      linearUnitMsActive: false,
      cumulativeEventData: {},
      headAccelerationEventsData: {},
      cumulativeEventLoadData: {},
      cumulativeAccelerationEventData: {},
      cumulativeAccelerationTimeData: {},
      eventsDate: [],
      eventDateValue: '-1',
      simulationFilePaths: null,
      cumulativeAccelerationTimeAllRecords: [],
      frontal_Lobe: []
    };
  }

  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  onDateChange = (event) => {
    this.setState({ eventDateValue: event.target.value });
    console.log("Value changed", event.target.value);
    this.setState({
      simulationFilePaths: []
    })
    if (event.target.value != "-1") {
      getSimulationFilesOfPlayer({ path: event.target.value })
        .then(response => {
          console.log("STATE IS ", this.state.simulationFilePaths);
          this.setState({
            simulationFilePaths: this.state.simulationFilePaths.concat(response.data.data)
          })
          console.log("AFTER FIX IS ", this.state.simulationFilePaths);
        })
        .catch(err => {
          alert("Internal Server Error !");
        })
    }
  }

  handleLinearUnit = (unit) => {

    if (this.state.linearUnit !== unit) {
      if (unit === 'gs') {
        this.setState({
          linearUnitGsActive: true,
          linearUnitMsActive: false
        });
      } else {
        this.setState({
          linearUnitGsActive: false,
          linearUnitMsActive: true
        });
      }
  
      this.setState({
          linearUnit: unit
      });
    }
  }

  render() {
    console.log('this.props.location.state',this.props.location.state)
    const isLoaded = this.state.user;
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    if (!isLoaded) return <Spinner />;
    return (
      <React.Fragment>
        <div className="center-scroll-up-mobile">
          <ScrollToTop

            showUnder={120}
            style={{
              zIndex: "99"
            }}
          >
            <div

              className=" d-flex align-items-center justify-content-center "
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#0f81dc",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.14)",
                alignItems: "center !important"

              }}
            >
              <img src="/img/icon/arrowUp.svg" alt="" />
            </div>
            <div
              style={{

                color: "#0f81dc",
                backgroundColor: "transparent",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <p className="hide-widget-in-mobile">Back to top</p>
            </div>


          </ScrollToTop>
        </div>

        <div className="container dashboard UserDashboarForAdmin-page-navigation">
        <CumulativeEventsAccelerationEvents frontal_Lobe={this.state.frontal_Lobe} team={this.props.location.state.team} user={this.state.user} is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded} imageUrl={this.state.user.profile_picture_url} data={this.state.cumulativeAccelerationEventData} />
         
          <p
            ref="h1"
            style={{
              paddingLeft: "0px"
            }}
            className="player-dashboard-sub-head Individual-Head-Acceleration-player-dash">
            Individual Head Acceleration Events
          </p>
          <div className="row">
            <div className="col-md-12 player-dash-chart-setting">
              <div className="col-md-12">
                <h1 className="">Settings</h1>
              </div>
              <div className="col-md-12" >
                    <div className="col-md-12" style={{'float':'left'}}>
                      <div className="col-md-4" style={{'float':'left'}}>
                        <h4>Linear Acceleration Units: </h4>
                      </div>
                      <div className="col-md-8"  style={{'float':'left'}}>
                        <div className="linear_section">
                          <button onClick={() => this.handleLinearUnit('gs')} className={this.state.linearUnitGsActive ? 'linear_units active settings-buttons settings-buttons-active' : 'linear_units settings-buttons'} >Gs</button> 
                          <button onClick={() => this.handleLinearUnit('ms')} className={this.state.linearUnitMsActive ? 'linear_units active settings-buttons settings-buttons-active' : 'linear_units settings-buttons'} >m/s<sup>2</sup></button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12" style={{'float':'left'}}>
                      <div className="col-md-4" style={{'float':'left'}}>
                        <h4>Injury Metric: </h4>
                      </div>
                      <div className="col-md-8"  style={{'float':'left'}}>
                        <div className="injury_matrix_section">
                          <button className="injury_mat active" className="settings-buttons settings-buttons-active">MPS</button>
                          <button className="injury_mat" className="settings-buttons">Axonal Strain</button>
                          <button className="injury_mat" className="settings-buttons" >CSDM</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
          {this.state.cumulativeAccelerationTimeAllRecords.map((item, index) => (

            <HeadAccelerationAllEvents key={index} linearUnit={this.state.linearUnit} is_selfie_simulation_file_uploaded={this.state.user.is_selfie_simulation_file_uploaded} imageUrl={this.state.user.simulation_file_url} data={item} state={this.props.location.state}/>
          ))
          }
        </div>
        <Footer />
      </React.Fragment>
    );
  }
  componentDidMount() {
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        if (value.data.message === 'success') {
          getCumulativeAccelerationData({ brand: this.props.location.state.team.brand, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, player_id: this.props.location.state.player_name, team: this.props.location.state.team.team_name })
            .then(response => {
              this.setState({
                cumulativeAccelerationEventData: { ...this.state.cumulativeAccelerationEventData, ...response.data.data, brand: this.props.location.state.team.brand, team: this.props.location.state.team.team_name, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, staff: this.props.location.state.team.staff, player_id: this.props.location.state.player_name }
              });
              return getAllCumulativeAccelerationTimeRecords({ brand: this.props.location.state.team.brand, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, player_id: this.props.location.state.player_name, team: this.props.location.state.team.team_name })
            })

            .then(response => {
              console.log(response.data);
              this.setState({
                cumulativeAccelerationTimeAllRecords: this.state.cumulativeAccelerationTimeAllRecords.concat(response.data.data),
                frontal_Lobe: response.data.frontal_Lobe
              });

              if (!this.props.location.state.isRedirectedFromAdminPanel) {
                getUserDetails({ user_cognito_id: this.props.location.state.cognito_user_id })
                  .then(response => {
                    delete response.data.data.is_selfie_image_uploaded;
                    delete response.data.data.is_selfie_simulation_file_uploaded;
                    delete response.data.data.is_selfie_model_uploaded;
                    delete response.data.data.profile_picture_url
                    delete response.data.data.simulation_file_url
                    this.setState({
                      user: response.data.data,
                      isLoading: false,
                      isAuthenticated: true,
                      isCheckingAuth: false
                    });
                  })
                  .catch(err => {
                    this.setState({
                      user: {},
                      isLoading: false,
                      isCheckingAuth: false
                    });
                  })
              }
              else {
                this.setState({
                  user: response.data.data,
                  isLoading: false,
                  isAuthenticated: true,
                  isCheckingAuth: false
                });
              }
            })

            .catch((error) => {

              console.log(error);

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
      })
    if (getStatusOfDarkmode().status) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
    }

  }
}

export default UserDashboarForAdmin;
