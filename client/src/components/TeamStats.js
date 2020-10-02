import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';
import Spinner from './Spinner/Spinner';

import {
    isAuthenticated,
    getTeamSpheres
  } from './../apis';

// let brainRegions = {};
// brainRegions['principal-max-strain'] = {};
// brainRegions['principal-min-strain'] = {};
// brainRegions['axonal-strain-max'] = {};
// brainRegions['csdm-max'] = {};
// brainRegions['masXsr-15-max'] = {};

class TeamStats extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            isLoading: true,
            brainRegions: {},
        };
    }
   
    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0);
        isAuthenticated(JSON.stringify({}))
            .then((value) => {
                if (value.data.message === 'success') {
                    getTeamSpheres({ brand: this.props.location.state.team.brand, organization: this.props.location.state.team.organization, team: this.props.location.state.team.team_name })
                        .then(response => {
                            console.log('response',response.data);
                            this.setState({
                                isAuthenticated: true,
                                isLoading: false,
                                isCheckingAuth: false,
                                brainRegions: response.data.data
                            });
                        })
                        .catch((error) => {
                            this.setState({
                                isLoading: false,
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

    render() {
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinner />;
       return (
            <React.Fragment>
                 
                <div className="container dashboard UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
                    <div className="container">
                        <div className="backbutton" style={{position : 'relative'}}>
                            <Link to={{
                                    pathname: '/TeamAdmin/team/players',
                                    state: {
                                        team: {
                                            brand: this.props.location.state.team.brand,
                                            organization: this.props.location.state.team.organization,
                                            team_name: this.props.location.state.team.team_name,
                                            user_cognito_id: this.props.location.state.user_cognito_id,
                                            staff: this.props.location.state.team.staff
                                        }
                                    } }}>&lt; Back To Team</Link>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <ExportPlayerReport brainRegions={this.state.brainRegions} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default connect(mapStateToProps)(TeamStats);
