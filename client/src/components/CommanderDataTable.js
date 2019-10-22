import React from 'react';
import { Redirect } from 'react-router-dom'
import RostarBtn from './Buttons/RostarBtn';
import { getStatusOfDarkmode } from '../reducer';
import { getPlayersData } from '../apis';

class CommanderDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 0,
      targetBtn: '',
      users : [],
      redirectData : {},
      cognito_user_id : '',
      player_name : ''
    };
    console.log(this.props," And state is ", this.state);

  }

  setRedirectData = (id, p_name) => {
      this.setState({
          cognito_user_id : id,
          player_name : p_name
      })

  }

  toggleTab = (value) => {
    this.setState({ tabActive: value });
  };

  getTargetBtn = (value) => {
    this.setState({ targetBtn: value });
  };

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      this.refs.card.style.background = '#232838';
      this.refs.table.classList.remove('commander-data-table');
      this.refs.table.classList.add('commander-dark-table');
    }

    getPlayersData({
        organization : "PSU",
        team_name : "York Tech Football"
    })
    .then(response => {
        console.log(response);
        for(var i = 0 ; i < response.data.data.length ; i++){
            this.setState(prevState => ({
                users: [...prevState.users, response.data.data[i]]
            }));
        }
    })
    .catch(err => {

    })
  }

  render() {
      if(this.state.cognito_user_id){
          return <Redirect push to={{
            pathname: '/TeamAdmin/user/dashboard',
            state: {
                cognito_user_id : this.state.cognito_user_id,
                player_name : this.state.player_name
            }
        }} />
      }
    return (
      <React.Fragment>
        {/* <div className="row"> */}
        <div
          ref="card"
          className="col-md-12 pl-0 pr-0 mt-5 data-table-view"
        >
          <div className="btns-group d-flex">
            <RostarBtn
              tabActive={this.toggleTab}
              makeActive={this.state.tabActive}
              getBtn={this.getTargetBtn}
              currentBtn={this.state.targetBtn}
              content="Overview"
            />
            <RostarBtn
              tabActive={this.toggleTab}
              makeActive={this.state.tabActive}
              getBtn={this.getTargetBtn}
              currentBtn={this.state.targetBtn}
              content="Athletes"
            />
            <RostarBtn
              tabActive={this.toggleTab}
              makeActive={this.state.tabActive}
              getBtn={this.getTargetBtn}
              currentBtn={this.state.targetBtn}
              content="Staff"
            />
          </div>
          <div ref="table" className="commander-data-table table-responsive ">
            <table style={{whiteSpace:"nowrap"}} className="table ">
              <thead>
                <tr>

                  <th scope="col">#</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Sport</th>
                  <th scope="col">Position</th>
                  <th scope="col">Brain Simulations</th>
                  <th scope="col">Cumulative Simulation Overview</th>
                </tr>
              </thead>
              <tbody className="player-table">
                  {this.state.users.map(function(player, index){

                    return <tr className="player-data-table-row" key={index} onClick={()=>{

                            this.setRedirectData(Number(index + 1).toString(), player.player_name)
                        }}
                        >
                      <th style={{verticalAlign: "middle"}} scope="row">{index + 1}</th>
                      <td>{player.player_name}</td>
                      <td>Football</td>
                      <td>{player.simulation_data[0].position}</td>
                      <td>{player.simulation_data.length}</td>
                      {/*<td>{Number(player.impact)}</td>*/}
                      <td style={{alignItems : "center"}}>
                          <img style={{
                              display:"block", width:"15%", height:"auto" , objectFit: "cover"
                          }} className={`img-fluid `} src="/img/brain_simulation_image.png" alt="" /></td>
                      {/*<td>{Number(player.impact)%(index + 1)*2}</td>*/}
                      {/*<td>0</td>
                      <td>
                        <div className="progress my-progress">
                          <div
                            style={{ width: '3%' }}
                            className="progress-bar my-progress-bar "
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                      */}
                    </tr>;
                },this)}

              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}

        {/* <div className="container pt-5 my-5">
          <PenstateUniversity />
          <div className="row my-3">
            <div className="col-md-8">
              <DashboardDropdownSelector />
            </div>
          </div>

        </div> */}
        {/* <Footer/> */}
      </React.Fragment>
    );
  }
}

export default CommanderDataTable;
