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
import TeamStateScatterChart from './Charts/TeamStateScatterChart';
import BarChart from './Charts/BarChart';

import { Card , Row, Col } from 'react-bootstrap';

class TeamStats extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isAuthenticated: false,
            isCheckingAuth: true,
            isLoading: true,
            brainRegions: {},
            insult: 'principal-max-strain',
            filter: 'greater',
            gs: 0,
            'principal-max-strain': 'principal-max-strain'
        };
        this.child = React.createRef();
    }
   
    componentDidMount() {
        console.log('req----', this.props)
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
                            brainRegions: response.data.data,
                            MAX_ANGULAR_EXLARATION: response.data.MAX_ANGULAR_EXLARATION,
                            MPS_95_DATA: response.data.MPS_95_DATA,
                            MAX_ANGULAR_VEL_EXLARATION: response.data.MAX_ANGULAR_VEL_EXLARATION,
                            MPS_95_VEL_DATA: response.data.MPS_95_VEL_DATA,
                            PLAYERS_POSITIONS: response.data.PLAYERS_POSITIONS
                            
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
        this.setState({
            for: this.props.location.state.for,
        })
    }

    handleChange = (e) => {
        console.log('wrk')
        this.setState({ [e.target.name] : e.target.value });
        if(e.target.name === 'principal-max-strain' && e.target.value !== 'resultant-linear-acceleration' && e.target.value !== 'resultant-Angular-acceleration' && this.state.brainRegions){
            this.child.current.handleBrainStrain(e.target.value);
        }
    };
    handleRunReport =(e)=>{
        e.preventDefault();
        this.setState({isfetching: true})
        
        getFilterdTeamSpheres({ brand: this.props.location.state.team.brand, organization: this.props.location.state.team.organization, team: this.props.location.state.team.team_name,filter: this.state.filter, gs: this.state.gs, type: this.state['principal-max-strain']})
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
             setTimeout(()=>{
                if(this.state['principal-max-strain'] !== 'resultant-linear-acceleration' && this.state['principal-max-strain'] !== 'resultant-Angular-acceleration' && this.state.brainRegions){
                    this.child.current.handleBrainStrain(this.state['principal-max-strain']);
                }
            },500)
        })
        
    }
    selectOption=()=>{
        console.log('principal-max-strain')
        if(this.state['principal-max-strain'] === 'resultant-linear-acceleration'){
            return  (
            <>
                <option value='0'>0g</option>
                <option value='5'>5g</option>
                <option value='10'>10g</option>
                <option value='20'>20g</option>
                <option value='30'>30g</option>
                <option value='40'>40g</option>
                <option value='50'>50g</option>
                <option value='60'>60g</option>
                <option value='70'>70g</option>
                <option value='80'>80g</option>
                <option value='90'>90g</option>
                <option value='100'>100g</option>
                <option value='110'>110g</option>
                <option value='120'>120g</option>
                <option value='130'>130g</option>
                <option value='140'>140g</option>
                <option value='140'>150g</option> 
            </>

            )
        }else if(this.state['principal-max-strain'] === 'resultant-Angular-acceleration'){
            return  (
            <>
                <option value='0'>0 rad/s^2</option>
                <option value='500'>500 rad/s^2</option>
                <option value='1000'>1000 rad/s^2</option>
                <option value='2000'>2000 rad/s^2</option>
                <option value='3000'>3000 rad/s^2</option>
                <option value='4000'>4000 rad/s^2</option>
                <option value='5000'>5000 rad/s^2</option>
                <option value='6000'>6000 rad/s^2</option>
                <option value='7000'>7000 rad/s^2</option>
            </>

            )
        }else{
            return  (
            <>
                <option value='0'>0%</option>
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
            </>

            )
        }
        
    }
    render() {
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinners />;
        const { PLAYERS_POSITIONS } = this.state;
        var data = [];
        var labels = [];
        if(PLAYERS_POSITIONS){
            for(var i = 0; i < PLAYERS_POSITIONS.length; i++){
                data.push(0);
                labels.push(PLAYERS_POSITIONS[i]);
            }
        }

        const BrainPositionChartData = {
            datasets: [{
                label: 'Unknown',
                barThickness: 25,
                backgroundColor: '#0c68b2',
                borderColor: '#0c68b2',
                minBarLength: 2,
                data: data
            }],
            labels: labels
        };
        const BrainPositionChartoptions = {
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    },
                    scaleLabel: {
                        display: true,
                    },
                   
                }],
                yAxes: [ {
                    ticks: {
                        suggestedMin: 0,
                       
                        suggestedMax: 50,
                         stepSize: 5,
                    }

                }]
            }
        };
        return (
            <React.Fragment>
                 
                <div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
                    <div className="container">
                        <h1 className="top-heading__login" style={{textAlign: 'center', color: 'black'}}>{this.state.for === 'Teams' ? 'Organization Analytics' : 'Team Analytics'}</h1>
                        <div className="backbutton11" style={{position : 'relative'}}>
                            {this.state.for === "Teams" ? 
                                <Link to={{
                                   pathname: '/TeamAdmin/'+this.props.location.state.team.organization+'/'+this.props.location.state.team.brand,
                                    state: {
                                        brand: {
                                            brand: this.props.location.state.team.brand,
                                            organization: this.props.location.state.team.organization,
                                            user_cognito_id: this.props.location.state.user_cognito_id
                                        }
                                    }
                                 }}>&lt; Back To Organization</Link>
                                :
                                <Link to={{
                                    pathname: '/TeamAdmin/team/players/'+this.props.location.state.team.organization+'/'+this.props.location.state.team.team_name+'?brand='+this.props.location.state.team.brand,
                                    state: {
                                    team: {
                                        brand: this.props.location.state.team.brand,
                                        organization: this.props.location.state.team.organization,
                                        team_name: this.props.location.state.team.team_name,
                                        user_cognito_id: this.props.location.state.user_cognito_id,
                                        staff: this.props.location.state.team.staff
                                    }
                                } }}>&lt; Back To Team</Link>
                            }
                        </div>
                            <Col md={12} className="no-padding">
                                <Card  className="card-team-state-page">
                                    <div style={{textAlign: 'center'}}>
                                        <label style={{fontSize: '20px'}}>Display all member data with</label>
                                        <select style={{marginLeft: '20px'}} onChange={this.handleChange} name={this.state.insult}>
                                            <option value="principal-max-strain">Max Principal Strain</option>
                                            <option value="principal-min-strain">Min Principal Strain</option>
                                            {/*<option value="resultant-linear-acceleration">Resultant Linear Acceleration</option>
                                            <option value="resultant-Angular-acceleration">Resultant Angular Acceleration</option>*/}
                                            <option value="axonal-strain-max">Axonal Strain 15</option>
                                            <option value="masXsr-15-max">MASxSR 15</option>
                                            <option value="CSDM-5">CSDM 5</option>
                                            <option value="CSDM-10">CSDM 10</option>
                                            <option value="csdm-max">CSDM 15</option>
                                            <option value="MPS-95">MPS 95</option>


                                        </select>
                                        <select style={{marginLeft: '20px'}} name="filter" onChange={this.handleChange}>
                                            <option value='greater'>Greater or Equal to</option>
                                            <option value='less'>Less or Equal to</option>
                                        </select>
                                        <select style={{marginLeft: '20px'}} name="gs" onChange={this.handleChange}>
                                            {this.selectOption()}
                                            
                                        </select>
                                    </div>
                                    <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
                                        <button style={{padding: '5px 15px 5px 15px', background : '#007bff', fontWeight: '800'}} onClick={this.handleRunReport}>Run Report</button>
                                    </div>
                                    <div className="row team-state-3dmodel">
                                        <div className="col-md-12 col-lg-12">
                                            <>
                                                {this.state.isfetching && 
                                                    <div  className="col-md-12 glow-spinner">
                                                        <div className="spinner-center">
                                                            <p>Gathering the data...</p>
                                                            <Spinner animation="grow" variant="primary" />
                                                        </div>
                                                    </div>
                                                }
                                            {/*---! Call 3d page ---*/}
                                                {this.state.brainRegions && <ExportPlayerReport brainRegions={this.state.brainRegions} ref={this.child} />}
                                                {!this.state.brainRegions && !this.state.isfetching && 
                                                    <h4 className="team-state-text-center"> 
                                                        Run a Report to Generate Brain Simulation Results.
                                                    </h4>
                                                }
                                            {/*---! 3d page end---*/}
                                            </>
                                        </div>
                                    </div>
                                </Card >
                            </Col>
                            <Row className="no-padding" style={{'display':'flex'}}>
                                <Col md={6}  className="team-state-cart-left" style={{marginTop:'50px','display':'flex'}}>
                                    <Card style={{'border': '1px solid rgb(10, 84, 143)','width':'100%'}} >
                                        {/*!-- MPS_95 chart start --*/}
                                        <div className="col-sm-12 no-padding" style={{'margin-top': '20px'}}>
                                            <div className="col-md-12 no-padding">
                                                <p className="video-lebel text-center">95 Percentile MPS vs. Maximum Angular Velocity </p>
                                                {< TeamStateScatterChart MAX_ANGULAR_EXLARATION ={this.state.MAX_ANGULAR_VEL_EXLARATION}  MPS_95_DATA ={this.state.MPS_95_VEL_DATA} />}
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>
                                        {/*!-- MPS_95 chart end --*/}
                                    </Card>
                                </Col>
                                <Col md={6}  className="team-state-cart-right" style={{marginTop:'50px'}}> 
                                    <Card style={{'border': '1px solid rgb(10, 84, 143)','height': '100%'}}>
                                        {/*!-- MPS_95 chart start --*/}
                                        <div className="col-sm-12 no-padding" style={{'margin-top': '20px'}}>
                                            <div className="col-md-12 no-padding">
                                                <p className="video-lebel text-center">95 Percentile MPS Maximum Angular Acceleration </p>
                                                < TeamStateScatterChart MAX_ANGULAR_EXLARATION ={this.state.MAX_ANGULAR_EXLARATION}  MPS_95_DATA ={this.state.MPS_95_DATA} />
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>
                                        {/*!-- MPS_95 chart end --*/}
                                    </Card>
                                </Col>
                            </Row>

                             <Row className="no-padding" style={{'display':'flex'}}>
                                <Col md={6}  className="team-state-cart-left" style={{marginTop:'50px'}}>
                                    <Card style={{'border': '1px solid rgb(10, 84, 143)'}} >
                                        <div className="col-sm-12 no-padding" style={{'margin-top': '20px'}} >
                                            <div className="col-md-12 no-padding">
                                                <p className="video-lebel text-center">Machine Learning</p>
                                                <div style={{'padding':'80px'}}></div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md={6}  className="team-state-cart-left" style={{marginTop:'50px'}}>
                                    <Card style={{'border': '1px solid rgb(10, 84, 143)'}} >
                                        <div className="col-sm-12 no-padding" style={{'margin-top': '20px'}} >
                                            <div className="col-md-12 no-padding">
                                                <p className="video-lebel text-center">Brain Loading by Position</p>
                                                <div>
                                                    <BarChart data={BrainPositionChartData} options={BrainPositionChartoptions} />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
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
