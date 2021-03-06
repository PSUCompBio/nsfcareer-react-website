import React from 'react';
// import { Line } from 'react-chartjs-2';
import { Link, withRouter } from 'react-router-dom';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
// import Report from '../ReportContent/Report0';
import ExportPlayerReport from './ExportPlayerReport';
import {
  getUserDetails,
} from '../../apis';
import DownloadCustomReportPopup from '../Popup/DownloadCustomReportPopup';


class CumulativeAccelerationEventChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("THIS IS DATA RECEIVED CumulativeAccelerationEventChart", this.props);
        this.state = {
            data: {

                labels: this.props.data.angular_accelerations,
                datasets: [{
                    label: "Linear VS Angular Acceleration",

                    lineTension: 0.1,
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    data: this.props.data.linear_accelerations,
                }]
            },
            is_selfie_image_uploaded: props.is_selfie_image_uploaded,
            imageUrl: props.imageUrl,
            isReport: false,
            player_name:this.props.match.params.player_name ? this.props.match.params.player_name.split('?')[0] : '',
            account_id: '',
            simulation_id: '',
            isLoading: true,
            isDisplay: { display: 'none' },


        };
        this.getPlayerUserDetails();
    }
    getPlayerUserDetails=()=>{
        let brand = '';
        const params = new URLSearchParams(window.location.search)
        if(params.get('brand')){
            brand = params.get('brand');
        }
        let congito_id = this.state.player_name+'-'+brand
        console.log('user cognito id --------------\n',congito_id )
        getUserDetails({ user_cognito_id: congito_id })
        .then(response => {
          console.log('user details =================================\n',response)

          if(response.data.message === "success"){
            this.setState({
                account_id: response.data.data.account_id,
                simulation_id: response.data.data.sensor_id_number,
                isLoading: false
            })
          }else{
            this.setState({
                isLoading: false
            })
          }
        }).catch(err=>{
            console.log('err ',err)
            this.setState({
                isLoading: false
            })
        })
    }
     makeVisible = (data) => {
        this.setState({ isDisplay: data });
    }

    render() {
        console.log('this.state.data',this.props)
        // eslint-disable-next-line
        var fileName = '';
        if(this.props.data.player_id && this.props.data.player_id.length > 0 && this.props.user.length > 0){
       
            console.log('props',this.props);
            fileName = this.props.user[0].sensor_data.player['first-name']+'_'+this.props.user[0].sensor_data.player['last-name']+'_'+this.props.user[0].sensor_data.player_id.split('$')[1];
            // console.log('fileName',fileName)
          
        }
      
        return (
            <React.Fragment>
                <DownloadCustomReportPopup isVisible={this.state.isDisplay}  makeVisible={(this.props.makeVisible)? this.props.makeVisible : this.makeVisible} data={this.props}/>

                {this.props.data.team ?
                    <div className="row" style={{
                        marginTop: 0,
                        marginBottom: "8px"
                    }}>
                        <div className="col-md-12">
                            <p ref="h1" className="penstate">
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: this.props.data.brand && this.props.data.brand !== 'null' ? "/TeamAdmin/"+this.props.data.organization+"/"+this.props.data.brand : "/TeamAdmin/"+this.props.data.organization,
                                    state: {
                                        brand: {
                                            brand: this.props.data.brand,
                                            organization: this.props.data.organization,
                                            user_cognito_id: this.props.data.user_cognito_id
                                        }
                                    }
                                }}>{this.props.data.organization}
                                </Link> >
                                <Link style={{ fontWeight: "400" }} to={{
                                    pathname: '/TeamAdmin/team/players/'+this.props.data.organization+'/'+this.props.data.team+'?brand='+this.props.data.brand,
                                    state: {
                                        team: {
                                            brand: this.props.data.brand,
                                            organization: this.props.data.organization,
                                            team_name: this.props.data.team,
                                            user_cognito_id: this.props.data.user_cognito_id,
                                            staff: this.props.data.staff
                                        }
                                    }
                                }}>{this.props.data.team}
                                </Link> > 
                                {(this.props.data.player_id && this.props.data.player_id.length > 0) ? this.props.data.player_id : this.props.user.first_name + ' ' + this.props.user.last_name}
                            </p>
                        </div>
                    </div>
                    : null}
                <h1 ref="h1" style={{
                    textAlign: "center",
                    marginBottom: "2%",
                    color: "black"
                }} className="top-heading__login player-dashboard-title">
                    Player Dashboard
                </h1>
                { this.props.data.player &&
                <div
                    className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated1 fadeInLeft1 player-dashboard-user-datials-header"
                   >
                    <div className="row">
                       
                          
                                <div className="col-lg-8 col-md-8 col-sm-12 ">
                                    <>
                                        <p
                                            ref="h1"
                                            className="player-dashboard-sub-head"
                                        >Name : {this.props.user.level ===   '1000' ? this.props.data.team ? this.props.data.player['first-name'] + ' ' + this.props.data.player['last-name'] : this.props.user.first_name + ' ' + this.props.user.last_name : 'Hidden for IRB purposes'}</p>
                                        <p
                                            ref="h1"
                                            className="player-dashboard-sub-head"
                                        >Position : <span style={{ color: "black" }}>{this.props.data.team ? this.props.data.player.position : ''}</span><br/>
                                        </p>
                                        {/*<p
                                            ref="h1"
                                            className="player-dashboard-sub-head"
                                        >Simulation ID : <span style={{ color: "black" }}>{this.props.log_stream_name ? this.props.log_stream_name.split('/')[2] : ''}</span><br/>

                                        </p>*/}
                                        <p
                                            ref="h1"
                                            className="player-dashboard-sub-head"
                                        >
                                        Number of Simulations : {this.props.data.simulationCount ? this.props.data.simulationCount : ''}
                                        </p>
                                    </>
                                </div>

                            {/*-- custom player report export module --*/}
                                <div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <button className="btn btn-download-custom-report" onClick={()=> this.setState({isDisplay: { display: 'block' }})}>Export Player Report</button>

                                </div>
                            {/*-- custom player report export module end --*/}

                           
                        
                        {
                            !(this.props.data.player_id && this.props.data.player_id.length > 0) ?
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <button style={{
                                        marginRight: "5% !important",
                                        paddingLeft: "15%",
                                        paddingRight: "15%"
                                    }}
                                    onClick={() => {
                                        this.props.history.push('/Profile')

                                    }}
                                    className="btn btn-primary pull-right sub-head-button">
                                    Profile
                                    </button>
                                </div>

                                : null
                        }

                    </div>
                </div>
                }
                <div
                    className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated1 fadeInLeft Cumulative-Overview-player-dash"
                    
                >

                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <p
                                ref="h1"
                                className="player-dashboard-sub-head"
                            >Cumulative Overview of All Events</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                             {/*
                            !(this.props.data.player_id && this.props.data.player_id.length > 0) ?
                               null

                                : <button style={{
                                    marginRight: "5% !important"
                                }}
                                    className="btn btn-primary pull-right sub-head-button export-player-report-1"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"> </i>&nbsp;
                                    <PDFDownloadLink document={<Report {...this.props} />} className="export-cumulative-player" fileName={fileName} style={{
                                        color: 'white'
                                    }}>
                                        Export Impact Report
                                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                                    </PDFDownloadLink>
                                </button>
                        */}
                        </div>

                    </div>

                    <ExportPlayerReport brainRegions={this.props.brainRegions} />
                    
                </div>
               
                 {/*
                    !(this.props.data.player_id && this.props.data.player_id.length > 0) ?
                               null

                                : <button style={{
                    marginRight: "5% !important"
                    }}
                        className="btn btn-primary pull-right sub-head-button export-player-report-2"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"> </i>&nbsp;
                        <PDFDownloadLink document={<Report {...this.props} />} className="export-cumulative-player" fileName={fileName} style={{
                            color: 'white'
                        }}>
                            Export Impact Report
                      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                        </PDFDownloadLink>
                    </button>
                        */}
            </React.Fragment>
        )
    }
}

export default withRouter(CumulativeAccelerationEventChart);
