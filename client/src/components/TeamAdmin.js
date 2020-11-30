import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import { getStatusOfDarkmode } from '../reducer';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import {
    isAuthenticated,
    getUserDetails,
    getUserDBDetails,
    getAllteamsOfOrganizationOfSensorBrand,
    getAllteamsOfOrganizationOfSensorBrandList,
    fetchStaffMembers,
    fetchOrgStaffMembers,
    addorgTeam,
    deleteItem,
    renameTeam,
    MergeTeam
} from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';
import gridView from './girdView.png';
import listView from './listView.png';
import $ from 'jquery';
import delicon from './icons/delete.png';
import merge from './icons/merge.png';
import pencil from './icons/pencil.png';
import DeletePopup from './Popup/DeletePopup';
import UpdatePopup from './Popup/UpdatePopup';
import plus from './icons/plus.png'
import { 
    UncontrolledAlert
} from 'reactstrap';

class TeamnAdmin extends React.Component {
    constructor(props) {
        super(props);
        console.log('teampros', this.props)
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            userDetails: {},
            tabActive: 0,
            targetBtn: '',
            totalTeam: 0,
            editTeamClass: '',
            hideEditElement: { display: 'block' },
            isFetching: true,
            rostersArray: [],
            organization: 'PSU',
            buttonSelected: 'overview',
            staffList: '',
            sensorOrgTeamList: [],
            view: 'gridView',
            isEdit: false,
            isDisplay: { display: 'none' },
            isDisplay2: { display: 'none' },
            DelData: '',
            renameData : '',
            isEdit: false,
            isDelete: false,
            isUploading: false,
            isUpdated:false,
            Error: '',
            data: '',
            isRename: false,
            addTeamData: '',
            isAddOrganization: false,
            mergeData: '',
            isMerge: false,
            user_cognito_id: '',
            brand: this.props.match.params.brand && this.props.match.params.brand != 'undefined' ? this.props.match.params.brand : '',
            organization: this.props.match.params.org
        };
    }
    toggleTab = (value) => {
        console.log("VALUE SENT IS ", value);
        this.setState({ tabActive: value });
    };

    getTargetBtn = (value) => {
        this.setState({ targetBtn: value });
    };

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
    handleViewChange = (view) =>{
        console.log('view',view)
        localStorage.setItem('OrgTeamView', view);
        this.setState({view:view})
    }

    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        var view = localStorage.getItem('OrgTeamView');
        if(view){
            console.log('OrgView',view)
            this.setState({view: view})
        }
        window.scrollTo(0, 0)
        // if (this.state.organization) {
            console.log('this.props.location.state', this.props);
            //if (this.props.location.state.brand.user_cognito_id && this.props.location.state.brand.brand && this.props.location.state.brand.organization) {
            if (this.state.organization) {
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
                                    if (response.data.data.level === 1000 || response.data.data.level === 400 || response.data.data.level === 300) {
                                        getAllteamsOfOrganizationOfSensorBrandList({ brand: this.state.brand, organization: this.state.organization })
                                            .then(teams => {
                                                console.log('teams',teams)
                                                this.setState(prevState => ({
                                                    totalTeam: teams.data.data.length,
                                                    sensorOrgTeamList: teams.data.data,
                                                    isFetching: false,
                                                    user_cognito_id: teams.data.data[0].user_cognito_id
                                                }));

                                                return fetchOrgStaffMembers({  brand: this.state.brand, organization: this.state.organization})
                                            })
                                            .then(response => {
                                                this.setState(prevState => ({
                                                    staffList: response.data.data,
                                                }));
                                            })
                                            .catch(err => {
                                                this.setState(prevState => ({
                                                    isFetching: false
                                                }));
                                            });
                                            getAllteamsOfOrganizationOfSensorBrand({  brand: this.state.brand, organization: this.state.organization })
                                            .then(teamList=>{
                                                this.setState(prevState => ({
                                                    totalTeam: teamList.data.data.length,
                                                    sensorOrgTeamList: teamList.data.data
                                                }));
                                            }).catch(err => {
                                                console.log(err);
                                                this.setState({ isAuthenticated: false, isCheckingAuth: false});
                                            })
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
            }else{
                this.setState(prevState => ({
                    totalTeam: 0,
                    sensorOrgTeamList: [],
                    isFetching: false
                }));
            }
        // }

        this.checkIfDarkModeActive();
        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }

    };

    editRecord = (e) =>{
        console.log('data',e.type)
        this.setState({data:e })
        if (this.state.isDisplay2.display === 'none') {
          this.setState({ isDisplay2: {display:'flex'} });
        } else {
          this.setState({ isDisplay2: {display:'none'} });
        }
    }
    deleteRecord = (e) =>{
        console.log('delete',e)
        this.setState({DelData: {type: 'orgTeam',data:e} })
        if (this.state.isDisplay.display === 'none') {
          this.setState({ isDisplay: {display:'flex'} });
        } else {
          this.setState({ isDisplay: {display:'none'} });
        }
    }
    handleEdit = (e) =>{
        console.log('edit')
        $('.isEdit').css({'display':'inherit'});
        $('.button-edit').addClass('button-edit-active');
        this.setState({
            isEdit:true,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: ''
        })
    }
    makeVisible = (data) => {
        this.setState({ isDisplay: data });
    }
    makeVisible2 = (data) => {
        this.setState({ isDisplay2: data });
    }
    isUpdateData = (data) =>{
        console.log('isUpdateData',data);
        if(data.data.type == "renameTeam"){
            this.setState({renameData: {TeamName : data.TeamName, organization_id: data.data.organization_id,data:data.data}, isRename: true})
        }
        if(data.data.type == "addTeam"){
            this.setState({addTeamData: {TeamName : data.TeamName, sensor: this.state.brand,organization:this.state.organization  }, isAddOrganization: true})
        }
        if(data.data.type == "mergeTeam"){
            this.setState({mergeData: {TeamName : data.TeamName, organization_id: data.data.organization_id,data:data.data }, isMerge: true})
        }
        this.setState({ isDisplay2:{ display: 'none' } });
    }
    isDeleteData = (isDelete) => {
        console.log('isDelete',isDelete)
        this.setState({ isDelete: isDelete });
        this.setState({ isDisplay:{ display: 'none' } });
    }
    handleCencel =()=>{
        $('.isEdit').css({'display':'none'});
        $('.button-edit').removeClass('button-edit-active');
        this.setState({
            isEdit:false,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: '',
            isUploading:false,
            renameData: '',
            isRename: false,
            isAddOrganization: false,
            addTeamData: '',
            mergeData: '',
            isMerge: false
        })
    }
    handleChangeSave = () =>{
        this.setState({isUploading: true});
         if(this.state.isDelete){
              console.log('deleting',this.state.DelData)
              deleteItem(this.state.DelData)
              .then(res => {
                  console.log('res',res);
                    if(res.data.message == 'success'){
                         this.setState(prevState => ({
                            isUpdated: false,
                        }));
                        this.handleRenmaeTeam();
                    }else{
                        this.setState({
                            isUploading: false,
                            Error: 'Somthing went wrong when deleting data.'
                        })
                    }
                
              }).catch(err=>{
                    console.log(err)
                    this.setState({
                        isUploading: false,
                        isUpdated: false,
                        Error: 'Somthing went wrong when deleting data.'
                    })
              })
        }else{
           this.handleRenmaeTeam();
        }
        
    }
    handleRenmaeTeam = () => {
        console.log('rename',this.state.data)
        if(this.state.isRename){
            renameTeam(this.state.renameData)
            .then(response => {
                console.log('response',response)
                if(response.data.message == "success"){
                    this.handleMergeTeam();
                }else{
                    this.setState({
                     isUpdated: false,
                        isUploading: false,
                        Error: 'Somthing went wrong when renaming organization.'
                    })
                }

            }).catch(err =>{
                console.log('errRename',err);
                this.setState({
                    isUploading: false,
                    Error: 'Somthing went wrong when renaming organization.'
                })
            })
        }else{
            this.handleMergeTeam();
        }
    }
    handleMergeTeam = () => {
        console.log('rename',this.state.mergeData)
        if(this.state.isMerge){
            MergeTeam(this.state.mergeData)
            .then(response => {
                console.log('response',response)
                if(response.data.message == "success"){
                    this.handleAddTeam();
                }else{
                    this.setState({
                        isUpdated: false,
                        isUploading: false,
                        Error: 'Somthing went wrong when merging Team.'
                    })
                }

            }).catch(err =>{
                console.log('errRename',err);
                this.setState({
                    isUploading: false,
                    Error: 'Somthing went wrong when merging Team.'
                })
            })
        }else{
            this.handleAddTeam();
        }
    }
    handleAddTeam=()=>{
        console.log('addOrganization',this.state.addTeamData);
        if(this.state.isAddOrganization){
            addorgTeam(this.state.addTeamData)
            .then(response =>{
                 console.log('response',response)
                if(response.data.message == "success"){
                    getAllteamsOfOrganizationOfSensorBrand({ brand: this.state.brand, organization: this.state.organization })
                    .then(teams => {
                        console.log('teams',teams)                              
                        $('.isEdit').css({'display':'none'});
                        $('.button-edit').removeClass('button-edit-active');
                        this.setState(prevState => ({
                            totalTeam: teams.data.data.length,
                            sensorOrgTeamList: teams.data.data,
                            isEdit: false,
                            isUpdated: true,
                            isUploading: false,
                            isDelete: false,
                            DelData: '',
                            isRename: false,
                            renameData: '',
                            isMerge: false,
                            mergeData: '',
                            isAddOrganization: false,
                            addTeamData: ''
                        }));
                    })
                }else{
                    this.setState({
                     isUpdated: false,
                        isUploading: false,
                        Error: 'Somthing went wrong when adding Team.',
                        isDelete: false,
                        DelData: '',
                        isRename: false,
                        renameData: '',
                        isMerge: false,
                        mergeData: '',
                        isAddOrganization: false,
                        addOrganizationData: ''
                    })
                }    
            }).catch(err =>{
                console.log('erradd',err);
                this.setState({
                    isUploading: false,
                    isUpdated: false,
                    Error: 'Somthing went wrong when adding Team.',
                    isDelete: false,
                    DelData: '',
                    isRename: false,
                    renameData: '',
                    isMerge: false,
                    mergeData: '',
                    isAddOrganization: false,
                    addOrganizationData: ''
                })
            })
        }else{
            getAllteamsOfOrganizationOfSensorBrand({  brand: this.state.brand, organization: this.state.organization })
            .then(teams => {
                console.log('teams',teams)                              
                $('.isEdit').css({'display':'none'});
                $('.button-edit').removeClass('button-edit-active');
                this.setState(prevState => ({
                    totalTeam: teams.data.data.length,
                    sensorOrgTeamList: teams.data.data,
                    isEdit: false,
                    isUpdated: true,
                    isUploading: false,
                    isDelete: false,
                    DelData: '',
                    isRename: false,
                    renameData: '',
                    isMerge: false,
                    mergeData: '',
                    isAddOrganization: false,
                    addTeamData: ''
                }));
            })
        }

    }
    smallCards = (simulation_status, computed_time, simulation_timestamp, reference, brand, organization, team, user_cognito_id, noOfSimulation, key,organization_id) => {
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
            if (minutes <= 30) {
                cls = 'completedSimulation tech-football m-3';
            }
        }

        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                 <ul className="organization-edit-icons isEdit">
                    <li><span><img src={pencil}  onClick={e => this.editRecord({TeamName:team, brand: brand,organization: organization,user_cognito_id: user_cognito_id,organization_id: organization_id,type: 'renameTeam'})}/>Rename</span></li>
                    <li><span><img src={merge}  onClick={e => this.editRecord({TeamName:team, brand: brand, organization_id: organization_id,type: 'mergeTeam',sensorOrgList:this.state.sensorOrgTeamList,selectOrg: organization} )} />Merge</span></li>
                    <li><span><img src={delicon} onClick={e => this.deleteRecord({TeamName:team, brand: brand,organization: organization,user_cognito_id: user_cognito_id,organization_id: organization_id}) } />Delete</span></li>
                </ul>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/team/players/'+organization+'/'+team+'?brand='+brand,
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
                                {noOfSimulation || noOfSimulation == '0' ? 
                                    <p style={{ fontSize: "50px" }}>{noOfSimulation} </p>
                                 : 
                                 <i className="fa fa-spinner fa-spin" style={{"font-size":"34px","padding":'10px','color': '#0f81dc'}}></i>
                                }
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

    activateTab = (value) => {
        if (value !== this.state.buttonSelected) {
            this.setState({
                buttonSelected: value
            })
        }
    }

    iterateTeam = () => {
        let inc = 1;
        var cards = new Array(this.state.totalTeam);
        let j = 1;
        for (let i = 0; i < this.state.totalTeam; i++) {
            cards[i] = this.smallCards(
                this.state.sensorOrgTeamList[i].simulation_status,
                this.state.sensorOrgTeamList[i].computed_time,
                this.state.sensorOrgTeamList[i].simulation_timestamp,
                [
                    'smCard' + i,
                    'parentChildTop' + i,
                    'h' + inc++,
                    'h' + inc++,
                    'parentChildLeft' + i,
                    'h' + inc++,
                    'h' + inc++
                ],
                //this.props.location.state.brand.brand, 
                this.state.userDetails.level === 1000 ? this.state.brand : this.state.sensorOrgTeamList[i].sensor,
                this.state.sensorOrgTeamList[i].organization,
                this.state.sensorOrgTeamList[i].team_name,
                this.state.userDetails.user_cognito_id,
                Number(this.state.sensorOrgTeamList[i].simulation_count),
                i,
                this.state.sensorOrgTeamList[i].organization_id,

            );
            j++;
        }
        if (this.state.totalTeam === 0) {
            return <div style={{ marginTop: '80px', marginBottom: '80px', width: '100%', textAlign: 'center','font-weight': '600','font-size': '30px','color': '#495057' }}>No Data To display.</div>
        }

        return cards;

    };
    tableTeams = ()=>{
        console.log(this.state.sensorOrgTeamList)

        var body =  this.state.sensorOrgTeamList.map(function (team, index) {
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
                        if (minutes <= 30) {
                            cls = 'completedSimulation tech-football m-3';
                        }
                    }
                    return <tr className={cls} key={index} onClick={() => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/team/players/'+team.organization+'/'+team.team_name+'?brand='+team.sensor,
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
                        <td>{team.simulation_count || team.simulation_count == '0' ? team.simulation_count : 'Loading...'}</td>
                        <td>{team.organization}</td>
                    </tr>;
                }
            }, this)
        return body
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

    militaryVersionOrNormalVersion = () => {
        return (
            <React.Fragment>

                <div ref="rosterContainer" className="container t-roster animated1 zoomIn1 bottom-margin">

                    {this.props.isMilitaryVersionActive ? (
                        <MilitaryVersionBtn> {this.retunrnRosterBtn()}</MilitaryVersionBtn>
                    ) : (
                            ''
                        )}
                    <div className=" row text-center  organization-pad__military team-admin-page-navigation">
                        <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate nav-p">
                            {this.state.userDetails.level === 1000 &&
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/AdminDashboard',
                                    state: {
                                        brand: {
                                            brand: this.state.brand,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }} >{'Admin > ' }</Link>
                                       
                            }
                            {this.state.userDetails.level !== 300 && this.state.userDetails.level !== 1000 &&
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/OrganizationAdmin',
                                    state: {
                                        brand: {
                                            brand: this.state.brand,
                                            user_cognito_id: this.state.user_cognito_id
                                        }
                                    }
                                }} >{this.state.brand + ' > ' }</Link>
                                       
                            }      
                        {this.state.organization}

                        </p>
                        <div className="col-md-12 organization-admin-table-margin-5-mobile-overview">
                            <div className="row">
                                <div className="col-md-12 Admintitle" >
                                    <h1 className="title-grey-color" style={{'text-decoration': 'underline','letter-spacing': '1px','font-family': 'sans-serif'}}>DASHBOARD 
                                        <div className="col-md-2 dashboard-custom-button" style={{'display':'inline-block','float': 'right'}}>
                                            <div className="View">
                                                <p className="head-team-mobile">Teams</p>
                                                <img src={gridView} className="team-view-icon" onClick={() => this.handleViewChange('gridView')} /> 
                                                <img src={listView} className="team-view-icon" onClick={() => this.handleViewChange('listView')} />
                                            </div>
                                        </div>
                                    </h1>
                                </div>
                                 <div className="col-md-12 Admintitle" >
                                    <div className="col-md-2 org-edit-button" >
                                        <button className="btn  button-edit" style={this.state.isEdit ? {'display':'none'} : {'display': 'inherit'}} onClick={this.handleEdit}>Edit</button>
                                       
                                    </div>
                                </div>
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
                                                        lavelFor: '300',
                                                        data:{
                                                            type: 'OrgAdmin',
                                                            data: {
                                                                brand:{
                                                                    brand: this.state.brand,
                                                                    organization: this.state.organization,
                                                                    user_cognito_id: this.state.user_cognito_id
                                                                }
                                                            },
                                                        }                                        
                                                    }
                                                }} >
                                                    <button type="button" className="btn btn-primary float-right" style={{'margin': '7px'}}>Invite Organization Staff</button> 
                                                </Link>
                                            <table style={{ whiteSpace: "nowrap" }} className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="player-table">
                                                    {this.state.staffList ? 
                                                        this.state.staffList.map(function (staff, index) {
                                                            return <tr className="player-data-table-row" key={index}
                                                                onClick={()=>{
                                                                    var win = window.open('/admin/view/user?id='+staff.user_cognito_id);
                                                                    win.focus();
                                                                }}
                                                            >
                                                                <td>{index + 1}</td>
                                                                <td>{staff.first_name} {staff.last_name}</td>
                                                                <td>{staff.email} </td>
                                                            </tr>
                                                        })
                                                    :
                                                    <p>No Data to display</p>

                                                    }
                                                </tbody>

                                            </table>
                                        </div>
                                    }
                                    {!this.state.tabActive ?
                                        this.state.view == 'gridView' ?
                                            <div className="football-container mt-4 d-flex flex-wrap">
                                                {this.state.userDetails.level === 1000 &&
                                                    <h2 style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}} className="head-team-desktop title-grey-color">TEAMS</h2>
                                                }
                                                {this.state.userDetails.level === 400 &&
                                                    <h2 style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}} className="head-team-desktop title-grey-color">TEAMS</h2>
                                                }
                                                {this.iterateTeam()}
                                                <div  className="isEdit" >
                                                    <div
                                                        className="tech-football m-3 add-box"
                                                        onClick={e => this.editRecord( {type: 'addTeam'})}
                                                    >
                                                        <div className="wrap_img">
                                                       <img src={plus} />
                                                        <h4>Add New</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div ref="table" className="commander-data-table table-responsive ">
                                            {this.state.userDetails.level === 1000 &&
                                                <h2 style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}} className="head-team-desktop title-grey-color">TEAMS</h2>
                                            }
                                            {this.state.userDetails.level === 400 &&
                                                <h2 style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}} className="head-team-desktop title-grey-color" >TEAMS</h2>
                                            }
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
                                        </div>
                                    : null}
                                    {this.state.isUploading ? (
                                        <div className="d-flex justify-content-center center-spinner">
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                                >
                                                <span className="sr-only">Uploading...</span>
                                            </div>
                                        </div>
                                    ) : null}

                                    {this.state.isUpdated ? (
                                        <UncontrolledAlert
                                            color="success"
                                            style={{ marginTop: '5px' }}
                                            >
                                            Changes has been done successfully.
                                        </UncontrolledAlert>
                                    ) : null}
                                    {this.state.Error ? (
                                        <UncontrolledAlert
                                            style={{ marginTop: '5px' }}
                                            color="danger"

                                            >
                                            {this.state.Error}

                                        </UncontrolledAlert>
                                    ) : null}
                                     <div className="delete-confirmation-button isEdit">
                                        <button className="btn button-back " onClick={this.handleCencel}>Cancel</button>
                                        <button className="btn button-yes " onClick={this.handleChangeSave} >Save</button>
                                    </div>
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

        if (!this.props.match.params.org) {
            return <Redirect to="/Dashboard" />;
        } 

        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
            return <Redirect to="/Login" />;
        }

        if (this.state.isAuthenticated && !this.state.isCheckingAuth) {
            if (this.state.userDetails.level === 200 || this.state.userDetails.level === 100 ) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (this.state.isFetching) {
            return <Spinner />;
        }

        return (
            <React.Fragment>
                <DeletePopup isVisible={this.state.isDisplay}  makeVisible={(this.props.makeVisible)? this.props.makeVisible : this.makeVisible} DelData={this.state.DelData} isDeleteData={(this.props.isDeleteData)? this.props.isDeleteData : this.isDeleteData} />
                <UpdatePopup isVisible2={this.state.isDisplay2}  makeVisible2={(this.props.makeVisible2)? this.props.makeVisible2 : this.makeVisible2} isUpdateData={(this.props.isUpdateData)? this.props.isUpdateData : this.isUpdateData} data={this.state.data}/>
                
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
                                width: "100%",
                                bottom: '0'
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
    console.log(state);
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(TeamnAdmin);
