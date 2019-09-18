import React from 'react';
import './Profile.css';
import { Redirect } from 'react-router-dom';
import {
  uploadProfilePic,
  getUserDetails,
  getProfilePicLink,
  getInpFileLink,
  getModelLink,
  getSimulationFile,
  isAuthenticated
} from '../../apis';

import Footer from '../Footer';

import DownloadBtn from '../Buttons/Download3dProfile';
import store from '../../Store';
import {
  darkThemeActiveSetter,
  darkThemeInactiveSetter,
  resetSignedInSucceeded
} from '../../Actions';
import { getStatusOfDarkmode } from '../../reducer';
import Spinner from '../Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      isLoading: true,
      user: {},
      isFileBeingUploaded: false,
      isUploading: false,
      foundInpLink: false,
      isAuthenticated: false,
      isCheckingAuth: true,
      disableInput: [true, true, true, true, true],
      inputs: ['email', 'age', 'sex', 'contact', 'organization'],
      isDarkMode: false,
      mode: 'Dark mode',
      militaryVersion: 'Military version'
    };
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    this.setState({ isFileBeingUploaded: true });
    this.setState({ isUploading: true });
    data.append('profile_pic', this.state.selectedFile);
    console.log(data);
    uploadProfilePic(data)
      .then((response) => {
        console.log(response);

        if (response.data.message === 'success') {
          // Fetch only image url again
          getProfilePicLink(
            JSON.stringify({ user_cognito_id: this.state.user.user_cognito_id })
          )
            .then((res) => {
              console.log(res.data);
              this.setState({
                profile_picture_url: res.data.profile_picture_url
              });
              this.setState({ isUploading: false });

              this.setState((prevState) => {
                prevState = JSON.parse(JSON.stringify(this.state.user));
                prevState.profile_picture_url = res.data.profile_picture_url;
                if (
                  res.data.avatar_url !== undefined &&
                  res.data.avatar_url.length !== 0
                ) {
                  prevState.avatar_url = res.data.avatar_url;
                  prevState.is_selfie_image_uploaded = true;
                  prevState.is_selfie_model_uploaded = true;
                }
                return { user: prevState };
              });
              this.setState({ foundInpLink: false });
              getInpFileLink(
                JSON.stringify({
                  user_cognito_id: this.state.user.user_cognito_id
                })
              )
                .then((response) => {
                  if (response.data.message === 'success') {
                    // Updating status for inp file
                    this.setState((prevState) => {
                      prevState = JSON.parse(JSON.stringify(this.state.user));
                      prevState.is_selfie_inp_uploaded = true;
                      prevState.inp_file_url = response.data.inp_file_link;
                      return { user: prevState };
                    });
                    getModelLink(
                      JSON.stringify({
                        user_cognito_id: this.state.user.user_cognito_id
                      })
                    )
                      .then((response) => {
                        if (response.data.message === 'success') {
                          this.setState((prevState) => {
                            prevState = JSON.parse(
                              JSON.stringify(this.state.user)
                            );
                            prevState.avatar_url = response.data.avatar_url;
                            return { user: prevState };
                          });
                          getSimulationFile(
                            JSON.stringify({
                              user_cognito_id: this.state.user.user_cognito_id
                            })
                          )
                            .then((response) => {
                              if (response.data.message === 'success') {
                                this.setState((prevState) => {
                                  prevState = JSON.parse(
                                    JSON.stringify(this.state.user)
                                  );
                                  prevState[
                                    'is_selfie_simulation_file_uploaded'
                                  ] = true;
                                  prevState.simulation_file_url =
                                    response.data.simulation_file_url;
                                  return { user: prevState };
                                });
                              } else {
                                alert('Failed to find the simulation link');
                              }
                            })
                            .catch((err) => {
                              alert('Failed to find the simulation link');
                            });
                        } else {
                          alert('Failed to find the model link');
                        }
                      })
                      .catch((err) => {
                        alert('Failed to find the model link');
                      });
                  } else {
                    alert('Failed to get Inp File Link!');
                  }
                })
                .catch((err) => {
                  alert('Internal service error while fetching Inp Link!');
                });
            })
            .catch((err) => {
              console.log(err);
              alert('Failed to fetch Inp Link');
            });
        } else {
          alert('Failed to upload Selfie !');
          this.setState({ isUploading: false });
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Internal Server Error : Failed to upload Selfie !');
        this.setState({ isUploading: false });
      });
  };

  isProfilePictureExists = () => {
    if (this.state.user.profile_picture_url !== '') {
      return true;
    } else {
      return false;
    }
  };

  enableDisabe = (e) => {
    const index = e.currentTarget.dataset.inptno;
    const element = this.refs[this.state.inputs[index]];
    const inputDisable = [...this.state.disableInput];
    inputDisable[index] = !this.state.disableInput;
    this.setState({ disableInput: inputDisable }, () => {
      element.focus();
      element.classList.add('input-outline');
    });
  };

  elementsOfDarkMode = (
    darkThemereSetterFunc,
    bgColor,
    fontColor,
    darkModeColor
  ) => {
    store.dispatch(darkThemereSetterFunc());
    this.refs.lightDark.style.background = bgColor[0];
    document.getElementsByTagName('html')[0].style.background = bgColor[1];
    document.getElementsByTagName('body')[0].style.background = bgColor[1];
    this.refs.profileBorder.style.border = `10px solid ${bgColor[1]}`;
    this.refs.nameColor.style.color = fontColor;
    this.refs.chooserColor.style.color = fontColor;
    const allInputs = this.state.inputs;
    allInputs.forEach((element) => {
      this.refs[element].setAttribute('id', darkModeColor);
    });
    this.props.isDarkModeSet(this.state.isDarkMode);
  };

  darkMode = (e) => {
    this.setState(
      { isDarkMode: !this.state.isDarkMode, mode: 'Light mode' },
      () => {
        if (this.state.isDarkMode === true) {
          this.elementsOfDarkMode(
            darkThemeActiveSetter,
            ['#232838', '#171b25'],
            '#fff',
            'dark-mode-color'
          );
        } else {
          this.setState({ mode: 'Dark mode' });
          this.elementsOfDarkMode(darkThemeInactiveSetter, ['', ''], '', '');
        }
      }
    );
  };

  showProfile = () => {
    return (
      <React.Fragment>
        <div className="container pl-5 pr-5 profile-mt mb-5 pb-2">
          <div
            ref="lightDark"
            className="row mb-5 text-center justify-content-center align-items-center profile-container"
          >
            <div ref="profileBorder" className="profile">
              <img
                className="img-fluid"
                src={this.state.user.profile_picture_url}
                alt=""
              />
            </div>
            <div className="col-md-5 mt-5 pt-2  offset-md-3">
              <p ref="nameColor" className="pt-5 pb-1">
                {this.state.user.first_name + ' ' + this.state.user.last_name}
              </p>
              <div className="row text-center">
                <div className="col-md-12 pt-4 titiles">
                  <p className="mb-2">
                    Email :
                    <input
                      ref={this.state.inputs[0]}
                      type="text"
                      disabled={this.state.disableInput[0]}
                      placeholder={this.state.user.email}
                    />{' '}
                    <span>
                      <img
                        data-inptno={0}
                        onClick={this.enableDisabe}
                        src="/img/icon/pencheck.svg"
                        alt=""
                      />
                    </span>{' '}
                  </p>
                  <p className="mb-1">
                    Age :{' '}
                    <input
                      ref={this.state.inputs[1]}
                      disabled={this.state.disableInput[1]}
                      type="text"
                      placeholder={this.state.user.age}
                    />{' '}
                    <span>
                      <img
                        data-inptno={1}
                        onClick={this.enableDisabe}
                        src="/img/icon/pencheck.svg"
                        alt=""
                      />
                    </span>
                  </p>
                  <p className="mb-1">
                    Sex :{' '}
                    <input
                      ref={this.state.inputs[2]}
                      disabled={this.state.disableInput[2]}
                      type="text"
                      placeholder={this.state.user.gender}
                    />{' '}
                    <span>
                      <img
                        data-inptno={2}
                        onClick={this.enableDisabe}
                        src="/img/icon/pencheck.svg"
                        alt=""
                      />
                    </span>
                  </p>
                  <p className="mb-1">
                    Contact number :{' '}
                    <input
                      ref={this.state.inputs[3]}
                      disabled={this.state.disableInput[3]}
                      type="text"
                      placeholder={this.state.user.phone_number}
                    />{' '}
                    <span>
                      <img
                        data-inptno={3}
                        onClick={this.enableDisabe}
                        src="/img/icon/pencheck.svg"
                        alt=""
                      />
                    </span>
                  </p>
                  <p className="mb-1">
                    Organization :{' '}
                    <input
                      ref={this.state.inputs[4]}
                      disabled={this.state.disableInput[4]}
                      type="text"
                      placeholder={this.state.user.user_type}
                    />{' '}
                    <span>
                      <img
                        data-inptno={4}
                        onClick={this.enableDisabe}
                        src="/img/icon/pencheck.svg"
                        alt=""
                      />
                    </span>
                  </p>
                  <input
                    onChange={this.onChangeHandler}
                    type="file"
                    className="btn mt-5 upload-btn"
                    name="profile_pic"
                  />
                  {this.state.isUploading ? (
                    <div className="d-flex justify-content-center center-spinner">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Uploading...</span>
                      </div>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={this.onClickHandler}
                    className="btn mt-5 upload-btn"
                  >
                    Upload photo
                  </button>
                </div>
              </div>

              <p className="jpg-png-only">* jpeg, jpg & png only</p>
            </div>
            <div className="col-md-3 btns-heading text-left pt-4">
              <div className="row">
                <div className="col-sm-7">
                  <span ref="chooserColor" className="dark-mode">
                    {this.state.mode}
                  </span>
                </div>
                <div className="col-sm-5  position-relative pt-1">
                  <label className="switch" htmlFor="checkbox">
                    <input
                      onChange={this.darkMode}
                      value={this.state.isDarkMode}
                      type="checkbox"
                      id="checkbox"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-7">
                  <span ref="chooserColor" className="dark-mode">
                    {this.state.militaryVersion}
                  </span>
                </div>
                <div className="col-sm-5  position-relative pt-1">
                  <label className="switch" htmlFor="militaryVersion">
                    <input
                      // onChange={this.darkMode}
                      // value={this.state.isDarkMode}
                      type="checkbox"
                      id="militaryVersion"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>

              <p ref="p1">
                {this.state.user.is_selfie_image_uploaded ? (
                  <span>
                    <img src="/img/icon/check.svg" alt="" />
                  </span>
                ) : (
                  <span>
                    <img
                      className="cancel-icon"
                      src="/img/icon/cancel.svg"
                      alt=""
                    />
                  </span>
                )}{' '}
                Selfie Uploaded{' '}
              </p>
              {this.state.user.is_selfie_image_uploaded ? (
                <DownloadBtn
                  url={this.state.user.profile_picture_url}
                  content="Download 3d Selfie"
                />
              ) : null}

              <p ref="p2">
                {this.state.user.is_selfie_model_uploaded ? (
                  <span>
                    <img src="/img/icon/check.svg" alt="" />
                  </span>
                ) : (
                  <span>
                    <img
                      className="cancel-icon"
                      src="/img/icon/cancel.svg"
                      alt=""
                    />
                  </span>
                )}{' '}
                3D Avatar Generated{' '}
              </p>
              {this.state.user.is_selfie_model_uploaded ? (
                <DownloadBtn
                  url={this.state.user.avatar_url}
                  content="Download avatar"
                />
              ) : null}

              <p ref="p3">
                {this.state.user.is_selfie_inp_uploaded ? (
                  <span>
                    <img src="/img/icon/check.svg" alt="" />
                  </span>
                ) : (
                  <span>
                    <img
                      className="cancel-icon"
                      src="/img/icon/cancel.svg"
                      alt=""
                    />
                  </span>
                )}{' '}
                Mesh File Generated
              </p>
              {this.state.user.is_selfie_inp_uploaded ? (
                <DownloadBtn
                  url={this.state.user.inp_file_url}
                  content="Download FE Mesh"
                />
              ) : null}

              <p ref="p4">
                {this.state.user.is_selfie_simulation_file_uploaded ? (
                  <span>
                    <img src="/img/icon/check.svg" alt="" />
                  </span>
                ) : (
                  <span>
                    <img
                      className="cancel-icon"
                      src="/img/icon/cancel.svg"
                      alt=""
                    />
                  </span>
                )}{' '}
                Simulation File Generated{' '}
              </p>
              {this.state.user.is_selfie_simulation_file_uploaded ? (
                <DownloadBtn
                  url={this.state.user.simulation_file_url}
                  content="Download Simulation File"
                />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  };

  returnComponent = () => {
    console.log(this.state);
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    } else if (Object.entries(this.state.user).length === 0) {
      return <Spinner />;
    }

    return this.showProfile();
  };

  render() {
    return this.returnComponent();
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        if (value.data.message === 'success') {
          this.setState({});
          getUserDetails()
            .then((response) => {
              // store.dispatch(userDetails(response.data))
              console.log(response.data);
              this.setState({
                user: { ...this.state.user, ...response.data.data },
                isLoading: false,
                isAuthenticated: true,
                isCheckingAuth: false
              });

              if (getStatusOfDarkmode().status === true) {
                store.dispatch(darkThemeActiveSetter());
                this.refs.lightDark.style.background = '#232838';
                document.getElementsByTagName('html')[0].style.background =
                  '#171b25';
                document.getElementsByTagName('body')[0].style.background =
                  '#171b25';
                this.refs.profileBorder.style.border = '10px solid #171b25';
                this.refs.nameColor.style.color = '#fff';
                this.refs.chooserColor.style.color = '#fff';
                const allInputs = this.state.inputs;
                allInputs.forEach((element) => {
                  this.refs[element].setAttribute('id', 'dark-mode-color');
                });
                for (let i = 1; i <= 3; i++) {
                  this.refs['h' + i].style.color = '#fff';
                }
                this.props.isDarkModeSet(this.state.isDarkMode);
              }
            })
            .catch((error) => {
              this.setState({
                user: {},
                isLoading: false,
                isCheckingAuth: false
              });
            });
        } else {
          this.setState(
            { isAuthenticated: false, isCheckingAuth: false },
            () => {
              if (this.state.isAuthenticated === false) {
                store.dispatch(resetSignedInSucceeded());
                this.props.history.push('/Home');
              }
            }
          );
        }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
  }
}

export default withRouter(Profile);
