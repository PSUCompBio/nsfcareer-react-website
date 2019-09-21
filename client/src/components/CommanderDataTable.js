import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import { getStatusOfDarkmode } from '../reducer';
import { getPlayersData } from '../apis';

class CommanderDataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tabActive: 0,
      targetBtn: '',
      users : []
    };
    console.log(this.props);
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

    getPlayersData(JSON.stringify({}))
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

    return (
      <React.Fragment>
        {/* <div className="row"> */}
        <div
          ref="card"
          className="col-md-12 pl-0 pr-0 mt-5  mb-5 data-table-view"
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
          <div ref="table" className="commander-data-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">#</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Sport</th>
                  <th scope="col">Position</th>
                  <th scope="col">Alerts</th>
                  <th scope="col">Impacts</th>
                  <th scope="col">Load</th>
                  <th className="w-25" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                  {this.state.users.map(function(player, index){
                    return <tr key={index}>
                      <td>
                        <input
                          id="checkbox-1"
                          className="checkbox-custom"
                          name="checkbox-3"
                          type="checkbox"
                        />
                        <label
                          htmlFor="checkbox-1"
                          className="checkbox-custom-label"
                        ></label>
                      </td>
                      <th scope="row">{index + 1}</th>
                      <td>{player.player_name}</td>
                      <td>{player.sport}</td>
                      <td>{player.position}</td>
                      <td>{Number(player.alerts)}</td>
                      <td>{Number(player.impacts)}</td>
                      <td>{Number(player.impacts)%(index + 1)*2}</td>
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
                    </tr>;
                  })}

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
