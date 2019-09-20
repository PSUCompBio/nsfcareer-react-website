import React from 'react';
import RostarBtn from './Buttons/RostarBtn';
import Footer from './Footer';
import PenstateUniversity from './PenstateUniversity';
import { getStatusOfDarkmode } from '../reducer';
import CommanderDataTable from './CommanderDataTable';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { uploadSensorDataAndCompute } from '../apis';
import MilitaryVersionBtn from './MilitaryVersionBtn';

class CommanderTeamView extends React.Component {
  constructor() {
    super();
    this.state = {
      avgLoad: 0.02,
      alerts: 0,
      team: 2,
      athletes: 6,
      staff: 8,
      highestLoadCount: 0.046,
      impactCount: 3,
      tabActive: 0,
      targetBtn: '',
      rosterValue: 'Lorem ipsum',
      visibilityRosterValueSelector: { display: 'none' },
      selectedFile: null,
      isLoading: true,
      isUploading: false,
      isFileUploaded: false,
      fileUploadError: ''
    };
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
        if (response.data.message == 'success') {
          this.setState({ isUploading: false, isFileUploaded: true });
        } else {
          this.setState({
            isUploading: false,
            fileUploadError: response.data.error
          });
        }
        console.log(response);
      })
      .catch((err) => {
        this.setState({ isUploading: false, fileUploadError: err });
        console.log(err);
      });
  };

  toggleTab = (value) => {
    this.setState({ tabActive: value });
  };

  getTargetBtn = (value) => {
    this.setState({ targetBtn: value });
  };
  setRosterValue = (e) => {
    this.setState({
      rosterValue: e.currentTarget.dataset.item
    });
  };
  makeVisibleSelector = () => {
    if (this.state.visibilityRosterValueSelector.display === 'none')
      this.setState({ visibilityRosterValueSelector: { display: 'block' } });
    else this.setState({ visibilityRosterValueSelector: { display: 'none' } });
  };
  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      this.refs.rosterContainer.style.background = '#171b25';
      for (let i = 1; i <= 7; i++) {
        this.refs['card' + i].style.background = '#232838';
        if ('card' + i === 'card5' || 'card' + i === 'card7') {
          this.refs['card' + i].style.border = '1px solid #e8e8e8';
        }
      }
    }
  }

  getDropdownsIfMilitaryVersionActive = () => {
    return (
      <React.Fragment>
        <div className="season-position text-right ">
          <select name="" id="">
            <option value="">All session</option>
            <option value="">York tech football</option>
            <option value="">Lorem lipsum</option>
            <option value="">York tech football</option>
          </select>
          <select name="" id="">
            <option value="">All position</option>
            <option value="">York tech football</option>
            <option value="">Lorem lipsum</option>
            <option value="">York tech football</option>
          </select>
        </div>

        <div className="col-auto">
          <div>
            <input
              onChange={this.onChangeHandler}
              type="file"
              className="btn upload-btn"
              name="sensor_csv_file"
            />{' '}
            <button
              type="button"
              onClick={this.onClickHandler}
              className="btn \ upload-btn"
            >
              <i class="fa fa-cloud-upload"></i>
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
                class="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Successfully uploaded the CSV/ XLSX file
                <button
                  type="button"
                  class="close"
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
                class="alert alert-success alert-dismissible api-response-alert fade show"
                role="alert"
              >
                Failed to upload CSV/ XLSX file
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  };

  militaryVersionOrNormal = () => {
    return (
      <div ref="rosterContainer" className="t-roster">
        <PenstateUniversity />
        {this.props.isMilitaryVersionActive ? (
          <MilitaryVersionBtn>
            {this.getDropdownsIfMilitaryVersionActive()}
          </MilitaryVersionBtn>
        ) : (
          ''
        )}

        <div className="row ptf-team text-center">
          <div className="col-md-8">
            <div className="row mt-3">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                {/* {this.getDropdownsIfMilitaryVersionActive()} */}
              </div>
            </div>
            <div className="row">
              <div
                ref="card1"
                className="col-md-12 commander-view-card mb-5 mt-4 p-0"
              >
                <div className="rostar-selector">
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
                    content="Roster"
                  />
                </div>
                <div className="row  mt-5">
                  <div className="col-md-6">
                    <div className="highest-load ml-3 mr-3 mt-3 mb-5">
                      <div ref="card5" className="card">
                        <div
                          ref="card4"
                          className="load-heading highest-load-height"
                        >
                          HIGHEST LOAD
                        </div>
                        <p className="mt-4 ">
                          John Sylvester <span>- York Tech football</span>
                        </p>

                        <div className="text-center">
                          <div className="progress--circle progress--5">
                            <div className="progress__number">0.046</div>
                          </div>
                        </div>

                        <div className="load-count mt-3 mb-3">
                          {this.state.highestLoadCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="most-impacts ml-3 mr-3 mt-3 mb-5">
                      <div ref="card7" className="card commander-tv-height">
                        <div
                          ref="card6"
                          className="impact-heading most-impacts-height"
                        >
                          MOST IMPACTS
                        </div>
                        <p className="mt-4">
                          John Sylvester <span>- York Tech football</span>
                        </p>
                        <div className="impact-count mt-3 mb-3">
                          {this.state.impactCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-4 mb-3">
            <div className="row mt-2">
              <div className="col-md-12  text-left">
                <button type="btn" className="impact-sumary-btn">
                  Impact Summary
                </button>
              </div>
            </div>
            <div ref="card2" className="impact-summary-card pt-3 pb-5">
              <img
                className="img-fluid"
                src="/img/icon/impactSummary.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row ptf-team mb-5 mt-5">
          <div className="col-md-12">
            <div className="text-left">
              <button type="btn" className="impact-sumary-btn">
                Impact History
              </button>
            </div>
            <div ref="card3" className="impact-history-card p-4">
              <img
                className="img-fluid"
                src="/img/icon/impactHistory.svg"
                alt=""
              />
            </div>
            <CommanderDataTable />
          </div>
        </div>
      </div>
    );
  };

  ifMilitaryVersionActive = () => {
    return 'military-dark-mode';
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isMilitaryVersionActive === true ? (
          <div className="militay-view">
            <div className="military-sidebar">
              <SideBar />
            </div>
            <div
              className={`military-main-content ${this.ifMilitaryVersionActive()}`}
            >
              {this.militaryVersionOrNormal()}
            </div>
          </div>
        ) : (
          <React.Fragment>
            {this.militaryVersionOrNormal()}
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isMilitaryVersionActive: state.militaryVersion
  };
}

export default connect(mapStateToProps)(CommanderTeamView);
