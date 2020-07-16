import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import { getStatusOfDarkmode } from '../reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import {
    isAuthenticated,
    getAllSensorBrands,
    fetchStaffMembers
} from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';

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
            sensorBrandList: []
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
                            this.setState(prevState => ({
                                totalBrand: brands.data.data.length,
                                sensorBrandList: brands.data.data,
                                isFetching: false
                            }));

                           // return fetchStaffMembers({})
                        })
                        // .then(response => {
                        //     for (var i = 0; i < response.data.data.length; i++) {
                        //         this.setState(prevState => ({
                        //             staffList: [...prevState.staffList, response.data.data[i]]
                        //         }));
                        //     }
                        //     this.setState(prevState => ({
                        //         isFetching: false
                        //     }));
                        // })
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

    smallCards = (reference, brand, user_cognito_id, noOfSimulation, key) => {
        // console.log(reference);
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
                    className={`tech-football m-3`}
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
            console.log("POP IT ", brand);
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
                this.state.sensorBrandList[i].sensor,
                this.state.sensorBrandList[i].user_cognito_id,
                Number(this.state.sensorBrandList[i].simulation_count),
                i
            );
            j++;
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
                    content="staff"

                />
            </React.Fragment>
        );
    };

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
                        <div className="col-md-12 organization-admin-table-margin-5-mobile-overview">
                            <div className="row">
                                <div
                                    ref="cardContainer"
                                    className="col-md-12 current-roster-card mb-5 mt-4 p-0"
                                >
                                    {/* {this.props.isMilitaryVersionActive === true ? (
                                        ''
                                    ) : (
                                            <div className="rostar-selector">
                                                {this.retunrnRosterBtn()}
                                            </div>
                                        )} */}
                                    {/* {!this.state.tabActive ?
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
                                    } */}
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

        if ((!this.state.isAuthenticated && !this.state.isCheckingAuth) || this.state.isAdmin === false) {
            return <Redirect to="/Dashboard" />;
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
