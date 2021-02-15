import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import LineChart from '../Charts/LineChart'
import { Line } from 'react-chartjs-2';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plot : 'MAE'
        }
    }
    render() {
        const { MLcsvData, MLjsonData } = this.props;
        const { plot } = this.state;
        var maeData = [];
        var lossData = [];
        var labels = []
        for (var i = 0; i < MLcsvData.length; i++) {
            maeData.push({ x: MLcsvData[i].val_mae, y: MLcsvData[i].mae });
            lossData.push({ x: MLcsvData[i].val_loss, y: MLcsvData[i].loss });
            labels.push(MLcsvData[i].epoch);
        }
        console.log('maeData', maeData)
        let mae_datasets = {
            lineTension: 0.1,
            label: 'MAE',
            backgroundColor: '#88DD88',
            borderColor: '#88DD88',
            pointRadius: 0,
            fill: false,
            data: maeData,
        }

        var loss_datasets = {
            lineTension: 0.1,
            label: 'LOSS',
            backgroundColor: '#25CFF9',
            borderColor: '#25CFF9',
            pointRadius: 0,
            fill: false,
            data: lossData,
        }
        var datasets = plot  === 'MAE' ? mae_datasets : loss_datasets;
        let data = {
            labels: labels,
            fill: false,
            datasets: [datasets]
        }

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
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        fontColor: '#000000',
                        fontSize: 15,
                        display: true,
                        labelString: 'Metric'
                    },
                    ticks: {
                        autoSkip: true,
                    }
                }],
                xAxes: [{
                    //  gridLines: {
                    //   drawOnChartArea: false
                    // },
                    scaleLabel: {
                        fontSize: 15,
                        fontColor: '#000000',
                        display: true,
                        labelString: 'Epoch Number'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                }]
            }

        };

        // ...
        const { mae, mae_95, r2} = MLjsonData;

        return (
            <div>
                <Container style={{
                    'margin-bottom': '7px',
                    textAlign: 'center'
                }}>
                    <Row style={{
                        'font-size': '14px',
                        'font-weight': '600',
                        'color': '#0c68b2'
                    }}>
                        <Col>{mae_95.toFixed(2)}%</Col>
                        <Col>{mae.toFixed(2)}</Col>
                        <Col>1.283</Col>
                    </Row>

                    <Row
                        style={{
                            'color': 'black',
                            'font-weight': '800',
                            'font-size': '12px'
                        }}
                    >
                        <Col>ACCURACY</Col>
                        <Col>Mean Absolute Error</Col>
                        <Col>LOSS</Col>
                    </Row>
                </Container>

                <Container style={{
                    'margin-bottom': '7px',
                    textAlign: 'center'

                }}>
                    <Row style={{
                        'font-size': '14px',
                        'font-weight': '600',
                        'color': '#0c68b2'
                    }}>
                        <Col>0.94</Col>
                        <Col>{r2.toFixed(2)}</Col>
                        <Col>1.85</Col>
                    </Row>

                    <Row
                        style={{
                            'color': 'black',
                            'font-weight': '800',
                            'font-size': '12px'

                        }}
                    >
                        <Col>SENSITIVITY</Col>
                        <Col>Coefficient of Determination (R<sup>2</sup>)</Col>
                        <Col>ROCAUC</Col>
                    </Row>
                </Container>
                <Container>
                    <Row style={{
                        width: "100%",
                        fontSize: '18px',
                        fontWeight: 600,
                        padding: '7px 14px',
                        textAlign: 'center'
                    }}>
                        <p style={{
                                'width': '100%',
                                'font-size': '22px',
                                'padding': '0px'
                        }}>Metric vs. Epoch #</p>
                    </Row>
                    <Row style={{
                        'padding': '0px 0px 20px 0px'
                    }}>
                        <Col>
                            <Button className="button-ml-metrics button-ml-metrics-metric">Metrics</Button>
                            <Button className="button-ml-metrics" style={{'cursor': 'no-drop'}} disabled>PRECISION</Button>
                            <Button className="button-ml-metrics" style={{'cursor': 'no-drop'}} disabled>SENSITIVITY</Button>
                            <Button className="button-ml-metrics" style={{'cursor': 'no-drop'}} disabled>F1</Button>
                            <Button className={plot === 'MAE' ? "button-ml-metrics MAE" : "button-ml-metrics"} onClick={()=>this.setState({plot: 'MAE'})}>MAE</Button>
                            <Button className={plot === 'LOSS' ? "button-ml-metrics LOSS" : "button-ml-metrics"} onClick={()=>this.setState({plot: 'LOSS'})}>LOSS</Button>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Line data={data} options={options} height={220} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Tab;
