import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import { getStatusOfDarkmode } from '../reducer';
import { Redirect, withRouter, Link } from 'react-router-dom';
// import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import DeletePopup from './Popup/DeletePopup';
import UpdatePopup from './Popup/UpdatePopup';

import {
    isAuthenticated,
    // getUserDetails,
    getUserDBDetails,
    getAllOrganizationsOfSensorBrand,
    fetchStaffMembers,
    deleteItem,
    renameOrganization,
    addOrganization,
    MergeOrganization,
    getAllOrganizationsOfSensorBrandList
} from '../apis';
import { 
    UncontrolledAlert
} from 'reactstrap';

import delicon from './icons/delete.png';
import merge from './icons/merge.png';
import pencil from './icons/pencil.png';
import plus from './icons/plus.png'
import $ from 'jquery';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';
import gridView from './girdView.png';
import listView from './listView.png';

class OrganizationAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            tabActive: 0,
            targetBtn: '',
            totalTeam: 0,
            totalOrganization: 0,
            editTeamClass: '',
            hideEditElement: { display: 'block' },
            isFetching: true,
            rostersArray: [],
            organization: 'PSU',
            buttonSelected: 'overview',
            staffList: [],
            sensorOrgList: [],
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
            addOrganizationData: '',
            isAddOrganization: false,
            mergeData: '',
            isMerge: false,
            view: 'gridView'
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
            addOrganizationData: '',
            mergeData: '',
            isMerge: false
        })
    }
    handleViewChange = (view) =>{
        console.log('view',view)
        localStorage.setItem('OrgView', view);
        this.setState({view:view})
    }
    deleteRecord = (e) =>{
        console.log('delete',e)
        this.setState({DelData: {type: 'team',data:e} })
        if (this.state.isDisplay.display === 'none') {
          this.setState({ isDisplay: {display:'flex'} });
        } else {
          this.setState({ isDisplay: {display:'none'} });
        }
    }
    editRecord = (e) =>{
        console.log('data',e.type)
        this.setState({data:e })
        if (this.state.isDisplay2.display === 'none') {
          this.setState({ isDisplay2: {display:'flex'} });
        } else {
          this.setState({ isDisplay2: {display:'none'} });
        }
    }
    makeVisible = (data) => {
        this.setState({ isDisplay: data });
    }
    makeVisible2 = (data) => {
        this.setState({ isDisplay2: data });
    }

    isDeleteData = (isDelete) => {
        console.log('isDelete',isDelete)
        this.setState({ isDelete: isDelete });
        this.setState({ isDisplay:{ display: 'none' } });
    }
    isUpdateData = (data) =>{
        console.log('isUpdateData',data);
        if(data.data.type === "rename"){
            this.setState({renameData: {OrganizationName : data.OrganizationName, organization_id: data.data.organization_id,data:data.data}, isRename: true})
        }
        if(data.data.type === "addOrganization"){
            this.setState({addOrganizationData: {OrganizationName : data.OrganizationName, sensor: this.props.location.state.brand.brand  }, isAddOrganization: true})
        }
        if(data.data.type === "merge"){
            this.setState({mergeData: {OrganizationName : data.OrganizationName, organization_id: data.data.organization_id,data:data.data }, isMerge: true})
        }
        this.setState({ isDisplay2:{ display: 'none' } });
    }

    handleChangeSave = () =>{
        console.log('Save',this.state.renameData, this.state.addOrganizationData);
        this.setState({isUploading: true});
        if(this.state.isDelete){
              console.log('deleting')
              deleteItem(this.state.DelData)
              .then(res => {
                  console.log('res',res);
                    if(res.data.message === 'success'){
                         this.setState(prevState => ({
                            isUpdated: false,
                        }));
                        this.handleRenmaeOrganization();
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
            this.handleRenmaeOrganization();
        }
    }

    handleRenmaeOrganization = () => {
        console.log('rename',this.state.data)
        if(this.state.isRename){
            renameOrganization(this.state.renameData)
            .then(response => {
                console.log('response',response)
                if(response.data.message === "success"){
                    this.handleMergeOrganization();
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
            this.handleMergeOrganization();
        }
    }

    handleMergeOrganization = () => {
        console.log('rename',this.state.mergeData)
        if(this.state.isMerge){
            MergeOrganization(this.state.mergeData)
            .then(response => {
                console.log('response',response)
                if(response.data.message === "success"){
                    this.handleAddOrganization();
                }else{
                    this.setState({
                        isUpdated: false,
                        isUploading: false,
                        Error: 'Somthing went wrong when merging organization.'
                    })
                }

            }).catch(err =>{
                console.log('errRename',err);
                this.setState({
                    isUploading: false,
                    Error: 'Somthing went wrong when merging organization.'
                })
            })
        }else{
            this.handleAddOrganization();
        }
    }

    handleAddOrganization=()=>{
        console.log('addOrganization',this.state.addOrganizationData);
        if(this.state.isAddOrganization){
            addOrganization(this.state.addOrganizationData)
            .then(response =>{
                 console.log('response',response)
                if(response.data.message === "success"){
                    getAllOrganizationsOfSensorBrand({ user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand })
                    .then(orgs => {
                        $('.isEdit').css({'display':'none'});
                        $('.button-edit').removeClass('button-edit-active');
                        this.setState(prevState => ({
                            totalOrganization: orgs.data.data.length,
                            sensorOrgList: orgs.data.data,
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
                            addOrganizationData: ''
                        }));
                    })
                }else{
                    this.setState({
                     isUpdated: false,
                        isUploading: false,
                        Error: 'Somthing went wrong when Adding organization.',
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
                    Error: 'Somthing went wrong when Adding organization.',
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
            getAllOrganizationsOfSensorBrand({ user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand })
            .then(orgs => {
                $('.isEdit').css({'display':'none'});
                $('.button-edit').removeClass('button-edit-active');
                this.setState(prevState => ({
                    totalOrganization: orgs.data.data.length,
                    sensorOrgList: orgs.data.data,
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
                    addOrganizationData: ''
                }));
            })
        }

    }

    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)
        console.log('this.props.location.state', this.props.location);
        var view = localStorage.getItem('OrgView');
        if(view){
            console.log('OrgView',view)
            this.setState({view: view})
        }
        if (this.props.location.state) {
            if (this.props.location.state.brand.user_cognito_id && this.props.location.state.brand.brand) {
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
                                    if (response.data.data.level === 1000 || response.data.data.level === 400) {
                                        getAllOrganizationsOfSensorBrandList({ user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand })
                                        .then(orgs => {
                                            this.setState(prevState => ({
                                                totalOrganization: orgs.data.data.length,
                                                sensorOrgList: orgs.data.data,
                                                isFetching: false
                                            }));
                                            return fetchStaffMembers({user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand})
                                        })
                                        .then(response => {
                                            this.setState(prevState => ({
                                                staffList: [...prevState.staffList, response.data.data],
                                            }));
                                        })
                                        .catch(err => {
                                            alert(err);
                                        })
                                        getAllOrganizationsOfSensorBrand({ user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand })
                                        .then(orgList =>{
                                            this.setState(prevState => ({
                                                totalOrganization: orgList.data.data.length,
                                                sensorOrgList: orgList.data.data
                                            }));
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
                
            }
        }

        this.checkIfDarkModeActive();
        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }

    };
  
    smallCards = (organization_id,simulation_status, computed_time, simulation_timestamp, reference, brand, organization, user_cognito_id, noOfSimulation, key) => {
        console.log('organization_id',organization_id);
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status === 'completed') {
            let computed_time1 = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff =(currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes =  Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time1;
            if (minutes <= 30) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                <ul className="organization-edit-icons isEdit">
                    <li><span><img src={pencil} alt="edit" onClick={e => this.editRecord( {brand: brand,organization: organization,user_cognito_id: user_cognito_id,organization_id: organization_id,type: 'rename'})}/>Rename</span></li>
                    <li><span><img src={merge} alt="merge" onClick={e => this.editRecord( {brand: brand, organization_id: organization_id,type: 'merge',sensorOrgList:this.state.sensorOrgList,selectOrg: organization})} />Merge</span></li>
                    <li><span><img src={delicon} alt="delete" onClick={e => this.deleteRecord( {brand: brand,organization: organization,user_cognito_id: user_cognito_id,organization_id: organization_id})} />Delete</span></li>
                </ul>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/'+organization+'/'+brand,
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
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none" }}>
                                {noOfSimulation || noOfSimulation === '0' || noOfSimulation === 0 ? 
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

     tableOrganization = ()=> {
        console.log(this.state.sensorOrgList)
        var body =  this.state.sensorOrgList.map(function (organization, index) {
                if (organization) {

                    let cls = organization.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                    if (organization.simulation_status === 'completed') {
                        let computed_time = organization.computed_time ? parseFloat(organization.computed_time) / (1000 * 60) : 0;

                        let currentStamp = new Date().getTime();
                        let simulationTimestamp = parseFloat(organization.simulation_timestamp);
                        var diff =(currentStamp - simulationTimestamp) / 1000;
                        diff /= 60;
                        let minutes =  Math.abs(Math.round(diff));
                        console.log('minutes', minutes);
                        minutes = minutes - computed_time;
                        if (minutes <= 30) {
                            cls = 'completedSimulation tech-football m-3';
                        }
                    }

                    return <tr className={cls}  key={index} onClick={() => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/'+organization.organization+'/'+organization.sensor,
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
                        <td>{organization.sensor ? organization.sensor : 'NA'}</td>
                        <td>{organization.simulation_count || organization.simulation_count === '0' || organization.simulation_count === 0 ? organization.simulation_count : 'Loading...'}</td>
                    </tr>;
                }
            }, this)
        return body
    }

    iterateTeam = () => {
        console.log('sensorOrgList',this.state.sensorOrgList)
        let inc = 1;
        var cards = new Array(this.state.totalOrganization);
        console.log('cards',cards)
        // let j = 1;
        for (let i = 0; i < this.state.totalOrganization; i++) {
            cards[i] = this.smallCards(
                this.state.sensorOrgList[i].organization_id,
                this.state.sensorOrgList[i].simulation_status,
                this.state.sensorOrgList[i].computed_time,
                this.state.sensorOrgList[i].simulation_timestamp,
                [
                    'smCard' + i,
                    'parentChildTop' + i,
                    'h' + inc++,
                    'h' + inc++,
                    'parentChildLeft' + i,
                    'h' + inc++,
                    'h' + inc++
                ],
                this.props.location.state.brand.brand,
                this.state.sensorOrgList[i].organization,
                this.props.location.state.brand.user_cognito_id,
                Number(this.state.sensorOrgList[i].simulation_count),
                i
            );
            // j++;
        }

        if (this.state.totalOrganization === 0) {
            return  <div style={{marginTop: '80px', marginBottom: '80px', width: '100%', textAlign: 'center'}}>No Organization added yet.</div>
        }

        return cards;
        
    };

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
                    content="Organization Admin Users"

                />
            </React.Fragment>
        );
    };

    militaryVersionOrNormalVersion = () => {
       
        var level = this.state.userDetails.level;
        var staffList =  this.state.staffList.map(function (staff, index) {
            return staff;
        })
         console.log('staffList',staffList);
        // staffList[0].map( (staff, index) =>
        //     console.log(staff)
        //  )
        // console.log('staffList',staffList[0])
        return (
            <React.Fragment>

                <div ref="rosterContainer" className="container t-roster animated1 zoomIn1 bottom-margin">

                    {this.props.isMilitaryVersionActive ? (
                        <MilitaryVersionBtn> {this.retunrnRosterBtn()}</MilitaryVersionBtn>
                    ) : (
                            ''
                        )}
                    <div className="organization-admin-pt-8 row text-center     team-admin-page-navigation  organization-pad__military">
                    <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate nav-p" >
                        {this.state.userDetails.level === 1000 &&
                            <Link style={{ fontWeight: "400" }} to={{
                                pathname: '/AdminDashboard',
                                state: {
                                    brand: {
                                        brand: this.props.location.state.brand.brand,
                                        user_cognito_id: this.props.location.state.brand.user_cognito_id
                                    }
                                }
                            }} >{'Admin > ' }</Link>
                                   
                        }
                        {this.props.location.state.brand.brand}

                    </p>
                        <div className="col-md-12 organization-admin-table-margin-5-mobile-overview">
                            <div className="row">
                                <div className="col-md-12 Admintitle" >
                                    <h1 className="title-grey-color"  style={{'text-decoration': 'underline','letter-spacing': '1px','font-family': 'sans-serif'}}>DASHBOARD 
                                        <div className="col-md-2 dashboard-custom-button" style={{'display':'inline-block','float': 'right'}}>
                                            <div className="View">
                                                <img src={gridView} alt="gridView" onClick={() => this.handleViewChange('gridView')} /> 
                                                <img src={listView} alt="listView" onClick={() => this.handleViewChange('listView')} />
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
                                                        lavelFor: '400',
                                                        data:{
                                                            type: 'sensorAdmin',
                                                            bk_data: this.props.location.state,
                                                            sensor: this.props.location.state.brand.brand
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
                                                        <th scope="col">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="player-table">
                                                    {staffList && staffList[0].map(function (staff, index) {
                                                        if(staff.data){
                                                            if(staff.data.level === 400){
                                                                return <tr className="player-data-table-row" key={index}
                                                                    onClick={()=>{
                                                                        if(staff.data && level === 1000){
                                                                        var win = window.open('/admin/view/user?id='+staff.data.user_cognito_id);
                                                                          win.focus();
                                                                        }
                                                                    }}
                                                                >
                                                                    <td>{staff.data ?  index + 1 : ''}</td>
                                                                    <td>{staff.data ? staff.data.first_name : ''} {staff.data ? staff.data.last_name : ''}</td>
                                                                    <td>{staff.data ? staff.data.email : ''} </td>
                                                                </tr>
                                                            }
                                                        }
                                                    })}

                                                </tbody>

                                            </table>
                                            {!staffList && <p>No Data to display</p> }
                                        </div>
                                    }
                                    {!this.state.tabActive ?
                                        this.state.view === 'gridView' ?
                                            <div className="football-container mt-4 d-flex flex-wrap">
                                                {this.state.userDetails.level === 1000 &&
                                                    <h2  className="title-grey-color" style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}}>ORGANIZATIONS</h2>
                                                }
                                                
                                                {
                                                    <React.Fragment>
                                                        {this.iterateTeam()}
                                                        <div  className="isEdit" >
                                                            <div
                                                                className="tech-football m-3 add-box"
                                                                onClick={e => this.editRecord( {type: 'addOrganization'})}
                                                            >
                                                                <div className="wrap_img">
                                                               <img src={plus} alt="Add New" />
                                                                <h4>Add New</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </React.Fragment>
                                                }
                                            </div>
                                            : 
                                            <div ref="table" className="commander-data-table table-responsive ">
                                             {this.state.userDetails.level === 1000 &&
                                                    <h2 style={{'width':'100%','fontWeight':'600','letter-spacing': '2px','font-family': 'sans-serif'}}>ORGANIZATIONS</h2>
                                                }
                                                <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No.</th>
                                                            <th scope="col">Organization</th>
                                                            <th scope="col">Sensor</th>
                                                            <th scope="col">Simulations</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="player-table">
                                                        {this.tableOrganization()}
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

        if (!this.props.location.state) {
           return <Redirect to="/Dashboard" />;
        } else {
            if (!this.props.location.state.brand.user_cognito_id && !this.props.location.state.brand.brand) {
                return <Redirect to="/Dashboard" />;
            }
        }

        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
            return <Redirect to="/Login" />;
        }

        if (this.state.isAuthenticated && !this.state.isCheckingAuth) {
            if (this.state.userDetails.level === 300 || this.state.userDetails.level === 200 || this.state.userDetails.level === 100 ) {
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
)(OrganizationAdmin);
