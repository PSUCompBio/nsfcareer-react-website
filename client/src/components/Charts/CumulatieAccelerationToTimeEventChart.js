import React from 'react';
import {Line} from 'react-chartjs-2';
var distinctColors = require('distinct-colors');

const options = {
    maintainAspectRatio: true,
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Max. Linear Acceleration'
            },
            ticks: {
                min: 0
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

class CumulatieAccelerationToTimeEventChart extends React.Component {
  constructor(props) {
    super(props);
    // var pallete = distinctColors({count : props.data.load.length});
    // var dataSetArray = [];
    // for( var i = 0 ; i < props.data.load.length ; i++ ){
    //     console.log("THE DATA",props.data.load[i]);
    //     dataSetArray.push({
    //         label: `Load${i + 1}`,
    //         lineTension: 0.1,
    //         fill: false,
    //         data: props.data.load[i].dataset,
    //         backgroundColor: pallete[i],
    //         borderColor: pallete[i],
    //     })
    // }
    this.state = {
        data : {

            labels: props.data.time,
            datasets: [{
                label: "Max. Linear Acceleration VS Time",
                lineTension: 0.1,
                backgroundColor: '#7CB5EC',
                borderColor: '#1987DD',
                data: props.data.linear_accelerations,
            }]
        }
    };
  }

  render() {
    return (
      <div className="card acc-card acc-brain-load pt-4 pb-3 pl-2 pr-2 animated fadeInRight">
        <Line data={this.state.data} options={options}/>
        {/*<img className="svg img-fluid" src="/img/icon/brainLoad.svg" alt="" />*/}
      </div>
    );
  }
}

export default CumulatieAccelerationToTimeEventChart;
