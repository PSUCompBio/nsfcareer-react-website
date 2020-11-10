import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const options = {
    responsive: true,
    animation: false,
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
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Linear Acceleration (Gs)'
            },
            id: 'A',
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

class HeadLinearAccelerationAllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: this.props.data.time,
                fill: false,
                datasets: [{
                    lineTension: 0.1,
                    label: "X Linear Acceleration",
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    yAxisID: 'A',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.linear_acceleration['xv'] ? this.props.data.linear_acceleration['xv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Y Linear Acceleration",
                    backgroundColor: '#ff0000',
                    borderColor: '#ff0000',
                    yAxisID: 'A',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.linear_acceleration['yv'] ? this.props.data.linear_acceleration['yv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Z Linear Acceleration",
                    backgroundColor: '#00c04a',
                    borderColor: '#00c04a',
                    yAxisID: 'A',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.linear_acceleration['zv'] ? this.props.data.linear_acceleration['zv'] : [],
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
        if (props.linearUnit === 'ms') {
            options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (m/s2)';
            temp_data.datasets[0].data = props.data.linear_acceleration['xv'] ? props.data.linear_acceleration['xv'] : [];
            temp_data.datasets[1].data = props.data.linear_acceleration['yv'] ? props.data.linear_acceleration['yv'] : [];
            temp_data.datasets[2].data = props.data.linear_acceleration['zv'] ? props.data.linear_acceleration['zv'] : [];
        } else {
            options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (Gs)';
            temp_data.datasets[0].data = props.data.linear_acceleration['xv-g'] ? props.data.linear_acceleration['xv-g'] : [];
            temp_data.datasets[1].data = props.data.linear_acceleration['yv-g'] ? props.data.linear_acceleration['yv-g'] : [];
            temp_data.datasets[2].data = props.data.linear_acceleration['zv-g'] ? props.data.linear_acceleration['zv-g'] : [];
        }
        return {
            data: temp_data
        };
    }

    render() {
        return (
            <div className="brain-card-pt-2-5 row pl-4 pr-4 pb-4 dark-bg text-center ">
                <div className="bran-smiulation-dash-chart">
                    <Line data={this.state.data} options={options} redraw={true} />
                </div>
            </div>
              
        );
    }
}

export default HeadLinearAccelerationAllEvents;
