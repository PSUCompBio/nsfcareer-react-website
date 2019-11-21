import React from 'react';
import {Line} from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import MyDocument from '../ReportContent/Report0';

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
                <div className="col-md-5">
                  <Link to={{
                      pathname: "/TeamAdmin",
                      state: {
                          team: this.props.data.redirection_detail
                      }
                     }}>
                    <h1 className="top-heading__login player-dashboard-title">> York Tech Football</h1>
                  </Link>
                </div>
            </div>
          <h1 ref="h1" style={{
                        textAlign: "center",
                        marginBottom : "2%"
                    }} className="top-heading__login player-dashboard-title">
                  Player Dashboard
                </h1>
            <div
                className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated fadeInLeft"
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
                            className="btn btn-primary pull-right sub-head-button"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
                            <PDFDownloadLink document={<MyDocument/>} fileName="report.pdf" style={{
                              color : 'white'
                            }}>
                              Export Player Report
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </button>
                    </div>

                </div>

                <div className="row text-center">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                    {/*    {(this.state.is_selfie_image_uploaded)?<div><img className={`svg img-fluid ${'svg'}`} src="/img/icon/accBrain.svg" alt="" /><img width="95%"  height="95%" className={`img fluid ${'svg'}`} src={this.state.imageUrl} alt="" /> </div>
                        : <img className={`svg img-fluid`} src="/img/icon/accBrain.svg" alt="" />}
                        */}

                        {(this.state.is_selfie_image_uploaded)?<div><img className={`svg img-fluid ${'svg'}`} src="/img/brain_simulation_image.png" alt="" /><img width="95%"  height="95%" className={`img fluid ${'svg'}`} src={this.state.imageUrl} alt="" /> </div>
                    : <img width="95%" height="95%" className={`svg img-fluid`} src="/img/brain_simulation_image.png" alt="" />}
                        {/*<img
                            className="svg img-fluid"
                            src="/img/icon/accBrain.svg"
                            alt=""
                            />
                            */}
                    </div>
                    <div className="col-md-8 mb-5">
                        <Line data={this.state.data} options={options}/>
                        {/*<img
                            className="svg img-fluid"
                            src="/img/icon/accBrainChart.svg"
                            alt=""
                            />*/}
                            {/*<p ref="h3">Time</p> */}
                        </div>
                    </div>
                </div>
                </React.Fragment>
            )
        }
    }

    export default CumulativeAccelerationEventChart;
