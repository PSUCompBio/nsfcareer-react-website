import React from 'react';
import DailyBtn from '../Buttons/DailyBtn';
import WeeklyBtn from '../Buttons/WeeklyBtn';
import ExportReportBtn from '../Buttons/ExportReportBtn';
import MonthlyBtn from '../Buttons/MonthlyBtn';
import { getStatusOfDarkmode } from '../../reducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';

class PlayerDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleDateChange1 = this.handleDateChange1.bind(this);
    this.handleDateChange2 = this.handleDateChange2.bind(this);
  }

  handleDateChange1 = (date) => {
    this.setState({ startDate: date });
  };

  handleDateChange2 = (date) => {
    this.setState({ endDate: date });
  };

  changeHeadingColor = () => {
    if (getStatusOfDarkmode().status === true) {
      this.refs.h1.style.color = '#fff';
    }
  };

  decrementDate = () => {
    let startDate = this.state.startDate;
    startDate = String(startDate).split(' ');
    console.log(startDate)
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
              <img
                onClick={this.decrementDate}
                src="/img/icon/backword.svg"
                alt=""
              />
            </span>
            <span ref="h1">
              <div className="d-flex">
                <DatePicker
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="form-control fromTodate"
                  name="dob"
                  dateFormat="d MMMM yyyy"
                  selected={this.state.startDate}
                  onChange={this.handleDateChange1}
                  placeholderText="From"
                />

                <DatePicker
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="form-control fromTodate borderRight__fromTodate"
                  name="dob"
                  dateFormat="d MMMM yyyy"
                  selected={this.state.endDate}
                  onChange={this.handleDateChange2}
                  placeholderText="To"
                />
              </div>
            </span>
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
