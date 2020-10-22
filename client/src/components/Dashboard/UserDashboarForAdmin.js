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
  getAllCumulativeAccelerationTimeRecords,
  AllCumulativeAccelerationTimeRecords,
  getAllCumulativeAccelerationJsonData,
  getCumulativeAccelerationTimeRecords
} from '../../apis';

import { Form,Button, Collapse,Accordion, Card } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../reducer';
import $ from 'jquery';

class UserDashboarForAdmin extends React.Component {
  constructor(props) {
    super(props);
    // console.log('User Dashboard For Admin Is ',this.props);
    // console.log("USER DASHBOARD PROPS", this.props)
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
      cumulativeAccelerationTimeAlldata: [],
      frontal_Lobe: [],
      jsonData: '',
      open: false,
      loading: false,
      loaded_data: [],
    };
  }

  componentDidUpdate() {
    console.log('thi props',this.props)
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  onDateChange = (event) => {
    this.setState({ eventDateValue: event.target.value });
    this.setState({
      simulationFilePaths: []
    })
    if (event.target.value != "-1") {
      getSimulationFilesOfPlayer({ path: event.target.value })
        .then(response => {
          this.setState({
            simulationFilePaths: this.state.simulationFilePaths.concat(response.data.data)
          })
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
  handleCollapse =(e)=>{
    let col_id = e.split('$')[1]
    $("#"+col_id).toggleClass('show');
    $("#col_icon"+col_id).toggleClass('rotate-collapse');
    $("#spin_"+col_id).toggleClass('spin_display');
    var loaded_data = this.state.loaded_data;
    if(this.state.loaded_data.indexOf(e) == -1){
      this.setState({loaded_data : this.state.loaded_data.concat(e)});
      this.setState({open: e});
      getCumulativeAccelerationTimeRecords({ brand: this.props.location.state.team.brand, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, player_id: e, team: this.props.location.state.team.team_name })
      .then(res=>{
        console.log('res'+this.props.location.state.user_cognito_id,res);
        this.setState({
           cumulativeAccelerationTimeAlldata: this.state.cumulativeAccelerationTimeAlldata.concat(res.data.data),
           loading: false,

        });
        $("#spin_"+res.data.data[0].sensor_data.player_id.split('$')[1]).toggleClass('spin_display');
      }).catch(err=>{
        console.log('err',err)
      })
    }else{
      this.setState({open: false})
    }
  }

  getDate = (timestamp) => {

      const plus0 = num => `0${num.toString()}`.slice(-2)
    
      const d = new Date(timestamp)
    
      const year = d.getFullYear()
      const monthTmp = d.getMonth() + 1
      const month = plus0(monthTmp)
      const date = plus0(d.getDate())
      
      return `${month}/${date}/${year}`+' |'
  }

  tConvert = (time) => {
    console.log(time)
    if(time == 0){
      return 'Unkown Time'
    }else{
       // Check correct time format and split into components
      time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    }
  }

  render() {
    const isLoaded = this.state.user;
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    var the = this;
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

        <div className="container dashboard UserDashboarForAdmin-page-navigation bottom-margin">
        {this.state.jsonData &&  
          <CumulativeEventsAccelerationEvents brainRegions={this.state.brainRegions} jsonData={this.state.jsonData} team={this.props.location.state.team} user={this.state.user} is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded} imageUrl={this.state.user.profile_picture_url} data={this.state.cumulativeAccelerationEventData} />
        }
          <p
            ref="h1"
            style={{
              paddingLeft: "0px"
            }}
            className="player-dashboard-sub-head Individual-Head-Acceleration-player-dash">
            Individual Head Acceleration Events
          </p>
          { this.state.cumulativeAccelerationTimeAllRecords.length > 0 &&
          <div className="row" >
             <div className="col-md-12 player-dash-chart-setting">
              <div className="col-md-12">
                <h1 className=" ">Settings</h1>
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
                        <h4>Strain Metric: </h4>
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
        }
          { this.state.cumulativeAccelerationTimeAllRecords.length > 0 && this.state.cumulativeAccelerationTimeAllRecords[0].sensor_data ?
            null :
            <div className="row" style={{border: '1px solid #000', marginBottom: '20px'}}>
              <div className="col-md-12" style={{textAlign: 'center', display: 'block', marginTop: '50px', marginBottom: '100px'}}>
                    <span>No impacts have been recorded yet.</span>
                </div>
            </div>
          }
        {/*------------- Collapse chart start here -----------*/}
        <div className="charts-container">
          <Accordion className="player-collapes-div">
            {this.state.cumulativeAccelerationTimeAllRecords.map(function (item, index) {  
              let impact_time = '';
              let time = '';
              let impact_id = item.sensor_data.player_id.split('$')[0];
              let cls = item.status === 'pending' ? 'card-orange' : '';
              if (item.status === 'completed' ) {

                let computed_time = item.computed_time ? parseFloat(item.computed_time) / (1000 * 60) : 0;

                let currentStamp = new Date().getTime();
                let simulationTimestamp = parseFloat(item.sensor_data.player_id.split('$')[1]);
                var diff =(currentStamp - simulationTimestamp) / 1000;
                diff /= 60;
                let minutes =  Math.abs(Math.round(diff));
                console.log('minutes', minutes);
                minutes = minutes - computed_time;
                if (minutes <= 10) {
                    cls = 'card-green';
                }
              }

              if (item.sensor_data['impact-time']) {
                let split = item.sensor_data['impact-time'].split(":");
                impact_time = split.slice(0, split.length - 1).join(":");
              }

              if (item.sensor_data['time']) {

                let split = item.sensor_data['time'].toString();
                console.log(split)
                split = split.replace(".", ":");
                split = split.split(":");
                time = split.slice(0, split.length - 1).join(":");
              }

              if (item.sensor_data['impact_id']) {
                impact_id = item.sensor_data['impact_id'];
              } 
              
              if (item.sensor_data.player['impact-id']) {
                impact_id = item.sensor_data.player['impact-id'];
              } 

              return <Card >
                <Card.Header className={cls}>
                  <Accordion as={Button} variant="link" onClick={()=>this.handleCollapse(item.sensor_data.player_id, )} eventKey={item.sensor_data.player_id} >
                    <span className="title-left" >ID: #{ impact_id }</span>
                    <span className="title-left">{`${item.sensor_data &&  item.sensor_data['impact-date'] ? this.getDate(item.sensor_data['impact-date'].replace(/:|-/g, "/")) +' '+ this.tConvert(impact_time) : item.sensor_data['date'] && item.sensor_data['time'] ? this.getDate(item.sensor_data['date'].replace(/:|-/g, "/"))  +' '+ this.tConvert(time)  : 'Unkown Date and Time'}`}</span>
                    <span className="title-right" id={item.sensor_data && 'col_icon'+item.sensor_data.player_id.split('$')[1]}>></span>
                  </Accordion>
                </Card.Header>
                <Accordion.Collapse eventKey={item.sensor_data.player_id} id={item.sensor_data && item.sensor_data.player_id.split('$')[1]}>
                  <Card.Body>
                    {this.state.cumulativeAccelerationTimeAlldata ? 
                        this.state.cumulativeAccelerationTimeAlldata.map(function (items, index) {
                          if(items.sensor_data.player_id == item.sensor_data.player_id){
                           return <HeadAccelerationAllEvents key={index} linearUnit={the.state.linearUnit} is_selfie_simulation_file_uploaded={the.state.user.is_selfie_simulation_file_uploaded} imageUrl={the.state.user.simulation_file_url} data={items} state={the.props.location.state} organization ={the.props.location.state.team.organization}  player_id={item.sensor_data.player_id} team={the.props.location.state.team.team_name}/>
                          }
                        })
                      : 
                        null
                    }
                    <div style={{'display':'none'}} id={"spin_"+item.sensor_data.player_id.split('$')[1]}>
                      <i class="fa fa-spinner fa-spin" style={{'font-size':'24px'}}></i>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
           }, this)}
          </Accordion>
        </div>
        {/*------------- Collapse chart end here -----------*/}
       
          {/*this.state.cumulativeAccelerationTimeAllRecords.map((item, index) => (

            <HeadAccelerationAllEvents key={index} linearUnit={this.state.linearUnit} is_selfie_simulation_file_uploaded={this.state.user.is_selfie_simulation_file_uploaded} imageUrl={this.state.user.simulation_file_url} data={item} state={this.props.location.state}/>
          ))
          */}
         
        </div>
        <React.Fragment>
            <div style={{
                position: "absolute",
                width: "100%",
                bottom: '0'
            }}>
                <Footer />
            </div>

        </React.Fragment>
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
                cumulativeAccelerationEventData: { ...this.state.cumulativeAccelerationEventData, ...response.data.data, brand: this.props.location.state.team.brand, team: this.props.location.state.team.team_name, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, staff: this.props.location.state.team.staff, player_id: this.props.location.state.player_name, simulationCount: response.data.simulationCount}
              });
              return AllCumulativeAccelerationTimeRecords({ brand: this.props.location.state.team.brand, user_cognito_id: this.props.location.state.user_cognito_id, organization: this.props.location.state.team.organization, player_id: this.props.location.state.player_name, team: this.props.location.state.team.team_name })
            })

            .then(response => {
              console.log('cumulativeAccelerationTimeAllRecords',response)
              this.setState({
                cumulativeAccelerationTimeAllRecords: this.state.cumulativeAccelerationTimeAllRecords.concat(response.data.data),
		            brainRegions: response.data.brainRegions,
                jsonData: response.data.data,
                isLoading: false,
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
                      isAuthenticated: true,
                      isCheckingAuth: false,
                      isLoading: false,
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
