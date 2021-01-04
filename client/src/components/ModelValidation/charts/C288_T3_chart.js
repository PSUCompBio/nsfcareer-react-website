import React from 'react';
import { Line } from 'react-chartjs-2';



class C288_T3_chart extends React.Component {
    constructor(props) {
        super(props);
        console.log('data',this.props)
        this.state = {
            values: []
        };
    }
    componentDidMount=()=>{
        var values = [];

        if(this.props.data){
            var val = this.props.data;
            var len = val.val_x.length;
            console.log('len',len)
            for(var i = 0; i < val.val_x.length; i++){
                values.push({ 'x':val.val_x[i] ,'y':val.val_y[i] });
                if(i === len){
                    console.log('values',values)
                    this.setState({
                        values: values
                    })
                }
            }

        }
    }

    render() {
        var values = [];
        
        var val = this.props.data;
        var len = val.val_x.length;
        console.log('len',len)
        for(var i = 0; i < val.val_x.length; i++){
            values.push({ 'x':val.val_x[i] ,'y':val.val_y[i] });
            if(i === len){
                this.setState({
                    values: values
                })
            }
        }

        console.log('values',values)

        //Defiend data variable ...
        let data = {
            labels: ['0','20','40'],
            fill: false,
            datasets: [ {
                lineTension: 1,
                label: "Z Angular Acceleration",
                backgroundColor: '#000000',
                borderColor: '#000000',
                yAxisID: 'B',
                pointRadius: 1,
                fill: false,
                data: values,
            }]
        }

        //Options for chart ...
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
                        labelString: this.props.label
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

        return (
            <>
                <Line id="goodCanvas1" data={data} options={options} redraw={true} />
            </>
        );
    }
}

export default C288_T3_chart;
