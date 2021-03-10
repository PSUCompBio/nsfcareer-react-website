import React from 'react';

import {
  getTeamSimultionCount,
} from '../../apis';
class SimulationCountForList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      simulationCount: ''
    }
  }


  componentDidMount() {
    const {count, sensor, organization, team } = this.props;
    if( count || count === '0' || count === 0){

    }else{
      getTeamSimultionCount({sensor,organization,team})
      .then(res =>{
        console.log('res ---',res);
        if(res.data.message === "success"){
          this.setState({simulationCount: res.data.count});
          this.props.setSimulationCount( res.data.count, team,res.data.simulation_status, res.data.computed_time, res.data.simulation_timestamp,organization);
        }else{
          this.setState({simulationCount: 0});
          this.props.setSimulationCount(0, team, '','','',organization);

        }
      }).catch(err=>{
        console.log('err',err);
        this.setState({simulationCount: 0});
        this.props.setSimulationCount(0, team,'','','',organization);
      })
    }
   

  }



  render() {
    // console.log("Props are - ", this.props);
    const {count} = this.props;
    const { simulationCount } = this.state;
    return (
      <>
        {simulationCount || simulationCount === '0' || simulationCount === 0 ?
          count || count === '0' || count === 0  ?
            count
            :
            simulationCount
          :
          count || count === '0' || count === 0  ?
          count
          :
          "Loading..."
        }
      </>
    );
  }
}

export default SimulationCountForList;
