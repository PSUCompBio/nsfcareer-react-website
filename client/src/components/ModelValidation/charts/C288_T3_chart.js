import React from 'react';
import { Line } from 'react-chartjs-2';



class C288_T3_chart extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            values: []
        };
    }
    componentDidMount=()=>{
        var values = [];

        // if(this.props.data){
        //     var val = this.props.data;
        //     var len = val.val_x.length;
        //     console.log('len',len)
        //     for(var i = 0; i < val.val_x.length; i++){
        //         values.push({ 'x':val.val_x[i] ,'y':val.val_y[i] });
        //         if(i === len){
        //             console.log('values',values)
        //             this.setState({
        //                 values: values
        //             })
        //         }
        //     }

        // }
    }

    render() {
        var values = [];
        var values_2 = [];
        var val = this.props.data;
        var len = val.val_x.length;
        var data_2 = this.props.data_2;
        console.log('pros are ---\n')
        for(var i = 0; i < val.val_x.length; i++){
            values.push({ 'x': val.val_x[i] * 1000,'y': val.val_y[i] * 1000});
        }

        /**
        * 
        */
        if(data_2){
           for(var i = 0; i < data_2.val_x.length; i++){
            // console.log(data_2.val_x[i])
                values_2.push({ 'x': data_2.val_x[i],'y': data_2.val_y[i]});
            }
 
        }
        // console.log('values_2',values_2)

        // console.log('values',values)

        //Defiend data variable ...
        let data = {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
            fill: false,
            datasets: [ {
                lineTension: 0.1,
                label: this.props.label,
                backgroundColor: '#000000',
                borderColor: '#000000',
                pointRadius: 0,
                fill: false,
                data: values,
            },{
                lineTension: 0.1,
                label: this.props.label,
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                pointRadius: 0,
                fill: false,
                data: values_2,
            }]
        }

        //Options for chart ...
        const options = {
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            fill: false,
            title: {
                display: true,
                text: this.props.title
            },
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
                        autoSkip: true,
                        maxTicksLimit: 5
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
                    },
                     ticks: {
                        autoSkip: true,
                        maxTicksLimit: 3
                    }
                }]
            }

        };

        return (
            <>  
                <Line id="goodCanvas1" data={data} options={options} redraw={true} height={270}/>
            </>
        );
    }
}

export default C288_T3_chart;
