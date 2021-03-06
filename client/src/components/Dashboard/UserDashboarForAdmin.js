import React from 'react';
import { Redirect } from 'react-router-dom';
import CumulativeEventsAccelerationEvents from '../DashboardEventsChart/CumulativeEventsAccelerationEvents';
import HeadAccelerationAllEvents from '../DashboardEventsChart/HeadAccelerationAllEvents';
import { svgToInline } from '../../config/InlineSvgFromImg';
import Footer from '../Footer';
import 'jquery';
import '../Buttons/Buttons.css';
import './Dashboard.css';
import {
  getUserDetails,
  isAuthenticated,
  getCumulativeAccelerationData,
  getSimulationFilesOfPlayer,
  AllCumulativeAccelerationTimeRecords,
  getCumulativeAccelerationTimeRecords,
  getUserDataByPlayerID,
  getBrainImageByAccountID,
  deleteEventByImageID
} from '../../apis';

import { Button, Accordion, Card } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Spinner from '../Spinner/Spinner';
import ScrollToTop from 'react-scroll-up';
import { getStatusOfDarkmode } from '../../reducer';
import $ from 'jquery';
import DeletePopup from '../Popup/DeletePopup';

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
      isDelData: false,
      isLoading: true,
      loaded_data: [],
      log_stream_name: '',
      DelData: '',
      isDisplay: '',
      delimage_id: '',
      isDisplay: { display: 'none' },
      cognito_user_id: this.props.match.params.cognito_user_id,
      player_name: this.props.match.params.player_name ? this.props.match.params.player_name.split('?')[0] : ''
    };
  }

  componentDidUpdate() {
    console.log('thi props', this.props)
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
    if (event.target.value !== "-1") {
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
  isDeleteData = (isDelete) => {
    var data = this.state.DelData;
    console.log("player_id", data.data.playerid);
    var player_id = data.data.playerid.split('$')[0] + '-';
    var image_id = data.data.image_id;
    this.setState({ isDisplay: { display: 'none' } });
    getUserDataByPlayerID({ playerid: player_id })
      .then(response => {
        console.log("response", response.data.data[0]);
        if (response.data.data.length > 0) {
          var account_id = response.data.data[0].account_id;
        } else {
          var account_id = '';
        }
        deleteEventByImageID({ account_id: account_id, organization: this.state.organization, playerid: data.data.playerid, image_id: image_id })
          .then(response1 => {
            console.log("response1", response1);
            this.setState({ isDelData: false })
            document.getElementById(image_id).style.display = 'none';
          })
      })

  }
  handledelete = (e) => {
    console.log("e", e);
    this.setState({ DelData: { data: e } })
    this.setState({ delimage_id: e.image_id });
    this.setState({ isDelData: true })
    if (this.state.isDisplay.display === 'none') {
      this.setState({ isDisplay: { display: 'flex' } });
    } else {
      this.setState({ isDisplay: { display: 'none' } });
    }

  }
  makeVisible = (data) => {
    console.log('data', data)
    this.setState({ delimage_id: '' });
    this.setState({ isDelData: false });
    this.setState({ DelData: '' })
    this.setState({ isDisplay: { display: 'none' } });
  }
  handleCollapse = (e) => {
    let col_id = e.split('$')[1]
    $("#" + col_id).toggleClass('show');
    $("#col_icon" + col_id).toggleClass('hide');
    $("#col_icon1" + col_id).toggleClass('hide');
    $("#spin_" + col_id).toggleClass('spin_display');
    // var loaded_data = this.state.loaded_data;
    if (this.state.loaded_data.indexOf(e) === -1) {
      this.setState({ loaded_data: this.state.loaded_data.concat(e) });
      this.setState({ open: e });
      getCumulativeAccelerationTimeRecords({ brand: this.state.brand, user_cognito_id: this.state.user_cognito_id, organization: this.state.organization, player_id: e, team: this.state.team })
        .then(res => {
          if (res.data.data[0] !== undefined) {
            console.log('res', res.data.data[0]);
            this.setState({
              cumulativeAccelerationTimeAlldata: this.state.cumulativeAccelerationTimeAlldata.concat(res.data.data),
              loading: false,
            });
            $("#spin_" + res.data.data[0].sensor_data.player_id.split('$')[1]).toggleClass('spin_display');
          } else {
            this.setState({
              loading: false,
            });
          }
        }).catch(err => {
          console.log('err', err)
        })
    } else {
      this.setState({ open: false })
    }
  }

  getDate = (timestamp) => {

    const plus0 = num => `0${num.toString()}`.slice(-2)

    const d = new Date(timestamp)

    const year = d.getFullYear()
    const monthTmp = d.getMonth() + 1
    const month = plus0(monthTmp)
    const date = plus0(d.getDate())
    //eslint-disable-next-line
    return `${month}/${date}/${year}` + ' |'
  }

  tConvert = (time) => {
    console.log(time, "time")
    if (time === 0) {
      return 'Unknown Time'
    } else {
		time = time.toString().split(' ');
		time = time[1] ? time[1] : time;
      // Check correct time format and split into components
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(''); // return adjusted time or original string
    }
  }

  render() {
    if (!this.state.cognito_user_id) {
      return <Redirect to="/Login" />;
    }
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    var the = this;
    if (this.state.isLoading) return <Spinner />;
    return (

      <React.Fragment>
        <DeletePopup isVisible={this.state.isDisplay} makeVisible={(this.props.makeVisible) ? this.props.makeVisible : this.makeVisible} DelData={this.state.DelData} isDeleteData={(this.props.isDeleteData) ? this.props.isDeleteData : this.isDeleteData} />
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
          {this.state.jsonData && this.state.user &&
            <CumulativeEventsAccelerationEvents
              brainRegions={this.state.brainRegions}
              jsonData={this.state.jsonData}
              team={this.state.team}
              user={this.state.user}
              is_selfie_image_uploaded={this.state.user.is_selfie_image_uploaded}
              imageUrl={this.state.user.profile_picture_url}
              data={this.state.cumulativeAccelerationEventData}
              log_stream_name={this.state.log_stream_name}
            />
          }
          <p
            ref="h1"
            style={{
              paddingLeft: "0px"
            }}
            className="player-dashboard-sub-head Individual-Head-Acceleration-player-dash">
            Individual Head Acceleration Events
          </p>
          {this.state.cumulativeAccelerationTimeAllRecords.length > 0 &&
            <div className="row" >
              <div className="col-md-12 player-dash-chart-setting">
                <div className="col-md-12">
                  <h1 className=" ">Settings</h1>
                </div>
                <div className="col-md-12" >
                  <div className="col-md-12" style={{ 'float': 'left' }}>
                    <div className="col-md-4" style={{ 'float': 'left' }}>
                      <h4>Linear Acceleration Units: </h4>
                    </div>
                    <div className="col-md-8" style={{ 'float': 'left' }}>
                      <div className="linear_section">
                        <button onClick={() => this.handleLinearUnit('gs')} className={this.state.linearUnitGsActive ? 'linear_units active settings-buttons settings-buttons-active' : 'linear_units settings-buttons'} >Gs</button>
                        <button onClick={() => this.handleLinearUnit('ms')} className={this.state.linearUnitMsActive ? 'linear_units active settings-buttons settings-buttons-active' : 'linear_units settings-buttons'} >m/s<sup>2</sup></button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12" style={{ 'float': 'left' }}>
                    <div className="col-md-4" style={{ 'float': 'left' }}>
                      <h4>Strain Metric: </h4>
                    </div>
                    <div className="col-md-8" style={{ 'float': 'left' }}>
                      <div className="injury_matrix_section">
                        {/*eslint-disable-next-line*/}
                        <button className="injury_mat active" className="settings-buttons settings-buttons-active">MPS</button>
                        {/*eslint-disable-next-line*/}
                        <button className="injury_mat" className="settings-buttons">Axonal Strain</button>
                        {/*eslint-disable-next-line*/}
                        <button className="injury_mat" className="settings-buttons" >CSDM</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {this.state.cumulativeAccelerationTimeAllRecords && this.state.cumulativeAccelerationTimeAllRecords.length > 0 && this.state.cumulativeAccelerationTimeAllRecords[0].sensor_data ?
            null :
            <div className="row" style={{ border: '1px solid #000', marginBottom: '20px' }}>
              <div className="col-md-12" style={{ textAlign: 'center', display: 'block', marginTop: '50px', marginBottom: '100px' }}>
                <span>No impacts have been recorded yet.</span>
              </div>
            </div>
          }
          {/*------------- Collapse chart start here -----------*/}
          <div className="charts-container">
            <Accordion className="player-collapes-div">
              {this.state.cumulativeAccelerationTimeAllRecords && this.state.cumulativeAccelerationTimeAllRecords.map(function (item, index) {
                let impact_time = '';
                let time = '';
                let impact_id = item.sensor_data.player_id.split('$')[0];
                let cls = '';
                if (item.status === 'pending') {
                  cls = 'card-orange';
                } else if (item.status === 'completed') {

                  let computed_time = item.computed_time ? parseFloat(item.computed_time) / (1000 * 60) : 0;

                  let currentStamp = new Date().getTime();
                  let simulationTimestamp = parseFloat(item.sensor_data.player_id.split('$')[1]);
                  var diff = (currentStamp - simulationTimestamp) / 1000;
                  diff /= 60;
                  let minutes = Math.abs(Math.round(diff));
                  console.log('minutes', minutes);
                  minutes = minutes - computed_time;
                  if (minutes <= 30) {
                    cls = 'card-green';
                  }
                } else {
                  let computed_time = item.computed_time ? parseFloat(item.computed_time) / (1000 * 60) : 0;

                  let currentStamp = new Date().getTime();
                  let simulationTimestamp = parseFloat(item.sensor_data.player_id.split('$')[1]);
                  var diff = (currentStamp - simulationTimestamp) / 1000;
                  diff /= 60;
                  let minutes = Math.abs(Math.round(diff));
                  console.log('minutes', minutes);
                  minutes = minutes - computed_time;
                  if (minutes <= 30) {
                    cls = 'card-red';
                  } else {
                    cls = 'card-light-red';
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
                console.log("item", item);
                return <Card >
                  <Card.Header className={cls} id={item.sensor_data.image_id}>
                    <Accordion as={Button} variant="link" eventKey={item.sensor_data.player_id} >
                      <span className="title-left" >Event ID: #{impact_id}</span>
                      <span className="title-left">{`${item.sensor_data && item.sensor_data['impact-date'] ? this.getDate(item.sensor_data['impact-date'].replace(/:|-/g, "/")) + ' ' + this.tConvert(impact_time) : item.sensor_data['date'] ? this.getDate(item.sensor_data['date'].replace(/:|-/g, "/")) + ' ' + this.tConvert(time) : 'Unknown Date and Time'}`}</span>
                      <span className="btn btn-primary  title-right" onClick={() => this.handleCollapse(item.sensor_data.player_id,)} id={item.sensor_data && 'col_icon' + item.sensor_data.player_id.split('$')[1]}>Expand</span>
                      <span className="btn btn-primary title-right hide" onClick={() => this.handleCollapse(item.sensor_data.player_id,)} id={item.sensor_data && 'col_icon1' + item.sensor_data.player_id.split('$')[1]}>Close</span>
                      {this.state.isDelData && item.sensor_data.image_id == this.state.delimage_id ?
                        <div className="btn btn-danger  title-right" >
                          <i class={"fa fa-spinner fa-spin"} style={{ 'font-size': '18px' }}></i>
                        </div>
                        :
                        <span className="btn btn-danger  title-right" onClick={() => this.handledelete({ playerid: item.sensor_data.player_id, image_id: item.sensor_data.image_id })} >Delete</span>
                      }
                    </Accordion>
                  </Card.Header>
                  <Accordion.Collapse eventKey={item.sensor_data.player_id} id={item.sensor_data && item.sensor_data.player_id.split('$')[1]}>
                    <Card.Body>
                      {/*eslint-disable-next-line*/}
                      {this.state.cumulativeAccelerationTimeAlldata ?
                        //eslint-disable-next-line
                        this.state.cumulativeAccelerationTimeAlldata.map(function (items, index) {
                          if (items.sensor_data.player_id === item.sensor_data.player_id) {
                            return <HeadAccelerationAllEvents key={index} linearUnit={the.state.linearUnit} is_selfie_simulation_file_uploaded={the.state.user.is_selfie_simulation_file_uploaded} imageUrl={the.state.user.simulation_file_url} data={items} state={the.state.state} organization={the.state.organization} player_id={item.sensor_data.player_id} team={the.state.team} brand={the.state.brand} status={item.status} />
                          }
                        })
                        :
                        null
                      }
                      <div style={{ 'display': 'none' }} id={"spin_" + item.sensor_data.player_id.split('$')[1]}>
                        <i class="fa fa-spinner fa-spin" style={{ 'font-size': '24px' }}></i>
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
    const params = new URLSearchParams(window.location.search)
    let team = '';
    let organization = '';
    let user_cognito_id = '';
    let localstorage = localStorage.getItem('state');
    let brand = '';
    localstorage = JSON.parse(localstorage);

    if (params.get('team') && params.get('org')) {
      team = params.get('team');
      organization = params.get('org');
      brand = params.get('brand');
      user_cognito_id = localstorage.userInfo['user_cognito_id'];
      var level = localstorage.userInfo['level'];
      if (level === 100) {
        brand = localstorage.userInfo['sensor'];
      }
    }
    console.log('localstorage', user_cognito_id, organization, team)
    if (user_cognito_id && team && organization) {
      let state = {
        cognito_user_id: this.state.cognito_user_id,
        player_name: this.state.player_name,
        team: {
          brand: '',
          organization: organization,
          staff: [],
          team_name: team,
        },
        user_cognito_id: user_cognito_id
      }
      isAuthenticated(JSON.stringify({}))
        .then((value) => {
          if (value.data.message === 'success') {

            /**
            * Getting user details...
            */
           console.log('user_cognito_id ---------------',user_cognito_id)
            getUserDetails({ user_cognito_id: user_cognito_id })
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
                });

              })
              .catch(err => {
                this.setState({
                  user: {},
                  isCheckingAuth: false,
                  //eslint-disable-next-line
                  isCheckingAuth: false
                });
              })
            /*-- end --*/

            /*
            * getting Acceleration data...
            */
            //eslint-disable-next-line
            if (this.state.player_name) {
              var image_id = '';
              getCumulativeAccelerationData({ brand: brand, user_cognito_id: user_cognito_id, organization: organization, player_id: this.state.player_name, team: team })
                .then(response => {
                  this.setState({
                    state: state,
                    team: team,
                    organization: organization,
                    brand: brand,
                    user_cognito_id: user_cognito_id,
                    cumulativeAccelerationEventData: { ...this.state.cumulativeAccelerationEventData, ...response.data.data, brand: brand, team: team, user_cognito_id: user_cognito_id, organization: organization, staff: [], player_id: this.state.player_name, simulationCount: response.data.simulationCount }
                  });
                  console.log('player_name ----\n', this.state.player_name)
                  image_id = response.data.data.image_id;
                  return AllCumulativeAccelerationTimeRecords({ brand: brand, user_cognito_id: user_cognito_id, organization: organization, player_id: this.state.player_name, team: team })
                })

                .then(response => {
                  var playerid = this.state.player_name + '-';
                  getUserDataByPlayerID({ playerid: playerid })
                    .then(response1 => {
                      console.log("playerdata", response1.data);
                      console.log("playerid1", playerid);
                      response.data.brainRegions["playerdata"] = response1.data.data[0];
                      if (response1.data.data.length > 0) {
                        var accountid = response1.data.data[0].account_id;
                      } else {
                        var accountid = '';
                      }
                      getBrainImageByAccountID({ accountid: accountid })
                        .then(imageresponse1 => {
                          console.log('jsondata 2 ----\n', imageresponse1.data.data)
                          response.data.brainRegions["imagedata"] = imageresponse1.data.data;
                          this.setState({
                            cumulativeAccelerationTimeAllRecords: this.state.cumulativeAccelerationTimeAllRecords.concat(response.data.data),
                            brainRegions: response.data.brainRegions,
                            log_stream_name: response.data.data[0] ? response.data.data[0].log_stream_name : '',
                            jsonData: response.data.data,
                            isLoading: false,
                          });
                        })
                    })

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
              this.setState({
                state: state,
                team: team,
                organization: organization,
                brand: brand,
                user_cognito_id: user_cognito_id,
                cumulativeAccelerationEventData: [],
                isLoading: false,
                cumulativeAccelerationTimeAllRecords: '',
                brainRegions: '',
                log_stream_name: '',
                jsonData: '',
              })
            }
          } else {
            this.setState({ isCheckingAuth: false });
          }
        })
        .catch((err) => {
          this.setState({ isAuthenticated: false });
        })
      /*-- end --*/
      if (getStatusOfDarkmode().status) {
        document.getElementsByTagName('body')[0].style.background = '#171b25';
      }
    } else {
      this.setState({
        user: {},
        isLoading: false,
        isCheckingAuth: false
      });
    }
  }
}

export default UserDashboarForAdmin;
