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
  getCumulativeAccelerationData,
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
    // console.log('User Dashboard For Admin Is ',this.props);
    console.log("USER DASHBOARD PROPS", this.props)
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

        <div className="container dashboard player-top-margin-20-mobile">
          <CumulativeEventsAccelerationEvents  team={this.props.location.state.team} user={this.state.user} is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded} imageUrl={this.state.user.profile_picture_url} data={this.state.cumulativeAccelerationEventData}/>
            <p
          ref="h1"
          style={{
              paddingLeft : "0px"
          }}
          className="player-dashboard-sub-head">
          Individual Head Acceleration Events
          </p>

          {this.state.cumulativeAccelerationTimeAllRecords.map(item => (

              <HeadAccelerationAllEvents key={item} is_selfie_simulation_file_uploaded={this.state.user.is_selfie_simulation_file_uploaded} imageUrl={this.state.user.simulation_file_url} data={item}/>
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
            getCumulativeAccelerationData({user_cognito_id: this.props.location.state.user_cognito_id, organization:this.props.location.state.team.organization, player_id : this.props.location.state.player_name, team : this.props.location.state.team.team_name })
              .then(response => {
                  this.setState({
                    cumulativeAccelerationEventData : { ...this.state.cumulativeAccelerationEventData, ...response.data.data, brand : this.props.location.state.team.brand, team : this.props.location.state.team.team_name, user_cognito_id: this.props.location.state.user_cognito_id, organization:this.props.location.state.team.organization, staff:this.props.location.state.team.staff, player_id : this.props.location.state.player_name}
                  });
                  return getAllCumulativeAccelerationTimeRecords({user_cognito_id: this.props.location.state.user_cognito_id, organization:this.props.location.state.team.organization, player_id : this.props.location.state.player_name, team : this.props.location.state.team.team_name })
              })
             
              .then(response => {
                  console.log(response.data);
                  this.setState({
                    cumulativeAccelerationTimeAllRecords: this.state.cumulativeAccelerationTimeAllRecords.concat(response.data.data)
                  });

                  if(!this.props.location.state.isRedirectedFromAdminPanel){
                    getUserDetails({user_cognito_id : this.props.location.state.cognito_user_id })
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
                else{
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
