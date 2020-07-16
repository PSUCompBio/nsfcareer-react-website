import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PlayerDetails from '../../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../../DashboardEventsChart/CumulativeEvents';
import CumulativeEventsAccelerationEvents from '../../DashboardEventsChart/CumulativeEventsAccelerationEvents';
import HeadAccelerationEvents from '../../DashboardEventsChart/HeadAccelerationEvents';
import { svgToInline } from '../../../config/InlineSvgFromImg';
import HeadLinearAccelerationAllEvents from '../../DashboardEventsChart/HeadLinearAccelerationAllEvents';
import HeadAngularAccelerationAllEvents from '../../DashboardEventsChart/HeadAngularAccelerationAllEvents';

import DarkMode from '../../DarkMode';
import Footer from '../../Footer';
import 'jquery';
import '../../Buttons/Buttons.css';
import '.././Dashboard.css';
import {
  getUserDetails,
  getUserDBDetails,
  isAuthenticated,
  getCumulativeAccelerationData,
  getSimulationFilesOfPlayer,
  getAllCumulativeAccelerationTimeRecords,
  getBrainSimulationMovie
} from '../../../apis';

import { Form } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../../reducer';


class BrainSimulationDetails extends React.Component {
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
      movie_link: ''
 
    };
  }

  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };


 
  render() {
    console.log('props',this.props.location.state)
    const isLoaded = this.state.user;
    console.log(this.state.user);
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    if (!this.props.location.state) {
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

        <div className="container dashboard UserDashboarForAdmin-page-navigation brain-simlation-details">

            <div className="container">
              <div className="row">
                
                <div className="col-md-12 col-lg-12">
                  <div className="backbutton">
                    <Link 
                      to={{
                        pathname: '/TeamAdmin/user/dashboard/',
                       state: this.props.location.state.state
                    }}
                    >&lt; Back To Player
                    </Link>
                  </div>
                  <h1 className="top-heading__login brain-simlation-details-title" >Brain Simulation Details</h1>
                  <h4 className="brain-simlation-details-subtitle">Player and Impact Number Details</h4>
                </div>
                <div className="col-md-12"> 
                  <div className="user-simlation-details">
                    <p>Name: {this.props.location.state.data.sensor_data.player['first-name'] +' '+this.props.location.state.data.sensor_data.player['last-name'] }</p>
                    <p>Impact ID: </p>
                    <p>Position: {this.props.location.state.data.sensor_data.player['position']}</p>
                  </div>
                </div>

                {/*Graph section start*/}
                <div className="col-md-12 col-lg-12 brain-simlation-details-graph">
                  <h4 className="brain-simlation-details-subtitle">Input From Sensor</h4>
                  <div className="col-md-6" style={{'float':'left'}}>
                    <HeadLinearAccelerationAllEvents  key={this.props.location.state.data} data={this.props.location.state.data} state={this.props.location.state.state}/>
                  </div>
                  <div className="col-md-6" style={{'float':'left'}}>
                    <HeadAngularAccelerationAllEvents  key={this.props.location.state.data} data={this.props.location.state.data} state={this.props.location.state.state}/>
                    
                  </div>
                </div>
                {/*Graph section end*/}

                {/*Movie section start*/}
                  <div className="col-md-12 col-lg-12 brain-simlation-details-movie">
                    <h4 className="brain-simlation-details-subtitle">Skull Kinematics Movie Based on Sensor Data</h4>
                    <div className="col-md-12">
                      <div className="movie">
                       {this.state.movie_link &&
                        <video src={this.state.movie_link} style={{'width':'100%'}} controls></video>
                       }
                      </div>
                    </div>
                  </div>
                {/*Movie section start*/}

                {/*Injury metrics section start */}
                <div className="col-md-12 col-lg-12 brain-simlation-details-metrics">
                    <h4 className="brain-simlation-details-subtitle">Resulting Predicted Injury Metrics</h4>
                    <div className="col-md-12">
                      <div className="metrics">
                          <div className="col-md-12">
                            <button className="btn btn-primary">Injury Metrics</button><br/>
                            <button className="btn gray">MPS</button>
                            <button className="btn gray">CSDM</button>
                            <button className="btn gray">MASxSR<sub>15</sub></button>
                          </div>
                          <div className="col-md-12">
                            <img class="img-fluid svg" width="100%" height="60%" src={this.props.location.state.data.simulation_image ? 'data:image/png;base64,' + this.props.location.state.data.simulation_image : '/img/icon/brainEvnt.svg'} alt="" />
                            
                          </div>
                      </div>
                    </div>
                </div>
                {/*Injury metrics section start */}

              </div>
            </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
  componentDidMount() {
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        
          if (value.data.message === 'success') {
            getUserDBDetails()
              .then((response) => {
                  this.setState({
                      user: true,
                      userDetails: response.data.data,
                  })
                  getBrainSimulationMovie(this.props.location.state.data.sensor_data.image_id).then((response) => {
                  console.log('movie_link',response)
                    this.setState({
                        movie_link:response.data.movie_link,
                        isAuthenticated: true,
                        isCheckingAuth: false
                    });
                  }).catch((error) => {
                    this.setState({
                        userDetails: {},
                        isCheckingAuth: false
                    });
                });
              }).catch((error) => {
                  this.setState({
                      userDetails: {},
                      isCheckingAuth: false
                  });
              });
          }
          else {
             this.setState({
                userDetails: {},
                isCheckingAuth: false
            });
          }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
  }
}

export default BrainSimulationDetails;
