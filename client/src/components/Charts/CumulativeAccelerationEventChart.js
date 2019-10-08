import React from 'react';
import {Line} from 'react-chartjs-2';


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
        console.log("THIS IS DATA RECEIVED",props);
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
            <div className="card  pt-3 pb-3 pl-2 pr-2 mb-5 acc-card acc-card-before animated fadeInLeft">
                <div className="row text-center">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        {(this.state.is_selfie_image_uploaded)?<div><img className={`svg img-fluid ${'svg'}`} src="/img/icon/accBrain.svg" alt="" /><img width="95%"  height="95%" className={`img fluid ${'svg'}`} src={this.state.imageUrl} alt="" /> </div>
                        : <img className={`svg img-fluid`} src="/img/icon/accBrain.svg" alt="" />}
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
            );
        }
    }

    export default CumulativeAccelerationEventChart;
