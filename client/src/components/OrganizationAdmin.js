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
    getAllOrganizationsOfSensorBrand,
    fetchStaffMembers
} from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';

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
            sensorOrgList: []
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

    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)
        console.log('this.props.location.state', this.props.location);
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
                                        getAllOrganizationsOfSensorBrand({ user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand })
                                            .then(orgs => {
                                                console.log('orgs',orgs)
                                                this.setState(prevState => ({
                                                    totalOrganization: orgs.data.data.length,
                                                    sensorOrgList: orgs.data.data
                                                }));
                                                console.log('user_cognito_id',this.props.location.state.brand.user_cognito_id,this.props.location.state.brand.brand)
                                                return fetchStaffMembers({user_cognito_id : this.props.location.state.brand.user_cognito_id, brand: this.props.location.state.brand.brand})
                                            })
                                            .then(response => {
                                                console.log('fetchStaffMembers',response)
                                                // for(var i = 0 ; i < response.data.data.length ; i++){
                                                    this.setState(prevState => ({
                                                        staffList: [...prevState.staffList, response.data.data]
                                                    }));
                                                // }
                                                console.log(this.state.staffList)
                                                this.setState(prevState => ({
                                                    isFetching: false
                                                }));
                                            })
                                            .catch(err => {
                                                alert(err);
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

    smallCards = (reference, brand, organization, user_cognito_id, noOfSimulation, key) => {
        // console.log(reference);
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
                    className={`tech-football m-3`}
                >

                    <div style={this.state.hideEditElement}>
                        <div ref={reference[1]} className="football-header ">
                            <p className="teamName mobile-dashboard-card" ref={reference[2]}>
                           
                                <b>{organization}</b>
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

    activateTab = (value) => {
        if (value !== this.state.buttonSelected) {
            this.setState({
                buttonSelected: value
            })
        }
    }

    iterateTeam = () => {
        let inc = 1;
        var cards = new Array(this.state.totalOrganization);
        let j = 1;
        for (let i = 0; i < this.state.totalOrganization; i++) {
            cards[i] = this.smallCards(
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
            j++;
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

                <div ref="rosterContainer" className="container t-roster animated1 zoomIn1">

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
                                    <h1>Organization Dashboard</h1>
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
                                                            type: 'organization',
                                                            sensorOrgList: this.state.sensorOrgList,
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
                                                    })}

                                                </tbody>

                                            </table>
                                            {!staffList && <p>No Data to display</p> }
                                        </div>
                                    }
                                    {!this.state.tabActive ?
                                        <div className="football-container mt-4 d-flex flex-wrap">
                                            {this.iterateTeam()}
                                        </div>
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
            if (this.state.userDetails.level === 300 && this.state.userDetails.level === 200 || this.state.userDetails.level === 100 ) {
                return <Redirect to="/Dashboard" />;
            }
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
    console.log(state);
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(OrganizationAdmin);
