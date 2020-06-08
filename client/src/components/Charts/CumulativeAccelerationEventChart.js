import React from 'react';
import {Line} from 'react-chartjs-2';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Report from '../ReportContent/Report0';
import ExportPlayerReport from './ExportPlayerReport';

const options = {
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Linear Acceleration'
            },
            ticks: {
                min: 0
            }
        }],
        xAxes: [{

            scaleLabel: {
                display: true,
                labelString: 'Angular Acceleration'
            }
        }]
    }
};



class CumulativeAccelerationEventChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("THIS IS DATA RECEIVED CumulativeAccelerationEventChart",this.props);
        this.state = {
            data : {

                labels: this.props.data.angular_accelerations,
                datasets: [{
                    label: "Linear VS Angular Acceleration",

                    lineTension: 0.1,
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    data: this.props.data.linear_accelerations,
                }]
            },
            is_selfie_image_uploaded : props.is_selfie_image_uploaded ,
            imageUrl : props.imageUrl
        };
    }

    render() {
        return (
            <React.Fragment>
            <div className="row" style= {{
              marginTop : 0,
              marginBottom : "8px"
            }}>
                <div className="col-md-2">
                  <Link to="/OrganizationAdmin">
                    <h1 className="top-heading__login player-dashboard-title">Organization</h1>
                  </Link>
                </div>
                <div className="col-md-10 adminDashboardTop" >
                  <Link to={{
                      pathname: "/TeamAdmin",
                      state: {
                          team: this.props.data.redirection_detail
                      }
                     }}>
                    <h1 className="top-heading__login player-dashboard-title">> York Tech Football > </h1>
                  </Link>
                  <h1 style={{paddingLeft : "4px", color : "black"}} className="top-heading__login player-dashboard-title" >{(this.props.data.player_id && this.props.data.player_id.length > 0) ? this.props.data.player_id : this.props.user.first_name + ' ' + this.props.user.last_name }</h1>
                </div>
            </div>
          <h1 ref="h1" style={{
                        textAlign: "center",
                        marginBottom : "2%",
                        color : "black"
                    }} className="top-heading__login player-dashboard-title">
                  Player Dashboard
                </h1>
                <div
                    className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated1 fadeInLeft1"
                    style={{
                        border: "2px solid #0F81DC",
                        borderRadius: "1.8rem"
                    }}>

                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <p
                            ref="h1"
                            className="player-dashboard-sub-head"
                            >Name : {(this.props.data.player_id && this.props.data.player_id.length > 0) ? this.props.data.player_id : this.props.user.first_name + ' ' + this.props.user.last_name }</p>
                            <p
                            ref="h1"
                            className="player-dashboard-sub-head"
                            >Position : <span style={{color : "black"}}>RB, QB</span></p>
                        </div>
                        {
                            !(this.props.data.player_id && this.props.data.player_id.length > 0)?
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <button style={{
                                            marginRight : "5% !important",
                                            paddingLeft : "15%",
                                            paddingRight : "15%"
                                        }}
                                        onClick={()=>{
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
            <div
                className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated1 fadeInLeft"
                style={{
                    border: "2px solid #0F81DC",
                    borderRadius: "1.8rem"
                }}
                >
                
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <p
                        ref="h1"
                        className="player-dashboard-sub-head"
                        >Cumulative Overview of All Events</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <button style={{
                                marginRight : "5% !important"
                            }}
                            className="btn btn-primary pull-right sub-head-button"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"> </i>
                            <PDFDownloadLink document={<Report {...this.props}/>} className="export-cumulative-player" fileName="report.pdf" style={{
                              color : 'white'
                            }}>
                              Export Player Report
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </button>
                    </div>

                </div>

                <ExportPlayerReport />

                </div>
                </React.Fragment>
            )
        }
    }

    export default withRouter(CumulativeAccelerationEventChart);
