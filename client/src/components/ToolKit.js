import React from 'react';
import { connect } from 'react-redux';
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';
import Spinners from './Spinner/Spinner';
import {Spinner } from 'react-bootstrap';
import {
    isAuthenticated,
    getFilterdTeamSpheres_demo,
    getTeamSpheres_Demo
  } from './../apis';
import TeamStateScatterChart from './Charts/TeamStateScatterChart';

class ToolKit extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
			showtable:false,
			radiovalue:'',
		};
        this.child = React.createRef();
    }	
	handleTrainingFor =(e)=>{
        e.preventDefault();  
			this.setState({
			  radiovalue: e.target.value,
			  showtable: true,
			});			   
    }
    render() {
       	var showtable = this.state.showtable;
       	var radiovalue = this.state.radiovalue;
        if (this.state.isLoading) return <Spinners />;
       return (
            <React.Fragment>                 
                <div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px',minHeight:'600px'}}>
                    <div className="container">
                        <p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate nav-p">{this.props.location.state.brand.brand}</p>
                        <h1 className="top-heading__login" style={{textAlign: 'center', color: 'black'}}>ToolKit</h1>
                        <div className="backbutton11" style={{position : 'relative'}}>
							<h3 style={{textAlign: 'left', color: 'black',fontWeight:"700",fontSize:"22px",paddingTop:"50px"}}>Initiate Machine Learning Model Training</h3>
							<div className="Training_option">
								<ul style={{listStyle: 'none', color: 'black',fontWeight:"700",fontSize:"16px",paddingTop:"20px"}}>
								<li><label><input type="radio" value="sensor_company" name="training_for" checked={radiovalue === 'sensor_company'} onChange={this.handleTrainingFor}/>&nbsp;&nbsp;For entire sensor company</label></li>
								<li><label><input type="radio" value="Organization" name="training_for"  checked={radiovalue === 'Organization'} onChange={this.handleTrainingFor}/>&nbsp;&nbsp;For entire sensor Organization</label></li>
								<li><label><input type="radio" value="team" name="training_for" checked={radiovalue === 'team'} onChange={this.handleTrainingFor}/>&nbsp;&nbsp;For entire sensor team</label></li>
								<li><label><input type="radio" value="individuals" name="training_for" checked={radiovalue === 'individuals'} onChange={this.handleTrainingFor}/>&nbsp;&nbsp;For entire sensor individuals</label></li>
								</ul>
							</div>
                        </div>											
                        <div className="row training_data"  style={{ display: showtable?"block":"none",overflowY :"auto"}} >
							 <table style={{whiteSpace:"nowrap",width:"40%"}} className="table ">
							  <thead style={{background:"#0a4f86",color:"#ffffff"}} >
								<tr>
								  <th style={{border:"1px solid #ffffff"}} scope="col">Available Teams</th>
								  <th style={{border:"1px solid #ffffff"}} scope="col">Total Events</th>
								  <th style={{border:"1px solid #ffffff"}} scope="col">Include? <input type="checkbox" value="0" name="include"/></th>
								</tr>
							  </thead>
							  <tbody className="player-table">
								<tr style={{background:"#ccc3c3c3",color:"#000000"}} >
								<td style={{border:"1px solid #ffffff"}}>Team 1</td>
								<td style={{border:"1px solid #ffffff"}}>200</td>
								<td style={{textAlign:"center",border:"1px solid #ffffff"}}><input type="checkbox" value="1" name="include"/></td>
								</tr>
								<tr style={{background:"#eeeeee",color:"#000000"}} >
								<td style={{border:"1px solid #ffffff"}}>Team 2</td>
								<td style={{border:"1px solid #ffffff"}}>400</td>
								<td style={{textAlign:"center",border:"1px solid #ffffff"}}><input type="checkbox" value="2" name="include"/></td>
								</tr>
							  </tbody>
							</table>
                        </div>

                    </div>
                </div>
                <div style={{
                                position: "relative",
                                width: "100%",
                                bottom: '0'
                            }}>
                                <Footer />
                            </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default connect(mapStateToProps)(ToolKit);
