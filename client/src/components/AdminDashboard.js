import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import { getStatusOfDarkmode } from '../reducer';
import { Redirect, withRouter, Link } from 'react-router-dom';
// import { formDataToJson } from '../utilities/utility';
import Spinner from './Spinner/Spinner';
import {
    isAuthenticated,
    getAllSensorBrands,
    fetchAdminStaffMembers,
    getOrganizationList,
    getOrganizationNameList,
    getTeamList,
    getTeamNameList,
    getPlayerList,
    deleteItem,
    renameOrganization,
    addOrganization,
    MergeOrganization,
    getAllSensorBrandsList,
    loadMorePlayerList,
    renameTeam,
    MergeTeam,
	deleteOrgTeam,
	deleteOrgTeam1,
	deleteOrgTeam2,
	deleteOrgTeam3,
	deleteOrgTeam4,
	addorgTeam,	
    getAllteamsOfOrganizationOfSensorBrand,
    getAllteamsOfOrganizationOfSensorBrandList,
} from '../apis';

import SideBar from './SideBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MilitaryVersionBtn from './MilitaryVersionBtn';
import gridView from './girdView.png';
import listView from './listView.png';
import $ from "jquery";
import delicon from './icons/delete.png';
import delicon1 from './icons/delete1.png';
// import merge from './icons/merge.png';
import pencil from './icons/pencil.png';
import plus from './icons/plus.png'
import {
    UncontrolledAlert
} from 'reactstrap';
import { Button } from 'react-bootstrap';
import DeletePopup from './Popup/DeletePopup';
import UpdatePopup from './Popup/UpdatePopup';
import SimulationCount from './PlayerDetails/SimulationCount';
import SimulationCountForList from './PlayerDetails/SimulationCountForList';
import TeamSimulationCount from './PlayerDetails/TeamSimulationCount';
import TeamSimulationCountForList from './PlayerDetails/TeamSimulationCountForList';


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
            isOrganization: true,
            isSensor: false,
            isTeams: false,
            teamList: [],
            isPlayers: false,
            playerList: [],
            cognito_user_id: '',
            view: 'gridView',
            isDisplay: { display: 'none' },
            isDisplay2: { display: 'none' },
            DelData: '',
            renameData: '',
            isEdit: false,
            isDelete: false,
            isUploading: false,
            isUpdated: false,
            Error: '',
            data: '',
            isRename: false,
            addTeamData: '',
            addOrganizationData: '',
            isAddOrganization: false,
            mergeData: '',
            isMerge: false,
            requestedUsers: '',			
			delete_id:'',
			highlight_id: '',
			isTeamsEdit: false,
            DelTeamsData: '',
            isTeamsDelete: false,
            isTeamsUpdated: false,
            TeamError: '',
			processing:''
        };
    }
    toggleTab = (value) => {
        console.log("VALUE SENT IS ", value);
        this.setState({ tabActive: value });
    };

    getTargetBtn = (value) => {
        this.setState({ targetBtn: value });
    };
    handleViewChange = (view) => {
        console.log('view', view)
        localStorage.setItem('view', view);
        this.setState({ view: view })
    }

    handleButtonChanges = (e) => {
        console.log(e.target.name);
        var the = this;
        if (e.target.name === 'organization') {
            // if(this.state.OrganizationList.length === 0){

            // }else{
            this.setState({
                isSensor: false,
                isOrganization: true,
                isTeams: false,
                isFetching: false,
                isPlayers: false
            });
            // }
        } else if (e.target.name === 'sensor_companies') {
            if (this.state.sensorBrandList.length === 0) {
                the.setState({ isFetching: true });
                getAllSensorBrandsList()
                    .then(brands => {
                        this.setState(prevState => ({
                            totalBrand: brands.data.data.length,
                            sensorBrandList: brands.data.data,
                            isFetching: false,
                            isSensor: true,
                            isTeams: false,
                            isOrganization: false,
                            isPlayers: false
                        }));

                    })
                getAllSensorBrands()
                    .then(brandList => {
                        this.setState(prevState => ({
                            totalBrand: brandList.data.data.length,
                            sensorBrandList: brandList.data.data,
                        }));
                    })
            } else {
                this.setState({
                    isFetching: false,
                    isSensor: true,
                    isTeams: false,
                    isOrganization: false,
                    isPlayers: false
                })
            }

        } else if (e.target.name === 'teams') {
            if (this.state.teamList.length === 0) {
                the.setState({ isFetching: true });
                getTeamNameList({ type: "team" }).then(teams => {
                    console.log('teams', teams)
                    this.setState({
                        teamList: teams.data.data,
                        totalTeam: teams.data.data.length,
                        isFetching: false,
                        isSensor: false,
                        isTeams: true,
                        isOrganization: false,
                        isPlayers: false
                    })
                }).catch(err => {
                    console.log('err', err)
                    this.setState({
                        isFetching: false,
                        isAuthenticated: false,
                        isCheckingAuth: false
                    })
                });
                // getTeamList({ type: "team" }).then(teams => {
                //     this.setState({
                //         teamList: teams.data.data,
                //         totalTeam: teams.data.data.length,
                //     })
                // });
            } else {
                this.setState({
                    isFetching: false,
                    isSensor: false,
                    isTeams: true,
                    isOrganization: false,
                    isPlayers: false
                })
            }
        } else if (e.target.name === 'individuals') {

            setTimeout(function () {
                the.hadnlesearch();
            }, 2000);
            if (this.state.playerList.length === 0) {
                the.setState({ isFetching: true });
                getPlayerList({ type: 'playersList', lastItem: '' })
                    .then(players => {
                        console.log('players ==============\n', players)
                        this.setState({
                            playerList: players.data.data,
                            isSensor: false,
                            isTeams: false,
                            isOrganization: false,
                            isPlayers: true,
                        })

                        setTimeout(function () {
                            the.setState({ isFetching: false });
                            the.hadnlesearch();
                        }, 3000);
                        setTimeout(function () {
                            the.hadnlesearch();
                        }, 4000);
                    }).catch(err => {
                        console.log('err', err)
                    })
            } else {
                this.setState({
                    isSensor: false,
                    isTeams: false,
                    isOrganization: false,
                    isPlayers: true,
                })
            }
        }
    }

    /*===================================
    
        Organization edit funtion start here

    =============================================*/
    handleEdit = (e) => {
        console.log('edit')
        $('.isEdit').css({ 'display': 'inherit' });
        $('.button-edit').addClass('button-edit-active');
        this.setState({
            isEdit: true,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: ''
        })
    } 
	handleTeamsEdit = (e) => {
        console.log('edit')
        $('.isTeamsEdit').css({ 'display': 'inherit' });
        $('.button-edit.Teams').addClass('button-edit-active');
        this.setState({
            isTeamsEdit: true,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: ''
        })
    }

    handleTeamCencel = () => {
        $('.isTeamsEdit').css({ 'display': 'none' });
        $('.button-edit.Teams').removeClass('button-edit-active');
        this.setState({
            isTeamsEdit: false,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: '',
            isUploading: false,
            renameData: '',
            isRename: false,
            isAddOrganization: false,
            addOrganizationData: '',
            mergeData: '',
            isMerge: false,			
			delete_id:'',
			highlight_id: '',
        })
    }
	handleCencel = () => {
        $('.isEdit').css({ 'display': 'none' });
        $('.button-edit').removeClass('button-edit-active');
        this.setState({
            isEdit: false,
            DelData: '',
            isDelete: false,
            isUpdated: false,
            Error: '',
            isUploading: false,
            renameData: '',
            isRename: false,
            isAddOrganization: false,
            addOrganizationData: '',
            mergeData: '',
            isMerge: false,			
			delete_id:'',
			highlight_id: '',
        })
    }

    editRecord = (e) => {
        console.log('data', e.type)
        this.setState({ data: e })
        if (this.state.isDisplay2.display === 'none') {
            this.setState({ isDisplay2: { display: 'flex' } });
        } else {
            this.setState({ isDisplay2: { display: 'none' } });
        }
    }
	editTeamRecord = (e) => {
        this.setState({ data: e })
        console.log('data', this.state.data)
        if (this.state.isDisplay2.display === 'none') {
            this.setState({ isDisplay2: { display: 'flex' } });
        } else {
            this.setState({ isDisplay2: { display: 'none' } });
        }
    }

    makeVisible = (data) => {
        this.setState({ isDisplay: data });
		this.setState({ delete_id: '' });
		this.setState({ highlight_id: '' });
    }
    makeVisible2 = (data) => {
        this.setState({ isDisplay2: data });
    }

    deleteRecord = (e) => {
        console.log('delete', e)
        this.setState({ DelData: { type: 'team', data: e } })
        if (this.state.isDisplay.display === 'none') {
            this.setState({ isDisplay: { display: 'flex' } });			
            this.setState({ delete_id:  e.organization});
        } else {
            this.setState({ isDisplay: { display: 'none' } });
        }
    }
	
	deleteTeamRecord = (e) => {
        console.log('delete', e)
        this.setState({ DelData: { type: 'orgTeam', data: e } })
        if (this.state.isDisplay.display === 'none') {
            this.setState({ isDisplay: { display: 'flex' } });
            this.setState({ delete_id:  e.TeamName+e.organization});
        } else {
            this.setState({ isDisplay: { display: 'none' } });
        }
    }
    isDeleteData = (isDelete) => {
        console.log('isDelete', isDelete)
        this.setState({ isDelete: isDelete });
        this.setState({ isDisplay: { display: 'none' } });		
		this.setState({ highlight_id : this.state.delete_id })
    }

    isUpdateData = (data) => {
        console.log('isUpdateData', data);
        if (data.data.type === "rename") {
            this.setState({ renameData: { OrganizationName: data.OrganizationName, organization_id: data.data.organization_id, data: data.data }, isRename: true })
        }
        if (data.data.type === "addOrganization") {
            this.setState({ addOrganizationData: { OrganizationName: data.OrganizationName, sensor: '' }, isAddOrganization: true })
        }
        if (data.data.type === "merge") {
            this.setState({ mergeData: { OrganizationName: data.OrganizationName, organization_id: data.data.organization_id, data: data.data }, isMerge: true })
        }
		console.log('isUpdateData', data);
        if (data.data.type === "renameTeam") {
            this.setState({ renameData: { TeamName: data.TeamName, organization_id: data.data.organization_id, data: data.data }, isRename: true })
        }
        if (data.data.type === "addTeam") {
            this.setState({ addTeamData: { TeamName: data.TeamName, sensor: this.state.brand, organization: this.state.organization }, isAddOrganization: true })
        }
        if (data.data.type === "mergeTeam") {
            this.setState({ mergeData: { TeamName: data.TeamName, organization_id: data.data.organization_id, data: data.data }, isMerge: true })
        }
        this.setState({ isDisplay2: { display: 'none' } });
    }

    handleChangeSave = () => {
        console.log('Save', this.state.renameData, this.state.addOrganizationData);
        this.setState({ isUploading: true });
        if (this.state.isDelete) {
            console.log('deleting')
            deleteItem(this.state.DelData)
                .then(res => {
                    console.log('res', res);
                    if (res.data.message === 'success') {
                        this.setState(prevState => ({
                            isUpdated: false,
                        }));
                        this.handleRenmaeOrganization();
                    } else {
                        this.setState({
                            isUploading: false,
                            Error: 'Somthing went wrong when deleting data.'
                        })
                    }

                }).catch(err => {
                    console.log(err)
                    this.setState({
                        isUploading: false,
                        isUpdated: false,
                        Error: 'Somthing went wrong when deleting data.'
                    })
                })
        } else {
            this.handleRenmaeOrganization();
        }
    }

    handleRenmaeOrganization = () => {
        console.log('rename', this.state.data)
        if (this.state.isRename) {
            renameOrganization(this.state.renameData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                        this.handleMergeOrganization();
                    } else {
                        this.setState({
                            isUpdated: false,
                            isUploading: false,
                            Error: 'Somthing went wrong when renaming organization.'
                        })
                    }

                }).catch(err => {
                    console.log('errRename', err);
                    this.setState({
                        isUploading: false,
                        Error: 'Somthing went wrong when renaming organization.'
                    })
                })
        } else {
            this.handleMergeOrganization();
        }
    }

    handleMergeOrganization = () => {
        console.log('rename', this.state.mergeData)
        if (this.state.isMerge) {
            MergeOrganization(this.state.mergeData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                        this.handleAddOrganization();
                    } else {
                        this.setState({
                            isUpdated: false,
                            isUploading: false,
                            Error: 'Somthing went wrong when merging organization.'
                        })
                    }

                }).catch(err => {
                    console.log('errRename', err);
                    this.setState({
                        isUploading: false,
                        Error: 'Somthing went wrong when merging organization.'
                    })
                })
        } else {
            this.handleAddOrganization();
        }
    }

    handleAddOrganization = () => {
        console.log('addOrganization', this.state.addOrganizationData);
        if (this.state.isAddOrganization) {
            addOrganization(this.state.addOrganizationData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                        getOrganizationList({ type: 'organizations' })
                            .then(orgs => {
                                $('.isEdit').css({ 'display': 'none' });
                                $('.button-edit').removeClass('button-edit-active');
                                this.setState(prevState => ({
                                    totalOrganization: orgs.data.data.length,
                                    OrganizationList: orgs.data.data,
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
                    } else {
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
                }).catch(err => {
                    console.log('erradd', err);
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
        } else {
            getOrganizationList({ type: 'organizations' })
                .then(orgs => {
                    $('.isEdit').css({ 'display': 'none' });
                    $('.button-edit').removeClass('button-edit-active');
                    this.setState(prevState => ({
                        totalOrganization: orgs.data.data.length,
                        OrganizationList: orgs.data.data,
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

    /**
    * Load more plyers function start here ...
    */
setProcessingState = (msg) => {
		this.setState({	processing: msg})
	}
 handleTeamChangeSave = () => {
        this.setState({ isUploading: true });
        if (this.state.isDelete) {
		this.setProcessingState('Deleting Team Players...');
            console.log('deleting', this.state.DelData)			
            deleteOrgTeam(this.state.DelData)
                .then(res1 => {
                    console.log('res', res1.data.data);
					if (res1.data.message === 'success') {
						if (res1.data.data.length > 0) {
							this.setProcessingState('Deleting Team Players...');
							var result = res1.data;
							 deleteOrgTeam2(result)
							.then(res3 => {
								if (res3.data.message === 'success') {
									this.setProcessingState('Players Deleted successfully');
									setTimeout(() =>{ this.setProcessingState('Deleting Simulation Records...'); }, 2000);
									deleteOrgTeam3(result)
									.then(res4 => {
										if (res4.data.message === 'success') {
											this.setProcessingState('Simulation Records Deleted successfully');
											setTimeout(() =>{ this.setProcessingState('Deleting Event Data...'); }, 2000);
											deleteOrgTeam4(result)
											.then(res5 => {
												if (res5.data.message === 'success') {
													this.setProcessingState('Event Data Deleted successfully');
													setTimeout(() =>{ this.setProcessingState('Deleting Team Data...'); }, 2000);
													deleteOrgTeam1(this.state.DelData)
													.then(res6 => {
														if (res6.data.message === 'success') {
															this.setProcessingState('Team Deleted successfully');
															this.setState({	isUploading: false,	})
															this.handleRenmaeTeam();
														}else{
															this.setState({
																isUploading: false,
																Error: 'Somthing went wrong when deleting Simulation Records.'
															})
															this.handleRenmaeTeam();
														}
													})
												}else{
													this.setState({
														isUploading: false,
														Error: 'Somthing went wrong when deleting Simulation Records.'
													})
													this.handleRenmaeTeam();
												}
											})
										}else{
											this.setState({
												isUploading: false,
												Error: 'Somthing went wrong when deleting Simulation Records.'
											})
											this.handleRenmaeTeam();
										}
										
									})
								}else{
									this.setState({
										isUploading: false,
										Error: 'Somthing went wrong when deleting Players.'
									})
									this.handleRenmaeTeam();
								}
								
							})
							
						} else {
							this.setProcessingState('Team Player List Empty...');
							this.setProcessingState('Deleting Team Data...');
							 deleteOrgTeam1(this.state.DelData)
							.then(res2 => {
								if (res2.data.message === 'success') {
									this.setState({	isUploading: false,	})
									this.setProcessingState('Team Deleted successfully');
									this.handleRenmaeTeam();
								} else {
									this.setState({
										isUploading: false,
										Error: 'Somthing went wrong when deleting Team.'
									})
								}
							 })
						}
					} else {
							this.setState({
								isUploading: false,
								Error: 'Somthing went wrong when deleting data.'
							})
							this.handleRenmaeTeam();
						}

                }).catch(err => {
                    console.log(err)
                    this.setState({
                        isUploading: false,
                        isUpdated: false,
                        Error: 'Somthing went wrong when deleting data.'
                    })
                })
        } else {
            this.handleRenmaeTeam();
        }

    }
    handleRenmaeTeam = () => {
        console.log('rename', this.state.renameData)
        if (this.state.isRename) {
            renameTeam(this.state.renameData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                        this.handleMergeTeam();
                    } else {
                        this.setState({
                            isUpdated: false,
                            isUploading: false,
                            Error: 'Somthing went wrong when renaming organization.'
                        })
                    }

                }).catch(err => {
                    console.log('errRename', err);
                    this.setState({
                        isUploading: false,
                        Error: 'Somthing went wrong when renaming organization.'
                    })
                })
        } else {
            this.handleMergeTeam();
        }
    }
	  handleMergeTeam = () => {
        console.log('isMerge', this.state.mergeData)
        if (this.state.isMerge) {
            MergeTeam(this.state.mergeData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                        this.handleAddTeam();
                    } else {
                        this.setState({
                            isUpdated: false,
                            isUploading: false,
                            Error: 'Somthing went wrong when merging Team.'
                        })
                    }

                }).catch(err => {
                    console.log('errRename', err);
                    this.setState({
                        isUploading: false,
                        Error: 'Somthing went wrong when merging Team.'
                    })
                })
        } else {
            this.handleAddTeam();
        }
    }
    handleAddTeam = () => {
        console.log('addOrganization', this.state.addTeamData);
        if (this.state.isAddOrganization) {
            addorgTeam(this.state.addTeamData)
                .then(response => {
                    console.log('response', response)
                    if (response.data.message === "success") {
                         getTeamNameList({ type: "team" }).then(teams => {
							console.log('teams', teams)
							$('.isTeamsEdit').css({ 'display': 'none' });
							$('.button-edit.Teams').removeClass('button-edit-active');
							this.setState({
								teamList: teams.data.data,
								totalTeam: teams.data.data.length,
								isFetching: false,
								isSensor: false,
								isTeams: true,
								isOrganization: false,
								isPlayers: false,
								isTeamsEdit: false,
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
							})
						})
                    } else {
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
                }).catch(err => {
                    console.log('erradd', err);
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
        } else {
             getTeamNameList({ type: "team" }).then(teams => {
				console.log('teams', teams)
				$('.isTeamsEdit').css({ 'display': 'none' });
				$('.button-edit.Teams').removeClass('button-edit-active');
				this.setState({
					teamList: teams.data.data,
					totalTeam: teams.data.data.length,
					isFetching: false,
					isSensor: false,
					isTeams: true,
					isOrganization: false,
					isPlayers: false,
					isTeamsEdit: false,
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
				})
			})
        }

    }
    handleLoadmorePlayers = () => {
       
        if(!this.state.loadingplayers){
            this.setState({
                loadingplayers: true,
            })
            loadMorePlayerList({ type: 'loadMorePlayerList', lastItem: '' })
                .then(players => {
                    console.log('players ==============\n', players)
                    this.setState({
                        playerList: players.data.data,
                        requestedUsers: players.data.requested_players,
                        loadingplayers: false,
                        isplyarloaded: true
                    })
                    let the = this;
                    setTimeout(function () {
                        the.filterText();
                    }, 3000);

                }).catch(err => {
                    console.log('err', err)
                    this.setState({
                        loadingplayers: false,
                        isplyarloaded: true
                    })
            })
        }
    }

    filterText = () => {
        var the = this;
        if($("#myInput") && $("#myInput") !== null){
            var value = $("#myInput").val(); //.toLowerCase();
            // console.log('keyup', value)
            the.handleLoadmorePlayers();
            $("#myTable tr").filter(function () {
                console.log($(this).text().toLowerCase().indexOf(value))
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                return true;
            });
        }

    }

    /*===================================
      
          Organization edit funtion end here
  
      =============================================*/
    hadnlesearch = () => {
        console.log('button', $("#myInput").html())
        var the = this;
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            // console.log('keyup', value)
            the.handleLoadmorePlayers();
            $("#myTable tr").filter(function () {
                console.log($(this).text().toLowerCase().indexOf(value))
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                return true;
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
        if (view) {
            console.log('view', view)
            this.setState({ view: view })
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
                        getOrganizationNameList()
                            .then(organizations => {
                                this.setState(prevState => ({
                                    OrganizationList: organizations.data.data,
                                    totalOrganization: organizations.data.data.length,
                                    isAuthenticated: true,
                                    isCheckingAuth: true,
                                    isFetching: false
                                }));
                                return fetchAdminStaffMembers({});
                            }).then(staff => {
                                var response = staff.data;
                                if (response.message === 'success') {
                                    this.setState(prevState => ({
                                        staffList: response.data,

                                    }));
                                }
                                //     return getOrganizationList();
                                // }).then(organizations => {
                                //     this.setState(prevState => ({
                                //         OrganizationList: organizations.data.data,
                                //         totalOrganization: organizations.data.data.length,
                                //     }));
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
        console.log('setRedirectData', id, p_name, this.state.userDetails)
        this.setState({
            cognito_user_id: id,
            player_name: p_name,
            user_cognito_id: this.state.userDetails.user_cognito_id
        })
    }

    smallCards = (simulation_status, computed_time, simulation_timestamp, reference, brand, user_cognito_id, noOfSimulation, key) => {
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status === 'completed') {
            let computed_time1 = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff = (currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes = Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time1;
            if (minutes <= 30) {
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
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none" }}>
                                {noOfSimulation || noOfSimulation === '0' || noOfSimulation === 0 ?
                                    <p style={{ fontSize: "50px" }}>{noOfSimulation} </p>
                                    :
                                    <i className="fa fa-spinner fa-spin" style={{ "font-size": "34px", "padding": '10px', 'color': '#0f81dc' }}></i>
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

    smallCards2 = (simulation_status, computed_time, simulation_timestamp, reference, brand, organization, user_cognito_id, noOfSimulation, key, organization_id) => {
        // console.log(reference);
        brand = brand ?  brand.trim() : '';
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status === 'completed') {
            let computed_time1 = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff = (currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes = Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time1;
            if (minutes <= 30) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
                <ul className="organization-edit-icons isEdit">
                    <li><span><img src={pencil} alt="Edit" onClick={e => this.editRecord({ brand: brand, organization: organization, user_cognito_id: user_cognito_id, organization_id: organization_id, type: 'rename' })} />Rename</span></li>
					{organization == this.state.highlight_id ?
						<li><span><img src={delicon1} alt="Delete" onClick={e => this.deleteRecord({ brand: brand, organization: organization, user_cognito_id: user_cognito_id, organization_id: organization_id })} />Delete</span></li>
					: 
						<li><span><img src={delicon} alt="Delete" onClick={e => this.deleteRecord({ brand: brand, organization: organization, user_cognito_id: user_cognito_id, organization_id: organization_id })} />Delete</span></li>
					}
                </ul>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: brand && brand !== undefined ? '/TeamAdmin/' + organization + '/' + brand : '/TeamAdmin/' + organization,
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
                                <SimulationCount count={noOfSimulation} sensor={brand} organization={organization} setSimulationCount={this.setSimulationCount} />
                                {/*noOfSimulation || noOfSimulation === '0' || noOfSimulation === 0 ?
                                    <p style={{ fontSize: "50px" }}>{noOfSimulation} </p>
                                    :
                                    <i className="fa fa-spinner fa-spin" style={{ "font-size": "34px", "padding": '10px', 'color': '#0f81dc' }}></i>
                */}
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
        console.log('OrganizationList', this.state.OrganizationList)
        let inc = 1;
        var cards = new Array(this.state.totalOrganization);
        // let j = 1;
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
                this.state.OrganizationList[i].sensor,
                this.state.OrganizationList[i].organization,
                this.state.OrganizationList[i].user_cognito_id,
                Number(this.state.OrganizationList[i].simulation_count),
                i,
                this.state.OrganizationList[i].organization_id,
            );
            // j++;
        }

        if (this.state.totalOrganization === 0) {
            return <div style={{ marginTop: '80px', marginBottom: '80px', width: '100%', textAlign: 'center' }}>No Organization added yet.</div>
        }

        return cards;

    };

    setTeamSimulationCount= (count, team,simulation_status, computed_time, simulation_timestamp,organization)=>{
        let lsitOrg = this.state.teamList;
        console.log('count',count, team)
        for (let i = 0; i < this.state.totalTeam; i++) {
            if(lsitOrg[i].team_name === team && lsitOrg[i].organization === organization){
                lsitOrg[i].simulation_count =  count;
                lsitOrg[i].simulation_status =  simulation_status;
                lsitOrg[i].computed_time =  computed_time;
                lsitOrg[i].simulation_timestamp =  simulation_timestamp;
            }

        }

        this.setState({teamList: lsitOrg});
    }


    smallCards3 = (simulation_status, computed_time, simulation_timestamp, reference, brand, organization, organization_id, team, user_cognito_id, noOfSimulation, key) => {
        // console.log(reference);
        brand = brand ? brand.trim() : '';
        let cls = simulation_status === 'pending' ? 'pendingSimulation tech-football m-3' : 'tech-football m-3';
        if (simulation_status === 'completed') {
            let computed_time1 = computed_time ? parseFloat(computed_time) / (1000 * 60) : 0;

            let currentStamp = new Date().getTime();
            let simulationTimestamp = parseFloat(simulation_timestamp);
            var diff = (currentStamp - simulationTimestamp) / 1000;
            diff /= 60;
            let minutes = Math.abs(Math.round(diff));
            console.log('minutes', minutes);
            minutes = minutes - computed_time1;
            if (minutes <= 30) {
                cls = 'completedSimulation tech-football m-3';
            }
        }
        return (
            <div key={key} ref={''} className={this.state.editTeamClass}>
			<ul className="organization-edit-icons isTeamsEdit" style={{'display':'none'}}>
                    <li><span><img src={pencil} alt="Edit" onClick={e => this.editTeamRecord({ brand: brand, organization: organization, organization_id: organization_id, user_cognito_id: user_cognito_id, TeamName: team, type: 'renameTeam' })} />Rename</span></li>
					{team+organization == this.state.highlight_id ?
						<li><span><img src={delicon1} alt="Delete" onClick={e => this.deleteTeamRecord({ brand: brand, organization: organization, organization_id: organization_id, user_cognito_id: user_cognito_id, TeamName: team })} />Delete</span></li>
					: 
						<li><span><img src={delicon} alt="Delete" onClick={e => this.deleteTeamRecord({ brand: brand, organization: organization, organization_id: organization_id, user_cognito_id: user_cognito_id, TeamName: team })} />Delete</span></li>
					}
                </ul>
                <div
                    ref={reference[0]}
                    onClick={(e) => {
                        this.props.history.push({
                            pathname: '/TeamAdmin/team/players/' + organization + '/' + team + '?brand=' + brand,
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
                            <div ref={reference[4]} className="body-left-part org-team-team-card" style={{ width: "100%", borderRight: "none" }}>
                                <TeamSimulationCount count={noOfSimulation} sensor={brand} organization={organization} team={team} setSimulationCount={this.setTeamSimulationCount}/>
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
        console.log('teamList', this.state.teamList)
        let inc = 1;
        var cards = new Array(this.state.totalTeam);
        // let j = 1;
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
                this.state.teamList[i].organization_id,
                this.state.teamList[i].team_name,
                this.state.userDetails.user_cognito_id,
                Number(this.state.teamList[i].simulation_count),
                i
            );
            // j++;
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
        // eslint-disable-next-line
        let j = 1;
        for (let i = 0; i < this.state.totalBrand; i++) {

            // const brand = this.state.sensorBrandList[i];

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

    tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
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
        var body = this.state.sensorBrandList.map(function (sensor, index) {
            if (sensor) {

                let cls = sensor.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                if (sensor.simulation_status === 'completed') {
                    let computed_time = sensor.computed_time ? parseFloat(sensor.computed_time) / (1000 * 60) : 0;

                    let currentStamp = new Date().getTime();
                    let simulationTimestamp = parseFloat(sensor.simulation_timestamp);
                    var diff = (currentStamp - simulationTimestamp) / 1000;
                    diff /= 60;
                    let minutes = Math.abs(Math.round(diff));
                    console.log('minutes', minutes);
                    minutes = minutes - computed_time;
                    if (minutes <= 30) {
                        cls = 'completedSimulation player-data-table-row';
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
                    <td>{sensor.simulation_count || sensor.simulation_count === '0' || sensor.simulation_count === 0 ? sensor.simulation_count : 'Loading...'}</td>

                </tr>;
            } else {
                return false;
            }
        }, this)
        return body

    }
    tableOrganization = () => {
        console.log(this.state.OrganizationList)
        var body = this.state.OrganizationList.map(function (organization, index) {
            if (organization) {

                let cls = organization.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                if (organization.simulation_status === 'completed') {
                    let computed_time = organization.computed_time ? parseFloat(organization.computed_time) / (1000 * 60) : 0;

                    let currentStamp = new Date().getTime();
                    let simulationTimestamp = parseFloat(organization.simulation_timestamp);
                    var diff = (currentStamp - simulationTimestamp) / 1000;
                    diff /= 60;
                    let minutes = Math.abs(Math.round(diff));
                    console.log('minutes', minutes);
                    minutes = minutes - computed_time;
                    if (minutes <= 30) {
                        cls = 'completedSimulation player-data-table-row';
                    }
                }
                var sensor = organization.sensor ? organization.sensor.trim() : '';

                return <tr className={cls} key={index} 
                >
                    <th style={{ verticalAlign: "middle" }} scope="row">{Number(index + 1)}</th>
                    <td onClick={() => {
                    this.props.history.push({
                        pathname: organization.sensor && organization.sensor !== undefined ? '/TeamAdmin/' + organization.organization + '/' + sensor : '/TeamAdmin/' + organization.organization,
                        state: {
                            brand: {
                                brand: organization.sensor,
                                organization: organization.organization,
                                user_cognito_id: this.state.userDetails.user_cognito_id
                            }
                        }
                    })
                }} >{organization.organization}</td>
                    <td><SimulationCountForList count={organization.simulation_count} sensor={sensor} organization={organization.organization} setSimulationCount={this.setSimulationCount} /></td>
						{this.state.isEdit ?	
						<>					
					<td style={{width :'20%'}}>
							<span  style={{width :'33%',float:'left'}}>Rename<br/><img style={{width :'24px'}} src={pencil} alt="Edit" onClick={e => this.editRecord({ brand: organization.sensor, organization: organization.organization, user_cognito_id: this.state.userDetails.user_cognito_id, organization_id: organization.organization_id, type: 'rename' })} /></span>
							{organization.organization == this.state.highlight_id ?
								<span style={{width :'33%',float:'left'}}>Delete<br/><img style={{width :'24px'}} src={delicon1} alt="Delete" onClick={e => this.deleteRecord({ brand: organization.sensor, organization: organization.organization, user_cognito_id: this.state.userDetails.user_cognito_id, organization_id: organization.organization_id })} /></span>
							: 
								<span style={{width :'33%',float:'left'}}>Delete<br/><img style={{width :'24px'}} src={delicon} alt="Delete" onClick={e => this.deleteRecord({ brand: organization.sensor, organization: organization.organization, user_cognito_id: this.state.userDetails.user_cognito_id, organization_id: organization.organization_id })} /></span>
							}
							
							
					</td>
						</>
					: null
					}
                </tr>;
            } else {
                return false;
            }
        }, this)
        return body
    }

    setSimulationCount= (count, organization, simulation_status, computed_time, simulation_timestamp)=>{
        let lsitOrg = this.state.OrganizationList;
        console.log('count',count, organization)
        for (let i = 0; i < this.state.totalOrganization; i++) {
            if(lsitOrg[i].organization === organization){
                lsitOrg[i].simulation_count =  count;
                lsitOrg[i].simulation_status = simulation_status; 
                lsitOrg[i].computed_time = computed_time;
                lsitOrg[i].simulation_timestamp = simulation_timestamp;
            }

        }

        this.setState({OrganizationList: lsitOrg});
    }
    tableTeams = () => {
        console.log(this.state.teamList)

        var body = this.state.teamList.map(function (team, index) {
            if (team) {

                let cls = team.simulation_status === 'pending' ? 'pendingSimulation player-data-table-row' : 'player-data-table-row';
                if (team.simulation_status === 'completed') {
                    let computed_time = team.computed_time ? parseFloat(team.computed_time) / (1000 * 60) : 0;

                    let currentStamp = new Date().getTime();
                    let simulationTimestamp = parseFloat(team.simulation_timestamp);
                    var diff = (currentStamp - simulationTimestamp) / 1000;
                    diff /= 60;
                    let minutes = Math.abs(Math.round(diff));
                    console.log('minutes', minutes);
                    minutes = minutes - computed_time;
                    if (minutes <= 30) {
                        cls = 'completedSimulation player-data-table-row';
                    }
                }
                return <tr className={cls} key={index} >
                    <th style={{ verticalAlign: "middle" }} scope="row">{Number(index + 1)}</th>
                    <td onClick={() => {
                    this.props.history.push({
                        pathname: '/TeamAdmin/team/players/' + team.organization + '/' + team.team_name + '?brand=' + team.sensor,
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

                }}>{team.team_name ? team.team_name : 'NA'}</td>
                    <td><TeamSimulationCountForList count={team.simulation_count} sensor={team.sensor} organization={team.organization} team={team.team_name} setSimulationCount={this.setTeamSimulationCount}/></td>
                    <td>{team.organization}</td>
                    {this.state.isTeamsEdit ?	
						<>					
					<td style={{width :'20%'}}>							
							<span style={{width :'33%',float:'left'}}>Rename<br/><img style={{width :'24px'}} src={pencil} alt="Edit" onClick={e => this.editTeamRecord({ brand: team.sensor, organization: team.organization, organization_id: team.organization_id, user_cognito_id: this.state.userDetails.user_cognito_id, TeamName: team.team_name, type: 'renameTeam' })} /></span>
							{team.team_name+team.organization == this.state.highlight_id ?
								<span style={{width :'33%',float:'left'}}>Delete<br/><img style={{width :'24px'}} src={delicon1} alt="Delete" onClick={e => this.deleteTeamRecord({ brand: team.sensor, organization: team.organization, organization_id: team.organization_id, user_cognito_id: this.state.userDetails.user_cognito_id, TeamName: team.team_name })} /></span>
							: 
								<span style={{width :'33%',float:'left'}}>Delete<br/><img style={{width :'24px'}} src={delicon} alt="Delete" onClick={e => this.deleteTeamRecord({ brand: team.sensor, organization: team.organization, organization_id: team.organization_id, user_cognito_id: this.state.userDetails.user_cognito_id, TeamName: team.team_name })} /></span>
							}
					</td>
						</>
					: null
					}
                </tr>;
            } else {
                return false;
            }
        }, this)
        return body
    }

    militaryVersionOrNormalVersion = () => {
        return (
            <React.Fragment>

                <div ref="rosterContainer" className="container t-roster animated1 zoomIn1 bottom-margin">

                    {this.props.isMilitaryVersionActive ? (
                        <MilitaryVersionBtn> {this.retunrnRosterBtn()}</MilitaryVersionBtn>
                    ) : (
                            ''
                        )}
                    <div className="organization-admin-pt-8 row text-center  organization-pad__military">
                        <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate" style={{ textAlign: 'center', fontSize: '30px' }}>Admin Dashboard</p>
                        <div className="col-md-10 organization-admin-table-margin-5-mobile-overview dashboard-custom-button">
                            <button type="button" className={this.state.isSensor ? "btn   custom-button2" : "btn   custom-button"} name="sensor_companies" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Sensor Companies</button>
                            <button type="button" className={this.state.isOrganization ? "btn   custom-button2" : "btn   custom-button"} name="organization" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Organizations</button>
                            <button type="button" className={this.state.isTeams ? "btn   custom-button2" : "btn  custom-button"} name="teams" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Teams</button>
                            <button type="button" className="btn   custom-button" name="families" style={{ 'margin': '7px' }}>Families</button>
                            <button type="button" className={this.state.isPlayers ? "btn   custom-button2" : "btn  custom-button"} name="individuals" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Individuals</button>

                        </div>
                        <div className="col-md-2 dashboard-custom-button" >
						 {this.state.isOrganization ?
							 <div className="View">									
										{this.state.userDetails.level === 1000  || this.state.userDetails.level === 300 || this.state.userDetails.level === 400 ?
										<Link style={{ fontWeight: "400",backgroundColor:"#0a5087",color:"#fff",padding:"9px 19px",borderRadius:"4px",fontSize:"15px",textDecoration:"none",display:"block",marginTop:"7px"}} to={{
											pathname: '/toolkit',
											state: {
												brand: {
													brand: '',
													user_cognito_id: this.state.user_cognito_id
												}
											}
										}} >ML Toolkit	</Link>
										:null
									  }
							  </div>
							  :
							  <>
                            {!this.state.isPlayers &&
                                <div className="View">
                                    <img src={gridView} alt="gridView" onClick={() => this.handleViewChange('gridView')} />
                                    <img src={listView} alt="listView" onClick={() => this.handleViewChange('listView')} />
                                </div>
                            }
							</>
						 }
                        </div>
                        <div className="col-md-12 individuals-search-input">
                            {this.state.isPlayers &&
                                <label>
                                    Search: <input id="myInput" type="text" placeholder="Search.." />
                                </label>
                            }
                        </div>
                        <div className="col-md-12  dashboard-custom-button2">
                            <button type="button" className={this.state.isSensor ? "btn   custom-button2" : "btn   custom-button"} name="sensor_companies" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Sensor Companies</button>
                            <button type="button" className={this.state.isOrganization ? "btn   custom-button2" : "btn   custom-button"} name="organization" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Organizations</button>
                            <button type="button" className={this.state.isTeams ? "btn   custom-button2" : "btn  custom-button"} name="teams" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Teams</button>
                        </div>
                        <div className="col-md-8 dashboard-custom-button2">
                            <button type="button" className="btn   custom-button" name="families" style={{ 'margin': '7px' }}>Families</button>
                            <button type="button" className={this.state.isPlayers ? "btn   custom-button2" : "btn  custom-button"} name="individuals" onClick={this.handleButtonChanges} style={{ 'margin': '7px' }}>Individuals</button>
                            {this.state.isOrganization ?
							 <div className="View">									
										{this.state.userDetails.level === 1000  || this.state.userDetails.level === 300 || this.state.userDetails.level === 400 ?
										<Link className={"btn custom-button"} style={{ fontWeight: "400",backgroundColor:"#0a5087",color:"#fff",padding:"9px 19px",borderRadius:"4px",fontSize:"15px",textDecoration:"none",display:"block",marginTop:"7px"}} to={{
											pathname: '/toolkit',
											state: {
												brand: {
													brand: '',
													user_cognito_id: this.state.user_cognito_id
												}
											}
										}} >ML Toolkit	</Link>
										:null
									  }
							  </div>
							  :
							  <>
                            {!this.state.isPlayers &&
                                <div className="View">
                                    <img src={gridView} alt="gridView" onClick={() => this.handleViewChange('gridView')} />
                                    <img src={listView} alt="listView" onClick={() => this.handleViewChange('listView')} />
                                </div>
                            }
							</>
						 }
                        </div>
                        {this.state.isOrganization &&
                            <div className="col-md-12 Admintitle" style={{'margin-bottom': '31px'}} >
                                <div className="col-md-3 org-edit-button" >	
									{!this.state.isPlayers ?
											<div className="">
												<button className="btn button-edit" style={this.state.isEdit ? { 'display': 'none','float':'left' } : { 'display': 'inline-block','float':'left','position':'unset !important' }} onClick={this.handleEdit}>Edit</button>
												<img src={gridView} alt="gridView" style={{'width':'42px','margin-left':'10px'}} onClick={() => this.handleViewChange('gridView')} />
												<img src={listView} alt="listView"  style={{'width':'42px','margin-left':'10px'}}  onClick={() => this.handleViewChange('listView')} />
											</div>
											:
											<div className="View">
												<button className="btn button-edit" style={this.state.isEdit ? { 'display': 'none' } : { 'display': 'inline-block' }} onClick={this.handleEdit}>Edit</button>
											</div>
									}
                                </div>
                            </div>
                        }
						 {this.state.isTeams &&
								<div className="col-md-12 Admintitle">
									<div className="col-md-3 org-edit-button" >	
										<button className="btn button-edit Teams" style={this.state.isTeamsEdit ? { 'display': 'none' } : { 'display': 'inline-block' }} onClick={this.handleTeamsEdit}>Edit</button>
								 </div>
                            </div>
						 }
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
                                            {/*<Link  to={{
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
                                                </Link>*/}
                                            <Link to={{
                                                pathname: '/InviteUsers',
                                                state: {
                                                    lavelFor: '1000',
                                                    data: {
                                                        type: 'Admin',
                                                    }
                                                }
                                            }} >
                                                <button type="button" className="btn btn-primary float-right" style={{ 'margin': '7px' }}>Invite Admin</button>
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
                                    {!this.state.tabActive ?
                                        this.state.view === 'gridView' ?
                                            this.state.isPlayers ? (
                                                <div ref="table" className="commander-data-table table-responsive ">
                                                    <table style={{ whiteSpace: "nowrap" }} className="table ">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Player ID</th>
                                                                <th scope="col">Player Name</th>
                                                                <th scope="col"># of Simulations</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Date</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Time</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Date</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Time</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}></span>Profile</th>

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

                                                                    if (player.simulation_data[0].simulation_status === 'completed') {

                                                                        let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;

                                                                        let currentStamp = new Date().getTime();
                                                                        let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                                        var diff = (currentStamp - simulationTimestamp) / 1000;
                                                                        diff /= 60;
                                                                        let minutes = Math.abs(Math.round(diff));
                                                                        console.log('minutes', minutes);
                                                                        minutes = minutes - computed_time;
                                                                        if (minutes <= 30) {
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
                                                                            {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unknown Date'} </td>
                                                                        <td style={{ alignItems: "center" }}>
                                                                            {player.simulation_data[0]['impact-time'] ? this.tConvert(player.simulation_data[0]['impact-time']) : player.simulation_data[0]['time'] ? this.tConvert(player.simulation_data[0]['time']) : 'Unknown Time'} </td>
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
                                                                        <td style={{ alignItems: "center" }}><a className="btn btn-primary" target='_blank' href={"/profile?id=" + player.simulation_data[0].user_data.account_id}>Profile</a></td>
                                                                    </tr>;
                                                                } else {
                                                                    return false;
                                                                }
                                                            }, this)}
                                                            {this.state.requestedUsers && this.state.requestedUsers.map(function (r_player, r_index) {
                                                                if (r_player) {
                                                                    let lineHeight = r_player.player_status === 'pending' ? '20px' : '30px'
                                                                    return <tr key={r_index} style={{ lineHeight: lineHeight }}>
                                                                        <td>-</td>
                                                                        <td style={{ 'max-width': '162px' }} className="wrap-cell">{r_player.first_name + ' ' + r_player.last_name}</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td style={{ alignItems: "center" }}><a className="btn btn-primary" target='_blank' href={"/profile?id=" + r_player.user_data.account_id}>Profile</a></td>

                                                                    </tr>
                                                                } else {
                                                                    return false
                                                                }
                                                            }, this)}
                                                        </tbody>
                                                    </table>
                                                    <div style={{ 'text-align': 'center', 'padding': '14px' }}>
                                                        {!this.state.isplyarloaded &&
                                                            <Button
                                                                variant="primary"
                                                                disabled={this.state.loadingplayers}
                                                                onClick={this.handleLoadmorePlayers}
                                                            >
                                                                {this.state.loadingplayers ? 'Loading...' : 'Load More'}
                                                            </Button>
                                                        }
                                                    </div>
                                                </div>
                                            ) :
                                                (<div className="football-container mt-4 d-flex flex-wrap">
                                                    <>
                                                        {this.state.isSensor && this.iterateTeam()}
                                                        {this.state.isOrganization &&
                                                            <>
                                                                {this.iterateTeam2()}
                                                                <div className="isEdit" >
                                                                    <div
                                                                        className="tech-football m-3 add-box"
                                                                        onClick={e => this.editRecord({ type: 'addOrganization' })}
                                                                    >
                                                                        <div className="wrap_img">
                                                                            <img src={plus} alt="Add New" />
                                                                            <h4>Add New</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                        {this.state.isTeams && this.iterateTeam3()}
                                                    </>
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
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Date</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Impact Time</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Date</th>
                                                                <th scope="col" ><span style={{ display: 'block' }}>Last</span>Simulation Time</th>
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

                                                                    if (player.simulation_data[0].simulation_status === 'completed') {

                                                                        let computed_time = player.simulation_data[0].computed_time ? parseFloat(player.simulation_data[0].computed_time) / (1000 * 60) : 0;

                                                                        let currentStamp = new Date().getTime();
                                                                        let simulationTimestamp = parseFloat(player.simulation_data[0].player_id.split('$')[1]);
                                                                        var diff = (currentStamp - simulationTimestamp) / 1000;
                                                                        diff /= 60;
                                                                        let minutes = Math.abs(Math.round(diff));
                                                                        console.log('minutes', minutes);
                                                                        minutes = minutes - computed_time;
                                                                        if (minutes <= 30) {
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
                                                                            {player.simulation_data[0]['impact-date'] ? this.getDate(player.simulation_data[0]['impact-date'].replace(/:|-/g, "/")) : player.simulation_data[0]['date'] ? this.getDate(player.simulation_data[0]['date'].replace(/:|-/g, "/")) : 'Unknown Date'} </td>
                                                                        <td style={{ alignItems: "center" }}>
                                                                            {player.simulation_data[0]['impact-time'] ? this.tConvert(player.simulation_data[0]['impact-time']) : player.simulation_data[0]['time'] ? this.tConvert(player.simulation_data[0]['time']) : 'Unknown Time'} </td>
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
                                                                } else {
                                                                    return false;
                                                                }
                                                            }, this)}

                                                        </tbody>
                                                    </table>
                                                    <div style={{ 'text-align': 'center', 'padding': '14px' }}>
                                                        {!this.state.isplyarloaded &&
                                                            <Button
                                                                variant="primary"
                                                                disabled={this.state.loadingplayers}
                                                                onClick={this.handleLoadmorePlayers}
                                                            >
                                                                {this.state.loadingplayers ? 'Loading ...' : 'Load More'}
                                                            </Button>
                                                        }
                                                    </div>
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
																	{this.state.isEdit ?	
																		<>	
																		<th scope="col">Action</th>
																		</>
																		:null }
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
																	{this.state.isTeamsEdit ?	
																	<>	
																	<th scope="col">Action</th>
																	</>
																	:null }
                                                                </tr>
                                                            </thead>
                                                            <tbody className="player-table">
                                                                {this.tableTeams()}
                                                            </tbody>
                                                        </table>
                                                    }
                                                </div>)
                                        : null}
                                    {this.state.isUploading ? (
                                        <div className="d-flex justify-content-center center-spinner">
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                            >
                                                <span className="sr-only">Uploading ...</span>
                                            </div>
											 <p>{ this.state.processing}</p>
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
                                    {this.state.isOrganization &&
                                        <div className="delete-confirmation-button isEdit">
                                            <button className="btn button-back " onClick={this.handleCencel}>Cancel</button>
                                            <button className="btn button-yes " onClick={this.handleChangeSave} >Save</button>
                                        </div>
                                    }
                                    {this.state.isTeams &&
                                        <div className="delete-confirmation-button isTeamsEdit" style= {{'display' : 'none'}}>
                                            <button className="btn button-back " onClick={this.handleTeamCencel}>Cancel</button>
                                            <button className="btn button-yes " onClick={this.handleTeamChangeSave} >Save</button>
                                        </div>
                                    }
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
                pathname: '/TeamAdmin/user/dashboard/' + this.state.cognito_user_id + '/' + this.state.player_name.player_id + '?team=' + this.state.player_name.team + '&org=' + this.state.player_name.organization + '&brand=' + this.state.player_name.sensor,
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
                <DeletePopup isVisible={this.state.isDisplay} makeVisible={(this.props.makeVisible) ? this.props.makeVisible : this.makeVisible} DelData={this.state.DelData} isDeleteData={(this.props.isDeleteData) ? this.props.isDeleteData : this.isDeleteData} />
                <UpdatePopup isVisible2={this.state.isDisplay2} makeVisible2={(this.props.makeVisible2) ? this.props.makeVisible2 : this.makeVisible2} isUpdateData={(this.props.isUpdateData) ? this.props.isUpdateData : this.isUpdateData} data={this.state.data} />

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
    console.log('state', state);
    return {
        isMilitaryVersionActive: state.militaryVersion,
        user_details: state.userInfo
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(AdminDashboard);
