import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import { Redirect, Link, withRouter } from 'react-router-dom'

import Footer from './Footer';
//import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
import DarkMode from './DarkMode';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import {
    isAuthenticated,
    getUserDetails,
    getUserDBDetails,
    uploadSensorDataAndCompute,
    getTeamAdminData,
    fetchTeamStaffMembers,
    getPlayersData,
    getSimulationStatusCount,
    updateUserStatus,
} from '../apis';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import socketIOClient from 'socket.io-client'

import Spinner from './Spinner/Spinner';
import Switch from "react-switch";
import team_state_icon from './team_state_icon.svg'

class CommanderTeamView extends React.Component {
    constructor(props) {
        super(props);
        console.log("IN TEAM VIEW ", this.props.location)
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            isUpdating: false,
            teamStats: false,
            sensor_id: '',
            editableId: '',
            userDetails: {},
            avgLoad: 0.02,
            alerts: 0,
            team: 2,
            athletes: 6,
            staff: 8,
            highestLoadCount: 0.046,
            impactCount: 3,
            tabActive: 0,
            targetBtn: '',
            rosterValue: 'Lorem ipsum',
            visibilityRosterValueSelector: { display: 'none' },
            selectedFile: null,
            isLoading: true,
            isUploading: false,
            isFileUploaded: false,
            fileUploadError: '',
            isLoaded: false,
            impactSummaryData: {},
            impactHistoryData: {},
            uploadMessageLog: '',
            users: [],
            requestedUsers: [],
            redirectData: {},
            cognito_user_id: '',
            player_name: '',
            buttonSelected: 'overview',
            simulations_completed: 0,
            simulations_pending: 0,
            simulation_failed: 0,
            checked: true,
            isSensorIdUpdating: false,
            isMobile: true,
        };
    }
    activateTab = (value) => {
        if (value !== this.state.buttonSelected) {
            this.setState({
                buttonSelected: value
            })
        }
    }

    onChangeHandler = (event) => {
        event.persist();
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
        this.onClickHandler(event.target.files[0])
    };

    onClickHandler = (selected_file) => {
        const data = new FormData();
        this.setState({
            isUploading: true,
            isFileUploaded: false,
            fileUploadError: ''
        });
        data.append('sensor_csv_file', selected_file);
        console.log(data);
        this.setState({
            uploadMessageLog: ''
        });

        uploadSensorDataAndCompute(data)
            .then((response) => {
                if (response.data.message === "success") {
                    getPlayersData({
			            brand: this.props.location.state.team.brand,
                        user_cognito_id: this.props.location.state.team.user_cognito_id,
                        organization: this.props.location.state.team.organization,
                        team_name: this.props.location.state.team.team_name
                    })
                        .then(response => {

                            this.setState({ users: [] });

                            for (var i = 0; i < response.data.data.length; i++) {
                                this.setState(prevState => ({
                                    users: [...prevState.users, response.data.data[i]]
                                }));
                            }
                            getSimulationStatusCount({
				                brand: this.props.location.state.team.brand,
                                user_cognito_id: this.props.location.state.team.user_cognito_id,
                                organization: this.props.location.state.team.organization,
                                team: this.props.location.state.team.team_name
                            })
                                .then(response => {
                                    this.setState({
                                        simulations_completed: response.data.data.completed,
                                        simulation_failed: response.data.data.failed,
                                        simulations_pending: response.data.data.pending,
                                        isUploading: false,
                                        isFileUploaded: true,
                                        uploadMessageLog: ''
                                    });
                                })
                                .catch(err => {
                                    this.setState({ isUploading: false, fileUploadError: response.data.error, uploadMessageLog: '' });
                                })
                        })
                        .catch(err => {
                            this.setState({ isUploading: false, fileUploadError: response.data.error, uploadMessageLog: '' });
                        })


                }
                else {
                    this.setState({ isUploading: false, fileUploadError: response.data.error, uploadMessageLog: '' });

                }
                // reload function here

                console.log(response);
            })
            .catch(err => {
                this.setState({ isUploading: false, fileUploadError: err, uploadMessageLog: '' });
                console.log(err);
            })
    };

    toggleTab = (value) => {
        this.setState({ tabActive: value });
    };

    getTargetBtn = (value) => {
        this.setState({ targetBtn: value });
    };

    setRedirectData = (id, p_name) => {
        this.setState({
            cognito_user_id: id,
            player_name: p_name
        })
    }

    setRosterValue = (e) => {
        this.setState({
            rosterValue: e.currentTarget.dataset.item
        });
    };

    makeVisibleSelector = () => {
        if (this.state.visibilityRosterValueSelector.display === 'none')
            this.setState({ visibilityRosterValueSelector: { display: 'block' } });
        else this.setState({ visibilityRosterValueSelector: { display: 'none' } });
    };
    componentWillUnmount() {
        const socket = socketIOClient();
        socket.off('fileUploadLog');
    }
    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)

        // Socket
        const socket = socketIOClient();
        socket.on("fileUploadLog", data => {
            this.setState({
                uploadMessageLog: data
            })
        });

        if (this.props.location.state) {
            if (this.props.location.state.team.user_cognito_id && this.props.location.state.team.organization && this.props.location.state.team.team_name) {
                isAuthenticated(JSON.stringify({}))
                    .then((value) => {
                        if (value.data.message === 'success') {
                            getUserDBDetails()
                                .then((response) => {
                                    this.setState({
                                        userDetails: response.data.data,
                                        isAuthenticated: true,
                                        isCheckingAuth: false
                                    });
                                    let user_level = response.data.data.level;
                                    if (user_level === 1000 || user_level === 400 || user_level === 300 || user_level === 200) {
                                        getPlayersData({
					                        brand: user_level === 300 ? '' : this.props.location.state.team.brand,
                                            user_cognito_id: this.props.location.state.team.user_cognito_id,
                                            organization: this.props.location.state.team.organization,
                                            team_name: this.props.location.state.team.team_name
                                        })
                                        .then(response => {
                                            console.log('getPlayersData ----------------------\n',response);
                                            for (var i = 0; i < response.data.data.length; i++) {
                                                this.setState(prevState => ({
                                                    users: [...prevState.users, response.data.data[i]],
                                                    isLoaded: true
                                                }));
                                            }
                                            if(response.data.data.length > 4){
                                                this.setState({isMobile: false});
                                            } 
                                            for (var i = 0; i < response.data.requested_players.length; i++) {
                                                this.setState(prevState => ({
                                                    requestedUsers: [...prevState.requestedUsers, response.data.requested_players[i]],
                                                    isLoaded: true
                                                }));
                                            } 
                                           
                                        })
                                        getSimulationStatusCount({
                                            brand: user_level === 300 ? '' : this.props.location.state.team.brand,
                                            user_cognito_id: this.props.location.state.team.user_cognito_id,
                                            organization: this.props.location.state.team.organization,
                                            team: this.props.location.state.team.team_name
                                        }).then(response => {
                    
                                            this.setState({
                                                simulations_completed: response.data.data.completed,
                                                simulation_failed: response.data.data.failed,
                                                simulations_pending: response.data.data.pending
                                            });
                                        })
                                        getTeamAdminData(JSON.stringify({}))
                                        .then((response) => {
                    
                                            this.setState({
                                                adminData: { ...this.state.adminData, ...response.data.data },
                                            });
                    
                                            if (getStatusOfDarkmode().status === true) {
                                                this.refs.rosterContainer.style.background = '#171b25';
                                                for (let i = 1; i <= 7; i++) {
                                                    this.refs['card' + i].style.background = '#232838';
                                                    if ('card' + i === 'card5' || 'card' + i === 'card7') {
                                                        this.refs['card' + i].style.border = '1px solid #e8e8e8';
                                                    }
                                                }
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    } else {

                                    }
                                   
                                }).catch((error) => {
                                    this.setState({
                                        userDetails: {},
                                        isCheckingAuth: false
                                    });
                                });
                                fetchTeamStaffMembers({
                                    sensor: this.props.location.state.team.brand,
                                    organization: this.props.location.state.team.organization,
                                    team_name: this.props.location.state.team.team_name
                                }).then(staff=>{
                                    var response = staff.data;
                                    if(response.message == 'success'){
                                        this.setState(prevState => ({
                                            staffList: response.data,
                                        }));
                                    }
                                })
                                .catch((error) => {
                                    this.setState({
                                        userDetails: {},
                                        isCheckingAuth: false
                                    });
                                });
                        } else {
                            this.setState({ isAuthenticated: false, isCheckingAuth: false});
                        }
                    })
                    .catch((err) => {
                        this.setState({ isAuthenticated: false, isCheckingAuth: false});
                    })
            }  
        }

        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }
    }

    getDateTime = (timestamp) => {

        const plus0 = num => `0${num.toString()}`.slice(-2)
      
        const d = new Date(timestamp)
      
        const year = d.getFullYear()
        const monthTmp = d.getMonth() + 1
        const month = plus0(monthTmp)
        const date = plus0(d.getDate())
        const hour = plus0(d.getHours())
        const minute = plus0(d.getMinutes())
        const second = plus0(d.getSeconds())
        const rest = timestamp.toString().slice(-5)
      
        return `${month}/${date}/${year} ${hour}:${minute}:${second}`
    }

    getDate = (timestamp) => {

        const plus0 = num => `0${num.toString()}`.slice(-2)
      
        const d = new Date(timestamp)
      
        const year = d.getFullYear()
        const monthTmp = d.getMonth() + 1
        const month = plus0(monthTmp)
        const date = plus0(d.getDate())
        
        return `${month}/${date}/${year}`
    }

    handleCheck = (checked, event, id) => {
        this.setState({ 
            isUpdating: id
        });
       let status = checked ? 'approved' : 'pending';
        updateUserStatus({user_cognito_id: id, status: status})
            .then(data => {
                let requestedUsers = this.state.requestedUsers.map(function (r_player) {
                    if (r_player && r_player.user_cognito_id === id) {
                        r_player.player_status = status;
                    }
                    return r_player
                })
        
                this.setState({ 
                    //checked,
                    requestedUsers: requestedUsers,
                    isUpdating: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isUpdating: false
                });
            })
    }

    handleCheck1 = (checked, event, id) => {
        this.setState({ 
            isUpdating: id
        });
       let status = checked ? 'approved' : 'pending';
        updateUserStatus({user_cognito_id: id, status: status})
            .then(data => {
                let users = this.state.users.map(function (player) {
                    if (player.simulation_data[0]['user_data'].user_cognito_id === id) {
                        player.simulation_data[0]['user_data'].player_status = status;
                    }
                    return player
                })
        
                this.setState({ 
                    //checked,
                    users: users,
                    isUpdating: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isUpdating: false
                });
            })
    }

    editable = (obj) => {
        this.setState({ 
            editableId: obj ? obj.user_cognito_id : '',
            sensor_id: obj ? obj.sensor_id_number : ''
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    updateSensorId = (e) => {
        this.updateSensor();
    }

    updateSensorIdOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.updateSensor();
        }
    }

    updateSensor = () => {
        const sensor_id = this.state.sensor_id;
        const editableId = this.state.editableId;
        this.setState({isSensorIdUpdating:true})
        updateUserStatus({user_cognito_id: editableId, sensor_id_number: sensor_id, type: 'uodate_sensor_id'})
        .then(data => {
            let users = this.state.users.map(function (player) {
                if (player.simulation_data[0]['user_data'].user_cognito_id === editableId) {
                    player.simulation_data[0]['user_data'].sensor_id_number = sensor_id;
                }
                return player
            })

            let requestedUsers = this.state.requestedUsers.map(function (r_player) {
                if (r_player && r_player.user_cognito_id === editableId) {
                    r_player.sensor_id_number = sensor_id;
                }
                return r_player
            })
            
            this.setState({
                users: users,
                requestedUsers: requestedUsers,
                editableId: '',
                isSensorIdUpdating: false
            });
        })
        .catch(err => {
            console.log(err);
        });
        console.log('updating')
    }

    renderSwitch = (player) => {
        if (player.simulation_data[0]['user_data']) {
            return <Switch id={player.simulation_data[0]['user_data'].user_cognito_id} onChange={this.handleCheck1} uncheckedIcon={false} offColor="#FF0000"  onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={player.simulation_data[0]['user_data'].player_status === 'approved' ? true : false} />
        } else {
            return <Switch disabled={true} uncheckedIco-n={false} offColor="#FF0000"  onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={true} />
        }
    }

    tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }

    getStatus = (status) => {
        if (status === 'pending') {
            return <div>Pending<br></br></div>;
        } else {
            return <div style={{paddingTop: '10px'}}></div>;
        }
    }

    getUrl = (obj) => {
        if (obj && this.state.userDetails.level > 300) {
            return <a className="btn btn-primary" target='_blank' href={"/profile?id=" + obj.user_cognito_id}>Profile</a>;
        } else {
            return <button className="btn btn-primary" disabled={true}>Profile</button>;
        }
    }

    teamStats = () => {
        this.setState({
            teamStats: true
        })
    }

    militaryVersionOrNormal = () => {
        let me = this;
        return (
            <div
                ref="rosterContainer"
                className={this.state.isMobile ? "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation bottom-margin" : "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation"}
            >
                <div className="row" >
                     <div className="col-md-12">
                        <p ref="h1" className="penstate nav-p" >
                        {this.state.userDetails.level === 1000 ?
                            <Link style={{ fontWeight: "400" }} to={{
                                pathname: '/AdminDashboard',
                                state: {
                                    brand: {
                                        brand: this.props.location.state.team.brand,
                                        user_cognito_id: this.props.location.state.team.user_cognito_id
                                    }
                                }
                            }} >{'Admin > '}</Link>
                        : null}
                        {this.props.location.state.team.brand && (this.state.userDetails.level === 1000 || this.state.userDetails.level === 400) ?
                            <Link style={{ fontWeight: "400" }} to={{
                                pathname: '/OrganizationAdmin',
                                state: {
                                    brand: {
                                        brand: this.props.location.state.team.brand,
                                        user_cognito_id: this.props.location.state.team.user_cognito_id
                                    }
                                }
                            }} >{this.props.location.state.team.brand + ' > '}</Link>
                        : null}
                         {this.state.userDetails.level === 1000 || this.state.userDetails.level === 400 || this.state.userDetails.level === 300 ?
                                <Link style={{ fontWeight: "400" }} to={{
                                pathname: '/TeamAdmin',
                                state: {
                                    brand: {
                                        brand: this.props.location.state.team.brand,
                                        organization: this.props.location.state.team.organization,
                                        user_cognito_id: this.props.location.state.team.user_cognito_id
                                    }
                                }
                            }}>{this.props.location.state.team.organization + ' > ' }</Link>
                        : null}
                                 {this.props.location.state.team.team_name}
                        </p>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                           
                            <div className="col-md-12">
                                <div className="col-md-8 d-flex mt-3 justify-content-center align-items-center ">
                                    <div className="circle-badge counter-container ml-md-auto mr-md-auto text-center">
                                        <div
                                            style={{
                                                background: "#c5e0b4",
                                                borderColor: "#a7de85"
                                            }}
                                            className="team-view-counter mb-2 ">
                                            <p
                                                style={{
                                                    color: "#616060"
                                                }}
                                            >{this.state.simulations_completed}</p>
                                        </div>
                                        <p class="circle-sub-title" ref="h1">Simulations<br />Complete</p>
                                    </div>
                                    <div className="circle-badge counter-container ml-md-auto mr-md-auto text-center">
                                        <div
                                            style={{
                                                background: "#ffe699",
                                                borderColor: "#ffc107"
                                            }}
                                            className="team-view-counter mb-2 ">
                                            <p
                                                style={{
                                                    color: "#616060"
                                                }}
                                            >{this.state.simulations_pending}</p>
                                        </div>
                                        <p class="circle-sub-title" ref="h1">Simulations<br />Pending</p>
                                    </div>
                                    <div className="circle-badge counter-container ml-md-auto mr-md-auto text-center">
                                        <div
                                            style={{
                                                background: "#f4b183",
                                                borderColor: "#ff954c"
                                            }}
                                            className="team-view-counter mb-2 ">
                                            <p
                                                style={{
                                                    color: "#616060"
                                                }}
                                            >{this.state.simulation_failed}</p>
                                        </div>
                                        <p class="circle-sub-title" ref="h1">Simulations<br />Failed</p>
                                    </div>

                                </div>




                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        {/*<button style={{
                            width : "100%"
                            }} className="btn btn-primary"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> Upload Data</button>
                            */}
                        {/* <div class="input-group mb-3 input-group-sm" style={{ marginTop: "1rem" }}>

                            <div class="input-group-prepend">
                                <input
                                    onChange={this.onChangeHandler}
                                    type="file"
                                    name="sensor_csv_file"
                                    id="file"
                                    style={{
                                        display: "none",
                                        margin: "auto"
                                    }}
                                />{' '}
                                <label for="file" className="upload-csv-file-button mt-1 mb-4" style={{
                                    textAlign: "center"
                                }}>
                                    <i className="fa fa-cloud-upload"></i> UPLOAD DATA
                                        </label>

                            </div>
                        </div>



                        {this.state.isUploading ? (
                            <span><div className="d-flex justify-content-center center-spinner">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>
                            </div>{this.state.uploadMessageLog}
                            </span>
                        ) : null}
                        {this.state.isFileUploaded ? (
                            <UncontrolledAlert
                                color="success"
                                style={{ marginTop: '5px' }}
                            >
                                Successfully uploaded the CSV/ XLSX file
                            </UncontrolledAlert>
                        ) : null}
                        {this.state.fileUploadError ? (
                            <UncontrolledAlert
                                style={{ marginTop: '5px' }}
                                color="danger"

                            >
                                Failed to upload CSV/ XLSX file

                            </UncontrolledAlert>
                        ) : null}
                        <div style={{
                            alignItems: "center",
                            textAlign: "center",
                            marginTop: "-2rem"
                        }}>

                            <br />
                            <span style={{ fontSize: "1.2rem", weight: "900" }} className="top-heading__login" >Are you a sensor company ?</span> <br />
                            <span style={{ fontSize: "1rem", weight: "400", color: "grey" }} className="top-heading__login" >
                                Our API is available that can be readily incorporated into your own platform.
                                        <br />
                                <Link style={{ fontSize: "1.2rem", weight: "900" }} className="top-heading__login" to={'/Developer'} >Read More Here</Link>
                            </span>

                        </div> */}
                    </div>
                </div>
                <div className="col-md-12 my-auto">

                </div>
                <div className="row text-center">
                    <div className="col-md-12">

                        <div className="row mt-3">



                        </div>
                        {/*
                                        <div className="row">
                                        <div
                                        ref="card1"
                                        className="col-md-12 commander-view-card mb-5 mt-4 p-0"
                                        >
                                        <div className="rostar-selector">
                                        <RostarBtn
                                        tabActive={this.toggleTab}
                                        makeActive={this.state.tabActive}
                                        getBtn={this.getTargetBtn}
                                        currentBtn={this.state.targetBtn}
                                        content="Overview"
                                        />
                                        <RostarBtn
                                        tabActive={this.toggleTab}
                                        makeActive={this.state.tabActive}
                                        getBtn={this.getTargetBtn}
                                        currentBtn={this.state.targetBtn}
                                        content="Roster"
                                        />
                                        </div>

                                        <div className="row mt-5">
                                        <div className="col-md-6">
                                        <div className="highest-load ml-3 mr-3 mt-3 mb-5">
                                        <div ref="card5" className="card">
                                        <div
                                        ref="card4"
                                        className="load-heading highest-load-height"
                                        >
                                        HIGHEST LOAD
                                        </div>
                                        <p className="mt-4 ">
                                        John Sylvester{' '}
                                        <span>- {this.state.adminData.organization} </span>
                                        </p>

                                        <div className="text-center">
                                        <div className="progress--circle progress--5">
                                        <div className="progress__number">0.046</div>
                                        </div>
                                        </div>

                                        <div className="load-count mt-3 mb-3">
                                        {this.state.adminData.highest_load}
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="most-impacts ml-3 mr-3 mt-3 mb-5">
                                        <div ref="card7" className="card commander-tv-height">
                                        <div
                                        ref="card6"
                                        className="impact-heading most-impacts-height"
                                        >
                                        MOST IMPACTS
                                        </div>
                                        <p className="mt-4">
                                        John Sylvester{' '}
                                        <span>- {this.state.adminData.organization} </span>
                                        </p>
                                        <div className="impact-count mt-3 mb-3">
                                        {this.state.adminData.impacts}
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                                        </div>
                                        </div>
                                        */}
                    </div>
                    {/*
                                        <div className="col-md-4 pt-5 mb-3">
                                        <div className="row mt-2">
                                        <div className="col-md-12  text-left">
                                        <button type="btn" className="impact-sumary-btn">
                                        Impact Summary
                                        </button>
                                        </div>
                                        </div>
                                        <div ref="card2" className="impact-summary-card pt-3 pb-5">
                                        <Bar
                                        data={impactSummaryBarData}
                                        options={{
                                        maintainAspectRatio: false
                                        }}
                                        />
                                        </div>
                                        </div>
                                        */}
                </div>
                <div className="row mb-5 mt-5">
                    <div className="col-md-12">
                        <div className="col-md-12 Admintitle2" >
                            <h1>
                                <span className="team-page-title">Team Dashboard</span>
                                <div className="col-md-6 team-edit-button">
                                    <button className="btn button-edit plyar-button-edit" style={{'margin-right': '4px'}}>Edit</button>
                                    <button className="btn button-edit plyar-button-edit" onClick={() => {this.teamStats() }} style={{'margin-right':'5px'}}><img src={team_state_icon} style={{'width':'32px'}} /> Team Stats</button>
                                   
                                </div>
                            </h1>
                        </div>
                        {/*<div className="text-left">
                                                <button type="btn" className="impact-sumary-btn">
                                                Team History
                                                </button>
                                                </div>
                                                <div ref="card3" className="impact-history-card p-4">
                                                <Bar
                                                data={impactHistoryBarData}
                                                options={{
                                                maintainAspectRatio: false
                                                }}
                                                />
                                                </div>
                                                */}
                        <div
                            ref="card"
                            className="col-md-12 pl-0 pr-0 mt-5 data-table-view"
                        >
                            <div className="btns-group d-flex">
                                <RostarBtn
                                    tabActive={this.toggleTab}
                                    makeActive={this.state.tabActive}
                                    getBtn={this.getTargetBtn}
                                    currentBtn={this.state.targetBtn}
                                    content="Overview"
                                />
                                <RostarBtn
                                    tabActive={this.toggleTab}
                                    makeActive={this.state.tabActive}
                                    getBtn={this.getTargetBtn}
                                    currentBtn={this.state.targetBtn}
                                    content="Staff"
                                />
                            </div>
                            {!this.state.tabActive ?
                                <div ref="table" className="commander-data-table table-responsive ">
                                   
                                    <table  className="table ">
                                        <thead>
                                            <tr>

                                                <th scope="col">Player ID</th>
                                                <th scope="col" style={{'text-align': 'center'}}>Sensor ID</th>
                                                { this.state.userDetails.level > 300 &&
                                                    <th scope="col">Player Name</th>
                                                }
                                                <th scope="col"># of<br/> Simulations</th>
                                                <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Date</th>
                                                <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Time</th>
                                                <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Date</th>
                                                <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Time</th>
                                                { this.state.userDetails.level > 200 &&
                                                    <React.Fragment>
                                                        <th scope="col" ><span style={{display: 'block'}}>Team</span>Status</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Profile</span>Settings</th>
                                                    </React.Fragment>
                                                }
                                            </tr>
                                        </thead>
                                      <tbody className="player-table">
                                            {this.state.users.map(function (player, index) {
                                                if (player.simulation_data.length > 0) {
                                                    let impact_time = '';
                                                    let time = '';
                                                  let dateTime = this.getDateTime(parseFloat(player.simulation_data[0].player_id.split('$')[1]));
                                                  let cls = player.simulation_data[0].simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';

                                                  if (player.simulation_data[0]['impact-time']) {
                                                    let split = player.simulation_data[0]['impact-time'].split(":");
                                                    impact_time = split.slice(0, split.length - 1).join(":");
                                                  }

                                                  if (player.simulation_data[0]['time']) {
                                                    let split = player.simulation_data[0]['time'].toString();
                                                    split = split.replace(".", ":");
                                                    split = split.split(":");
                                                    time = split.slice(0, split.length - 1).join(":");
                                                  }

                                                  if (player.simulation_data[0].simulation_status === 'completed' ) {

                                                    let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;

                                                    let currentStamp = new Date().getTime();
                                                    let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                    var diff =(currentStamp - simulationTimestamp) / 1000;
                                                    diff /= 60;
                                                    let minutes =  Math.abs(Math.round(diff));
                                                    minutes = minutes - computed_time;
                                                    if (minutes <= 10) {
                                                        cls = 'completedSimulation player-data-table-row';
                                                    }
                                                  }

                                                    return <tr className={cls} key={index} >
                                                        <th style={{ verticalAlign: "middle" }} scope="row" onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >
                                                        {  
                                                            player.simulation_data[0].player_id.split('$')[0]

                                                        }</th>
                                                        <td>
                                                            {this.state.editableId && this.state.editableId === player.simulation_data[0]['user_data'].user_cognito_id ?
                                                                <>
                                                                <input type="text" 
                                                                onBlur={this.updateSensorId}
                                                                onKeyDown={this.updateSensorIdOnEnter}
                                                                onChange={this.handleChange}
                                                                name="sensor_id"
                                                                value={this.state.sensor_id}
                                                                className="update-sensorid-input"
                                                                autoFocus
                                                                />
                                                                {this.state.isSensorIdUpdating && <i className="fa fa-spinner fa-spin" style={{'font-size':'24px'}}></i>}
                                                                </>
                                                            : 
                                                                <span onClick={() => {this.editable(player.simulation_data[0]['user_data']) }} className="edit-sensor-box">
                                                                    { player.simulation_data[0]['user_data'].sensor_id_number ? player.simulation_data[0]['user_data'].sensor_id_number.substr(-8) + ' ' : 'Sensor ID  '}<i class="fa fa-pencil" aria-hidden="true" style={{'color': '#0e7dd59e', 'float': 'right','margin-top':'10%'}}></i>
                                                                </span>
                                                            }
                                                            
                                                        </td>
                                                        { this.state.userDetails.level > 300 &&
                                                            <td style={{'max-width':'162px'}} className="wrap-cell" onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{player.simulation_data[0].player['first-name'] + ' ' + player.simulation_data[0].player['last-name']}</td>
                                                        }
                                                        <td onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{player.simulation_data.length}</td>
                                                        <td style={{ alignItems: "center" }} onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >
                                                             {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unkown Date' } </td>
                                                        <td style={{ alignItems: "center" }} onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >
                                                             {player.simulation_data[0]['impact-time'] ? this.tConvert(impact_time) : player.simulation_data[0]['time'] ? this.tConvert(time) : 'Unkown Time' } </td>
                                                        {/*<td>{Number(player.impact)%(index + 1)*2}</td>*/}
                                                        {/*<td>0</td>
                                                                                <td>
                                                                                <div className="progress my-progress">
                                                                                <div
                                                                                style={{ width: '3%' }}
                                                                                className="progress-bar my-progress-bar "
                                                                                role="progressbar"
                                                                                aria-valuenow="0"
                                                                                aria-valuemin="0"
                                                                                aria-valuemax="100"
                                                                                ></div>
                                                                                </div>
                                                                                </td>
                                                                                */}
                                                        <td style={{ alignItems: "center" }} onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{dateTime.split(' ')[0]}</td>
                                                        <td style={{ alignItems: "center" }} onClick={() => {this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{this.tConvert(dateTime.split(' ')[1])}</td>
                                                        { this.state.userDetails.level > 200 &&
                                                            <React.Fragment>
                                                                <td style={{ alignItems: "center" }}>
                                                                   
                                                                    {this.state.isUpdating && this.state.isUpdating === player.simulation_data[0]['user_data'].user_cognito_id ?
                                                                        <div className="d-flex justify-content-center center-spinner">
                                                                            <div
                                                                                className="spinner-border text-primary"
                                                                                role="status"
                                                                            ></div>
                                                                        </div>
                                                                    :
                                                                        this.renderSwitch(player)
                                                                    } 
                                                                </td>
                                                                <td>
                                                                    {this.getUrl(player.simulation_data[0]['user_data'])}
                                                                </td>
                                                            </React.Fragment>
                                                        }
                                                    </tr>;
                                                }
                                            }, this)}
                                            {this.state.requestedUsers.map(function (r_player, r_index) {
                                                if(r_player){
                                                    let lineHeight = r_player.player_status === 'pending' ? '20px' : '30px'
                                                    return <tr key={r_index} style={{lineHeight: lineHeight}}>
                                                            <td>-</td>
                                                            <td>
                                                                {this.state.editableId && this.state.editableId === r_player.user_cognito_id ?
                                                                    <>
                                                                    <input type="text" 
                                                                        onBlur={this.updateSensorId}
                                                                        onKeyDown={this.updateSensorIdOnEnter}
                                                                        onChange={this.handleChange}
                                                                        name="sensor_id"
                                                                        value={this.state.sensor_id}
                                                                        className="update-sensorid-input"
                                                                        autoFocus
                                                                    />
                                                                    {this.state.isSensorIdUpdating && <i className="fa fa-spinner fa-spin" style={{'font-size':'24px','margin-left':'2px'}}></i>}
                                                                    </>
                                                                : 
                                                                    <span onClick={() => {this.editable(r_player) }} className="edit-sensor-box">
                                                                        { r_player.sensor_id_number ? r_player.sensor_id_number + ' ' : 'Sensor ID  '} <i class="fa fa-pencil" aria-hidden="true"  style={{'color': '#0e7dd59e', 'padding-left': '6px','float': 'right','margin-top':'10%'}}></i>
                                                                    </span>
                                                                }
                                                            </td>
                                                            { this.state.userDetails.level > 300 &&
                                                                <td style={{'max-width':'162px'}} className="wrap-cell">{r_player.first_name + ' ' + r_player.last_name}</td>
                                                            }
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            { this.state.userDetails.level > 200 &&
                                                                <React.Fragment>
                                                                    <td style={{ alignItems: "center" }}>
                                                                        {this.getStatus(r_player.player_status)}   
                                                                        {this.state.isUpdating && this.state.isUpdating === r_player.user_cognito_id ?
                                                                            <div className="d-flex justify-content-center center-spinner">
                                                                                <div
                                                                                    className="spinner-border text-primary"
                                                                                    role="status"
                                                                                ></div>
                                                                            </div>
                                                                        :
                                                                            <Switch id={r_player.user_cognito_id} onChange={this.handleCheck} uncheckedIcon={false} offColor="#FF0000"  onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={r_player.player_status === 'approved' ? true : false} />
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {this.getUrl(r_player)}
                                                                    </td>
                                                                </React.Fragment>
                                                            }
                                                           
                                                         </tr>
                                                    }
                                            }, this)}
                                        </tbody>
                                    </table>
                                </div>
                                : <div className="commander-data-table">
                                   <Link  to={{
                                        pathname: '/InviteUsers',
                                        state: {
                                            lavelFor: '200',
                                            data:{
                                                type: 'TeamnAdmin',
                                                bk_data: this.props.location.state,
                                            }                                        
                                        }
                                    }} >
                                        <button type="button" className="btn btn-primary float-right" style={{'margin': '7px'}}>Invite Team Staff</button> 
                                    </Link>
                                    
                                    <table  className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="player-table">
                                             {this.state.staffList && 
                                                this.state.staffList.map(function (staff, index) {
                                                    return <tr className="player-data-table-row" key={index}
                                                        onClick={()=>{
                                                            var win = window.open('/admin/view/user?id='+staff.user_cognito_id);
                                                            win.focus();
                                                        }}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{staff.first_name} {staff.last_name}</td>
                                                        <td>{staff.email}</td>
                                                    </tr>
                                            })}
                                            {!this.state.staffList && 
                                                <p>No data to show here.</p>
                                            }
                                        </tbody>

                                    </table>
                                </div>

                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    render() {

        if (!this.props.location.state) {
            return <Redirect to="/Dashboard" />;
        } else {
            if (!this.props.location.state.team.user_cognito_id && !this.props.location.state.team.organization && !this.props.location.state.team.team_name) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
            return <Redirect to="/Login" />;
        }

        if (this.state.isAuthenticated && !this.state.isCheckingAuth) {
            if (this.state.userDetails.level === 100 ) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (!this.state.isLoaded) {
            return <Spinner />;
        }
        // impactHistoryBarData.labels = this.state.impactHistoryData.force;
        // impactHistoryBarData.datasets[0].data = this.state.impactHistoryData.pressure;
        // impactSummaryBarData.labels = this.state.impactSummaryData.force;
        // impactSummaryBarData.datasets[0].data = this.state.impactSummaryData.pressure;

        if (this.state.cognito_user_id) {
            return <Redirect push to={{
                pathname: '/TeamAdmin/user/dashboard',
                state: {
                    user_cognito_id: this.props.location.state.team.user_cognito_id,
                    cognito_user_id: this.state.cognito_user_id,
                    player_name: this.state.player_name,
                    isRedirectedFromAdminPanel: true,
                    team: {
                        brand: this.props.location.state.team.brand,
                        team_name: this.props.location.state.team.team_name,
                        organization: this.props.location.state.team.organization,
                        staff: this.props.location.state.team.staff
                    }
                }
            }} />
        }

        if (this.state.teamStats) {
            return <Redirect push to={{
                pathname: '/TeamStats',
                state: {
                    user_cognito_id: this.props.location.state.team.user_cognito_id,
                    team: {
                        brand: this.props.location.state.team.brand,
                        team_name: this.props.location.state.team.team_name,
                        organization: this.props.location.state.team.organization,
                        staff: this.props.location.state.team.staff
                    }
                }
            }} />
        }

        return (
            <React.Fragment>
                {this.props.isMilitaryVersionActive === true ? (
                    <div className="militay-view">
                        <div className="military-sidebar">
                            <SideBar />
                        </div>
                        <div className="military-main-content">
                            {this.militaryVersionOrNormal()}
                            {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}
                        </div>
                    </div>
                ) : (
                        <React.Fragment>
                            {this.militaryVersionOrNormal()}
                            {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}
                             <div style={this.state.isMobile ? {
                                position: "absolute",
                                width: "100%",
                                bottom: '0'
                            } : {}}>
                                <Footer style={{ display: "none" }} className="violent" />
                            </div>
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default connect(mapStateToProps)(CommanderTeamView);
