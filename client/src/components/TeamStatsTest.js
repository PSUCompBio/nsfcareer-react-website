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
    getFilterdTeamSpheresTest
  } from './../apis';
import TeamStateScatterChart from './Charts/TeamStateScatterChartTest';
import BarChart from './Charts/BarChart';

import { Card , Row, Col } from 'react-bootstrap';

class TeamStatsTest extends React.Component {
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
            'principal-max-strain': 'principal-max-strain',
            brainPosition: 'principal-max-strain',
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
                getTeamSpheres({ brand: 'Prevent Biometrics', organization: 'Army Research Laboratory', team: ["2020 POMPOC Study"] })
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
                            PLAYERS_POSITIONS: response.data.PLAYERS_POSITIONS,
                            BRAIN_POSITIONS: {'principal-max-strain': response.data.P_MAX_S_POSITIONS, 'principal-min-strain': response.data.P_MIN_S_POSITIONS}
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
            for: 'Players',
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
       getFilterdTeamSpheresTest({ brand: 'Prevent Biometrics', organization: 'Army Research Laboratory', team: ["2020 POMPOC Study"],filter: this.state.filter, gs: this.state.gs, type: this.state['principal-max-strain']})
        .then(response=>{
            //console.log('response',response.data);
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
    //Filter options ...
    selectOption=()=>{
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
    handlePostionMetric=(e)=>{
        this.setState({brainPosition: e.target.value})
    }
    render() {
        //imported Modules ...
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinners />;
        //Modules end
        const { PLAYERS_POSITIONS, BRAIN_POSITIONS, brainPosition } = this.state;
      //# Counting duplicate label of player ...
        var count_positions = {};
        if(PLAYERS_POSITIONS){
            PLAYERS_POSITIONS.forEach(async (i) => { 
                count_positions[i] = (count_positions[i]||0) + 1;
            });
            console.log('count_positions',count_positions)
        }
        //# Addition of player mps by positions
        var count_positions_val = {};
        if(BRAIN_POSITIONS[brainPosition]){
            BRAIN_POSITIONS[brainPosition].forEach(async  (res)=> { 
                Object.entries(res).forEach(([key, value]) =>{
                     // console.log('res',key, value)
                     count_positions_val[key] = (count_positions_val[key]||0) + value;
                })
           });
        }
        /*
        * Bar chart data for brain  positons ...
        */
        var data = [];
        var labels = [];
       // # Take first latter of postions ...
        const  capitalizePosition = (words) => {
           var separateWord = words.toLowerCase().split(' ');
           for (var i = 0; i < separateWord.length; i++) {
              separateWord[i] = /^[a-zA-Z]+$/.test(separateWord[i]) ? separateWord[i].charAt(0).toUpperCase() : '';
           }
           return separateWord.join(' ');
        }
        console.log('count_positions_val', count_positions_val)
       if(count_positions && count_positions_val){
            Object.entries(count_positions).forEach(([key, value],index) =>{
                let impactLen = value;
                let totalPostionVal = count_positions_val[key];
                totalPostionVal = totalPostionVal ? totalPostionVal.toFixed(2) : 0;
                let mpsAvg = (totalPostionVal) / impactLen;
                mpsAvg = mpsAvg.toFixed(2);
                let position = key;

                if(key !== 'Unknown'){
                    position = capitalizePosition(key);
                }
                data.push(mpsAvg);
                labels.push(position);
            })      
        }
        //**Brain graph data ...
        const BrainPositionChartData = {
            datasets: [{
                label: 'Position',
                barThickness: 25,
                backgroundColor: '#0c68b2',
                borderColor: '#0c68b2',
                minBarLength: 2,
                data: data
            }],
            labels: labels
        };
        // # Brain postion graph options ...
        const BrainPositionChartoptions = {
            legend: {
                display: false
            },
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
                    scaleLabel: {
                        display: true,
                         fontSize: 18,
                         fontWeight: 800,
                        labelString: 'Average MPS'
                    },
                    // ticks: {
                    //     suggestedMin: 0,
                       
                    //     suggestedMax: 50,
                    //      stepSize: 5,
                    // }
                }]
            }
        };
        //  Brain position chart data closed ...
        return (
            <React.Fragment>
				<div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
                    <div className="container">
                        <h1 className="top-heading__login" style={{textAlign: 'center', color: 'black'}}>{this.state.for === 'Teams' ? 'Organization Analytics' : 'Team Analytics'}</h1>
                        <div className="backbutton11" style={{position : 'relative','padding': '8px'}}>
                            <div className="col-md-3 no-padding" style={{'float': 'left'}}>
                              
                            </div>
                            <div className="col-md-3 no-padding" style={{'float': 'left'}}>
                            </div>
                        </div>
                            <Col md={12} className="no-padding" style={{'display': 'flow-root'}}>
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
                                                {this.state.brainRegions && <ExportPlayerReport brainRegions={this.state.brainRegions} ref={this.child} isTeamStatePage={true} />}
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
                                                <p
                                                    style={{
                                                        'text-align': 'center',
                                                        'font-weight': '800',
                                                        'color': '#666666',
                                                        'padding-bottom': '20px'
                                                    }}
                                                >Ang Vel (rad/s)</p>
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
                                                <p
                                                    style={{
                                                        'text-align': 'center',
                                                        'font-weight': '800',
                                                        'color': '#666666',
                                                        'padding-bottom': '20px'
                                                    }}
                                                >Ang Acc (rad/s<sup>2</sup>)</p>
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
                                                <p className="video-lebel text-center"
                                                >Machine Learning</p>
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
                                                <p className="circle-sub-title"
                                                     style={{
                                                        'text-align': 'center',
                                                        'color': 'gray',
                                                        'font-size': '14px',
                                                        'padding-bottom': '10px',
                                                    }}
                                                >Player positions can be set in their profile pages.</p>
                                                <div style={{
                                                    'padding': '8px'
                                                }}>
                                                    <select style={{
                                                        'float': 'right'
                                                    }}
                                                    onChange={this.handlePostionMetric}
                                                    >
                                                        <option value="principal-max-strain">Max Principal Strain</option>
                                                        <option value="principal-min-strain">Min Principal Strain</option>
                                                    </select>
                                                </div>
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

export default connect(mapStateToProps)(TeamStatsTest);
