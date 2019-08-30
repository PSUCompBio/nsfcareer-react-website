import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBAlert,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardFooter
} from 'mdbreact';
import './Profile.css';
import {
  uploadProfilePic,
  getUserDetails,
  getProfilePicLink,
  getInpFileLink,
  getModelLink,
  getSimulationFile,
  isAuthenticated
} from '../../apis';

import Download3dProfile from '../Buttons/Download3dProfile';
import DownloadAvtar from '../Buttons/Download3dProfile';
import DownloadFeMesh from '../Buttons/Download3dProfile';

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
      disableInput:true
    };
  }
  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    this.setState({ isFileBeingUploaded: true });
    this.setState({ isUploading: true });
    data.append('profile_pic', this.state.selectedFile);
    uploadProfilePic(data)
      .then((response) => {
        console.log(response);

        if (response.data.message == 'success') {
          // Fetch only image url again
          getProfilePicLink(
            JSON.stringify({ user_cognito_id: this.state.user.user_cognito_id })
          )
            .then((res) => {
              console.log(res.data);
              // this.setState({...this.state.user, profile_picture_url: res.data.profile_picture_url});
              // this.setState({profile_picture_url : res.data.profile_picture_url})
              this.setState({ isUploading: false });

              this.setState((prevState) => {
                prevState = JSON.parse(JSON.stringify(this.state.user));
                prevState.profile_picture_url = res.data.profile_picture_url;
                if (
                  res.data.avatar_url != undefined &&
                  res.data.avatar_url.length != 0
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
                  if (response.data.message == 'success') {
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
                        if (response.data.message == 'success') {
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
                              if (response.data.message == 'success') {
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
    if (this.state.user.profile_picture_url != '') {
      return true;
    } else {
      return false;
    }
  };

  render() {
    //     return <React.Fragment>
    // <h1 className="topspace">Profile</h1>
    // <div>
    // <MDBInput

    //                       name="profile_pic"
    //                       icon="file"

    //                       type="file"
    //                       onChange={this.onChangeHandler}
    //                     />
    //                     <MDBBtn color="light-green" onClick={this.onClickHandler}>Upload</MDBBtn>

    // </div>
    //     </React.Fragment>;
    // if((!this.state.isCheckingAuth) && (!this.state.isAuthenticated)){
    //     return <Redirect to="/Login"/>
    // }
    // if(this.state.isLoading && (!this.state.isAuthenticated)){
    //     return <div className="container">Loading...</div>
    // }
    // if(this.state.isLoading && this.state.isAuthenticated){

    //   return <div className="topspace"><h1 >User Profile</h1><h2>Loading...</h2></div>
    // }

    // return <React.Fragment>
    // <MDBCard className="topspace">
    //   <MDBCardBody>

    //     <div className="row">
    //         <div className="col-xs-12 col-sm-6 col-md-6">
    //             <div className="well well-sm">
    //                 <div className="row">
    //                     <div className="col-sm-6 col-md-4">
    //                       {!this.isProfilePictureExists()?<div><MDBInput
    //                       name="profile_pic"
    //                       icon="file"
    //                       type="file"
    //                       onChange={this.onChangeHandler}/><p className="grey-text">* jpeg, jpg & png only</p>
    //                                             {
    //                     this.state.isUploading ?
    //                     <div className="d-flex justify-content-center center-spinner">
    //                          <div className="spinner-border text-primary" role="status" >
    //         <span className="sr-only">Uploading...</span>
    //       </div>
    //              </div>:null
    //                   }
    //                   <MDBBtn color="light-green" onClick={this.onClickHandler}>Upload</MDBBtn></div>
    //                     :
    //                     <div>
    //                       <img src={this.state.user.profile_picture_url} alt="" className="img-rounded img-responsive" />
    //                       <MDBInput
    //                       name="profile_pic"
    //                       icon="file"
    //                       type="file"
    //                       onChange={this.onChangeHandler}/><p className="grey-text">* jpeg, jpg & png only</p>
    //                       {
    //                     this.state.isUploading ?
    //                     <div className="d-flex justify-content-center center-spinner">
    //                          <div className="spinner-border text-primary" role="status" >
    //         <span className="sr-only">Uploading...</span>
    //       </div>
    //              </div>:null
    //                   }
    //                       <MDBBtn color="light-green" onClick={this.onClickHandler}>Upload</MDBBtn>

    //                       </div>

    //                       }

    //                     </div>
    //                     <div className="col-sm-6 col-md-8">
    //                         <h4>
    //                             {this.state.user.first_name} {this.state.user.last_name}</h4>

    //                         <p>
    //                             <i className="glyphicon glyphicon-envelope"></i>{this.state.user.email}
    //                             <br />
    //                             <i className="glyphicon glyphicon-globe"></i>Age : {this.state.user.age}
    //                             <br />
    //                             <i className="glyphicon glyphicon-globe"></i>Sex : {this.state.user.gender}
    //                             <br />
    //                             <i className="glyphicon glyphicon-gift"></i>{this.state.user.phone_number}</p>
    //                             <br />
    //                             <span>Selfie Uploaded </span>
    //                             {this.state.user.is_selfie_image_uploaded? <React.Fragment><MDBIcon icon="check-circle" className="green-text pr-3"/> <br /> <a href={this.state.user.profile_picture_url} className="btn btn-warning">Download 3D Selfie</a> </React.Fragment>
    //                             :<MDBIcon icon="times-circle" className="red-text pr-3"/> }
    //                             <br />
    //                             <span>3D Avatar Generated </span>
    //                             {this.state.user.is_selfie_model_uploaded?
    //                             <React.Fragment><MDBIcon icon="check-circle" className="green-text pr-3"/> <br /> <a href={this.state.user.avatar_url} className="btn btn-primary">Download Avatar</a> </React.Fragment>
    //                             :<MDBIcon icon="times-circle" className="red-text pr-3"/>
    //                             }
    //                             <br />
    //                             <span>Mesh File Generated </span>
    //                             {this.state.user.is_selfie_inp_uploaded?
    //                             <React.Fragment><MDBIcon icon="check-circle" className="green-text pr-3"/> <br /> <a href={this.state.user.inp_file_url} className="btn btn-info">Download FE Mesh</a> </React.Fragment>
    //                             :<MDBIcon icon="times-circle" className="red-text pr-3"/>
    //                             }
    //                             <br />
    //                             <span>Simulation File Generated </span>
    //                             {this.state.user.is_selfie_simulation_file_uploaded?
    //                             <React.Fragment><MDBIcon icon="check-circle" className="green-text pr-3"/> <br /> <a href={this.state.user.simulation_file_url} className="btn btn-secondary">Download Simulation File</a> </React.Fragment>
    //                             :<MDBIcon icon="times-circle" className="red-text pr-3"/>
    //                             }
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //   </MDBCardBody>
    //   </MDBCard></React.Fragment>

    return (
      <div className="container profile-mt">
        <div className="row text-center justify-content-center align-items-center profile-container">
          <div className="profile">
            <img className="img-fluid" src="/img/profile/Reuben.png" alt="" />
          </div>
          <div className="col-md-5 mt-5 pt-2  offset-md-3">
            <p>Reuben Craft</p>
            <div className="row text-center">
              <div className="col-md-12 pt-4 titiles">
                <p>
                  Email :{' '}
                  <input type="text" disabled={this.state.disableInput} placeholder=" reuben.kraft@gmail.com" />{' '}
                  <span>
                    <img src="/img/icon/pencheck.svg" alt="" />
                  </span>{' '}
                </p>
                <p>
                  Age : <input disabled={this.state.disableInput} type="text" placeholder="28" />{' '}
                  <span>
                    <img src="/img/icon/pencheck.svg" alt="" />
                  </span>
                </p>
                <p>
                  Sex : <input disabled={this.state.disableInput} type="text" placeholder="Male" />{' '}
                  <span>
                    <img src="/img/icon/pencheck.svg" alt="" />
                  </span>
                </p>
                <p>
                  Contact number :{' '}
                  <input disabled={this.state.disableInput} type="text" placeholder="+11111111111" />{' '}
                  <span>
                    <img src="/img/icon/pencheck.svg" alt="" />
                  </span>
                </p>
                <p>
                  Organization :{' '}
                  <input disabled={this.state.disableInput} type="text" placeholder=" lorem ipsum" />{' '}
                  <span>
                    <img src="/img/icon/pencheck.svg" alt="" />
                  </span>
                </p>
                <button type="submit" className="btn mt-5 upload-btn">
                  Upload photo
                </button>
              </div>
            </div>

            <p>* jpeg, jpg & png only</p>
          </div>
          <div className="col-md-3 btns-heading text-left pt-4">
            <div className="row">
              <div className="col-sm-7">
                <span className="dark-mode">Dark mode</span>
              </div>
              <div className="col-sm-5  position-relative pt-1">
                <label class="switch" for="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <div class="slider round"></div>
                </label>
              </div>
            </div>

            <p>
              <span>
                <img src="/img/icon/check.svg" alt="" />
              </span>{' '}
              Selfie Uploaded{' '}
            </p>
            <Download3dProfile content="Download 3d selfie" />
            <p>
              <span>
                <img src="/img/icon/check.svg" alt="" />
              </span>{' '}
              3D Avatar Generated{' '}
            </p>
            <DownloadAvtar content="Download avtar" />
            <p>
              <span>
                <img src="/img/icon/check.svg" alt="" />
              </span>{' '}
              Mesh File Generated
            </p>
            <DownloadFeMesh content="Download FE Mesh" />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        if (value.data.message == 'success') {
          this.setState({});
          getUserDetails()
            .then((response) => {
              console.log(response.data);
              this.setState({
                user: response.data.data,
                isLoading: false,
                isAuthenticated: true,
                isCheckingAuth: false
              });
            })
            .catch((error) => {
              this.setState({
                user: {},
                isLoading: false,
                isCheckingAuth: false
              });
            });
        } else {
          this.setState({ isAuthenticated: false, isCheckingAuth: false });
        }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
  }
}

export default Profile;
