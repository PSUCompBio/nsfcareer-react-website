import React from 'react';
import './Profile.css';
import { Redirect, withRouter } from 'react-router-dom';
import {
    uploadProfilePic,
    getUserDetails,
    getProfilePicLink,
    getInpFileLink,
    getModelLink,
    getSimulationFile,
    isAuthenticated
} from '../../apis';

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

import Footer from '../Footer';

import DownloadBtn from '../Buttons/Download3dProfile';
import store from '../../Store';
import {
    darkThemeActiveSetter,
    darkThemeInactiveSetter,
    resetSignedInSucceeded,
    militaryVersion
} from '../../Actions';
import { getStatusOfDarkmode } from '../../reducer';
import Spinner from '../Spinner/Spinner';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        let search = window.location.search;
        let params = new URLSearchParams(search);

        let user_profile_to_view = params.get('id') ;
        if(!user_profile_to_view){
            user_profile_to_view = '';
        }

        console.log("PROFILE PAGE ",user_profile_to_view);

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
            militaryVersion: 'Military version',
            militaryStatus: false,
            isFileUploaded: false,
            profile_to_view : user_profile_to_view
        };
    }
    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    onClickHandler = () => {
        const data = new FormData();
        this.setState({
            isFileBeingUploaded: true,
            isUploading: true,
            isFileUploaded: false,
            fileUploadError: ''
        });
        let user_id = '';
        if(this.state.profile_to_view){
            user_id = this.state.profile_to_view ;
        }
        else{
            user_id = this.state.user_cognito_id ;
        }

        data.append('profile_pic', this.state.selectedFile);
        data.append('user_cognito_id', user_id);

        console.log("THIS IS FORM DATA ",data);
        uploadProfilePic(data)
        .then((response) => {
            console.log(response);

            if (response.data.message === 'success') {
                // Fetch only image url again
                getProfilePicLink(
                    JSON.stringify({ user_cognito_id: user_id })
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
                            user_cognito_id: user_id
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
                                    user_cognito_id: user_id
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
                                            user_cognito_id: user_id
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

                                            this.setState( {
                                                isFileUploaded : true
                                            });
                                        } else {

                                            this.setState({ isUploading: false, fileUploadError : "Failed to find the simulation link"});
                                        }
                                    })
                                    .catch((err) => {

                                        this.setState({ isUploading: false, fileUploadError : "Failed to find the simulation link"});
                                    });
                                } else {

                                    this.setState({ isUploading: false, fileUploadError : "Failed to find the model link"});
                                }
                            })
                            .catch((err) => {

                                this.setState({ isUploading: false, fileUploadError : "Failed to find the model link"});
                            });
                        } else {

                            this.setState({ isUploading: false, fileUploadError : "Failed to get Inp File Link!"});
                        }
                    })
                    .catch((err) => {

                        this.setState({ isUploading: false, fileUploadError : "Internal service error while fetching Inp Link!"});
                    });
                })
                .catch((err) => {
                    console.log(err);

                    this.setState({ isUploading: false, fileUploadError : "Failed to fetch Inp Link"});
                });
            } else {

                this.setState({ isUploading: false, fileUploadError : "Failed to upload selfie !"});
                console.log(response);
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({ isUploading: false, fileUploadError : "Internal Server Error : Failed to upload Selfie !"});

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
        this.refs.darkMode.style.color = fontColor;
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
                    for (let i = 1; i <= 4; i++) {
                        this.refs['p' + i].style.color = '#fff';
                    }
                } else {
                    this.setState({ mode: 'Dark mode' });
                    this.elementsOfDarkMode(darkThemeInactiveSetter, ['', ''], '', '');
                }
            }
        );
    };

    militaryVersionHandler = () => {
        if (this.state.militaryStatus === false) {
            this.setState({ militaryStatus: true }, () => {
                store.dispatch(militaryVersion(true));
            });
        } else {
            this.setState({ militaryStatus: false }, () => {
                store.dispatch(militaryVersion(false));
            });
        }
    };

    showProfile = () => {
        return (
            <React.Fragment>
                <div className="container pl-5 pr-5 profile-mt animated zoomIn mb-5 pb-2">

                    <div
                        ref="lightDark"
                        style={{
                            border: "2px solid rgb(15, 129, 220)",
                            borderRadius: "1.8rem"
                        }}
                        className="row profile-container"
                        >{/*
                            <div ref="profileBorder" className="profile">
                            <img
                            className="img-fluid"
                            src={this.state.user.profile_picture_url}
                            alt=""
                            />
                            </div>*/}
                            <div className="col-md-8 ml-4 mt-2 pt-2 ">
                                <p
                                    ref="h1"
                                    style={{
                                        paddingLeft : "0px"
                                    }}
                                    className="player-dashboard-sub-head">
                                    Contact Information and Settings
                                </p>

                                <Form className="mt-2">
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Name</Label>

                                        <Col sm={10}>
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <Input
                                                        className="profile-input" type="text" name="name" id="exampleEmail" value={this.state.user.first_name} placeholder="First Name" />
                                                </Col>
                                                <Col md={6} sm={12}>
                                                    <Input
                                                        className="profile-input" type="text" name="name" id="exampleEmail" value={this.state.user.last_name} placeholder="Last Name" />
                                                </Col>
                                            </Row>
                                        </Col>


                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Email</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="text" name="email" id="exampleEmail" value={this.state.user.email} placeholder="abc@example.com" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Mobile Phone</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="text" name="email" id="exampleEmail" value={this.state.user.phone_number} placeholder="Phone number with country code" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Organization</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="email" name="email" id="exampleEmail" value={this.state.organization ? this.state.organization : "PSU"}  placeholder="Organization" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Birthday</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="text" name="email" id="exampleEmail" value={this.state.dob ? this.state.dob : "N/A"} placeholder="DOB" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Sex</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="text" name="email" id="exampleEmail" placeholder="Gender" value={this.state.user.gender} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Type</Label>
                                        <Col sm={10}>
                                            <Input
                                                className="profile-input" type="text" name="email" id="exampleEmail" placeholder="Gender" value={this.state.user.user_type} />
                                        </Col>
                                    </FormGroup>

                                </Form>


                                                </div>
                                                <div className="col-md-3 btns-heading text-left pt-4">
                                                    <div className="row">
                                                        <div className="col-sm-7">
                                                            <span ref="darkMode" className="dark-mode">
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
                                                                    onChange={this.militaryVersionHandler}
                                                                    value={this.state.militaryStatus}
                                                                    type="checkbox"
                                                                    id="militaryVersion"
                                                                    />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="container pl-5 pr-5 zoomIn mb-5 pb-2">
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
                                                <Col md={3}>

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
                                                    <input
                                                        onChange={this.onChangeHandler}
                                                        type="file"
                                                        className="mt-2 btn btn-primary upload-left-side-button"
                                                        style={{width : "30%", lineHeight : "1", backgroundColor: "#0f81dc"}}
                                                        name="profile_pic"
                                                        />
                                                    <button
                                                        type="button"
                                                        onClick={this.onClickHandler}
                                                        className="mt-2 btn btn-primary upload-right-side-button"
                                                        style={{width : "70%",lineHeight : "1", fontSize : "1.2em", backgroundColor: "#0f81dc"}}

                                                        >
                                                        <i class="fa fa-upload" aria-hidden="true"></i>
                                                    </button>
                                                    <p className="jpg-png-only">* jpeg, jpg & png only</p>
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

                                                    {this.state.isFileUploaded ? (
                                                        <UncontrolledAlert
                                                            color="success"
                                                            style={{ marginTop: '5px' }}
                                                            >
                                                            Successfully uploaded the Selfie Image
                                                        </UncontrolledAlert>
                                                    ) : null}
                                                    {this.state.fileUploadError ? (
                                                        <UncontrolledAlert
                                                            style={{ marginTop: '5px' }}
                                                            color="danger"

                                                            >
                                                            {this.state.fileUploadError}

                                                        </UncontrolledAlert>
                                                    ) : null}

                                                    {this.state.user.is_selfie_image_uploaded ? (
                                                        <div>
                                                            <img className="svg img-fluid" src={this.state.user.profile_picture_url} alt="" />
                                                        <DownloadBtn

                                                            style={{
                                                                width : "100%"
                                                            }}
                                                            url={this.state.user.profile_picture_url}
                                                            content="Download 3d Selfie"
                                                            />
                                                        </div>
                                                    ) : null}
                                                </Col>

                                                <Col md={3}>
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
                                                            content="Download Simulation File"
                                                            />
                                                        </div>
                                                    ) : null}
                                                </Col>

                                                <Col md={3}>
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
                                                    <br/>
                                                    {this.state.user.is_selfie_model_uploaded ? (
                                                        <div>
                                                            <img src={this.state.user.avatar_url} alt="" />
                                                        <DownloadBtn
                                                            style={{
                                                                width : "100%"
                                                            }}
                                                            url={this.state.user.avatar_url}
                                                            content="Download avatar"
                                                            />
                                                        </div>
                                                    ) : null}
                                                </Col>

                                                <Col md={3}>
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
                                                    <br/>
                                                    {this.state.user.is_selfie_inp_uploaded ? (
                                                        <div>

                                                        <DownloadBtn
                                                            style={{
                                                                width : "100%"
                                                            }}
                                                            url={this.state.user.inp_file_url}
                                                            content="Download FE Mesh"
                                                            />
                                                        </div>
                                                    ) : null}

                                                </Col>
                                            </Row>
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
                                        getUserDetails({user_cognito_id : this.state.profile_to_view})
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
                                                this.refs.darkMode.style.color = '#fff';
                                                const allInputs = this.state.inputs;
                                                allInputs.forEach((element) => {
                                                    this.refs[element].setAttribute('id', 'dark-mode-color');
                                                });
                                                for (let i = 1; i <= 4; i++) {
                                                    this.refs['p' + i].style.color = '#fff';
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
                                if (getStatusOfDarkmode().status) {
                                    document.getElementsByTagName('body')[0].style.background = '#171b25';
                                }
                            }
                        }

                        export default withRouter(Profile);
