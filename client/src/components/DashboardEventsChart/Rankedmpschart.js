import React from 'react';
import { Line } from 'react-chartjs-2';
// import { Link } from 'react-router-dom';

const options = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    fill: false,
    legend: {
        display: false
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
                labelString: 'Ranked MPS'
            },

        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Element ID'
            },
            ticks: {
                display: false,
                stepSize: 20
            },
			gridLines: {
                drawOnChartArea:false
            }
        }]
    }
};

class Rankedmpschart extends React.Component {
    constructor(props) {
        super(props);
        var points = this.props.data;
        let pointsData = [];
        let labelData = []
        var max_element_val = 10;
        for (var i = 0; i < points.length; i++) {
            pointsData.push({ y: points[i].val, x: points[i].id });
            labelData.push(points[i].id)
        }

        if (points.length > 0) {
            max_element_val = labelData.reduce((a, b) => Math.max(a, b));
        }
        const makeArr = (startValue, stopValue, cardinality) => {
            var arr = [];
            var step = (stopValue - startValue) / (cardinality - 1);
            for (var i = 0; i < cardinality; i++) {
                arr.push(parseInt(startValue + (step * i)));
            }
            return arr;
        }
        var label = makeArr(0, max_element_val, 100);
        pointsData.sort(function (a, b) {
            return b.y - a.y
        })

        console.log('pointsData', pointsData)
        this.state = {
            data: {
                labels: label,
                fill: false,
                datasets: [{
                    lineTension: 0.1,
                    label: 'MPS',
                    backgroundColor: '#88DD88',
                    borderColor: '#88DD88',
                    pointRadius: 1,
                    fill: false,
                    data: pointsData,
                }]

            },
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

export default Rankedmpschart;
