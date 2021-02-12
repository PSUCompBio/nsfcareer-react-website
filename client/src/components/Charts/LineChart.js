import React from 'react';
import {Line} from 'react-chartjs-2';



class LineChart extends React.Component {
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
            <Line data={this.props.data} options={this.props.options}/>
        </div>
    );
  }
}

export default LineChart;
