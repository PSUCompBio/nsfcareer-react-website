import React from 'react';
// import { getStatusOfDarkmode } from '../../reducer';
// import SignatureCanvas from 'react-signature-canvas'
import Footer from '../Footer';
import { Redirect, Link } from 'react-router-dom';

import {
    isAuthenticated,
    getCompleteSimulationList
} from '../../apis';

import { Container, Row, Col , Button,Accordion, Card ,Alert } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import { Level } from '../Authentication/getAuthanticatUserData';



class CompleteSimulationList extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        isAuthenticated: false,
        isCheckingAuth: true,
        isLoaded: true,
        organization:this.props.match.params.org,
        team:this.props.match.params.team,
        brand:this.props.match.params.brand,
        simulationList:{},
		board1 : this.props.match.params.brand?this.props.match.params.brand:""
      }
  }
  test=()=>{
    console.log('test')
  }
  componentDidMount() {
    console.log('User',Level)
    // API to get the details of user whose consent is being approves
    isAuthenticated(JSON.stringify({}))
    .then((value) => {
      if (value.data.message === 'success') {
          this.setState({
              isAuthenticated: true,
              isCheckingAuth: false,
              
          });
          return getCompleteSimulationList({
            brand: this.state.brand,
            organization: this.state.organization,
            team: this.state.team
          })
                            
      }
    }).then(response => {
      console.log('response',response);
      var data = response.data;
      if(data.message === "success"){
        this.setState({
          simulationList: data.data,
          isLoaded: false
        })
      }else{
        this.setState({
          isError: 'Failed to fetch simulation list.',
          isLoaded: false
        })
      }
    }).catch((err) => {
      this.setState({ isAuthenticated: false, isCheckingAuth: false,isError: 'Failed to fetch simulation list.'});
    })

  }
  getDate = (timestamp) => {

      const plus0 = num => `0${num.toString()}`.slice(-2)
    
      const d = new Date(timestamp)
    
      const year = d.getFullYear()
      const monthTmp = d.getMonth() + 1
      const month = plus0(monthTmp)
      const date = plus0(d.getDate())
      //eslint-disable-next-line
      return `${month}/${date}/${year}`+' |'
  }

  tConvert = (time) => {
    console.log(time)
    if(time === 0){
      return 'Unknown Time'
    }else{
       // Check correct time format and split into components
      time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    }
  }

  render() {
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
        return <Redirect to="/Login" />;
    }
    if (this.state.isLoaded) {
        return <Spinner />;
    }
    const { simulationList, isError } = this.state;
    console.log('simulationList',simulationList)
    console.log("Props are - ", this.props);
    return (
      <React.Fragment> 
        <div className="container-fluid pl-0 pr-0 overflow-hidden bottom-margin">
          <div style={{ padding : "4% 0% 5% 0%"}} className="row singup">
            <Container>
			
				<a className="btn btn-primary"  href={'/TeamAdmin/team/players/' + this.props.match.params.org + '/' + this.props.match.params.team + '?brand=' +this.state.board1 }>&lt; Back</a>
              <Row className="model-validation-head">
                <Col sm={12}>                
                  <h1>Simulations Statistics</h1>
                </Col>
              </Row>
            </Container>
           
          </div>
          <Row>
            <Container>
              {isError && <Alert variant="danger">
                  {isError}
                </Alert>
              }
              <div className="failed-simulation-list">
			    <table  className="table ">
					<thead>
						<tr>
							<th scope="col" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>Simulations ID</th>
							<th scope="col" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>Submitting Admin</th>
							<th scope="col" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>Model</th>
							<th scope="col" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>Computing time</th>
						 </tr>
					</thead>
					<tbody className="player-table">
              {simulationList && 
                Object.entries(simulationList).map(([key, data]) => {
                   console.log('res',key, data)
                  var name = key.split('-');
                  return <tr className="player-name">
					<td className="player-collapes-div" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>
						{data[0]["simulation_id"]}                     
                    </td>
                    <td className="player-collapes-div" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>						
                      {data[0]["submitting_admin"] !== "N/A" ? data[0]["submitting_admin"]['name'] : "N/A"}
                    </td>
                    <td className="player-collapes-div" style={{'margin-bottom': '25px','border':'1px solid #084371'}}> 
                      {data[0]["model"]} 
                    </td>
                    <td className="player-collapes-div" style={{'margin-bottom': '25px','border':'1px solid #084371'}}>
                       {data[0]["computed_time"]}   
                    </td>
                    </tr>
                    
                })
                
              }
			  </tbody>
                </table>
              </div>
            </Container>
          </Row>
        </div>
        
        <div style={{
            position: "absolute",
            width: "100%",
            bottom: '0'
          }}>
          <Footer />
        </div>
      </React.Fragment>
  );
}
}

export default CompleteSimulationList;
