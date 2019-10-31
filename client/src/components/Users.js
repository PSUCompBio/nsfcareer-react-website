import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import { Redirect, Link, withRouter } from 'react-router-dom'

import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';

import ListUsers from './listUsers/ListUsers';
import { isAuthenticated } from './../apis';





import Spinner from './Spinner/Spinner';



class Users extends React.Component {
    constructor(props) {
        super(props);
        console.log("IN TEAM VIEW ",this.props.location)
        this.state = {

            targetBtn: '',
            rosterValue: 'Lorem ipsum',
            visibilityRosterValueSelector: { display: 'none' },

            isLoading: true,

            buttonSelected : 'overview',
        };
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

    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)
        if (getStatusOfDarkmode().status) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        }
        isAuthenticated(JSON.stringify({}))
        .then(value => {
            if (value.data.message != 'success') {
                // If user is not authenticated , Redirect him to /home
                this.props.history.push('/Home');
            }
        })

    };





    militaryVersionOrNormal = () => {
        return (
            <div
                ref="rosterContainer"
                className="container t-roster pt-5 mt-5 animated zoomIn"
                >
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <p ref="h1" className="penstate">
                                    Users
                                </p>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <ListUsers />
                </div>

                </div>
            </div>
                                );
                            };

                            render() {
                                    return (
                                        <React.Fragment>
                                            {this.props.isMilitaryVersionActive === true ? (
                                                <div className="militay-view">
                                                    <div className="military-sidebar">
                                                        <SideBar />
                                                    </div>
                                                    <div className="military-main-content">
                                                        {this.militaryVersionOrNormal()}
                                                    </div>
                                                </div>
                                            ) : (
                                                <React.Fragment>
                                                    {this.militaryVersionOrNormal()}
                                                    <Footer style={{display : "none"}} className="violent"/>
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

                            export default connect(mapStateToProps)(withRouter(Users));
