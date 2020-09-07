import React from 'react';
import ToggleToken from '../Buttons/ToggleToken';
import { formDataToJson } from '../../utilities/utility';
import { deleteItem } from '../../apis';
import Spinner from './../Spinner/Spinner';
// import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';
import capture from './capture.png'

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
import flip_camera from './flip_camera.png'

var USER_TYPES = [];

class CameraPopup extends React.Component {
  constructor() {
    super();
    this.state = {
        user_types : [],
        first_name : '',
        last_name : '',
        email : '',
        isRequesting : false,
        OrganizationName: '',
        isDeskTop: false,
        dataUri: '',
        isCameraErr: false,
        selfie: true,
        camera : '',
        facing_mode: FACING_MODES.ENVIRONMENT,
    };

  }
  // Function to update the array holding type of user
  componentDidMount() {
     if(window.innerWidth < 480){
      this.setState({
        isDeskTop: true,
        dataUri: ''
      })
     }
     this.startCamera();
  }
  startCamera =()=>{
    this.setState({
      dataUri: ''
    });
    var the = this;
    setTimeout(function(){
       console.log('facing mode', the.state.facing_mode);
      let videoElement = document.getElementById('videoId');
      // let imgElement = document.getElementById('imgId');
       
      // get buttons elements from the html
      let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
      let stopCameraButtonElement = document.getElementById('stopCameraButtonId');
      // instantiate CameraPhoto with the videoElement
      let cameraPhoto = new CameraPhoto(videoElement);
      the.setState({camera: cameraPhoto})
      cameraPhoto.startCamera(the.state.facing_mode)
      .then(() => {
        console.log('Camera started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
     
      takePhotoButtonElement.onclick = function takePhoto () {
        const config = {};
        let dataUri = cameraPhoto.getDataUri(config);
        the.handleTakePhoto(dataUri);
        // console.log('dataUri',dataUri)
        // imgElement.src = dataUri;
      }
      stopCameraButtonElement.onclick = function stopCamera () {
      // cameraPhoto.stopCamera()
      //     .then(() => {
      //       console.log('Camera stoped!');
            the.stopcamera();
          // })
          // .catch((error) => {
          //   console.log('No camera to stop!:', error);
          // });
      }
    },2000);
     
  }

  scrollToTop(){
    //  window.scrollTo(0, 0)
  }
  hadleApply = () =>{
   let updateData = {
      dataUri: this.state.dataUri
    }
    this.props.isUpdateData(updateData);
    this.props.makeVisible2({ display: 'none' });
    this.state.camera.stopCamera()
  }
 
  stopcamera=()=> {
    this.state.camera.stopCamera();
    this.props.makeVisible2({ display: 'none' })
  }
  handleTakePhoto = (dataUri)=> {
  
    this.setState({dataUri: dataUri})
  }
  handleCameraError =( error) =>{
    console.log('handleCameraError', error);
    this.setState({isCameraErr: true})
  }
  changeFacingMode = ()=>{
    if(this.state.facing_mode == "environment"){
      this.setState({facing_mode: FACING_MODES.USER});

    }else{
      this.setState({facing_mode: FACING_MODES.ENVIRONMENT});
    } 
    var the = this;
    setTimeout(function(){
      the.startCamera();
    },1000)
  }

  render() {
    var width = 400;
    var height = 600
    return (
      <div style={this.props.isVisible2} className="modal__wrapper camera">
         {this.props.isVisible2 ? this.scrollToTop() : null}
        <div className="modal__show camera-box">
          <img
            className="delete__icon"
            id="stopCameraButtonId"
            src="/img/icon/close.svg"
            alt=""
          />
          {/*!this.state.isDeskTop ?

            !this.state.dataUri ? 
              <div>
                <Camera
                    onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                    onCameraError = { (error) => { this.handleCameraError(error); } }
                    idealResolution = {{width: width, height: height}}   
                    idealFacingMode = {this.state.selfie ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
                  />
                  {!this.state.isCameraErr &&
                    <React.Fragment>
                      <div className="camera-circle">

                      </div>
                      <div className="camera-alert">
                        <p>No Glasses.</p>
                        <p>Align your face.</p>
                        <p>Do not smile.</p>
                        <div className="switch_cam">
                          <img src={flip_camera} onClick={this.changeFacingMode}/>
                        </div>
                      </div>
                    </React.Fragment>
                  }
              </div>
              : 
              <div>
                <img src={this.state.dataUri} style={{'width': '100%'}}/>
              </div>
            
            : null
         */ }
          {!this.state.dataUri ?
            <div>
              <video id="videoId" autoplay="true">
              </video>
              <div className="camera-circle"></div>
              <div className="camera-alert-desktop">
                <p>No Glasses.</p>
                <p>Align your face.</p>
                <p>Do not smile.</p>
                <div className="takePhoto-icons">
                  <div className="capture">
                    <img src={capture} id="takePhotoButtonId" className="take-photo"/>
                     <img src={flip_camera} className="camera-switch" onClick={this.changeFacingMode}/>
                  </div>
                </div>
              </div>
            </div>
          : 
            <div style={{'margin-top': '35px'}}>
              <img src={this.state.dataUri} style={{'width': '100%'}}/>
            </div>
          }
          {this.state.dataUri ? 
            <div className="delete-confirmation-button">
              <button className="btn button-back" onClick={this.startCamera}>Cancel</button>
              <button className="btn button-yes" onClick={this.hadleApply}>Save</button>
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default CameraPopup;
