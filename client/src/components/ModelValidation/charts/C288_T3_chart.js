import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';


const options = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    fill: false,

    legend: {
        display: false,
    },
    plugins: {
        datalabels: {
            // hide datalabels for all datasets
            display: false
        }
    },
    scales: {
        yAxes: [ {
             gridLines: {
              drawOnChartArea: false
            },
            scaleLabel: {
                fontColor: '#000000',
                fontSize: 10,
                display: true,
                labelString: 'Acceleration (rad/s2)'
            },
            id: 'B',
            position: 'left',
            ticks: {
                suggestedMin: -1,
                suggestedMax: 1,
                 stepSize: 1
            }
        }],
        xAxes: [{
             gridLines: {
              drawOnChartArea: false
            },
            scaleLabel: {
                fontSize: 10,
                fontColor: '#000000',
                display: true,
                labelString: 'Time (ms)'
            }
        }]
    }

};

class C288_T3_chart extends React.Component {
    constructor(props) {
        super(props);
        console.log('data',this.props)
        this.state = {
            data: {
                labels: ['0','20','40'],
                fill: false,
                datasets: [ {
                    lineTension: 1,
                    label: "test",
                    backgroundColor: '#ff9a00',
                    borderColor: '#ff9a00',
                    yAxisID: 'B',
                    pointRadius: 1,
                    fill: false,
                    data: [],
                }, {
                    lineTension: 1,
                    label: "Y Angular Acceleration",
                    backgroundColor: '#ff9a00',
                    borderColor: '#ff9a00',
                    yAxisID: 'B',
                    pointRadius: 1,
                    fill: false,
                    data:  [],
                }, {
                    lineTension: 1,
                    label: "Z Angular Acceleration",
                    backgroundColor: '#000000',
                    borderColor: '#000000',
                    yAxisID: 'B',
                    pointRadius: 1,
                    fill: false,
                    data:  [],
                }]

            },
        };
    }

    render() {
        return (
            <>
                <Line id="goodCanvas1" data={this.state.data} options={options} redraw={true} />
            </>
        );
    }
}

export default C288_T3_chart;
