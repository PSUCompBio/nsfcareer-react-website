import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import { Redirect, Link } from 'react-router-dom'

import Footer from './Footer';
//import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
// import DarkMode from './DarkMode';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import BrainSubmitPortal from './brainComponent/brainSubmitPortal';

import {
    isAuthenticated,
    getUserDBDetails,
    uploadSensorDataAndCompute,
    getTeamAdminData,
    fetchTeamStaffMembers,
    getPlayersData,
    getRequestedPlayersData,
    getSimulationStatusCount,
    updateUserStatus,
    deleteuserfromteam,
} from '../apis';
import 'filepond/dist/filepond.min.css';
import socketIOClient from 'socket.io-client'
import Spinner from './Spinner/Spinner';
import Switch from "react-switch";
import team_state_icon from './team_state_icon.svg'
import DeletePopup from './Popup/DeletePopup';

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
            editablestate: false,
            isMobile: true,
            organization: this.props.match.params.org,
            team: this.props.match.params.team ? this.props.match.params.team.split('?')[0] : '',
            isbrainSubmitPortal: false,
            loadingRequestedUser: true,
            isDisplay: { display: 'none' },
            isDelete: false,
            data: '',
            DelData: '',
            isbrainSubmitPortalDisplay: false
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
                        brand: this.state.brand,
                        user_cognito_id: this.state.user_cognito_id,
                        organization: this.state.organization,
                        team_name: this.state.team
                    })
                        .then(response => {

                            this.setState({ users: [] });

                            for (var i = 0; i < response.data.data.length; i++) {
                                // eslint-disable-next-line
                                this.setState(prevState => ({
                                    users: [...prevState.users, response.data.data[i]]
                                }));
                            }
                            getSimulationStatusCount({
                                brand: this.state.brand,
                                user_cognito_id: this.state.user_cognito_id,
                                organization: this.state.organization,
                                team: this.state.team
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

    isbrainSubmitPortalDisplay = (data) => {
        this.setState({ isbrainSubmitPortalDisplay: data })
    }

    makeVisible = (data) => {
        console.log('data', data)
        this.setState({ isbrainSubmitPortal: data });
    }


    componentWillUnmount() {
        const socket = socketIOClient();
        socket.off('fileUploadLog');
    }
    componentDidMount() {

        const params = new URLSearchParams(window.location.search)
        let brand = '';
        if (params.get('brand')) {
            brand = params.get('brand');
        }
        // Socket
        const socket = socketIOClient();
        socket.on("fileUploadLog", data => {
            this.setState({
                uploadMessageLog: data
            })
        });

        if (this.props.match.params.team) {
            if (this.state.organization && this.state.team) {
                isAuthenticated(JSON.stringify({}))
                    .then((value) => {
                        if (value.data.message === 'success') {
                            getUserDBDetails()
                                .then((response) => {
                                    console.log('userDetails', response.data.data)
                                    this.setState({
                                        userDetails: response.data.data,
                                        user_cognito_id: response.data.data.user_cognito_id,
                                        isAuthenticated: true,
                                        isCheckingAuth: false,
                                        brand: brand,
                                    });
                                    let user_level = response.data.data.level;
                                    if (user_level === 1000 || user_level === 400 || user_level === 300 || user_level === 200) {
                                        getPlayersData({
                                            brand: user_level === 300 ? '' : brand,
                                            organization: this.state.organization,
                                            team_name: this.state.team
                                        })
                                            .then(response => {
                                                console.log('getPlayersData ----------------------\n', response);
                                                for (var i = 0; i < response.data.data.length; i++) {
                                                    // eslint-disable-next-line
                                                    this.setState(prevState => ({
                                                        users: [...prevState.users, response.data.data[i]],
                                                        isLoaded: true
                                                    }));
                                                }
                                                if (response.data.data.length > 4) {
                                                    this.setState({ isMobile: false });
                                                }
                                                // eslint-disable-next-line
                                                for (var i = 0; i < response.data.requested_players.length; i++) {
                                                    // eslint-disable-next-line
                                                    this.setState(prevState => ({
                                                        requestedUsers: [...prevState.requestedUsers, response.data.requested_players[i]],
                                                        isLoaded: true
                                                    }));
                                                }

                                                return getRequestedPlayersData({
                                                    brand: user_level === 300 ? '' : brand,
                                                    organization: this.state.organization,
                                                    team_name: this.state.team
                                                })
                                            })
                                            .then(response => {
                                                this.setState({ loadingRequestedUser: false });
                                                for (var i = 0; i < response.data.requested_players.length; i++) {
                                                    // eslint-disable-next-line
                                                    this.setState(prevState => ({
                                                        requestedUsers: [...prevState.requestedUsers, response.data.requested_players[i]],
                                                        isLoaded: true
                                                    }));
                                                }
                                                return getSimulationStatusCount({
                                                    brand: user_level === 300 ? '' : brand,
                                                    organization: this.state.organization,
                                                    team: this.state.team
                                                })

                                            }).then(response => {
                                                console.log('getSimulationStatusCount', response);
                                                this.setState({
                                                    simulations_completed: response.data.data.completed,
                                                    simulation_failed: response.data.data.failed,
                                                    simulations_pending: response.data.data.pending,
                                                    isLoaded: true
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
                                    console.log('============= errteam ', error)
                                    this.setState({
                                        userDetails: {},
                                        isCheckingAuth: false
                                    });
                                });
                            fetchTeamStaffMembers({
                                sensor: brand,
                                organization: this.state.organization,
                                team_name: this.state.team
                            }).then(staff => {
                                var response = staff.data;
                                if (response.message === 'success') {
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
                            this.setState({ isAuthenticated: false, isCheckingAuth: false });
                        }
                    })
                    .catch((err) => {
                        this.setState({ isAuthenticated: false, isCheckingAuth: false });
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
        // const rest = timestamp.toString().slice(-5)

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
        updateUserStatus({ user_cognito_id: id, status: status })
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
        updateUserStatus({ user_cognito_id: id, status: status })
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
        console.log("check", obj);
        this.setState({
            editableId: obj ? obj.user_cognito_id : '',
            sensor_id: obj ? obj.sensor_id_number : '',
        });
    }
    editstate = () => {
        this.setState({
            editablestate: true,
        });
    }
    cancleable = (obj) => {
        this.setState({
            editablestate: false
        });
    }
    makeVisible = (data) => {
        console.log('data', data)
        this.setState({ isDisplay: data });
    }
    isDeleteData = (isDelete) => {
        console.log('isDelete', this.state.DelData)
        deleteuserfromteam({ PlayerID: this.state.DelData.data, organization: this.state.organization, Team: this.state.team })
            .then(response => {
                if (response.data.message == "success") {
                    console.log(this.state.DelData.data);
                    document.getElementById(this.state.DelData.data).style.display = 'none';
                }
            })
        this.setState({ isDelete: isDelete });
        this.setState({ isDisplay: { display: 'none' } });
        this.setState({ editablestate: false, });
    }
    deleteuser = (obj) => {
		console.log("obj",obj);
        if (obj.player_id) {
            var PlayerID = obj.player_id.split('$')[0];
        } else {
            var PlayerID = obj.user_cognito_id
        }
		console.log("PlayerID",PlayerID);
        this.setState({ DelData: { type: 'Player', data: PlayerID } })
        if (this.state.isDisplay.display === 'none') {
            this.setState({ isDisplay: { display: 'flex' } });
        } else {
            this.setState({ isDisplay: { display: 'none' } });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateSensorId = () => {
        this.updateSensor();
    }

    updateSensorIdOnEnter = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
            this.updateSensor();
        }
    }

    updateSensor = () => {
        const sensor_id = this.state.sensor_id;
        const editableId = this.state.editableId;
        this.setState({ isSensorIdUpdating: true })
        updateUserStatus({ user_cognito_id: editableId, sensor_id_number: sensor_id, type: 'uodate_sensor_id' })
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
		 if(this.state.editablestate){
			if (player.simulation_data[0]['user_data']) {
				return <Switch id={player.simulation_data[0]['user_data'].user_cognito_id} onChange={this.handleCheck1} uncheckedIcon={false} offColor="#FF0000" onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={player.simulation_data[0]['user_data'].player_status === 'approved' ? true : false} />
			} else {
				return <Switch disabled={true} uncheckedIco-n={false} offColor="#FF0000" onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={true} />
			}
		 }else{ 
			return <Switch disabled={true} uncheckedIco-n={false} offColor="#FF0000" onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={player.simulation_data[0]['user_data'].player_status === 'approved' ? true : false} />
		 }
    }

    tConvert = (time) => {
        // Check correct time format and split into components
		 console.log("time",time);
		if(time !== undefined){
		time = time.split(' ')[1] ? time.split(' ')[1] : time;
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        time = time ?  time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time] : time;
		if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
		}else{
			return "";
		}
	}

    getStatus = (status) => {
        if (status === 'pending') {
            return <div>Pending<br></br></div>;
        } else {
            return <div style={{ paddingTop: '10px' }}></div>;
        }
    }

    getUrl = (obj) => {
        if (obj && this.state.userDetails.level > 300) {
            // eslint-disable-next-line
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
                                            brand: this.state.brand,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }} >{'Admin > '}</Link>
                                : null}
                            {this.state.brand && this.state.brand !== "null" && (this.state.userDetails.level === 1000 || this.state.userDetails.level === 400) ?						
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/OrganizationAdmin',
                                    state: {
                                        brand: {
                                            brand: this.state.brand,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }} >{this.state.brand + ' > '}</Link>	
                                : null}
                            {this.state.userDetails.level === 1000 || this.state.userDetails.level === 400 ?
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/TeamAdmin/' + this.state.organization + '/' + this.state.brand,
                                    state: {
                                        brand: {
                                            brand: this.state.brand,
                                            organization: this.state.organization,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }}>{this.state.organization + ' > '}</Link>
                                : null}
                            {this.state.userDetails.level === 300 ?
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/TeamAdmin/' + this.state.organization,
                                    state: {
                                        brand: {
                                            brand: this.state.brand,
                                            organization: this.state.organization,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }}>{this.state.organization + ' > '}</Link>
                                : null}
                            {this.state.team}
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="col-md-8 d-flex mt-3 justify-content-center align-items-center ">
                                    <div className="circle-badge counter-container ml-md-auto mr-md-auto text-center">
                                        <Link style={{ fontWeight: "400" }} to={'/completeSimulation/' + this.state.organization + '/' + this.state.team + '/' + this.state.brand}>
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
                                            <p class="circle-sub-title" ref="h1" style={{ 'color': '#686868' }}>Simulations<br />Complete</p>
                                        </Link>
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
                                        <p class="circle-sub-title" ref="h1" style={{ 'color': '#686868' }}>Simulations<br />Pending</p>
                                    </div>
                                    <div className="circle-badge counter-container ml-md-auto mr-md-auto text-center">

                                        <Link style={{ fontWeight: "400" }} to={'/failedSimulation/' + this.state.organization + '/' + this.state.team + '/' + this.state.brand}>
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
                                            <p className="circle-sub-title" ref="h1" style={{ 'color': '#686868' }}>Simulations<br />Failed</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
                <div className="col-md-12 my-auto">

                </div>
                <div className="row text-center">
                    <div className="col-md-12">
                        <div className="row mt-3">
                        </div>
                    </div>
                </div>
                <div className="row mb-5 mt-5">
                    <div className="col-md-12">
                        <div className="col-md-12 Admintitle2" >
                            <div className="row">
                                <div className="col-md-4 no-padding">
                                    <button className="btn team-page-edit-button" onClick={() => this.setState({ isbrainSubmitPortalDisplay: true })} >Submit Brain Simulations</button>
                                </div>
                                <div className="col-md-4 no-padding">
                                    <h2 className="team-dashboard-heading">Team Dashboard</h2>
                                </div>
                                <div className="col-md-4 no-padding">
                                    <div className="col-md-6 no-padding" style={{ 'display': 'contents' }}>
                                        <button className="btn team-page-edit-button" onClick={() => { this.teamStats() }}><img src={team_state_icon} style={{ 'width': '32px' }} /> Team Stats</button>
                                    </div>
                                    <div className="col-md-6 no-padding" style={{ 'display': 'contents' }}>
                                        {this.state.editablestate ?
                                            <>
                                                <button onClick={() => { this.cancleable() }} className="btn  plyar-button-edit" style={{ 'margin-left': '10px','background-color': '#00b050','padding': '7px 15px','border': '1px solid ','font-weight': '700'}}>Save</button>
                                                <button onClick={() => { this.cancleable() }} className="btn  plyar-button-edit" style={{ 'margin-left': '10px','background-color': '#ff0000','padding': '7px 15px','border': '1px solid ','font-weight': '700' }}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => { this.editstate() }} className="btn team-page-edit-button plyar-button-edit" style={{ 'margin-left': '10px' }}>Edit</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
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

                                    <table className="table ">
                                        <thead>
                                            <tr>

                                                <th scope="col">Player ID</th>
                                                <th scope="col" style={{ 'text-align': 'center' }}>Sensor ID</th>
                                                {this.state.userDetails.level > 300 &&
                                                    <th scope="col">Player Name</th>
                                                }
                                                <th scope="col"># of<br /> Simulations</th>
                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Date</th>
                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Time</th>
                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Date</th>
                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Time</th>
                                                {this.state.userDetails.level > 200 &&
                                                    <React.Fragment>
                                                        <th scope="col" ><span style={{ display: 'block' }}>Team</span>Status</th>
                                                        <th scope="col" ><span style={{ display: 'block' }}>Profile</span>Settings</th>
                                                        {this.state.editablestate ?
                                                            <>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Delete</span>Player</th>
                                                            </>
                                                            : null
                                                        }
                                                    </React.Fragment>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody className="player-table">
                                            {this.state.users.map(function (player, index) {
                                                console.log('checkign status', player.simulation_data.length)
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

                                                    if (player.simulation_data[0].simulation_status === 'completed') {

                                                        let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;

                                                        let currentStamp = new Date().getTime();
                                                        let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                        var diff = (currentStamp - simulationTimestamp) / 1000;
                                                        diff /= 60;
                                                        let minutes = Math.abs(Math.round(diff));
                                                        minutes = minutes - computed_time;
                                                        if (minutes <= 30) {
                                                            cls = 'completedSimulation player-data-table-row';
                                                        }
                                                    }
                                                    //   for(var i = 0; i < player.simulation_data.length; i++){
                                                    //       console.log('i',i)
                                                    //       console.log('status',player.simulation_data[i].simulation_status)
                                                    //       if(player.simulation_data[i].simulation_status === 'pending'){
                                                    //         cls = 'pendingSimulation player-data-table-row';
                                                    //       }
                                                    //   }

                                                    return <tr className={cls} key={index} id={player.simulation_data[0].player_id.split('$')[0]}>
                                                        <th style={{ verticalAlign: "middle" }} scope="row" onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >
                                                            {
                                                                player.simulation_data[0].player_id.split('$')[0]
                                                            }</th>
                                                        <td>
                                                            {this.state.editablestate ?
                                                                <>
                                                                    <input type="text"
                                                                        onBlur={this.updateSensorId}
                                                                        onKeyDown={this.updateSensorIdOnEnter}
                                                                        onChange={this.handleChange}
                                                                        onFocus={() => this.editable(player.simulation_data[0]['user_data'])}
                                                                        name="sensor_id"
                                                                        defaultValue={player.simulation_data[0]['user_data'].sensor_id_number}
                                                                        className="update-sensorid-input"
                                                                    />
                                                                    {this.state.isSensorIdUpdating && this.state.editableId === player.simulation_data[0]['user_data'].user_cognito_id &&
                                                                        <i className="fa fa-spinner fa-spin" style={{ 'font-size': '24px' }}></i>
                                                                    }
                                                                </>
                                                                :
                                                                <span onClick={() => { this.editable(player.simulation_data[0]['user_data']) }} className="edit-sensor-box">
                                                                    {player.simulation_data[0]['user_data'].sensor_id_number ? player.simulation_data[0]['user_data'].sensor_id_number.substr(-8) + ' ' : 'Sensor ID  '}
                                                                </span>
                                                            }
                                                        </td>
                                                        {this.state.userDetails.level > 300 &&
                                                            <td style={{ 'max-width': '162px' }} className="wrap-cell" onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{player.simulation_data[0].user_data ? player.simulation_data[0].user_data.first_name + ' ' + player.simulation_data[0].user_data.last_name : player.simulation_data[0].player['first-name'] + ' ' + player.simulation_data[0].player['last-name']}</td>
                                                        }
                                                        <td onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{player.simulation_data.length}</td>
														
                                                        <td style={{ alignItems: "center" }} onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >
                                                            {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unknown Date'} </td>											
														<td style={{ alignItems: "center" }} onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} > {player.simulation_data[0]['impact-time'] ? this.tConvert(impact_time) : this.tConvert(player.simulation_data[0]['time']) ? this.tConvert(time) : 'Unknown Time' } </td>
                                                        <td style={{ alignItems: "center" }} onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{dateTime.split(' ')[0]}</td>
                                                        <td style={{ alignItems: "center" }} onClick={() => { this.setRedirectData(Number(index + 1).toString(), player.simulation_data[0].player_id.split('$')[0]) }} >{this.tConvert(dateTime.split(' ')[1])}</td>
                                                        {this.state.userDetails.level > 200 &&
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
                                                                {this.state.editablestate ?
                                                                    <>
                                                                        <td>
                                                                            <span className="delete-user-box" >
                                                                                <i class="fa fa-trash" aria-hidden="true" onClick={() => { this.deleteuser(player.simulation_data[0]) }} style={{ 'padding': '10px', 'font-size': '27px', 'font-weight': '400', 'padding': '15px' }}></i>
                                                                            </span>
                                                                        </td>
                                                                    </>
                                                                    : null
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </tr>;
                                                } else {
                                                    return false;
                                                }
                                            }, this)}
                                            {this.state.loadingRequestedUser &&
                                                <tr>
                                                    <td colspan="9"
                                                        style={{
                                                            'text-align': 'center',
                                                            'padding': '15px',
                                                            'font-size': '18px',
                                                        }}
                                                    >
                                                        Loading requested players...
                                                    </td>
                                                </tr>
                                            }
                                            {this.state.users.length <= 0 &&
                                                <>

                                                    <td colspan="10" style={{ 'textAlign': 'center' }}>There is no data for this team yet.</td>

                                                    <tr>
                                                        <td colspan="10" style={{ 'textAlign': 'center' }}>
                                                            <button
                                                                className="btn team-page-edit-button"
                                                                onClick={() => this.setState({ isbrainSubmitPortalDisplay: true })}
                                                            >
                                                                Submit Brain Simulations
                                                        </button>
                                                        </td>
                                                    </tr>

                                                </>
                                            }
                                            {this.state.requestedUsers.map(function (r_player, r_index) {
                                                if (r_player) {
                                                    let lineHeight = r_player.player_status === 'pending' ? '20px' : '30px'
                                                    return <tr key={r_index} style={{ lineHeight: lineHeight }} id={r_player.user_cognito_id}>
                                                        <td>-</td>
                                                        <td>
                                                            {this.state.editablestate ?
                                                                <>
                                                                    <input type="text"
                                                                        onBlur={this.updateSensorId}
                                                                        onKeyDown={this.updateSensorIdOnEnter}
                                                                        onChange={this.handleChange}
                                                                        onFocus={() => this.editable(r_player)}
                                                                        name="sensor_id"
                                                                        defaultValue={r_player.sensor_id_number}
                                                                        className="update-sensorid-input"
                                                                    />
                                                                    {this.state.isSensorIdUpdating && this.state.editableId === r_player.user_cognito_id && <i className="fa fa-spinner fa-spin" style={{ 'font-size': '24px', 'margin-left': '2px' }}></i>}
                                                                </>
                                                                :
                                                                <span onClick={() => { this.editable(r_player) }} className="edit-sensor-box">
                                                                    {r_player.sensor_id_number ? r_player.sensor_id_number + ' ' : 'Sensor ID'}
                                                                </span>
                                                            }
                                                        </td>
                                                        {this.state.userDetails.level > 300 &&
                                                            <td style={{ 'max-width': '162px' }} className="wrap-cell">{r_player.first_name + ' ' + r_player.last_name}</td>
                                                        }
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        {this.state.userDetails.level > 200 &&
                                                            <React.Fragment>
                                                                <td style={{ alignItems: "center" }}>
                                                                    {this.state.editablestate ?
                                                                        <>
                                                                            {this.getStatus(r_player.player_status)}
                                                                            {this.state.isUpdating && this.state.isUpdating === r_player.user_cognito_id ?
                                                                                <div className="d-flex justify-content-center center-spinner">
                                                                                    <div
                                                                                        className="spinner-border text-primary"
                                                                                        role="status"
                                                                                    ></div>
                                                                                </div>
                                                                                :
                                                                                <>
                                                                                    <Switch id={r_player.user_cognito_id} onChange={this.handleCheck} uncheckedIcon={false} offColor="#FF0000" onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={r_player.player_status === 'approved' ? true : false} />
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <Switch disabled={true} uncheckedIco-n={false} offColor="#FF0000" onColor="#00B050" onHandleColor="#ffffff" className="react-switch" checkedIcon={false} checked={r_player.player_status === 'approved' ? true : false} />
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {this.getUrl(r_player)}
                                                                </td>
                                                                {this.state.editablestate ?
                                                                    <>
                                                                        <td>
                                                                            <span className="delete-user-box" >
                                                                                <i class="fa fa-trash" aria-hidden="true" onClick={() => { this.deleteuser(r_player) }} style={{ 'padding': '10px', 'font-size': '27px', 'font-weight': '400', 'padding': '15px' }}></i>
                                                                            </span>
                                                                        </td>
                                                                    </>
                                                                    : null
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </tr>
                                                } else {
                                                    return false
                                                }
                                            }, this)}
                                        </tbody>
                                    </table>
                                </div>
                                : <div className="commander-data-table">
                                    <Link to={{
                                        pathname: '/InviteUsers',
                                        state: {
                                            lavelFor: '200',
                                            data: {
                                                type: 'TeamnAdmin',
                                                bk_data: this.props.location.state,
                                            }
                                        }
                                    }} >
                                        <button type="button" className="btn btn-primary float-right" style={{ 'margin': '7px' }}>Invite Team Staff</button>
                                    </Link>

                                    <table className="table">
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
                                                        onClick={() => {
                                                            var win = window.open('/admin/view/user?id=' + staff.user_cognito_id);
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

        if (!this.props.match.params.team) {
            return <Redirect to="/Dashboard" />;
        } else {
            if (!this.state.user_cognito_id && !this.state.organization && !this.state.team) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
            return <Redirect to="/Login" />;
        }

        if (this.state.isAuthenticated && !this.state.isCheckingAuth) {
            if (this.state.userDetails.level === 100) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (!this.state.isLoaded) {
            return <Spinner />;
        }

        if (this.state.isbrainSubmitPortalDisplay) {
            return <BrainSubmitPortal isbrainSubmitPortalDisplay={(this.props.isbrainSubmitPortalDisplay) ? this.props.isbrainSubmitPortalDisplay : this.isbrainSubmitPortalDisplay} team={this.state.team} organization={this.state.organization} />;
        }

        // impactHistoryBarData.labels = this.state.impactHistoryData.force;
        // impactHistoryBarData.datasets[0].data = this.state.impactHistoryData.pressure;
        // impactSummaryBarData.labels = this.state.impactSummaryData.force;
        // impactSummaryBarData.datasets[0].data = this.state.impactSummaryData.pressure;

        if (this.state.cognito_user_id) {
            return <Redirect push to={{
                pathname: '/TeamAdmin/user/dashboard/' + this.state.cognito_user_id + '/' + this.state.player_name + '?team=' + this.state.team + '&org=' + this.state.organization + '&brand=' + this.state.brand,
                state: {
                    user_cognito_id: this.state.user_cognito_id,
                    cognito_user_id: this.state.cognito_user_id,
                    player_name: this.state.player_name,
                    isRedirectedFromAdminPanel: true,
                    team: {
                        brand: this.state.brand,
                        team_name: this.state.team,
                        organization: this.state.organization,
                        staff: []
                    }
                }
            }} />
        }

        if (this.state.teamStats) {
            var team_name = [];
            team_name[0] = this.state.team;
            return <Redirect push to={{
                pathname: '/TeamStats/Players/' + this.state.organization + '/' + team_name + '/' + this.state.brand,
                state: {
                    user_cognito_id: this.state.user_cognito_id,
                    for: 'Players',
                    team: {
                        brand: this.state.brand,
                        team_name: team_name,
                        organization: this.state.organization,
                        staff: []
                    }
                }
            }} />
        }


        return (
            <React.Fragment>
                <DeletePopup isVisible={this.state.isDisplay} makeVisible={(this.props.makeVisible) ? this.props.makeVisible : this.makeVisible} DelData={this.state.DelData} isDeleteData={(this.props.isDeleteData) ? this.props.isDeleteData : this.isDeleteData} />
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
