import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';
import Spinners from './Spinner/Spinner';
import {Spinner } from 'react-bootstrap';
import {
    isAuthenticated,
    getTeamSpheres,
    getFilterdTeamSpheres
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
            filter: 'less',
            gs: 10,
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
        console.log('wrk')
        this.setState({ [e.target.name] : e.target.value });
        if(e.target.name == 'principal-max-strain'){
            this.child.current.handleBrainStrain(e.target.value);
        }
    };
    handleRunReport =(e)=>{
        e.preventDefault();
        this.setState({isfetching: true})
        getFilterdTeamSpheres({ brand: this.props.location.state.team.brand, organization: this.props.location.state.team.organization, team: this.props.location.state.team.team_name,filter: this.state.filter, gs: this.state.gs})
        .then(response=>{
            console.log('response',response.data);
            this.setState({
                brainRegions: ''
            })
            setTimeout(()=>{
                this.setState({
                    brainRegions: response.data.data,
                    isfetching: false
                });
            },200)
           
        })
    }
    render() {
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinners />;
       return (
            <React.Fragment>
                 
                <div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
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
                                <option value="resultant-linear-acceleration">Resultant Linear Acceleration</option>
                                <option value="resultant-Angular-acceleration">Resultant Angular Acceleration</option>

                                <option value="csdm-max">CSDM 15</option>
                                <option value="axonal-strain-max">Axonal Strain 15</option>
                                <option value="masXsr-15-max">MASxSR 15</option>
                            </select>
                            <select style={{marginLeft: '20px'}} name="filter" onChange={this.handleChange}>
                                <option value='greater'>Greater or Equal to</option>
                                <option value='less'>Less or Equal to</option>
                            </select>
                            <select style={{marginLeft: '20px'}} name="gs" onChange={this.handleChange}>
                                <option value='5'>5%</option>
                                <option value='10'>10%</option>
                                <option value='20'>20%</option>
                                <option value='30'>30%</option>
                                <option value='40'>40%</option>
                                <option value='50'>50%</option>
                                <option value='60'>60%</option>
                                <option value='70'>70%</option>
                                <option value='80'>80%</option>
                                <option value='90'>90%</option>
                                <option value='100'>100%</option>
                                <option value='110'>110%</option>
                                <option value='120'>120%</option>
                                <option value='130'>130%</option>
                                <option value='140'>140%</option>
                                <option value='140'>150%</option>
                            </select>
                        </div>
                        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                            <button style={{padding: '5px 15px 5px 15px', background : '#007bff', fontWeight: '800'}} onClick={this.handleRunReport}>Run Report</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <>
                                    {this.state.isfetching &&
                                        <div  className="col-md-12 glow-spinner">
                                            <div className="spinner-center">
                                                <Spinner animation="grow" variant="primary" />
                                            </div>
                                        </div>
                                    }
                                 {this.state.brainRegions && <ExportPlayerReport brainRegions={this.state.brainRegions} ref={this.child} />}
                                </>
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
