import React from 'react';
import {Line} from 'react-chartjs-2';


const options = {
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Pressure (psi)'
            },
            ticks: {
                min: 0
            }
        }],
        xAxes: [{

            scaleLabel: {
                display: true,
                labelString: 'Time'
            }
        }]
    }
};



class BrainStrainChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("THIS IS DATA RECEIVED",props);
        this.state = {
            data : {

                labels: this.props.data.time_label,
                datasets: [{
                    label: "Pressure Vs Time",

                    lineTension: 0.1,
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    data: this.props.data.pressure,
                }]
            }
        };
    }

    render() {
        return (
            <div className="card  pt-3 pb-3 pl-2 pr-2 mb-5 acc-card acc-card-before">
                <div className="row text-center">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img
                            className="svg img-fluid"
                            src="/img/icon/accBrain.svg"
                            alt=""
                            />
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

    export default BrainStrainChart;
