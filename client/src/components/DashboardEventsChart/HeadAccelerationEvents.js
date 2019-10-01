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

class HeadAccelerationEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data : {
            labels: this.props.data.time_label,
            datasets: [{
                lineTension: 0.1,
                label: "Pressure Vs Time",
                backgroundColor: '#7CB5EC',
                borderColor: '#1987DD',
                data: this.props.data.pressure,
            }]

        },
        is_selfie_simulation_file_uploaded : props.is_selfie_simulation_file_uploaded,
        imageUrl : props.imageUrl
    };
  }

  render() {
    return (
      <div  className="position-relative animated fadeInRight  bg-white acc-evnt">
      <div  data-descr={`Head Acceleration Events      ${new Date(Number(this.props.data.timestamp)).toDateString()} ${new Date(Number(this.props.data.timestamp)).toLocaleTimeString()}`} className="position-relative head-acc-evnt-chart pl-2 pr-2">
        <div className="row pl-4 pr-4 pb-4 dark-bg   text-center">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            {(this.state.is_selfie_simulation_file_uploaded)?<div><img className={`img fluid ${'svg'}`} src="/img/icon/brainEvnt.svg" alt="" /><img width="95%"  height="95%" className={`img fluid ${'svg'}`} src={this.state.imageUrl} alt="" /> </div> : <img className={`img fluid ${'svg'}`} src="/img/icon/brainEvnt.svg" alt="" />}

          </div>
          <div className="col-md-6 text-right">
              <Line data={this.state.data} options={options}/>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default HeadAccelerationEvents;
