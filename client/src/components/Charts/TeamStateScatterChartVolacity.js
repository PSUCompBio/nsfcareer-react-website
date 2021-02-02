import React from 'react';
import {Scatter} from 'react-chartjs-2';



class TeamStateScatterChart extends React.Component {
    // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   }
 
  render() {
    console.log('props',this.props);
    let values = []
    let max_axlation =  this.props.MAX_ANGULAR_EXLARATION
    let mps_95 =  this.props.MPS_95_DATA

    for(var i = 0; i < max_axlation.length; i++){
        values.push({ 'x':max_axlation[i] ,'y':mps_95[i] });
    }
    console.log('values',values)
    const data = {
       
        datasets: [
            {
                label: '95% MPS Angular Acceleration',
                data: values,
                backgroundColor: "rgb(0 123 255 / 63%)",
                pointRadius: 5,
                pointHoverRadius: 10,
            }
        ]
    };
    const options = {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    
                    scaleLabel: {
                        display: false,
                         fontSize: 18,
                         fontWeight: 800,

                        labelString: 'Ang Acc (rad/s2)'
                    },
                }],
                yAxes: [{
                    type: 'linear',
            
                    scaleLabel: {
                        display: true,
                         fontSize: 18,
                        labelString: '95% MPS'
                    },
                }]
            },
            plugins: {
                datalabels: {
                    color: "#007bff",
                    display: false,

                },
            }
        }
    return (
        <div className="">
            <Scatter data={data} options={options} />
        </div>
    );
  }
}

export default TeamStateScatterChart;
