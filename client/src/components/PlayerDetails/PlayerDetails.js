import React from 'react';
import DailyBtn from '../Buttons/DailyBtn';
import WeeklyBtn from '../Buttons/WeeklyBtn';
import ExportReportBtn from '../Buttons/ExportReportBtn';
import MonthlyBtn from '../Buttons/MonthlyBtn';
import { getStatusOfDarkmode } from '../../reducer';

class PlayerDetails extends React.Component {
  changeHeadingColor = () => {
    if (getStatusOfDarkmode().status === true) {
      this.refs.h1.style.color = '#fff';
    }
  };

  componentDidMount() {
    this.changeHeadingColor();
  }

  render() {
    return (
      <div className="row p-4 mb-5 player-details">
        <div className="col-md-6 player-name">
          <p>
            Player Name :
            <span>
              {` ${this.props.user.first_name} ${this.props.user.last_name}`}
            </span>
          </p>
          <p>
            Player ID :<span>515115</span>
          </p>
        </div>
        <div className="col-md-6 text-right">
          <div className="text-center">
            <DailyBtn />
            <WeeklyBtn />
            <MonthlyBtn />
            <ExportReportBtn />
          </div>
          <div className="mt-4 text-left control">
            <span>
              <img src="/img/icon/backword.svg" alt="" />
            </span>
            <span ref="h1">5 August 2019 -11 August 2019</span>
            <span>
              <img src="/img/icon/farword.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerDetails;
