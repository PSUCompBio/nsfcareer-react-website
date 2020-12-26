import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import store from '../../Store';
import { resetSignedInSucceeded, userDetails } from '../../Actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LineUnderLink from '../../utilities/LineUnderLink.js';
import camera from './camera.png';
import {
    uploadProfilePic,
    getProfilePicLink,
 
} from '../../apis'; 
import $ from "jquery";
// import CameraPopup from '../../components/Popup/CameraPopup';
class Nav extends React.Component {
  constructor(props) {
    super(props);
    console.log("PATH IS ", this.props.location.pathname)
    console.log("NAV PROPS IS ",props);

       // store intervalId in the state so it can be accessed later:
    this.state = {
      isOpen: false,
      signOutClass: 'sign-out-hide',
      userProfile: '',
      userName: '',
      dashboardLinks: { display: 'none' },
      dashboardLinksIsOpen: false,
      countMouseEnter: 0,
      userProfileIconLinksIsOpen: false,
      logoutBox: { display: 'none' },
      psuLinks: { display: 'none' },
      userType : props.userType,
      isNavbarTransparent : props.isNavbarTransparent,
      user_details : {},
      intervalId: '',
      profile_to_view: '',
      isLoading: '',
      isDisplay2: { display: 'none' },
      isDeskTop: false,
      baseUrl: window.location.origin.toString(),
    };
    console.log("STATE VALUES , ", this.state.user_details);
    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  onChangeHandler2 = (event) => {
      event.persist();
      console.log('uploading',this.state.user_details)
      this.setState({
          selectedFile: event.target.files[0]
      });
      this.onClickHandler2(event.target.files[0]);
  };
   handleCameraPopup = (e) =>{
        console.log('delete',e)
        this.setState({DelData: {type: 'team',data:e} })
        if (this.state.isDisplay2.display === 'none') {
          this.setState({ isDisplay2: {display:'flex'} });
        } else {
          this.setState({ isDisplay2: {display:'none'} });
        }
    }
    makeVisible2 = (data) => {
      this.setState({ isDisplay2: data });
  }
  isUpdateData = (data) =>{
    console.log('isUpdateData',data);
    var file = data.dataUri;
    var the = this;
    if(file){
     fetch(file)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){
        return new File([buf], 'img',{type:'image/png'});
      }).then(res =>{
        console.log(res)
        if(res){
          the.onClickHandler2(res);
        }
      })
    }
  }
  onClickHandler2 = (profile_pic) => {
        const data = new FormData();
        this.setState({
            isFileBeingUploaded: true,
            isUploading: true,
            isFileUploaded: false,
            fileUploadError: '',
        });
        var user_id = '';
        if(this.state.profile_to_view){
            user_id = this.state.profile_to_view ;
        }
        else{
            user_id = this.state.user_details.user_cognito_id ;
        }

        data.append('profile_pic', profile_pic);
        data.append('user_cognito_id', user_id);
        data.append('account_id', this.state.user_details.account_id ? this.state.user_details.account_id : user_id);

        // console.log("THIS IS FORM DATA ",data);
        // console.log("VALUE TO BE PRINTED ",user_id);
        var profile_data = {
            profile_picture_url :'', // Not a user key
            is_selfie_image_uploaded : false,
            is_selfie_model_uploaded : false,
            foundInpLink: false,
            isUploading: false,
            is_selfie_inp_uploaded: false,
            inp_file_url:'',
            avatar_url : '',
            vtk_file_url : '',
            inp_latest_url_details : '',
            selfie_latest_url_details : '',
            simulation_file_url_details : '',
            avatar_zip_file_url_details : '',
            vtk_file_url_details : ''
        }
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
                    profile_data.profile_picture_url = res.data.profile_picture_url ;
                    if (
                        res.data.avatar_url !== undefined &&
                        res.data.avatar_url.length !== 0
                    ) {
                        profile_data.avatar_url = res.data.avatar_url;
                        profile_data.is_selfie_image_uploaded = true;

                        // profile_data.is_selfie_model_uploaded = true;
                        if(res.data.profile_picture_url) {
                            let file_extension = this.getUploadFileExtension(res.data.profile_picture_url);
                            let details = res.data.profile_picture_url.split(file_extension)[0].split('/');

                            let timestamp = details[details.length - 1]

                            let date = new Date(parseInt(timestamp));

                            profile_data.selfie_latest_url_details = [date.toLocaleDateString(),date.toLocaleTimeString({},{hour12:true})]
                        }
                        else{
                            if (
                                res.data.avatar_url !== undefined &&
                                res.data.avatar_url.length !== 0
                            ) {
                                // let file_extension = this.getUploadFileExtension(res.data.avatar_url);
                                let details = res.data.avatar_url.split(".png")[0].split('/');

                                let timestamp = details[details.length - 1]

                                let date = new Date(parseInt(timestamp));

                                profile_data.selfie_latest_url_details = [date.toLocaleDateString(),date.toLocaleTimeString({},{hour12:true})]
                            }
                        }

                        this.setState((prevState) => {
                            prevState = JSON.parse(JSON.stringify(this.state.user));
                            prevState.profile_picture_url = res.data.profile_picture_url;
                            if (
                                res.data.avatar_url !== undefined &&
                                res.data.avatar_url.length !== 0
                            ) {
                                prevState.avatar_url = res.data.avatar_url;
                                prevState.is_selfie_image_uploaded = true;
                            }
                            return { user: prevState, selfie_latest_upload_details : profile_data.selfie_latest_url_details };
                        });
                    }

                    // this.setState({
                    //     profile_picture_url: res.data.profile_picture_url
                    //
                    // });
                    this.setState({ isUploading: false, isFileUploaded : true });


                    // this.setState({ foundInpLink: false });

                })
                .catch((err) => {
                    console.log(err);

                    this.setState({ isUploading: false, fileUploadError : "Failed to fetch Inp Link"});
                    // alert("Failed to fetch Inp Link");
                });
            } else {

                this.setState({ isUploading: false, fileUploadError : "Failed to upload selfie !"});
                    alert("Failed to upload selfie !");

                console.log(response);
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({ isUploading: false, fileUploadError : "Internal Server Error : Failed to upload Selfie !"});
                    alert("Internal Server Error : Failed to upload Selfie !");

        });
    };

  isEquivalent = (a, b) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

