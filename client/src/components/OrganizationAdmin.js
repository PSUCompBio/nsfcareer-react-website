import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
import { withRouter } from 'react-router-dom';
import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import { getOrganizationAdminData,
        getAllRosters,
        addTeam,
        deleteTeam,
        fetchAllTeamsInOrganization,
        fetchStaffMembers } from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';
import DarkMode from './DarkMode';

class OrganizationAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            highestLoadCount: 0.046,
            impactCount: 3,
            tabActive: 0,
            targetBtn: '',
            totalTeam: 0,
            editTeamClass: '',
            closeBtn: { display: 'none' },
            wantDeleteTeam: false,
            hideEditElement: { display: 'block' },
            showEditPen: { display: 'none' },
            toShowEditPen: '',
            showEditForm: false,
            disableEditBtn: false,
            editBtnStye: { background: '' },
            teamFormData:{},
            organizationAdminData : {},
            isFetching : true,
            rostersArray : [],
            teamList : [],
            organization : 'PSU',
            organizationToDelete : '',
            teamNameToDelete : '',
            apiLoader : false,
            buttonSelected : 'overview',
            staffList : []
        };
    }
    toggleTab = (value) => {
        console.log("VALUE SENT IS ",value);
        this.setState({ tabActive: value });
    };

    getTargetBtn = (value) => {
        this.setState({ targetBtn: value });
    };

    checkIfDarkModeActive = () => {
        if (getStatusOfDarkmode().status === true) {
            // this.refs.rosterContainer.style.background = '#171b25';
            // this.refs.cardContainer.style.background = '#232838';
            // this.refs.loadCardParent.style.background = 'transparent';
            // this.refs.loadCardParent.style.border = '0.5px solid #e8e8e8';
            // this.refs.impactCardParent.style.border = '0.5px solid #e8e8e8';
            // this.refs.impactCardParent.style.background = 'transparent';
            // this.refs.loadCard.style.background = '#171b25';
            // this.refs.impactCard.style.background = '#171b25';

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

        fetchAllTeamsInOrganization({ organization : this.state.organization })
        .then(response => {
            var list = response.data.data ;
            // Update the states
            this.setState(prevState => ({
                teamList: [...prevState.teamList, ...list],
                totalTeam : list.length
            }));
            return  getAllRosters(JSON.stringify({}))
        })
        .then(rostersResponse => {
            console.log("ROSTER DATA LOADED ",rostersResponse);
            for(var j = 0 ; j < rostersResponse.data.data.rosters.length ; j++){
                this.setState(prevState => ({
                    rostersArray: [...prevState.rostersArray, rostersResponse.data.data.rosters[j]]
                }));
            }
            return fetchStaffMembers({})


        })
        .then(response => {
            for(var i = 0 ; i < response.data.data.length ; i++){
                this.setState(prevState => ({
                    staffList: [...prevState.staffList, response.data.data[i]]
                }));
            }
            return getOrganizationAdminData(JSON.stringify({}))
        })
        .then(organizationResponseData => {
            console.log("VOID ", organizationResponseData);
            this.setState({
                organizationAdminData : { ...this.state.organizationAdminData, ...organizationResponseData.data.data },
                isFetching : false
            });
        })
        .catch(err => {
            alert(err);
        })


        this.checkIfDarkModeActive();
        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }

    };




    addTeam = () => {
        // this.showEditForm()

        this.setState(prevState => ({
            showEditForm : true
        }));
    };

    enableEditTeamOPtion = (e) => {
        if (this.state.editTeamClass === '') {
            this.setState({
                editTeamClass: 'edit-teams',
                closeBtn: { display: 'block' },
                currentDeleteTarget: '',
                disableEditBtn: true,
                editBtnStye: { background: '#000' }
            });
        }
    };

    disableEditTeamOPtion = () => {
        if (this.state.editTeamClass === 'edit-teams') {
            this.setState({
                editTeamClass: '',
                closeBtn: { display: 'none' },
                disableEditBtn: false,
                editBtnStye: { background: '' }
            });
        }
    };

    deleteTeam = (organization, team_name) => (e) => {
        console.log("VIOLENT DELETE ",e.target);
        this.setState({
            wantDeleteTeam: true,
            currentDeleteTarget: e.currentTarget.parentNode,
            organizationToDelete : organization,
            teamNameToDelete : team_name
        });
    };
    deleteCard = () => {
        this.setState({
            apiLoader : true
        });

        this.state.currentDeleteTarget.remove();
        this.setState({ wantDeleteTeam: false });
        {/*
            // Disabled deleting of Teams
            deleteTeam({ organization : this.state.organizationToDelete, team_name : this.state.teamNameToDelete })
            .then(response => {
            if(response.data.message == "success"){
            this.state.currentDeleteTarget.remove();
            this.setState({ wantDeleteTeam: false });

            }
            else{
            alert("Failed to delete team");
            }
            console.log(response.data);
            this.setState({
            apiLoader : false
            });
            })
            .catch(err => {
            console.log(err);
            this.setState({
            apiLoader : false
            });
            })
            */}
        };

        hideModal = () => {
            this.setState({ wantDeleteTeam: false });
        };

        hideElementForEdit = (e) => {
            if (this.state.editTeamClass === 'edit-teams') {
                e.currentTarget.classList.add('hover_edit');
                e.currentTarget.firstChild.style = 'display:block';
                e.currentTarget.firstChild.nextSibling.style = 'display:none';
            }
        };

        showElements = (e) => {
            e.currentTarget.classList.remove('hover_edit');
            e.currentTarget.firstChild.style = 'display:none';
            e.currentTarget.firstChild.nextSibling.style = 'display:block';
        };

        makeEditable = () => {
            this.setState({ showEditForm: true });
        };

        hideTeamForm = () => {
            this.setState({ showEditForm: false });
        };

        handleTeamEditSubmit = (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            let formData = formDataToJson(data);
            this.setState({
                apiLoader : true
            });
            formData = JSON.parse(formData);
            formData["athletes"] = "0";
            formData["impacts"] = "0";
            formData["alerts"] = "0";
            formData["simulation_count"] = "0";
            formData["player_list"] = [];

            formData = JSON.stringify(formData);

            addTeam(formData)
            .then(response => {

                if(response.data.message == "success"){
                    this.hideTeamForm();
                    console.log("FORM ADDED ,", formData);

                    this.setState(prevState => ({
                        teamFormData: formData ,
                        teamList: [...prevState.teamList, ...[JSON.parse(formData)]],
                        totalTeam : prevState.totalTeam + 1,
                        apiLoader : false
                    }));
                }
                else{
                    this.setState({
                        apiLoader : false
                    });
                    console.log(response.data);
                    alert("Failed to add team");
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    apiLoader : true
                });
            })

        };

        teamForm = (fieldName, placeholder, name, labelFor) => {
            return (
                <div  className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div style={{color: "#ffffff"}} className="input-group-text">{fieldName}</div>
                    </div>
                    <input
                        name={name}
                        type="text"
                        style={{color: "#ffffff"}}
                        className="form-control team-edit-input"
                        id={labelFor}
                        placeholder={placeholder}
                        />
                </div>
            );
        };

        teamFormHidden = (fieldName, placeholder, name, labelFor) => {
            return (
                <div className="input-group mb-2">
                    <div className="input-group-prepend">

                        {/* Field is hidden as this form is hidden form
                            <div className="input-group-text">{fieldName}</div>*/}
                        </div>
                        <input
                            name={name}
                            type="hidden"
                            className="form-control team-edit-input"
                            id={labelFor}
                            placeholder={placeholder}
                            value="PSU"
                            />
                    </div>
                );
            };

            showEditForm = () => {
                return (
                    <div className="modal__wrapper ">
                        <div className="modal__show modal_form">
                            <img
                                className="delete__icon"
                                onClick={this.hideTeamForm}
                                src="/img/icon/close.svg"
                                alt=""
                                />
                            <p style={{ fontWeight: "500 !important" }} className="edit-your-team">Add your team.</p>
                            <form className="team-form" onSubmit={this.handleTeamEditSubmit}>
                                {this.teamForm(
                                    'Team Name:',
                                    'Enter your team name',
                                    'team_name',
                                    'teamName'
                                )}
                                {this.teamFormHidden(
                                    'Organization:',
                                    'Organization name',
                                    'organization',
                                    'alertsFor'
                                )}
                                <button style={{marginTop: "5%"}} type="submit" className="dynamic-white-btn">
                                    Submit
                                </button>
                                {this.state.apiLoader ?
                                    <div className="d-flex justify-content-center center-spinner">
                                        <div
                                            style={{color : "#ffffff !important"}}
                                            className="spinner-border"
                                            role="status"
                                            >
                                            <span  className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    : null}
                                </form>
                            </div>
                        </div>
                    );
                };

                showModal = () => {
                    return (
                        <div className="modal__wrapper">
                            <div className="modal__show">
                                <p>Are You really want to delete this team? It cannot be undone.</p>
                                <div className="action_buttons">
                                    <button onClick={this.deleteCard}>YES</button>
                                    <button onClick={this.hideModal}>NO</button>
                                </div>
                                {this.state.apiLoader ?
                                    <div className="d-flex justify-content-center center-spinner">
                                        <div
                                            style={{color : "#ffffff !important"}}
                                            className="spinner-border"
                                            role="status"
                                            >
                                            <span  className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    );
                };

                smallCards = (reference, organization, team_name, noOfAthletes, noOfSimulation, key) => {
                    // console.log(reference);
                    return (
                        <div key={key} ref={''} className={this.state.editTeamClass}>
                            <img
                                className="delete__icon"
                                onClick={this.deleteTeam(organization, team_name)}
                                style={this.state.closeBtn}
                                src="/img/icon/close.svg"
                                alt=""
                                />
                            {/* TODO : ADD TEAM UPDATION BEHAVIOUR
                                <div
                                ref={reference[0]}
                                onMouseEnter={this.hideElementForEdit}
                                onMouseLeave={this.showElements}
                                onClick={() => {
                                this.state.editTeamClass === 'edit-teams'
                                ? this.makeEditable()
                                : this.props.history.push('/TeamAdmin');
                                }}
                                className={`tech-football m-3`}
                                >
                                */}
                                <div
                                    ref={reference[0]}
                                    onMouseEnter={this.hideElementForEdit}
                                    onMouseLeave={this.showElements}
                                    onClick={(e) => {
                                        if(this.state.editTeamClass !== 'edit-teams'){
                                            this.props.history.push({
                                                    pathname : '/TeamAdmin',
                                                    state: { team: { team_name : team_name,
                                                                     organization : organization,
                                                                     staff : this.state.staffList
                                                                    } }
                                            })
                                        }

                                    }}
                                    className={`tech-football m-3`}
                                    >
                                    <img
                                        className="pen_icon"
                                        style={this.state.showEditPen}
                                        src="/img/icon/pencheck.svg"
                                        alt=""
                                        />
                                    <div style={this.state.hideEditElement}>
                                        <div ref={reference[1]} className="football-header ">
                                            <p className="teamName" ref={reference[2]}>
                                                {team_name} <img src="/img/icon/football.svg" alt="" />
                                        </p>
                                        <p className="athletes" ref={reference[3]}>
                                            {noOfAthletes} Athletes{' '}
                                        </p>
                                    </div>
                                    <div className="football-body d-flex">
                                        <div ref={reference[4]} className="body-left-part org-team-team-card" style={{width : "100%", borderRight: "none", width: "100%"}}>
                                            <p style={{fontSize: "50px"}}>{noOfSimulation}</p>
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
                // smallCards = (reference, organization, team_name, noOfAthletes, noOfAlerts, noOfImpacts, key) => {
                //   // console.log(reference);
                //   return (
                //     <div key={key} ref={''} className={this.state.editTeamClass}>
                //       <img
                //         className="delete__icon"
                //         onClick={this.deleteTeam(organization, team_name)}
                //         style={this.state.closeBtn}
                //         src="/img/icon/close.svg"
                //         alt=""
                //       />
                //   {/* TODO : ADD TEAM UPDATION BEHAVIOUR
                //       <div
                //         ref={reference[0]}
                //         onMouseEnter={this.hideElementForEdit}
                //         onMouseLeave={this.showElements}
                //         onClick={() => {
                //           this.state.editTeamClass === 'edit-teams'
                //             ? this.makeEditable()
                //             : this.props.history.push('/TeamAdmin');
                //         }}
                //         className={`tech-football m-3`}
                //       >
                //       */}
                //       <div
                //         ref={reference[0]}
                //         onMouseEnter={this.hideElementForEdit}
                //         onMouseLeave={this.showElements}
                //         onClick={(e) => {
                //             if(this.state.editTeamClass !== 'edit-teams'){
                //               this.props.history.push('/TeamAdmin')
                //             }
                //
                //         }}
                //         className={`tech-football m-3`}
                //       >
                //         <img
                //           className="pen_icon"
                //           style={this.state.showEditPen}
                //           src="/img/icon/pencheck.svg"
                //           alt=""
                //         />
                //         <div style={this.state.hideEditElement}>
                //           <div ref={reference[1]} className="football-header ">
                //             <p className="teamName" ref={reference[2]}>
                //               {team_name} <img src="/img/icon/football.svg" alt="" />
                //             </p>
                //             <p className="athletes" ref={reference[3]}>
                //               {noOfAthletes} Athletes{' '}
                //             </p>
                //           </div>
                //           <div className="football-body d-flex">
                //             <div ref={reference[4]} className="body-left-part ">
                //               <p>{noOfImpacts}</p>
                //               <p className="teamImpact" ref={reference[5]}>
                //                 Impacts
                //               </p>
                //             </div>
                //             <div className="body-right-part">
                //               <p>{noOfAlerts}</p>
                //               <p className="teamAlerts" ref={reference[6]}>
                //                 Alerts
                //               </p>
                //             </div>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   );
                // };
                activateTab = (value) =>{
                    if(value !== this.state.buttonSelected){
                        this.setState({
                            buttonSelected : value
                        })
                    }
                }

                iterateTeam = () => {
                    let inc = 1;
                    var cards = new Array(this.state.totalTeam);
                    let j = 1 ;
                    for (let i = 0; i < this.state.totalTeam; i++) {

                        const team = this.state.teamList[i] ;
                        console.log("POP IT ",team);
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
                            this.state.teamList[i].organization,
                            this.state.teamList[i].team_name,
                            Number(this.state.teamList[i].player_list.length),
                            Number(this.state.teamList[i].simulation_count),
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
                            {this.state.wantDeleteTeam === true ? this.showModal() : ''}
                            {this.state.showEditForm === true ? this.showEditForm() : ''}

                            <div ref="rosterContainer" className="t-roster animated zoomIn">

                                {this.props.isMilitaryVersionActive ? (
                                    <MilitaryVersionBtn> {this.retunrnRosterBtn()}</MilitaryVersionBtn>
                                ) : (
                                    ''
                                )}
                                <div  className="organization-admin-pt-8 row text-center  organization-pad__military">
                                    <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate">Admin Dashboard</p>
                                    <div className="col-md-9 organization-admin-table-margin-5-mobile-overview">
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
                                                            <button
                                                                style={this.state.editBtnStye}
                                                                disabled={this.state.disableEditBtn}
                                                                type="button"
                                                                onClick={this.enableEditTeamOPtion}
                                                                className="edit-team-btn"
                                                                >
                                                                Edit Teams
                                                            </button>
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
                                                    <table style={{whiteSpace:"nowrap"}} className="table">
                                                        <thead>
                                                          <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Organization</th>
                                                            <th scope="col">Department</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody className="player-table">
                                                            {this.state.staffList.map(function(staff, index){
                                                                return <tr className="player-data-table-row" key={index}>
                                                                    <td>{index + 1 }</td>
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
                                                <div className="football-container mt-4 d-flex flex-wrap">
                                                    {this.iterateTeam()}
                                                    <div className="tech-football m-3">
                                                        <div className="addTeam text-center">
                                                            <div onClick={this.addTeam} className="plus">
                                                                +
                                                            </div>
                                                            <p>Add Team</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 pt-5 mb-3">
                                        {/*
                                            <div className="highest-load mb-5">
                                            <div ref="loadCardParent" className="card">
                                            <div ref="loadCard" className="load-heading">
                                            HIGHEST LOAD
                                            </div>
                                            <p ref="john1" className="mt-4 ">
                                            John Sylvester <span>- York Tech football</span>
                                            </p>
                                            <div className="load-count mt-3 mb-3">
                                            {this.state.highestLoadCount}
                                            </div>
                                            </div>
                                            </div>

                                            <div className="most-impacts mb-5">
                                            <div ref="impactCardParent" className="card">
                                            <div ref="impactCard" className="impact-heading">
                                            MOST IMPACTS
                                            </div>
                                            <p ref="john2" className="mt-4">
                                            John Sylvester <span>- York Tech football</span>
                                            </p>
                                            <div className="impact-count mt-3 mb-3">
                                            {this.state.impactCount}
                                            </div>
                                            </div>
                                            </div>
                                            */}
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
                        console.log(this.props);
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
                                            <DarkMode isDarkMode={this.props.isDarkModeSet} />
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        {this.militaryVersionOrNormalVersion()}
                                        <DarkMode isDarkMode={this.props.isDarkModeSet} />
                                        <div style={{bottom : "0",
                                                     position : "absolute",
                                                     width: "100%"}}>
                                        <Footer/>
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
