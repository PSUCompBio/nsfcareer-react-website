import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import { getStatusOfDarkmode } from '../reducer';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import {
    isAuthenticated,
    getAllSensorBrands,
    fetchStaffMembers,
    getOrganizationList,
    getTeamList,
    getPlayerList
} from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';
import gridView from './girdView.png';
import listView from './listView.png';
import $ from "jquery";


class AdminDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            userDetails: '',
            isAdmin: '',
            tabActive: 0,
            targetBtn: '',
            totalTeam: 0,
            totalBrand: 0,
            editTeamClass: '',
            hideEditElement: { display: 'block' },
            isFetching: true,
            buttonSelected: 'overview',
            staffList: [],
            sensorBrandList: [],
            OrganizationList: [],
            isOrganization: false,
            isSensor: true,
            totalTeam: '',
            isTeams: false,
            teamList: [],
            isPlayers: false,
            playerList: [],
            cognito_user_id: '',
            view: 'gridView',
        };
    }
    toggleTab = (value) => {
        console.log("VALUE SENT IS ", value);
        this.setState({ tabActive: value });
    };

    getTargetBtn = (value) => {
        this.setState({ targetBtn: value });
    };
    handleViewChange = (view) =>{
        console.log('view',view)
        localStorage.setItem('view', view);
        this.setState({view:view})
    }

    handleButtonChanges =(e)=>{
        console.log(e.target.name);
        if(e.target.name == 'organization'){
            this.setState({      
                isSensor: false,
                isOrganization: true,
                isTeams: false,
                isFetching: false,
                isPlayers: false
            })
        }else if(e.target.name == 'sensor_companies'){
            this.setState({
                isFetching: false,
                isSensor: true,
                isTeams: false,
                isOrganization: false,
                isPlayers: false
            })
        }else if(e.target.name == 'teams'){
           
            this.setState({
                isFetching: false,
                isSensor: false,
                isTeams: true,
                isOrganization: false,
                isPlayers: false
            })
        }else if(e.target.name == 'individuals'){
            var the = this;
            setTimeout(function(){ 
                the.hadnlesearch();
            }, 2000);
            if(this.state.playerList == ''){
                the.setState({isFetching: true});
                getPlayerList({type: 'playersList'})
                .then(players => {
                    this.setState({
                        playerList:players.data.data,
                        isSensor: false,
                        isTeams: false,
                        isOrganization: false,
                        isPlayers: true,
                    })

                     setTimeout(function(){ 
                        the.setState({isFetching: false});
                        the.hadnlesearch();
                    }, 3000);
                    setTimeout(function(){ 
                        the.hadnlesearch();
                    }, 4000);
                }).catch(err=>{
                    console.log('err',err)
                })
            }else{
                this.setState({
                    isSensor: false,
                    isTeams: false,
                    isOrganization: false,
                    isPlayers: true,
                })
            }
        }
    }
    hadnlesearch =() =>{
        console.log('button',$("#myInput").html())
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            console.log('keyup',value)
            $("#myTable tr").filter(function() {
                console.log($(this).text().toLowerCase().indexOf(value))
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }
    checkIfDarkModeActive = () => {
        if (getStatusOfDarkmode().status === true) {
            const elementsRequire = [
                'tech-football',
                'football-header',
                'body-left-part',
                'teamName',
                'teamImpact',
                'teamAlerts',
                'athletes'
            ];
            elementsRequire.forEach((element) => {
                const totalCards = document.getElementsByClassName(element);

                if (element === 'tech-football') {
                    for (let i = 0; i < totalCards.length; i++) {
                        totalCards[i].style.background = '#171b25';
                    }
                } else if (element === 'football-header') {
                    for (let i = 0; i < totalCards.length; i++) {
                        totalCards[i].style.borderBottom = '1px solid #c7c7c7';
                    }
                } else if (element === 'body-left-part') {
                    for (let i = 0; i < totalCards.length; i++) {
                        totalCards[i].style.borderRight = '1px solid #c7c7c7';
                    }
                } else if (
                    element === 'teamName' ||
                    element === 'teamImpact' ||
                    element === 'teamAlerts' ||
                    element === 'athletes'
                ) {
                    for (let i = 0; i < totalCards.length; i++) {
                        totalCards[i].style.color = '#fff';
                    }
                }
            });
        }
    };

    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)
        var view = localStorage.getItem('view');
        if(view){
            console.log('view',view)
            this.setState({view: view})
        }
        isAuthenticated(JSON.stringify({}))
            .then((value) => {
                if (value.data.message === 'success') {

                    this.setState({
                        userDetails: JSON.parse(localStorage.getItem("state")).userInfo
                    });

                    if (this.state.userDetails.level === 1000) {
                        this.setState({
                            isAdmin: true
                        });
                        getAllSensorBrands()
                        .then(brands => {
                            console.log('brands',brands)
                            this.setState(prevState => ({
                                totalBrand: brands.data.data.length,
                                sensorBrandList: brands.data.data,
                            }));
                             getOrganizationList({type:'organizations'}).then(organizations =>{
                                console.log('organizations',organizations);
                                this.setState({
                                    OrganizationList: organizations.data.data,
                                    totalOrganization: organizations.data.data.length,
                                    isFetching: false,
                                })
                                getTeamList({type:"team"}).then(teams =>{
                                    console.log('teams',teams)
                                    this.setState({
                                        teamList: teams.data.data,
                                        totalTeam: teams.data.data.length,
                                        isFetching: false,
                                    })
                                }).catch(err=>{
                                    console.log('err',err)
                                    this.setState({
                                        isFetching: false,
                                        isAuthenticated: false, 
                                        isCheckingAuth: false
                                    })
                                })
                            }).catch(err=>{
                                console.log('err',err)
                                this.setState({
                                    isFetching: false,
                                    isAuthenticated: false, 
                                    isCheckingAuth: false
                                })
                            })
                           // return fetchStaffMembers({})
                        })
                        .catch(err => {
                            alert(err);
                        })
                    } else {
                        this.setState({
                            isAdmin: false,
                            isFetching: false
                        });
                    }
                } else {
                    this.setState({ isAuthenticated: false, isCheckingAuth: false });
                }
            })
            .catch((err) => {
                this.setState({ isAuthenticated: false, isCheckingAuth: false });
            })


        this.checkIfDarkModeActive();
        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }

    };

    setRedirectData = (id, p_name) => {
        console.log('setRedirectData',id,p_name,this.state.userDetails)
        this.setState({
            cognito_user_id: id,
            player_name: p_name,
            user_cognito_id: this.state.userDetails.user_cognito_id
        })
    }

    smallCards = (simulation_status, computed_time, simulation_timestamp, reference, brand, user_cognito_id, noOfSimulation, key) => {
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status == 'completed') {
            let computed_time = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff =(currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes =  Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time;
            if (minutes <= 10) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/OrganizationAdmin',
                            state: {
                                brand: {
                                    brand: brand,
                                    user_cognito_id: user_cognito_id
                                }
                            }
                        })
                    }}
                    className={cls}
                >

                    <div style={this.state.hideEditElement}>
                        <div ref={reference[1]} className="football-header ">
                            <p className="teamName mobile-dashboard-card" ref={reference[2]}>
                                <b>{brand}</b>
                            </p>

                        </div>
                        <div className="football-body d-flex">
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none", width: "100%" }}>
                                <p style={{ fontSize: "50px" }}>{noOfSimulation}</p>
                                <p className="teamImpact" ref={reference[5]}>
                                    Simulations
                                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

     smallCards2 = (simulation_status, computed_time, simulation_timestamp, reference, brand, organization, user_cognito_id, noOfSimulation, key) => {
        // console.log(reference);
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status == 'completed') {
            let computed_time = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff =(currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes =  Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time;
            if (minutes <= 10) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/TeamAdmin',
                            state: {
                                brand: {
                                    brand: brand,
                                    organization: organization,
                                    user_cognito_id: user_cognito_id
                                }
                            }
                        })
                    }}
                    className={cls}
                >

                    <div style={this.state.hideEditElement}>
                        <div ref={reference[1]} className="football-header ">
                            <p className="teamName mobile-dashboard-card" ref={reference[2]}>
                           
                                <b>{organization}</b>
                            </p>
                            
                        </div>
                        <div className="football-body d-flex">
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none", width: "100%" }}>
                                <p style={{ fontSize: "50px" }}>{noOfSimulation ? noOfSimulation : '0'}</p>
                                <p className="teamImpact" ref={reference[5]}>
                                    Simulations
                                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    iterateTeam2 = () => {
        console.log('OrganizationList',this.state.OrganizationList)
        let inc = 1;
        var cards = new Array(this.state.totalOrganization);
        let j = 1;
        for (let i = 0; i < this.state.totalOrganization; i++) {
            cards[i] = this.smallCards2(
                this.state.OrganizationList[i].simulation_status,
                this.state.OrganizationList[i].computed_time,
                this.state.OrganizationList[i].simulation_timestamp,
                [
                    'smCard' + i,
                    'parentChildTop' + i,
                    'h' + inc++,
                    'h' + inc++,
                    'parentChildLeft' + i,
                    'h' + inc++,
                    'h' + inc++
                ],
                // this.state.OrganizationList[i].sensor,
                '',
                this.state.OrganizationList[i].organization,
                this.state.OrganizationList[i].user_cognito_id,
                Number(this.state.OrganizationList[i].simulation_count),
                i
            );
            j++;
        }

        if (this.state.totalOrganization === 0) {
            return  <div style={{marginTop: '80px', marginBottom: '80px', width: '100%', textAlign: 'center'}}>No Organization added yet.</div>
        }

        return cards;
        
    };

    smallCards3 = (simulation_status, computed_time, simulation_timestamp, reference, brand, organization, team, user_cognito_id, noOfSimulation, key) => {
        // console.log(reference);
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status == 'completed') {
            let computed_time = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff =(currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes =  Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time;
            if (minutes <= 10) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/team/players',
                            state: {
                                team: {
                                    brand: brand,
                                    organization: organization,
                                    team_name: team,
                                    user_cognito_id: user_cognito_id,
                                    staff: this.state.staffList
                                }
                            }
                        })
                    }}
                    className={cls}
                >

                    <div style={this.state.hideEditElement}>
                        <div ref={reference[1]} className="football-header ">
                            <p className="teamName mobile-dashboard-card" ref={reference[2]}>
                                <b>{team}</b>
                            </p>

                        </div>
                        <div className="football-body d-flex">
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none", width: "100%" }}>
                                <p style={{ fontSize: "50px" }}>{noOfSimulation ? noOfSimulation : '0'}</p>
                                <p className="teamImpact" ref={reference[5]}>
                                    Simulations
                                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    iterateTeam3 = () => {
        console.log('teamList',this.state.teamList)
        let inc = 1;
        var cards = new Array(this.state.totalTeam);
        let j = 1;
        for (let i = 0; i < this.state.totalTeam; i++) {
            cards[i] = this.smallCards3(
                this.state.teamList[i].simulation_status,
                this.state.teamList[i].computed_time,
                this.state.teamList[i].simulation_timestamp,
                [
                    'smCard' + i,
                    'parentChildTop' + i,
                    'h' + inc++,
                    'h' + inc++,
                    'parentChildLeft' + i,
                    'h' + inc++,
                    'h' + inc++
                ],
                this.state.teamList[i].sensor,
                this.state.teamList[i].organization,
                this.state.teamList[i].team_name,
                this.state.userDetails.user_cognito_id,
                Number(this.state.teamList[i].simulation_count),
                i
            );
            j++;
        }
        if (this.state.totalTeam === 0) {
            return <div style={{ marginTop: '80px', marginBottom: '80px', width: '100%', textAlign: 'center' }}>No Team added yet.</div>
        }

        return cards;

    };

    activateTab = (value) => {
        if (value !== this.state.buttonSelected) {
            this.setState({
                buttonSelected: value
            })
        }
    }

    iterateTeam = () => {
        console.log('getAllSensorBrands', this.state.sensorBrandList);
        let inc = 1;
        var cards = new Array(this.state.totalBrand);
        let j = 1;
        for (let i = 0; i < this.state.totalBrand; i++) {

            const brand = this.state.sensorBrandList[i];
            
            cards[i] = this.smallCards(
                this.state.sensorBrandList[i].simulation_status,
                this.state.sensorBrandList[i].computed_time,
                this.state.sensorBrandList[i].simulation_timestamp,
                [
                    'smCard' + i,
                    'parentChildTop' + i,
                    'h' + inc++,
                    'h' + inc++,
                    'parentChildLeft' + i,
                    'h' + inc++,
                    'h' + inc++
                ],
                this.state.sensorBrandList[i].sensor,
                this.state.sensorBrandList[i].users,
                Number(this.state.sensorBrandList[i].simulation_count),
                i
            );
            j++;
        }

        return cards;

    };
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


    retunrnRosterBtn = () => {
        return (
            <React.Fragment>
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
                    content="staff"

                />
            </React.Fragment>
        );
    };
    tableSensor = () => {
        var body =  this.state.sensorBrandList.map(function (sensor, index) {
                if (sensor) {

                    let cls = sensor.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                    if (sensor.simulation_status == 'completed') {
                        let computed_time = sensor.computed_time ? parseFloat(sensor.computed_time) / (1000 * 60) : 0;

                        let currentStamp = new Date().getTime();
                        let simulationTimestamp = parseFloat(sensor.simulation_timestamp);
                        var diff =(currentStamp - simulationTimestamp) / 1000;
                        diff /= 60;
                        let minutes =  Math.abs(Math.round(diff));
                        console.log('minutes', minutes);
                        minutes = minutes - computed_time;
                        if (minutes <= 10) {
                            cls = 'completedSimulation tech-football m-3';
                        }
                    }

                    return <tr className={cls} key={index} onClick={() => {
                        this.props.history.push({
                            pathname: '/OrganizationAdmin',
                            state: {
                                brand: {
                                    brand: sensor.sensor,
                                    user_cognito_id: this.state.userDetails.user_cognito_id
                                }
                            }
                        })
                    }}
                    >
                        <th style={{ verticalAlign: "middle" }} scope="row">{Number(index + 1)}</th>
                        <td>{sensor.sensor}</td>
                        <td>{sensor.simulation_count}</td>
                       
                    </tr>;
                }
            }, this)
        return body
        
    }
    tableOrganization = ()=> {
        console.log(this.state.OrganizationList)
        var body =  this.state.OrganizationList.map(function (organization, index) {
                if (organization) {

                    let cls = organization.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                    if (organization.simulation_status == 'completed') {
                        let computed_time = organization.computed_time ? parseFloat(organization.computed_time) / (1000 * 60) : 0;

                        let currentStamp = new Date().getTime();
                        let simulationTimestamp = parseFloat(organization.simulation_timestamp);
                        var diff =(currentStamp - simulationTimestamp) / 1000;
                        diff /= 60;
                        let minutes =  Math.abs(Math.round(diff));
                        console.log('minutes', minutes);
                        minutes = minutes - computed_time;
                        if (minutes <= 10) {
                            cls = 'completedSimulation tech-football m-3';
                        }
                    }

                    return <tr className={cls}  key={index} onClick={() => {
                        this.props.history.push({
                            pathname: '/TeamAdmin',
                            state: {
                                brand: {
                                    brand: organization.sensor,
                                    organization: organization.organization,
                                    user_cognito_id: this.state.userDetails.user_cognito_id
                                }
                            }
                        })
                    }}
                    >
                        <th style={{ verticalAlign: "middle" }} scope="row">{Number(index + 1)}</th>
                        <td>{organization.organization}</td>
                        <td>{organization.simulation_count ? organization.simulation_count : '0'}</td>
                        <td>{organization.team_name ? organization.team_name : 'NA'}</td> 
                    </tr>;
                }
            }, this)
        return body
    }

    tableTeams = ()=>{
        console.log(this.state.teamList)

        var body =  this.state.teamList.map(function (team, index) {
                if (team) {

                    let cls = team.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                    if (team.simulation_status == 'completed') {
                        let computed_time = team.computed_time ? parseFloat(team.computed_time) / (1000 * 60) : 0;

                        let currentStamp = new Date().getTime();
                        let simulationTimestamp = parseFloat(team.simulation_timestamp);
                        var diff =(currentStamp - simulationTimestamp) / 1000;
                        diff /= 60;
                        let minutes =  Math.abs(Math.round(diff));
                        console.log('minutes', minutes);
                        minutes = minutes - computed_time;
                        if (minutes <= 10) {
                            cls = 'completedSimulation tech-football m-3';
                        }
                    }
                    return <tr className={cls} key={index} onClick={() => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/team/players',
                            state: {
                                team: {
                                    brand: team.sensor,
                                    organization: team.organization,
                                    team_name: team.team_name,
                                    user_cognito_id: this.state.userDetails.user_cognito_id,
                                    staff: this.state.staffList
                                }
                            }
                        })
                        
                    }}
                    >
                        <th style={{ verticalAlign: "middle" }} scope="row">{Number(index + 1)}</th>
                        <td>{team.team_name ? team.team_name : 'NA'}</td> 
                        <td>{team.simulation_count ? team.simulation_count : '0'}</td>
                        <td>{team.organization}</td>
                    </tr>;
                }
            }, this)
        return body
    }

    militaryVersionOrNormalVersion = () => {
        return (
            <React.Fragment>

                <div ref="rosterContainer" className="container t-roster animated1 zoomIn1">

                    {this.props.isMilitaryVersionActive ? (
                        <MilitaryVersionBtn> {this.retunrnRosterBtn()}</MilitaryVersionBtn>
                    ) : (
                            ''
                        )}
                    <div className="organization-admin-pt-8 row text-center  organization-pad__military">
                        <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate" style={{ textAlign: 'center', fontSize: '30px' }}>Admin Dashboard</p>
                        <div className="col-md-10 organization-admin-table-margin-5-mobile-overview dashboard-custom-button">
                            <button type="button" className={this.state.isSensor ?  "btn   custom-button2" : "btn   custom-button"} name="sensor_companies" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Sensor Companies</button> 
                            <button type="button" className={this.state.isOrganization ?  "btn   custom-button2" : "btn   custom-button"} name="organization" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Organization</button> 
                            <button type="button" className={this.state.isTeams ?  "btn   custom-button2" : "btn  custom-button"} name="teams" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Teams</button> 
                            <button type="button" className= "btn   custom-button" name="families"  style={{'margin': '7px'}}>Families</button> 
                            <button type="button"  className={this.state.isPlayers ?  "btn   custom-button2" : "btn  custom-button"} name="individuals" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Individuals</button> 

                        </div>
                         <div className="col-md-2 dashboard-custom-button" >
                            
                                {!this.state.isPlayers && 
                                    <div className="View">
                                        <img src={gridView} onClick={() => this.handleViewChange('gridView')} /> 
                                        <img src={listView} onClick={() => this.handleViewChange('listView')} />
                                    </div>
                                }
                               
                            
                        </div>
                        <div className="col-md-12 individuals-search-input">
                            {this.state.isPlayers && 
                                <label>
                                    Search: <input id="myInput" type="text"  placeholder="Search.."/>
                                </label>
                            }
                        </div>
                        <div className="col-md-12  dashboard-custom-button2">
                            <button type="button" className={this.state.isSensor ?  "btn   custom-button2" : "btn   custom-button"} name="sensor_companies" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Sensor Companies</button> 
                            <button type="button" className={this.state.isOrganization ?  "btn   custom-button2" : "btn   custom-button"} name="organization" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Organization</button> 
                            <button type="button" className={this.state.isTeams ?  "btn   custom-button2" : "btn  custom-button"} name="teams" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Teams</button> 
                        </div>
                        <div className="col-md-8 dashboard-custom-button2">
                            <button type="button" className= "btn   custom-button" name="families"  style={{'margin': '7px'}}>Families</button> 
                            <button type="button"  className={this.state.isPlayers ?  "btn   custom-button2" : "btn  custom-button"} name="individuals" onClick={this.handleButtonChanges} style={{'margin': '7px'}}>Individuals</button> 
                            {!this.state.isPlayers && 
                                <div className="View">
                                    <img src={gridView} onClick={() => this.handleViewChange('gridView')} /> 
                                    <img src={listView} onClick={() => this.handleViewChange('listView')} />
                                </div>
                            }
                        </div>
                       
                        <div className="col-md-12 organization-admin-table-margin-5-mobile-overview">
                            <div className="row">
                                <div
                                    ref="cardContainer"
                                    className="col-md-12 current-roster-card mb-5 mt-4 p-0"
                                >
                                 {this.props.isMilitaryVersionActive === true ? (
                                        ''
                                    ) : (
                                            <div className="rostar-selector">
                                                {this.retunrnRosterBtn()}
                                            </div>
                                        )} 
                                     {!this.state.tabActive ?
                                        <div className="row">
                                            <div className="col-md-12 text-right">

                                                {this.state.editTeamClass === 'edit-teams' ? (
                                                    <button
                                                        type="button"
                                                        onClick={this.disableEditTeamOPtion}
                                                        className="edit-team-btn"
                                                    >
                                                        Done
                                                    </button>
                                                ) : (
                                                        ''
                                                    )}
                                            </div>
                                        </div>
                                        :
                                        <div className="commander-data-table">
                                            <Link  to={{
                                                    pathname: '/InviteUsers',
                                                    state: {
                                                        lavelFor: '400',
                                                        data:{
                                                            type: 'AdminOrganization',
                                                            sensorBrandList: this.state.sensorBrandList,
                                                        }                                        
                                                    }
                                                }} >
                                                    <button type="button" className="btn btn-primary float-right" style={{'margin': '7px'}}>Invite Organization Admin</button> 
                                                </Link>
                                                <Link  to={{
                                                    pathname: '/InviteUsers',
                                                    state: {
                                                        lavelFor: '1000',
                                                        data:{
                                                            type: 'Admin',
                                                        }                                        
                                                    }
                                                }} >
                                                    <button type="button" className="btn btn-primary float-right" style={{'margin': '7px'}}>Invite Admin</button> 
                                                </Link>
                                            <table style={{ whiteSpace: "nowrap" }} className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Organization</th>
                                                        <th scope="col">Department</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="player-table">
                                                    {this.state.staffList.map(function (staff, index) {
                                                        return <tr className="player-data-table-row" key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{staff.first_name} {staff.last_name}</td>
                                                            <td>{staff.organization}</td>
                                                            <td>CTE</td>
                                                        </tr>
                                                    })}
                                                </tbody>

                                            </table>
                                        </div>
                                    } 
                                    {!this.state.tabActive ?
                                        this.state.view == 'gridView' ?
                                        this.state.isPlayers ? (
                                            <div ref="table" className="commander-data-table table-responsive ">
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col">Player ID</th>
                                                        <th scope="col">Player Name</th>
                                                        <th scope="col"># of Simulations</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Date</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Time</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Date</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Time</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody id="myTable" className="player-table" >
                                                        {this.state.playerList.map(function (player, index) {
                                                            if (player.simulation_data.length > 0) {
                                                                let dateTime = this.getDateTime(parseFloat(player.simulation_data[0].player_id.split('$')[1]));
                                                                let cls = player.simulation_data[0].simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
              
                                                                if (player.simulation_data[0]['impact-time']) {
                                                                  let split = player.simulation_data[0]['impact-time'].split(":");
                                                                  player.simulation_data[0]['impact-time'] = split.slice(0, split.length - 1).join(":");
                                                                }
              
                                                                if (player.simulation_data[0]['time']) {
                                                                  let split = player.simulation_data[0]['time'].toString();
                                                                  split = split.split(":");
                                                                  player.simulation_data[0]['time'] = split.slice(0, split.length - 1).join(":");
                                                                }
              
                                                                if (player.simulation_data[0].simulation_status === 'completed' ) {
              
                                                                  let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;
              
                                                                  let currentStamp = new Date().getTime();
                                                                  let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                                  var diff =(currentStamp - simulationTimestamp) / 1000;
                                                                  diff /= 60;
                                                                  let minutes =  Math.abs(Math.round(diff));
                                                                  console.log('minutes', minutes);
                                                                  minutes = minutes - computed_time;
                                                                  if (minutes <= 10) {
                                                                      cls = 'completedSimulation player-data-table-row';
                                                                  }
                                                                }

                                                                return <tr className={cls} key={index} onClick={() => {

                                                                    this.setRedirectData(Number(index + 1).toString(), player.player_name)
                                                                }}
                                                                >
                                                                    <th style={{ verticalAlign: "middle" }} scope="row">
                                                                    {  
                                                                        player.simulation_data[0].player_id.split('$')[0]

                                                                    }</th>
                                                                    <td>{player.simulation_data[0].player['first-name'] + ' ' + player.simulation_data[0].player['last-name']}</td>
                                                                    <td>{player.simulation_data.length}</td>
                                                                    <td style={{ alignItems: "center" }}>
                                                                        {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unkown Date' } </td>
                                                                    <td style={{ alignItems: "center" }}>
                                                                        {player.simulation_data[0]['impact-time'] ? this.tConvert(player.simulation_data[0]['impact-time']) : player.simulation_data[0]['time'] ? this.tConvert(player.simulation_data[0]['time']) : 'Unkown Time' } </td>
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
                                                                    <td style={{ alignItems: "center" }}>{dateTime.split(' ')[0]}</td>
                                                                    <td style={{ alignItems: "center" }}>{this.tConvert(dateTime.split(' ')[1])}</td>
                                                                </tr>;
                                                            }
                                                        }, this)}

                                                    </tbody>
                                                </table>
                                            </div>
                                        ) :
                                         (<div className="football-container mt-4 d-flex flex-wrap">
                                            {this.state.isSensor && this.iterateTeam()}
                                            {this.state.isOrganization && this.iterateTeam2()}
                                            {this.state.isTeams && this.iterateTeam3()}
                                        </div>)
                                        :   
                                        this.state.isPlayers ? (
                                            <div ref="table" className="commander-data-table table-responsive ">
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>

                                                        <th scope="col">Player ID</th>
                                                        <th scope="col">Player Name</th>
                                                        <th scope="col"># of Simulations</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Date</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Impact Time</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Date</th>
                                                        <th scope="col" ><span style={{display: 'block'}}>Last</span>Simulation Time</th>   
                                                        </tr>
                                                    </thead>
                                                  <tbody className="player-table" id="myTable">
                                                        {this.state.playerList.map(function (player, index) {
                                                            if (player.simulation_data.length > 0) {
                                                                let dateTime = this.getDateTime(parseFloat(player.simulation_data[0].player_id.split('$')[1]));
                                                                let cls = player.simulation_data[0].simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
              
                                                                if (player.simulation_data[0]['impact-time']) {
                                                                  let split = player.simulation_data[0]['impact-time'].split(":");
                                                                  player.simulation_data[0]['impact-time'] = split.slice(0, split.length - 1).join(":");
                                                                }
              
                                                                if (player.simulation_data[0]['time']) {
                                                                  let split = player.simulation_data[0]['time'].toString();
                                                                  split = split.split(":");
                                                                  player.simulation_data[0]['time'] = split.slice(0, split.length - 1).join(":");
                                                                }
              
                                                                if (player.simulation_data[0].simulation_status === 'completed' ) {
              
                                                                  let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;
              
                                                                  let currentStamp = new Date().getTime();
                                                                  let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                                  var diff =(currentStamp - simulationTimestamp) / 1000;
                                                                  diff /= 60;
                                                                  let minutes =  Math.abs(Math.round(diff));
                                                                  console.log('minutes', minutes);
                                                                  minutes = minutes - computed_time;
                                                                  if (minutes <= 10) {
                                                                      cls = 'completedSimulation player-data-table-row';
                                                                  }
                                                                }

                                                                return <tr className={cls} key={index} onClick={() => {

                                                                    this.setRedirectData(Number(index + 1).toString(), player.player_name)
                                                                }}
                                                                >
                                                                    <th style={{ verticalAlign: "middle" }} scope="row">
                                                                    {  
                                                                        player.simulation_data[0].player_id.split('$')[0]

                                                                    }</th>
                                                                    <td>{player.simulation_data[0].player['first-name'] + ' ' + player.simulation_data[0].player['last-name']}</td>
                                                                    <td>{player.simulation_data.length}</td>
                                                                    <td style={{ alignItems: "center" }}>
                                                                        {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unkown Date' } </td>
                                                                    <td style={{ alignItems: "center" }}>
                                                                        {player.simulation_data[0]['impact-time'] ? this.tConvert(player.simulation_data[0]['impact-time']) : player.simulation_data[0]['time'] ? this.tConvert(player.simulation_data[0]['time']) : 'Unkown Time' } </td>
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
                                                                    <td style={{ alignItems: "center" }}>{dateTime.split(' ')[0]}</td>
                                                                    <td style={{ alignItems: "center" }}>{this.tConvert(dateTime.split(' ')[1])}</td>
                                                                </tr>;
                                                            }
                                                        }, this)}

                                                    </tbody>
                                                </table>
                                            </div>
                                        ) :
                                        (<div ref="table" className="commander-data-table table-responsive ">
                                            {this.state.isSensor && 
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>

                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Sensor</th>
                                                            <th scope="col">Simulations</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="player-table">
                                                        {this.tableSensor()}
                                                    </tbody>
                                                </table>
                                            }
                                            {this.state.isOrganization && 
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Organization</th>
                                                            <th scope="col">Simulations</th>
                                                            <th scope="col">Team Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="player-table">
                                                        {this.tableOrganization()}
                                                    </tbody>
                                                </table>
                                            }
                                            {this.state.isTeams && 
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Team Name</th>
                                                            <th scope="col">Simulations</th>
                                                            <th scope="col">Organization</th> 
                                                        </tr>
                                                    </thead>
                                                    <tbody className="player-table">
                                                        {this.tableTeams()}
                                                    </tbody>
                                                </table>
                                            }
                                        </div>)
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    ifMilitaryVersionActive = () => {
        return 'military-dark-mode';
    };

    render() {

        if ((!this.state.isAuthenticated && !this.state.isCheckingAuth) || this.state.isAdmin === false) {
            return <Redirect to="/Dashboard" />;
        }
        
        if (this.state.cognito_user_id) {
            return <Redirect push to={{
                pathname: '/TeamAdmin/user/dashboard',
                state: {
                    user_cognito_id: this.state.userDetails.user_cognito_id,
                    cognito_user_id: this.state.cognito_user_id,
                    player_name: this.state.player_name.player_id,
                    isRedirectedFromAdminPanel: true,
                    team: {
                        brand: this.state.player_name.sensor,
                        team_name: this.state.player_name.team,
                        organization: this.state.player_name.organization,
                        staff: ''
                    }
                }
            }} />
        }

        if (this.state.isFetching) {
            return <Spinner />;
        }

        return (
            <React.Fragment>

                {this.props.isMilitaryVersionActive === true ? (
                    <div className="militay-view">
                        <div className="military-sidebar">
                            <SideBar />
                        </div>
                        <div
                            className={`military-main-content ${this.ifMilitaryVersionActive()}`}
                        >
                            {this.militaryVersionOrNormalVersion()}
                            {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}

                        </div>
                    </div>
                ) : (
                        <React.Fragment>
                            {this.militaryVersionOrNormalVersion()}
                            {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}
                            <div style={{
                                position: "absolute",
                                width: "100%"
                            }}>
                                <Footer />
                            </div>

                        </React.Fragment>
                    )}

            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {
        isMilitaryVersionActive: state.militaryVersion,
        user_details : state.userInfo
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(AdminDashboard);
