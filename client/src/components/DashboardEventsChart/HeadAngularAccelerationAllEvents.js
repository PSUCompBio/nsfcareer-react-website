import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const options = {
    responsive: true,
    maintainAspectRatio: false,
    fill: false,
    legend: {
        display: true
    },
    plugins: {
        datalabels: {
            // hide datalabels for all datasets
            display: false
        }
    },
    scales: {
        yAxes: [ {
            scaleLabel: {
                display: true,
                labelString: 'Angular Acceleration (rad/s2)'
            },
            id: 'B',
            position: 'left',
            ticks: {
                //min: 0
            }
        }],
        xAxes: [{

            scaleLabel: {
                display: true,
                labelString: 'Time (ms)'
            }
        }]
    }
};

class HeadAngularAccelerationAllEvents extends React.Component {
    constructor(props) {
        super(props);
        console.log('data',this.props.data)
        this.state = {
            data: {
                labels: this.props.data.time,
                fill: false,
                datasets: [ {
                    lineTension: 0.1,
                    label: "X Angular Acceleration",
                    backgroundColor: '#8000a3',
                    borderColor: '#8000a3',
                    yAxisID: 'B',
                    fill: false,
                    data: this.props.data.angular_acceleration['xv'],
                }, {
                    lineTension: 0.1,
                    label: "Y Angular Acceleration",
                    backgroundColor: '#ff9a00',
                    borderColor: '#ff9a00',
                    yAxisID: 'B',
                    fill: false,
                    data: this.props.data.angular_acceleration['yv'] ? this.props.data.angular_acceleration['yv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Z Angular Acceleration",
                    backgroundColor: '#000000',
                    borderColor: '#000000',
                    yAxisID: 'B',
                    fill: false,
                    data: this.props.data.angular_acceleration['zv'] ? this.props.data.angular_acceleration['zv'] : [],
                }]

            },
            dataMaxStrain: {
                labels: this.props.data.time,
                datasets: [{
                    lineTension: 0.1,
                    label: "Max. Strain Vs Time",
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    data: this.props.data.max_linear_acceleration,
                }]

            }
        };
    }

    static getDerivedStateFromProps (props, state) {
        let temp_data = state.data;
        console.log(props.linearUnit)
        // if (props.linearUnit === 'ms') {
        //     options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (m/s2)';
        //     temp_data.datasets[0].data = props.data.linear_acceleration['xv'] ? props.data.linear_acceleration['xv'] : [];
        //     temp_data.datasets[1].data = props.data.linear_acceleration['yv'] ? props.data.linear_acceleration['yv'] : [];
        //     temp_data.datasets[2].data = props.data.linear_acceleration['zv'] ? props.data.linear_acceleration['zv'] : [];
        // } else {
        //     options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (Gs)';
        //     temp_data.datasets[0].data = props.data.linear_acceleration['xv-g'] ? props.data.linear_acceleration['xv-g'] : [];
        //     temp_data.datasets[1].data = props.data.linear_acceleration['yv-g'] ? props.data.linear_acceleration['yv-g'] : [];
        //     temp_data.datasets[2].data = props.data.linear_acceleration['zv-g'] ? props.data.linear_acceleration['zv-g'] : [];
        // }
        // return {
        //     data: temp_data
        // };
    }

    render() {
        return (
            <div className="brain-card-pt-2-5 row pl-4 pr-4 pb-4 dark-bg text-center ">
                <div className="bran-smiulation-dash-chart">
                    <Line id="goodCanvas1" data={this.state.data} options={options} redraw={true} />
                </div>
            </div>
              
        );
    }
}

export default HeadAngularAccelerationAllEvents;
