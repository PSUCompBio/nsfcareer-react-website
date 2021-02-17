import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';
import Spinners from './Spinner/Spinner';
import { Spinner } from 'react-bootstrap';
import {
    isAuthenticated,
    getTeamSpheres,
    getFilterdTeamSpheres,
    getMLplatformfiles
} from './../apis';
import TeamStateScatterChart from './Charts/TeamStateScatterChart';
// import TeamStateScatterChartVolacity from './Charts/TeamStateScatterChartVolacity';
import BarChart from './Charts/BarChart';
import MLTab from './MachineLearningComponent/Tab';
import { Card, Row, Col } from 'react-bootstrap';

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
            'principal-max-strain': 'principal-max-strain',
            brainPosition: 'principal-max-strain',
            teamData: {
                brand: this.props.match.params.brand,
                organization: this.props.match.params.org,
                team: this.props.match.params.team
            },
            MLcsvData: '',
            MLjsonData: '',
            isMldataLoaded: false
        };
        this.child = React.createRef();
    }

    componentDidMount() {
        getMLplatformfiles(JSON.stringify({}))
        .then(res => {
            console.log('res ----------- getMLplatformfiles\n',res);
            if(res.data.message === 'success'){
                this.setState({
                    MLcsvData: res.data.MLcsvData,
                    MLjsonData: res.data.resultFile,
                    isMldataLoaded: true
                })
            }else{
                this.setState({
                    isMldataLoaded: res.data.error
                })
            }
        }).catch(err=>{
            // console.log('err --------------\n',err)
            this.setState({
                isMldataLoaded: err
            })
        })
        // Scrolling winddow to top when user clicks on about us page
		var team = this.props.match.params.team;
		if (this.props.match.params.type == "Players"){
			var temarray = [];	
			temarray.push(team);
		}else{
			var temarray = team.split(",");
		}
        window.scrollTo(0, 0);
        isAuthenticated(JSON.stringify({}))
            .then((value) => {
                if (value.data.message === 'success') {
                    getTeamSpheres({ brand: this.props.match.params.brand, organization: this.props.match.params.org, team: temarray })
                        .then(response => {
                            console.log('getTeamSpheres ---------------------\n', response.data);
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
                                PLAYERS_SPORT: response.data.PLAYERS_SPORT,
                                BRAIN_POSITIONS: { 'principal-max-strain': response.data.P_MAX_S_POSITIONS, 'principal-min-strain': response.data.P_MIN_S_POSITIONS, 'csdm-15': response.data.P_CSDM_15},
                                BRAIN_SPORTS: { 'principal-max-strain': response.data.S_MAX_S_POSITIONS, 'principal-min-strain': response.data.S_MIN_S_POSITIONS, 'csdm-15': response.data.S_CSDM_15}

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
            for: this.props.match.params.type,
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'principal-max-strain' && e.target.value !== 'resultant-linear-acceleration' && e.target.value !== 'resultant-Angular-acceleration' && this.state.brainRegions) {
            this.child.current.handleBrainStrain(e.target.value);
        }
    };
    handleRunReport = (e) => {
        e.preventDefault();
        this.setState({ isfetching: true })
		var team = this.props.match.params.team;
		if (this.props.match.params.type == "Players"){
			var temarray = [];	
			temarray.push(team);
		}else{
			var temarray = team.split(",");
		}
        getFilterdTeamSpheres({ brand: this.props.match.params.brand, organization: this.props.match.params.org, team: temarray, filter: this.state.filter, gs: this.state.gs, type: this.state['principal-max-strain'] })
            .then(response => {
                console.log('getFilterdTeamSpheres ----------------------\n', response.data);
                this.setState({
                    brainRegions: ''
                })
                setTimeout(() => {
                    this.setState({
                        brainRegions: response.data.data,
                        isfetching: false
                    });
                }, 200)
                setTimeout(() => {
                    if (this.state['principal-max-strain'] !== 'resultant-linear-acceleration' && this.state['principal-max-strain'] !== 'resultant-Angular-acceleration' && this.state.brainRegions) {
                        this.child.current.handleBrainStrain(this.state['principal-max-strain']);
                    }
                }, 500)
            })

    }

    //Filter options ...
    selectOption = () => {
        if (this.state['principal-max-strain'] === 'resultant-linear-acceleration') {
            return (
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
        } else if (this.state['principal-max-strain'] === 'resultant-Angular-acceleration') {
            return (
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
        } else {
            return (
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

    handlePostionMetric = (e) => {
        this.setState({ brainPosition: e.target.value })
    }

    handleHover =(e)=>{
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (tooltipEl) {  
            tooltipEl.style.opacity = 0;
            return;
        }
    }

    render() {
        //imported Modules ...
        if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
           // return <Redirect to="/Login" />;
        }
        if (this.state.isLoading) return <Spinners />;

        //Modules end

        const { PLAYERS_POSITIONS, BRAIN_POSITIONS, PLAYERS_SPORT, BRAIN_SPORTS , brainPosition } = this.state;

        //# Counting duplicate label of player ...
        var count_positions = {};
        var count_sports = {};

        if (PLAYERS_POSITIONS) {
            PLAYERS_POSITIONS.forEach(async (i) => {
                // console.log('position',count_positions[i]);
                if(count_positions[i] !== null){
                    count_positions[i] = (count_positions[i] || 0);
                }
            });
        }

        //count sports ..
        if (PLAYERS_SPORT) {
            PLAYERS_SPORT.forEach(async (i) => {
                // console.log('position',count_sports[i]);
                if(count_sports[i] !== null){
                    count_sports[i] = (count_sports[i] || 0);
                }
            });
            
        }
       

        //# Addition of player mps by positions
        var count_positions_val = {};
        var count_sports_val = {};
        if (BRAIN_POSITIONS[brainPosition]) {
            BRAIN_POSITIONS[brainPosition].forEach(async (res) => {
                Object.entries(res).forEach(([key, value]) => {
                    // console.log('res',key, value)
                    if(key !== 'null'){
                        count_positions_val[key] = (count_positions_val[key] || 0) + value;
                        count_positions[key] = (count_positions[key] || 0) + 1;
                    } 
                })

            });
        }
        //count sports values ...
        if (BRAIN_SPORTS[brainPosition]) {
            BRAIN_SPORTS[brainPosition].forEach(async (res) => {
                Object.entries(res).forEach(([key, value]) => {
                    if(key !== 'null') {
                        count_sports_val[key] = (count_sports_val[key] || 0) + value;
                        count_sports[key] =  (count_sports[key] || 0) + 1;
                    }
                })

            });
        }

        console.log('count_sports',count_sports);
        console.log('count_positions', count_positions)

        /*
        * Bar chart data for brain  positons ...
        */
        var data = [];
        var labels = [];

        var data_sports = [];
        var labels_sports = [];

        // # Take first latter of postions ...
        const capitalizePosition = (words) => {
            var separateWord = words.toLowerCase().split(' ');
            for (var i = 0; i < separateWord.length; i++) {
                if (i == 0) {
                    if (separateWord[0].split('-').length > 1) {
                        var char = separateWord[0].split('-')[1]
                        separateWord[i] = separateWord[i].charAt(0).toUpperCase();
                        separateWord[1] = char.charAt(0).toUpperCase()
                    } else {
                        separateWord[i] = separateWord[i].charAt(0).toUpperCase();
                    }
                } else {
                    separateWord[i] = /^[a-zA-Z]+$/.test(separateWord[i]) ? separateWord[i].charAt(0).toUpperCase() : '';

                }
            }
            return separateWord.join(' ');
        }
        
        // for sport ...
        if (count_sports && count_sports_val) {
            Object.entries(count_sports).forEach(([key, value], index) => {
                let impactLen = value;
                let totalSportVal = count_sports_val[key];
                totalSportVal = totalSportVal ? totalSportVal.toFixed(2) : 0;
                totalSportVal = parseFloat(totalSportVal);
                console.log('totalsportval = ',totalSportVal,', totalImpact = ',impactLen, 'sport -', key)

                let mpsAvg = (totalSportVal) / impactLen;
                mpsAvg = mpsAvg.toFixed(2);
                let sport = key;
                data_sports.push(mpsAvg);
                labels_sports.push(sport);
            })

        }

        console.log(labels_sports, data_sports);
        // for position ...
        if (count_positions && count_positions_val) {
            Object.entries(count_positions).forEach(([key, value], index) => {
                let impactLen = value;
                let totalPostionVal = count_positions_val[key];
                totalPostionVal = totalPostionVal ? totalPostionVal.toFixed(2) : 0;
                // console.log('totalPostionVal = ',totalPostionVal,', totalImpact = ',impactLen)
                
                let mpsAvg = (totalPostionVal) / impactLen;
                //let mpsAvg = impactLen;
				/* console.log("totalPostionVal",totalPostionVal);
				console.log("impactLen",impactLen);*/
                mpsAvg = mpsAvg.toFixed(2);
                let position = key;

                if (key !== 'Unknown') {
                    position = capitalizePosition(key);
                }
                console.log('position', position)
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
                data: this.state.for !== "Teams" ? data : data_sports
            }],
            labels: this.state.for !== "Teams" ? labels : labels_sports
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
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        fontSize: 18,
                        fontWeight: 800,
                        labelString: 'Average MPS'
                    },
                    
                }]
            }
        };
        

        //  Brain position chart data closed ...
        let brand = this.props.match.params.brand && this.props.match.params.brand !== undefined ? this.props.match.params.brand : ''
        return (
            <React.Fragment>

                <div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{ marginBottom: '50px' }}>
                    <div className="container">
                        <h1 className="top-heading__login" style={{ textAlign: 'center', color: 'black' }}>{this.state.for === 'Teams' ? 'Organization Analytics' : 'Team Analytics'}</h1>
                        <div className="backbutton11" style={{ position: 'relative', 'padding': '8px' }}>
                            <div className="col-md-3 no-padding" style={{ 'float': 'left' }}>
                                <button className="btn btn-primary">
                                    {this.state.for === "Teams" ?
                                        <Link to={{
                                            pathname: '/TeamAdmin/' + this.props.match.params.org + '/' + brand,
                                            state: {
                                                brand: {
                                                    brand: this.props.match.params.brand,
                                                    organization: this.props.match.params.org,
                                                    user_cognito_id: ''
                                                }
                                            }
                                        }}
                                            style={{
                                                'color': 'white',
                                                'text-decoration': 'none'
                                            }}

                                        >&lt; Back To Organization</Link>
                                        :
                                        <Link to={{
                                            pathname: '/TeamAdmin/team/players/' + this.props.match.params.org + '/' + this.props.match.params.team + '?brand=' + brand,
                                            state: {
                                                team: {
                                                    brand: this.props.match.params.brand,
                                                    organization: this.props.match.params.org,
                                                    team_name: this.props.match.params.team,
                                                    user_cognito_id: '',
                                                    staff: []
                                                }
                                            }
                                        }}
                                            style={{
                                                'color': 'white',
                                                'text-decoration': 'none'
                                            }}
                                        >&lt; Back To Team</Link>
                                    }
                                </button>
                            </div>
                            <div className="col-md-6 no-padding" style={{ 'float': 'left', 'text-align': 'center' }}>
                                {this.state.for !== "Teams" ?
                                    <p style={{
                                        'padding': '6px'
                                    }}>
                                        Note: Team members must be activated on the Team Dashboard for their data to show up here. <br />
                                        <Link to={{
                                            pathname: '/TeamAdmin/team/players/' + this.props.match.params.org + '/' + this.props.match.params.team + '?brand=' + this.props.match.params.brand,
                                            state: {
                                                team: {
                                                    brand: this.props.match.params.brand,
                                                    organization: this.props.match.params.org,
                                                    team_name: this.props.match.params.team,
                                                    user_cognito_id: '',
                                                    staff: []
                                                }
                                            }
                                        }}
                                            style={{
                                                'color': '#0b62a6',
                                            }}
                                        >Return to Team Dashboard</Link> to activate team members.
                                    </p>
                                    : null
                                }
                            </div>
                            <div className="col-md-3 no-padding" style={{ 'float': 'left' }}>
                            </div>
                        </div>
                        <Col md={12} className="no-padding" style={{ 'display': 'flow-root' }}>
                            <Card className="card-team-state-page">
                                <div style={{ textAlign: 'center' }}>
                                    <label style={{ fontSize: '20px' }}>Display all member data with</label>
                                    <select style={{ marginLeft: '20px' }} onChange={this.handleChange} name={this.state.insult}>
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
                                    <select style={{ marginLeft: '20px' }} name="filter" onChange={this.handleChange}>
                                        <option value='greater'>Greater or Equal to</option>
                                        <option value='less'>Less or Equal to</option>
                                    </select>
                                    <select style={{ marginLeft: '20px' }} name="gs" onChange={this.handleChange}>
                                        {this.selectOption()}

                                    </select>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                                    <button style={{ padding: '5px 15px 5px 15px', background: '#007bff', fontWeight: '800' }} onClick={this.handleRunReport}>Run Report</button>
                                </div>
                                <div className="row team-state-3dmodel">
                                    <div className="col-md-12 col-lg-12">
                                        <>
                                            {this.state.isfetching &&
                                                <div className="col-md-12 glow-spinner">
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
                        <Row className="no-padding" style={{ 'display': 'flex' }} onMouseOver ={this.handleHover}>
                            <Col md={6} className="team-state-cart-left" style={{ marginTop: '50px', 'display': 'flex' }}>
                                <Card style={{ 'border': '1px solid rgb(10, 84, 143)', 'width': '100%' }} >
                                    {/*!-- MPS_95 chart start --*/}
                                    <div className="col-sm-12 no-padding" style={{ 'margin-top': '20px' }}>
                                        <div className="col-md-12 no-padding">
                                            <p className="video-lebel text-center">95 Percentile MPS vs. Maximum Angular Velocity </p>
                                            {< TeamStateScatterChart MAX_ANGULAR_EXLARATION={this.state.MAX_ANGULAR_VEL_EXLARATION} MPS_95_DATA={this.state.MPS_95_VEL_DATA} teamData={this.state.teamData}/>}
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
                            <Col md={6} className="team-state-cart-right" style={{ marginTop: '50px' }} >
                                <Card style={{ 'border': '1px solid rgb(10, 84, 143)', 'height': '100%' }}>
                                    {/*!-- MPS_95 chart start --*/}
                                    <div className="col-sm-12 no-padding" style={{ 'margin-top': '20px' }}>
                                        <div className="col-md-12 no-padding">
                                            <p className="video-lebel text-center">95 Percentile MPS Maximum Angular Acceleration </p>
                                            < TeamStateScatterChart MAX_ANGULAR_EXLARATION={this.state.MAX_ANGULAR_EXLARATION} MPS_95_DATA={this.state.MPS_95_DATA} teamData={this.state.teamData}/>
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

                        <Row className="no-padding" style={{ 'display': 'flex' }}>
                            <Col md={6} className="team-state-cart-left" style={{ marginTop: '50px' }}>
                                <Card style={{ 'border': '1px solid rgb(10, 84, 143)' }} >
                                    <div className="col-sm-12 no-padding" style={{ 'margin-top': '20px' }} >
                                        <div className="col-md-12 no-padding">
                                            <p className="video-lebel text-center"
                                            >Machine Learning</p>
                                            {this.state.MLjsonData ? 
                                                <MLTab MLcsvData={this.state.MLcsvData} MLjsonData={this.state.MLjsonData}  />
                                                : this.state.isMldataLoaded ? this.tate.isMldataLoaded : 'Loading...'
                                            }
                                            
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={6} className="team-state-cart-left" style={{ marginTop: '50px', display: 'flex' }}>
                                <Card style={{ 'border': '1px solid rgb(10, 84, 143)',width: '100%' }} >
                                    <div className="col-sm-12 no-padding" style={{ 'margin-top': '20px' }} >
                                        {this.state.for !== "Teams" ?
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
                                                    'padding': '8px','text-align': 'center'
                                                }}>
                                                    <select 
                                                        onChange={this.handlePostionMetric}
                                                    >
                                                        <option value="principal-max-strain">Max Principal Strain</option>
                                                        <option value="principal-min-strain">Min Principal Strain</option>
                                                        <option value="csdm-15">CSDM 15</option>

                                                    </select>
                                                </div>
                                                <div style={{'margin-top': '100px'}}>
                                                    <BarChart data={BrainPositionChartData} options={BrainPositionChartoptions} />
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-12 no-padding">
                                                <p className="video-lebel text-center">Brain Loading by Sport</p>
                                                <p className="circle-sub-title"
                                                    style={{
                                                        'text-align': 'center',
                                                        'color': 'gray',
                                                        'font-size': '14px',
                                                        'padding-bottom': '10px',
                                                    }}
                                                >Player sport can be set in their profile pages.</p>
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
                                                        <option value="csdm-15">CSDM 15</option>
                                                    </select>
                                                </div>
                                                <div style={{'margin-top': '100px'}}>
                                                    <BarChart data={BrainPositionChartData} options={BrainPositionChartoptions} />
                                                </div>
                                            </div>
                                        }
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
