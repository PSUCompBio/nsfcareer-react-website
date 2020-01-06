import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { formDataToJson } from '../../utilities/utility';
import Img from 'react-fix-image-orientation'
import { UncontrolledAlert,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Col,
    Row
} from 'reactstrap';
import DownloadBtn from '../Buttons/Download3dProfile';
import CountryCode from '../../config/CountryCode.json';

import {
    uploadProfilePic,
    getProfilePicLink,
    getInpFileLink,
    getModelLink,
    getSimulationFile,
    getVtkFileLink,
} from '../../apis';

class UploadProfile extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<div className="container pl-5 pr-5 zoomIn mb-5 pb-2">
            <div
                style={{
                    border: "2px solid rgb(15, 129, 220)",
                    borderRadius: "1.8rem"
                }}
                className="profile-container" >
                <p
                    ref="h1"
                    style={{
                        paddingLeft : "0px"
                    }}
                    className="ml-4 player-dashboard-sub-head">
                    Simulation Information
                </p>
                <Row className="pt-2 pl-4 pr-4">
                    <Col md={4}>

                        <p ref="p1">
                            {this.props.data.user.is_selfie_image_uploaded ? (
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


                        {this.props.data.isUploading ? (
                            <div className="d-flex justify-content-center center-spinner">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                    >
                                    <span className="sr-only">Uploading...</span>
                                </div>
                            </div>
                        ) : null}

                        {this.props.data.isFileUploaded ? (
                            <UncontrolledAlert
                                color="success"
                                style={{ marginTop: '5px' }}
                                >
                                Successfully uploaded the Selfie Image
                            </UncontrolledAlert>
                        ) : null}
                        {this.props.data.fileUploadError ? (
                            <UncontrolledAlert
                                style={{ marginTop: '5px' }}
                                color="danger"

                                >
                                {this.props.data.fileUploadError}

                            </UncontrolledAlert>
                        ) : null}
                        <br/>
                        {this.props.data.user.is_selfie_image_uploaded ? (
                            <div>
                            <button className = {`load-time-btn mt-1 mb-4`}>
                            <p>
                            Last Updated : {this.props.data.selfie_latest_upload_details[0]}
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.data.selfie_latest_upload_details[1]}
                            </p>

                            </button>
                            <div>
                            <input
                                onChange={this.props.onChangeHandler}
                                type="file"
                                name="profile_pic"
                                id="file"
                                style = {{
                                  display : "none"
                                }}
                                />
                            <label for="file" className = "inspect-btn mt-1 mb-4" style={{
                              textAlign : "center"
                            }}>
                            Update
                            </label>
                            </div>
                                <DownloadBtn

                                    style={{
                                        width : "100%"
                                    }}
                                    url={this.props.data.user.profile_picture_url}
                                    content="Download 3d Selfie"
                                    />
                            </div>
                        ) : (<div>
                        <input
                            onChange={this.props.onChangeHandler}
                            type="file"
                            name="profile_pic"
                            id="file"
                            style = {{
                              display : "none"
                            }}
                            />
                        <label for="file" className = "inspect-btn mt-1 mb-4" style={{
                          textAlign : "center"
                        }}>
                        Upload
                        </label>
                        </div>)}
                    </Col>
                    {/*
                    <Col md={4}>
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
                        <br/>
                        {this.state.user.is_selfie_simulation_file_uploaded ? (
                            <div>
                                <img className="svg img-fluid" src={this.state.user.simulation_file_url} alt="" />
                                <DownloadBtn
                                    style={{
                                        width : "100%"
                                    }}
                                    url={this.state.user.simulation_file_url}
                                    content="Download Selfie Image"
                                    />
                            </div>
                        ) : null}
                    </Col>
    */}
                    <Col md={4}>
                        <p ref="p2">
                            {this.props.data.user.is_selfie_model_uploaded ? (
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
                        <br/>
                        {this.props.data.user.is_selfie_model_uploaded ? (
                            <div>
                            <button className = {`load-time-btn mt-1 mb-4`}>
                            <p>
                            Last Updated : {this.props.data.avatar_zip_url_details[0]}
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.data.avatar_zip_url_details[1]}</p>
                            </button>
                                <button
                                  style={{
                                      width : "100%"
                                  }}
                                  className={`inspect-btn mt-1 mb-4`} type="button">
                                  Inspect
                                </button>
                                <DownloadBtn
                                    style={{
                                        width : "100%"
                                    }}
                                    url={this.props.data.user.avatar_url}
                                    content="Download avatar (ZIP)"
                                    />
                            </div>
                        ) : null}
                    </Col>

                    <Col md={4}>
                        <p ref="p3">
                            {this.props.data.user.is_selfie_inp_uploaded ? (
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
                        <br/>
                        {this.props.data.user.is_selfie_inp_uploaded ? (
                            <div>
                            <button className = {`load-time-btn mt-1 mb-4`}>
                            <p >
                            Last Updated : {this.props.data.inp_latest_upload_details[0]}
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.data.inp_latest_upload_details[1]}</p>
                            </button>
                                <button
                                  style={{
                                      width : "100%"
                                  }}
                                  className={`inspect-btn mt-1 mb-4`} type="button">
                                  Inspect
                                </button>
                                <DownloadBtn
                                    style={{
                                        width : "100%"
                                    }}
                                    url={this.props.data.user.vtk_file_url}
                                    content="Download FE Mesh (VTK)"
                                    />
                            </div>
                        ) : null}

                    </Col>
                </Row>
            </div>

        </div>)
    }
}
export default withRouter(UploadProfile);
