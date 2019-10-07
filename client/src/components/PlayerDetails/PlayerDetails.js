import React from 'react';
import DailyBtn from '../Buttons/DailyBtn';
import WeeklyBtn from '../Buttons/WeeklyBtn';
import ExportReportBtn from '../Buttons/ExportReportBtn';
import MonthlyBtn from '../Buttons/MonthlyBtn';
import { getStatusOfDarkmode } from '../../reducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uploadSensorDataAndCompute } from '../../apis';

class PlayerDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      selectedFile: null,
      isLoading: true,
      isUploading: false,
      isFileUploaded: false,
      fileUploadError: ''
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
      this.refs.p1.style.color = '#fff';
      this.refs.p2.style.color = '#fff';
    }
  };

  decrementDate = () => {
    let startDate = this.state.startDate;
    startDate = String(startDate).split(' ');
    console.log(startDate);
  };

  componentDidMount() {
    this.changeHeadingColor();
  }

  onChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };
    
  onClickHandler = () => {
    const data = new FormData();
    this.setState({
      isUploading: true,
      isFileUploaded: false,
      fileUploadError: ''
    });
    data.append('sensor_csv_file', this.state.selectedFile);
    console.log(data);
    uploadSensorDataAndCompute(data)
      .then((response) => {
        this.setState({ isUploading: false, isFileUploaded: true });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ isUploading: false, fileUploadError: err });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="row p-4 mb-5 player-details animated fadeInDown ">
        <div className="col-md-6 player-name">
          <p ref="p1">
            Player Name :
            <span>
              {` ${this.props.user.first_name} ${this.props.user.last_name}`}
            </span>
          </p>
          <p ref="p2">
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
        <div className="col-md-6">
          <div>
            <input
              onChange={this.onChangeHandler}
              type="file"
              className="btn mt-5 upload-btn"
              name="sensor_csv_file"
            />{' '}
            <button
              type="button"
              onClick={this.onClickHandler}
              className="btn mt-5 upload-btn"
            >
              <i className="fa fa-cloud-upload"></i>
            </button>
            {this.state.isUploading ? (
              <div className="d-flex justify-content-center center-spinner">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : null}
            {this.state.isFileUploaded ? (
              <div
                style={{ marginTop: '5px' }}
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Successfully uploaded the CSV/ XLSX file
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
            {this.state.fileUploadError ? (
              <div
                style={{ marginTop: '5px' }}
                className="alert alert-success alert-dismissible api-response-alert fade show"
                role="alert"
              >
                Failed to upload CSV/ XLSX file
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerDetails;
