import React from 'react';
import { connect } from 'react-redux';
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';
import Spinners from './Spinner/Spinner';
import { Spinner } from 'react-bootstrap';
import {
	isAuthenticated,
	getplayerlistoforg,
} from './../apis';
import TeamStateScatterChart from './Charts/TeamStateScatterChart';

class ToolKit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showtable: false,
			loader: false,
			radiovalue: '',
			playerlist: [],
			rplayerlist: [],
			teamlist: [],
			orglist: [],
			selectedvalue: '',
		};
		this.child = React.createRef();
	}
	handleTrainingFor = (e) => {
		e.preventDefault();
		var selectedvalue = e.target.value;
		setTimeout(() => {
			document.getElementById(selectedvalue).checked = true;
		}, 100)
		this.setState({
			radiovalue: e.target.value,
			selectedvalue: e.target.value,
		});
		this.setState({
				loader: true,
				showtable: false,
				playerlist: [],
				rplayerlist: [],
				teamlist: [],
				orglist: [],
			});
		if (selectedvalue == "Individuals") {
			
			getplayerlistoforg({ brand: this.props.location.state.brand.brand, type : e.target.value})
				.then(response => {
					console.log('getFilterdTeamSpheres ----------------------\n', response.data);
					this.setState({
						playerlist: response.data.data,
						rplayerlist: response.data.rPlayerData,
						showtable: true,
						loader: false,
						teamlist: [],
						orglist: [],
					});
				})
		}else if (selectedvalue == "Organization") {
			getplayerlistoforg({ brand: this.props.location.state.brand.brand,type : e.target.value})
				.then(response => {
					console.log('getFilterdTeamSpheres ----------------------\n', response.data);
					this.setState({
						orglist: response.data.data,
						showtable: true,
						loader: false,
						playerlist: [],
						rplayerlist: [],
						teamlist: [],
					});
				})
		}else if (selectedvalue == "Team") {
			getplayerlistoforg({ brand: this.props.location.state.brand.brand,type : e.target.value})
				.then(response => {
					console.log('getFilterdTeamSpheres ----------------------\n', response.data);
					this.setState({
						teamlist: response.data.data,
						showtable: true,
						loader: false,
						playerlist: [],
						rplayerlist: [],
						orglist: [],
					});
				})
		}else{
			this.setState({
						showtable: true,
						loader: false,
						playerlist: [],
						rplayerlist: [],
						teamlist: [],
						orglist: [],
					}); 
		}
		console.log(e.target.value);

	}
	render() {
		const { radiovalue, showtable } = this.state;
		if (this.state.isLoading) return <Spinners />;
		return (
			<React.Fragment>
				<div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{ marginBottom: '50px', minHeight: '600px' }}>
					<div className="container">
						<p ref="h1" className="col-md-12 organization-admin-table-margin-5-mobile penstate nav-p">{this.props.location.state.brand.brand}</p>
						<h1 className="top-heading__login" style={{ textAlign: 'center', color: 'black' }}>Brain Strain Machine Learning ToolKit</h1>
						<div className="backbutton11" style={{ position: 'relative' }}>
							<h3 style={{ textAlign: 'left', color: 'black', fontWeight: "700", fontSize: "22px", paddingTop: "50px" }}>Initiate Machine Learning Model Training</h3>
							<div className="Training_option">
								<ul style={{ listStyle: 'none', color: 'black', fontWeight: "700", fontSize: "16px", paddingTop: "20px" }}>
									{ this.state.selectedvalue == "Organization" ?
									<li><label><input type="radio" value="Organization" name="training_for" id='Organization' onChange={this.handleTrainingFor} checked="checked"/>&nbsp;&nbsp;For Your Entire Organization</label></li>
									:
									<li><label><input type="radio" value="Organization" name="training_for" id='Organization' onChange={this.handleTrainingFor} />&nbsp;&nbsp;For Your Entire Organization</label></li>
									}
									{ this.state.selectedvalue == "Institutions" ?
									<li><label><input type="radio" value="Institutions" name="training_for" id='Institutions' onChange={this.handleTrainingFor} checked="checked"/>&nbsp;&nbsp;For an Entire Institutions</label></li>
									:
									<li><label><input type="radio" value="Institutions" name="training_for" id='Institutions' onChange={this.handleTrainingFor} />&nbsp;&nbsp;For an Entire Institutions</label></li>
									}
									{ this.state.selectedvalue == "Team" ?
									<li><label><input type="radio" value="Team" name="training_for" id='Team' onChange={this.handleTrainingFor} checked="checked"/>&nbsp;&nbsp;For an Entire Team</label></li>
									:
									<li><label><input type="radio" value="Team" name="training_for" id='Team' onChange={this.handleTrainingFor} />&nbsp;&nbsp;For an Entire Team</label></li>
									}
									{ this.state.selectedvalue == "Individuals" ?
									<li><label><input type="radio" value="Individuals" name="training_for" id='Individuals' onChange={this.handleTrainingFor} checked="checked"/>&nbsp;&nbsp;For Specific Individuals</label></li>
									:
									<li><label><input type="radio" value="Individuals" name="training_for" id='Individuals' onChange={this.handleTrainingFor} />&nbsp;&nbsp;For Specific Individuals</label></li>
									}
								</ul>
							</div>
						</div>

							<div className="row training_data" style={{ display: showtable ? "block" : "none", overflowY: "auto" }} >
								<table style={{ whiteSpace: "nowrap", width: "40%" }} className="table ">
									<thead style={{ background: "#0a4f86", color: "#ffffff" }} >
										<tr>
											<th style={{ border: "1px solid #ffffff" }} scope="col">Available { this.state.selectedvalue }</th>
											<th style={{ border: "1px solid #ffffff" }} scope="col">Total Events</th>
											<th style={{ border: "1px solid #ffffff" }} scope="col">Include? </th>
										</tr>
									</thead>
									<tbody className="player-table">
										{this.state.playerlist.map(function (player, index) {
											console.log('checkign status', player)
											return <tr style={{ background: "#ccc3c3c3", color: "#000000" }} >
												<td style={{ border: "1px solid #ffffff" }}>{player["player"]["first-name"]} {player["player"]["last-name"]}</td>
												<td style={{ border: "1px solid #ffffff" }}>{player.simulation}</td>
												<td style={{ textAlign: "center", border: "1px solid #ffffff" }}><input type="checkbox" value="1" name="include" /></td>
											</tr>;
										}, this)}
										{this.state.rplayerlist.map(function (r_player, r_index) {
											console.log('checkign status', r_player["player"][0])
											return <tr style={{ background: "#ccc3c3c3", color: "#000000" }} >
												<td style={{ border: "1px solid #ffffff" }}>{r_player["player"][0]["first_name"]} {r_player["player"][0]["last_name"]}</td>
												<td style={{ border: "1px solid #ffffff" }}>{r_player.simulation}</td>
												<td style={{ textAlign: "center", border: "1px solid #ffffff" }}><input type="checkbox" value="1" name="include" /></td>
											</tr>;
										}, this)}
										{this.state.teamlist.map(function (team, t_index) {
											return <tr style={{ background: "#ccc3c3c3", color: "#000000" }} >
												<td style={{ border: "1px solid #ffffff" }}>{team.team_name }</td>
												<td style={{ border: "1px solid #ffffff" }}>{team.simulation}</td>
												<td style={{ textAlign: "center", border: "1px solid #ffffff" }}><input type="checkbox" value="1" name="include" /></td>
											</tr>;
										}, this)}
										{this.state.orglist.map(function (org, t_index) {
											return <tr style={{ background: "#ccc3c3c3", color: "#000000" }} >
												<td style={{ border: "1px solid #ffffff" }}>{org.org_name }</td>
												<td style={{ border: "1px solid #ffffff" }}>{org.simulation}</td>
												<td style={{ textAlign: "center", border: "1px solid #ffffff" }}><input type="checkbox" value="1" name="include" /></td>
											</tr>;
										}, this)}
									</tbody>
								</table>
								<button className="btn  btn-primary">Submit</button>
							</div>
						
						{this.state.loader && <i className="fa fa-spinner fa-spin" style={{ 'font-size': '24px', 'margin-left': '2px' }}></i>}
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
