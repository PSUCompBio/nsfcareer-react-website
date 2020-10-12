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
            insult: 'principal-max-strain',
        };
        this.child = React.createRef();
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

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
        this.child.current.handleBrainStrain(e.target.value);
    };

    render() {
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinner />;
       return (
            <React.Fragment>
                 
                <div className="container dashboard UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
                    <div className="container">
                        <h1 className="top-heading__login" style={{textAlign: 'center', color: 'black'}}>Team Stats</h1>
                        <div className="backbutton11" style={{position : 'relative'}}>
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
                        <div style={{textAlign: 'center'}}>
                            <label style={{fontSize: '20px'}}>Display all member data with</label>
                            <select style={{marginLeft: '20px'}} onChange={this.handleChange} name={this.state.insult}>
                                <option value="principal-max-strain">Max Principal Strain</option>
                                <option value="principal-min-strain">Min Principal Strain</option>
                                <option value="csdm-max">CSDM 15</option>
                                <option value="axonal-strain-max">Axonal Strain 15</option>
                                <option value="masXsr-15-max">MASxSR 15</option>
                            </select>
                            <select style={{marginLeft: '20px'}} >
                                <option>Less or Equal to</option>
                                <option>Greater or Equal to</option>
                            </select>
                            <select style={{marginLeft: '20px'}}>
                                <option>10 Gs</option>
                                <option>20 Gs</option>
                                <option>30 Gs</option>
                                <option>40 Gs</option>
                                <option>50 Gs</option>
                                <option>60 Gs</option>
                                <option>70 Gs</option>
                                <option>80 Gs</option>
                                <option>90 Gs</option>
                                <option>100 Gs</option>
                                <option>110 Gs</option>
                                <option>120 Gs</option>
                                <option>130 Gs</option>
                                <option>140 Gs</option>
                                <option>150 Gs</option>
                            </select>
                        </div>
                        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                            <button style={{padding: '5px 15px 5px 15px', background : '#007bff', fontWeight: '800'}}>Run Report</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <ExportPlayerReport brainRegions={this.state.brainRegions} ref={this.child} />
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
