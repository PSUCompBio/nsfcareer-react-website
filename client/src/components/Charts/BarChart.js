import React from 'react';
import {Bar} from 'react-chartjs-2';



class BarChart extends React.Component {
    // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   }
 
  render() {
    console.log('props',this.props);
    return (
        <div className="">
            <Bar data={this.props.data} options={this.props.options} />
        </div>
    );
  }
}

export default BarChart;