getUploadFileExtension(url){

        if(new RegExp(".jpg").test(url)){
            return ".jpg";
        }
        if(new RegExp(".jpeg").test(url)){
            return ".jpeg";
        }
        if(new RegExp(".JPEG").test(url)){
            return ".JPEG";
        }
        if(new RegExp(".JPG").test(url)){
            return ".JPG";
        }
        if(new RegExp(".png").test(url)){
            return ".png";
        }
        if(new RegExp(".PNG").test(url)){
            return ".PNG";
        }
        if(new RegExp(".tiff").test(url)){
            return ".tiff";
        }
        if(new RegExp(".TIFF").test(url)){
            return ".TIFF";
        }
    }
  componentDidMount() {
      this.setState({
          intervalId : setInterval(this.timer, 1000)
      });
      if(window.innerWidth > 480){
        this.setState({
          isDeskTop: true
        })
      }
      var timer;
      console.log('widht',$( document ).width())
      if($( document ).width() <= '480'){
        $(document).scroll(function(){

          if(timer !== "undefined"){
            clearTimeout(timer);
          }
          
          // $('.navbar').hide();
          timer = setTimeout(function(){
            
            // $('.navbar').show();

          },250)//Threshold is 100ms

        });
      }
  }

  componentWillUpdate() {
    document.addEventListener(
      'mousedown',
      function(event) {
        if (event.detail > 1) {
          event.preventDefault();
        }
      },
      false
    );
  }

  componentWillUnmount() {
      clearInterval(this.state.intervalId);
  }

  timer() {
   // here timer function is being used to init the local storage data for User DETAILS
   // TODO : Update it with parent based state change
   if(JSON.parse(localStorage.getItem("state")) !== null ){

   if(!this.isEquivalent(this.state.user_details, JSON.parse(localStorage.getItem("state")).userInfo)){
       this.setState({
           user_details : JSON.parse(localStorage.getItem("state")).userInfo
       })
   }
    }

  }


  handleClick() {
    //const body = document.getElementsByTagName('body')[0];
    const menu = document.getElementById('cbp-spmenu-s2');
    if (!this.state.isOpen) {
      //body.classList.add('cbp-spmenu-push-toleft');
      menu.classList.add('cbp-spmenu-open');
      this.setState({ isOpen: true });
    } else {
      //body.classList.remove('cbp-spmenu-push-toleft');
      menu.classList.remove('cbp-spmenu-open');
      this.setState({ isOpen: false });
    }
  }

  showLogOut = () => {
    if (this.state.signOutClass === 'sign-out-hide') {
      this.setState({ signOutClass: 'sign-out' });
    } else {
      this.setState({ signOutClass: 'sign-out-hide' });
    }
    this.setState({ userProfileIconLinksIsOpen: false });
  };

  showLogOutOption = () => {
    this.setState({ signOutClass: 'sign-out' });
  };

  hideSignOut = (e) => {
    if (this.state.dashboardLinks.display === 'none') {
      this.setState({
        dashboardLinks: { display: 'block' },
        signOutClass: 'sign-out-hide',
        countMouseEnter: this.state.countMouseEnter + 1
      });
    }
  };

  hideLinks = (e) => {
    this.setState({
      dashboardLinks: { display: 'none' },
      dashboardLinksIsOpen: false
    });
  };

  StopHiding = () => {
    this.setState({ dashboardLinksIsOpen: true });
  };

  hideDashboardsLinkIfNotEnter = () => {
    setTimeout(() => {
      if (this.state.dashboardLinksIsOpen === false) {
        this.setState({
          dashboardLinks: { display: 'none' }
        });
      }
    }, 100);
  };

  signOut = () => {
    store.dispatch(resetSignedInSucceeded());
    store.dispatch(userDetails({}));
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({ signOutClass: 'sign-out-hide' });
    this.setState({
        user_details : ''
    })
    this.props.setIsAuth(false);

    this.props.history.push('/Home');
  };

  hideUserIconLinks = () => {
    this.setState({ userProfileIconLinksIsOpen: true });
  };

  hideUserIconLinksIfnotEnter = () => {
    setTimeout(() => {
      if (this.state.userProfileIconLinksIsOpen === false) {
        this.setState({ signOutClass: 'sign-out-hide' });
      }
    }, 100);
  };

  links = (linkText, routeName) => {
    return (
      <li className="nav-item make-active active">
        <Link className="nav-link" to={routeName}>
          {linkText} <span className="sr-only">(current)</span>
        </Link>
        <div className={LineUnderLink.linkeMaker(routeName)} />
      </li>
    );
  };

  mobileNav = () => {
    return (
        <div class="collapse navbar-collapse flex-column" style= {{
          zIndex : 999
        }} id="nav-content">
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/Home' ||
              this.props.location.pathname === '/'
                ? 'active-link'
                : ''
            }
          />
        </li>
        {this.links('Details', '/Details')}
        {this.links('Contact us', '/Contact')}
		{this.links('For Developers', '/Developer')}
        {this.props.location.pathname !== '/SignUp'
          ? this.links('Dashboard', '/Dashboard')
          : this.links('Sign up', '/SignUp')}
      </ul>
      </div>
    );
  };

  profileLinks = () => {
    if (this.state.logoutBox.display === 'none') {
      this.setState({ logoutBox: { display: 'block' } });
    } else {
      this.setState({ logoutBox: { display: 'none' } });
    }
  };

  showLogOutOptions = (e) => {
    setTimeout(() => {
      this.profileLinks();
    }, 500);
    this.refs.hideList.classList.remove('show-mobile-links');
    this.refs.hideList.classList.add('hide-list-onlink-click');
  };

  makePSUlinksVisible = (e) => {
    setTimeout(() => {
      if (this.state.psuLinks.display === 'none') {
        this.setState({ psuLinks: { display: 'block' } });
      } else {
        this.setState({ psuLinks: { display: 'none' } });
      }
    }, 500);
    this.refs.hideList.classList.remove('show-mobile-links');
    this.refs.hideList.classList.add('hide-list-onlink-click');
  };

  showMobileLinkOption = (e) => {
    this.profileLinks();
    this.refs.hideList.classList.remove('hide-list-onlink-click');
    this.refs.hideList.classList.add('show-mobile-links');
  };

  hidePsuLinks = () => {
    this.setState({ psuLinks: { display: 'none' } });
    this.refs.hideList.classList.remove('hide-list-onlink-click');
    this.refs.hideList.classList.add('show-mobile-links');
  };

  mobilePSUlinks = () => {
    if (this.props.userType === 'Admin') {
      return (
        <React.Fragment>
          <div
            style={this.state.psuLinks}
            className="mobile-dashboard-dropdown"
          >
            <ul>
              <li className="back-li">
                <i
                  onClick={this.hidePsuLinks}
                  className="fa mobile-back-option fa-arrow-circle-left"
                  aria-hidden="true"
                ></i>
                <span className="goto-back">Back</span>
              </li>
              {/*
              <li onClick={this.handleClick}>
                <Link to="TeamAdmin">Team Admin</Link>
              </li>
              <li onClick={this.handleClick}>
                <Link to="OrganizationAdmin">Organization Admin</Link>
              </li>
              */}

            </ul>
          </div>
        </React.Fragment>
      );
    }
  };

  dashboardDropDownList = () => {
    if (this.props.userType === 'Admin') {
      return (
        <div
          onMouseEnter={this.StopHiding}
          onMouseLeave={this.hideLinks}
          style={this.state.dashboardLinks}
          className="dashboard-links"
        >
          <ul>

            {/*
                <li>PSU</li>
            }
            <li>
              <Link to="TeamAdmin">Team Admin</Link>
            </li>
            <li>
              <Link to="OrganizationAdmin">Organization Admin</Link>
            </li>
            */}
          </ul>
        </div>
      );
    }
  };

  laptopNav = () => {
    return (
        <div class="collapse navbar-collapse flex-column" id="nav-content">
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              LineUnderLink.linkeMaker('/Home') || LineUnderLink.linkeMaker('/')
            }
          />
        </li>
        {this.links('Details', '/Details')}
        {this.links('Contact us', '/Contact')}
		{this.links('For Developers', '/Developer')}

        {this.props.location.pathname !== '/SignUp' ? (
          <li
            onMouseEnter={this.hideSignOut}
            onMouseLeave={this.hideDashboardsLinkIfNotEnter}
            className="nav-item dashboard-hover make-active active"
          >
            <Link className="nav-link" to={'/Dashboard'}>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
            <div
              className={
                LineUnderLink.linkeMaker('/Login') ||
                LineUnderLink.linkeMaker('/Dashboard')
              }
            />
            {this.dashboardDropDownList()}
          </li>
        ) : (
        this.links('Sign up','/SignUp')
        )}
        <li className=" nav-item profile-nav-icon">
          <div
            onMouseEnter={this.showLogOutOption}
            onMouseLeave={this.hideUserIconLinksIfnotEnter}
            className="name"
          >
            {( (this.state.user_details !== null || this.state.user_details !== undefined) && Object.keys(this.state.user_details).length >0 ) ? `${this.state.user_details.first_name[0].toUpperCase()} ${this.state.user_details.last_name[0].toUpperCase()}` : "NSF"}
          </div>

          <div
            onMouseEnter={this.hideUserIconLinks}
            onMouseLeave={this.showLogOut}
            ref="signOut"
            className={`${this.state.signOutClass}`}
          >
            <div className="nav-item make-active profile-user active">
              <Link className="nav-link" to={'/Profile'}>
                Profile <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/Profile')} />
            </div>
            <Link to="">
              <img
                onClick={this.signOut}
                className="img-fluid"
                src="/img/icon/powerBtn.svg"
                alt=""
              />
            </Link>

            <div>Sign out</div>
          </div>
        </li>
      </ul>
      </div>
    );
  };

  render() {
    const localStore = JSON.parse(localStorage.getItem('state'));
    return (

        <div style={(this.props.location.pathname === "/IRB" || this.props.location.pathname === "/irb" ) ? { display : "none"} : { display : "block"} }>

       {/* <CameraPopup isVisible2={this.state.isDisplay2}  makeVisible2={(this.props.makeVisible2)? this.props.makeVisible2 : this.makeVisible2} isUpdateData={(this.props.isUpdateData)? this.props.isUpdateData : this.isUpdateData}  />  */}
                <nav

              className={`navbar navbar-dark  navbar-expand-lg ${
                'navbar-bg-change'
                }
                ${(( this.props.location.pathname === "/" || this.props.location.pathname === "/Home" || this.props.location.pathname === "/home") && this.props.screenWidth > 768 && this.props.isNavbarTransparent) ? 'navbar-hide ' : ' navbar-padding' } `
                }
              >


        <Link className="navbar-brand" to={'/Home'}>
          <img className="logo-mobile" src={this.state.baseUrl+"/img/icon/logo.png"} alt="" />
        </Link>
        <button
          onClick={this.handleClick}
          className="navbar-toggler menu-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" >
          <i class="fa fa-bars" style={{color:"#fff" ,fontSize:"28px" }} ></i>
      </span>
        </button>

        {this.props.screenWidth >= 768 ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            {localStore === null
              ? this.mobileNav()
              : localStore.isSignedInSuccess === true
              ? this.laptopNav()
              : this.mobileNav()}
          </div>
        ) : (
          ''
          )}

        <nav
          className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right"
          id="cbp-spmenu-s2"
        >
          <div ref="hideList" className="hide-list-left">
            <div className="mobile-profile-container">
              <i
                onClick={this.handleClick}
                className=" close-mobile_nave fa fa-times-circle"
                aria-hidden="true"
              ></i>
              <div
                
                className="mobile-user-profile"
              >
                {( (this.state.user_details !== null || typeof this.state.user_details !== undefined) && Object.keys(this.state.user_details).length >0  && !this.state.isUploading )? `${this.state.user_details.first_name[0].toUpperCase()}${this.state.user_details.last_name[0].toUpperCase()}` : this.state.isUploading? '' : "NSF"}
               <br/> 
              </div>
              <div className="upload-icon" style={Object.keys(this.state.user_details).length >0  && !this.state.isUploading ?{ 'display':'block'} : {'display':'none'}}>
                  <input
                    onChange={this.onChangeHandler2}
                    type="file"
                    name="profile_pic"
                    id="file"
                    style = {{
                        display : "none"
                    }}
                  />
                
                  <label for="file" style={{'margin-bottom':'0px'}}><img  src={camera} style={{'with':'20%'}} alt="Update profile image"/></label>
               
                </div>
              
              {this.state.isUploading ? (
                      <div className="d-flex justify-content-center center-spinner profile-loading">
                        <div
                          className="spinner-border"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : null}

            </div>
            <div>
              <Link onClick={this.handleClick} className="nav-link" to={'/Home'}>
                Home <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/Home')} />
              <Link onClick={this.handleClick} className="nav-link" to={'/Details'}>
                Details <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/About')} />
              {/*this.props.isLoggedIn === true ? (
                <React.Fragment>
                  <Link
                    onClick={this.handleClick}
                    className="nav-link"
                    to={'/Profile'}
                  >
                    Profile <span className="sr-only">(current)</span>
                  </Link>
                  <div className={LineUnderLink.linkeMaker('/Profile')} />
                </React.Fragment>
              ) : (
                ''
              )*/}

              <Link
                onClick={this.handleClick}
                className="nav-link"
                to={'/Contact'}
              >
                Contact us
              </Link>
  			<Link
                onClick={this.handleClick}
                className="nav-link"
                to={'/Developer'}
              >
                For Developers
              </Link>
              <div className={LineUnderLink.linkeMaker('/Contact')} />
              {this.props.location.pathname !== '/SignUp' ? (
                <React.Fragment>
                  <Link onClick={this.handleClick} className="nav-link mobie-dashboard-hover" to={'/Dashboard'}>
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                  <div className={LineUnderLink.linkeMaker('/Login')} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    onClick={this.handleClick}
                    className="nav-link"
                    to={'/SignUp'}
                  >
                    Sign up
                  </Link>
                  <div className={LineUnderLink.linkeMaker('/SignUp')} />
                </React.Fragment>
              )}
              {Object.keys(this.state.user_details).length >0  &&
                <React.Fragment>
                <Link
                     onClick={this.handleClick}
                    className="nav-link"
                     to="profile">Settings
                </Link>
                <a
                    onClick={() => {
                      this.signOut();
                      this.handleClick();
                    }}
                    className="nav-link"
                     href="#">Sign Out
                </a>
                </React.Fragment>
              }
              {Object.keys(this.state.user_details).length === 0  &&
                 <Link
                     onClick={this.Login}
                    className="nav-handleClick"
                     to="Login">Login
                </Link>
              }
              </div>

          </div>

          <div
            style={this.state.logoutBox}
            className="user-profile-dropdown__mobile"
          >
            <ul>
              <li className="back-li">
                <i
                  onClick={this.showMobileLinkOption}
                  className="fa mobile-back-option fa-arrow-circle-left"
                  aria-hidden="true"
                ></i>
                <span className="goto-back">Back</span>
              </li>
              <li onClick={this.handleClick}>
                <Link to="profile">Profile</Link>
              </li>
              <img
                onClick={() => {
                  this.signOut();
                  this.handleClick();
                }}
                className=" mt-3 img-fluid w-25"
                src="/img/icon/powerBtn.svg"
                alt=""
              />
            </ul>
          </div>
          {this.mobilePSUlinks()}
        </nav>
      </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("IN MAP STATE" ,state);
  return {
    isLoggedIn: state.isSignedInSuccess,
    userType: state.userInfo.user_type,
    user_details : state.userInfo
  };
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Nav);