import React from 'react';
import { Redirect } from 'react-router-dom';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../DashboardEventsChart/CumulativeEvents';
import CumulativeEventsAccelerationEvents from '../DashboardEventsChart/CumulativeEventsAccelerationEvents';
import HeadAccelerationEvents from '../DashboardEventsChart/HeadAccelerationEvents';
import HeadAccelerationAllEvents from '../DashboardEventsChart/HeadAccelerationAllEvents';
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
  getCumulativeEventLoadData,
  getCumulativeAccelerationData,
  getCumulativeAccelerationTimeData,
  getSimulationFilePath,
  getSimulationFilesOfPlayer,
  getAllCumulativeAccelerationTimeRecords
} from '../../apis';

import { Form } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../Spinner/Spinner';

import ScrollToTop  from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../reducer';


class UserDashboarForAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,
      cumulativeEventData: {},
      headAccelerationEventsData: {},
      cumulativeEventLoadData: {},
      cumulativeAccelerationEventData : {},
      cumulativeAccelerationTimeData : {},
      eventsDate : [],
      eventDateValue : '-1',
      simulationFilePaths : null,
      cumulativeAccelerationTimeAllRecords : []
    };
    console.log("THIS IS PROPS ",this.props.location)
  }

  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  onDateChange = (event) => {
         this.setState({eventDateValue: event.target.value});
         console.log("Value changed", event.target.value);
         this.setState({
             simulationFilePaths : []
         })
         if(event.target.value !="-1"){
         getSimulationFilesOfPlayer({path : event.target.value})
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

  render() {
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
                  zIndex : "99"
              }}
              >
              <div

                className=" d-flex align-items-center justify-content-center "
                style={{
                    width : "50px",
                    height : "50px",
                    backgroundColor: "#0f81dc",
                    marginLeft : "auto",
                    marginRight : "auto",
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
                      backgroundColor : "transparent",
                      marginLeft : "auto",
                      marginRight : "auto"
                  }}
                  >
                  <p className="hide-widget-in-mobile">Back to top</p>
              </div>


</ScrollToTop>
</div>

        <div id="dashboard" className="container dashboard player-top-margin-20-mobile">
          {/*<PlayerDetails user={this.state.user} />*/}
          {/*
          <div className="row p-4 mb-5 player-details animated fadeInDown player-top-margin-20-mobile">
            <div className="col-md-6 player-name">
              <p ref="p1">
                Player Name :
                <span>
                  {` ${this.props.location.state.player_name} `}
                </span>
              </p>
              <p ref="p2">
                Player ID :<span>{this.props.location.state.cognito_user_id}</span>
              </p>
            </div>
            <div className="col-md-4 ">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control onChange={this.onDateChange} className="player-date-selection-button"  value={this.state.eventDateValue} as="select">
                      <option value="-1">Please Select Event Date</option>
                          {this.state.eventsDate.map(item => (

                              <option key={item} value={item}>{item.split("/")[ 2 ]}</option>
                            ))}
                    </Form.Control>
                  </Form.Group>
            </div>
            </div>
            */}

                {this.state.simulationFilePaths && this.state.simulationFilePaths.length !=0 ?
                    <div className="row card   player-details">
                        <div className="col-md-6" width="30%">
                    <Carousel>
                        {this.state.simulationFilePaths.map((item, index) => (

                            <div>
                                <img key={index} src={item} />
                                <p className="legend">{index}</p>
                            </div>
                          ))}

                    </Carousel>
                    </div>
                    <div className="col-auto"> ALL IMPACT RELATED INFO HERE</div>
                    </div>


                    : null
                }





          <CumulativeEventsAccelerationEvents  is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded} imageUrl={this.state.user.profile_picture_url} loadData={this.state.cumulativeAccelerationTimeData} data={this.state.cumulativeAccelerationEventData}/>
          {/* <CumulativeEvents  is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded} imageUrl={this.state.user.profile_picture_url} loadData={this.state.cumulativeEventLoadData} data={this.state.cumulativeEventData}/>*/}

          {this.state.cumulativeAccelerationTimeAllRecords.map(item => (

              <HeadAccelerationAllEvents key={item} is_selfie_simulation_file_uploaded={this.state.user.is_selfie_simulation_file_uploaded} imageUrl={this.state.user.simulation_file_url} data={item}/>
            ))}

          {/*<HeadAccelerationEvents is_selfie_simulation_file_uploaded={this.state.user.is_selfie_simulation_file_uploaded} imageUrl={this.state.user.simulation_file_url} data={this.state.headAccelerationEventsData}/>*/}

          {/*<div className="row text-center pt-5 pb-5 mt-5 mb-5 animated fadeInUp">
            <div className="col-md-12 goto-top d-flex align-items-center justify-content-center position-relative">
              <div
                onClick={this.gotoTop}
                className=" d-flex align-items-center justify-content-center "
              >
                <img src="/img/icon/arrowUp.svg" alt="" />
              </div>
              <p>Back to top</p>
            </div>
        </div>*/}
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
              getCumulativeAccelerationTimeData({player_id : this.props.location.state.player_name, team : "York Tech Football" })
              .then(response => {
                  this.setState({
                      cumulativeAccelerationTimeData : { ...this.state.cumulativeAccelerationTimeData, ...response.data.data }
                  });
                    return getCumulativeAccelerationData({player_id : this.props.location.state.player_name, team : "York Tech Football" })
              })
              .then(response => {

                  this.setState({
                      cumulativeAccelerationEventData : { ...this.state.cumulativeAccelerationEventData, ...response.data.data, team : "York Tech Football" }
                  });
                    return getCumulativeEventPressureData(JSON.stringify({}))
              })
              .then(response => {
                  console.log(response.data);
                  this.setState({
                      cumulativeEventData : { ...this.state.cumulativeEventData, ...response.data.data, team : "York Tech Football" }
                  });
                  return getHeadAccelerationEvents({player_id : this.props.location.state.player_name, team : "York Tech Football" })
              })
              .then(response => {
                  console.log("Head aceleration data",response.data);
                  this.setState({
                      headAccelerationEventsData : { ...this.state.headAccelerationEventsData, ...response.data.data, team : "York Tech Football" }
                  });
                  return getSimulationFilePath({player_id : this.props.location.state.player_name.split(" ").join("-") })

              })
              .then(response => {
                  this.setState({
                        eventsDate: this.state.eventsDate.concat(response.data.data)
                })
                return getAllCumulativeAccelerationTimeRecords({player_id : this.props.location.state.player_name, team : "York Tech Football" })

              })
              .then(response => {
                  this.setState({
                        cumulativeAccelerationTimeAllRecords: this.state.cumulativeAccelerationTimeAllRecords.concat(response.data.data)
                })
                    return getCumulativeEventLoadData(JSON.stringify({}))
              })
              .then(response => {
                  console.log("Load event data",response.data);
                  this.setState({
                      cumulativeEventLoadData : { ...this.state.cumulativeEventLoadData, ...response.data.data }
                  });
                  {/*return getUserDetails()*/}

                  this.setState({
                    user: response.data.data,
                    isLoading: false,
                    isAuthenticated: true,
                    isCheckingAuth: false
                  });
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
