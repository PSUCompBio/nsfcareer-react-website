// import React from 'react';
// import ToggleToken from '../Buttons/ToggleToken';
// import { formDataToJson } from '../../utilities/utility';
// import { deleteItem } from '../../apis';
// import Spinner from './../Spinner/Spinner';
// // import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
// import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

// import capture from './capture.png'
// import $ from "jquery";
// import { UncontrolledAlert,
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     FormText,
//     Button,
//     Col,
//     Row
// } from 'reactstrap';
// import flip_camera from './flip_camera.png'

// var USER_TYPES = [];

// class CameraPopup extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//         isCameraStart: false,
//         isDeskTop: false,
//         dataUri: '',
//         isCameraErr: false,
//         selfie: true,
//         camera : '',
//         isMobile: this.mobileCheck(),
//         facing_mode: FACING_MODES.ENVIRONMENT,

//     };

//   }

//   // Check if mobile
//   mobileCheck = () => {
//     let check = false;
//     (function (a) {
//       if (
//         /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
//           a
//         ) ||
//         /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
//           a.substr(0, 4)
//         )
//       )
//         check = true;
//     })(navigator.userAgent || navigator.vendor || window.opera);
//     return check;
//   };
//   // Function to update the array holding type of user
//   componentDidMount() {
//      if(window.innerWidth < 480){
//       this.setState({
//         isDeskTop: true,
//         dataUri: ''
//       })
//      }
//      this.startCamera();
//   }
//   startCamera =()=>{
//     this.setState({
//       dataUri: ''
//     });
//     var the = this;
//     const { isMobile, cameraStarted } = this.state;
//     const cameraWidth = (window.innerWidth / 10) * 8;
//     const cameraHeight = (window.innerHeight / 10) * 8;
//     const sizeOfCanvas = {
//       height: !isMobile ? "85vh" : cameraHeight,
//       width: !isMobile ? "85vw" : cameraWidth
//     };
//     setTimeout(function(){
//        console.log('facing mode', the.state.facing_mode);
//       let videoElement = document.getElementById('videoId');
//       // instantiate CameraPhoto with the videoElement
//       let cameraPhoto = new CameraPhoto(videoElement);
//       the.setState({camera: cameraPhoto})
//       cameraPhoto.startCamera(the.state.facing_mode == 'environment' ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER)
//       .then(() => {
//         console.log('Camera started !');
//       })
//       .catch((error) => {
//         console.error('Camera not started!', error);
//       });
      
//       let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
//       let stopCameraButtonElement = document.getElementById('stopCameraButtonId');
//       takePhotoButtonElement.onclick = function takePhoto () {
//         const config = {};
//         let dataUri = cameraPhoto.getDataUri(config);
//         the.handleTakePhoto(dataUri);
//         // console.log('dataUri',dataUri)
//         // imgElement.src = dataUri;
//       }
//       stopCameraButtonElement.onclick = function stopCamera () {
//         the.stopcamera();
//         console.log('closing')
//       }
      
//     },300);
     
//   }

//   scrollToTop(){
//     //  window.scrollTo(0, 0)
//   }
//   hadleApply = () =>{
//    let updateData = {
//       dataUri: this.state.dataUri
//     }
//     this.props.isUpdateData(updateData);
//     var the = this;
//     this.state.camera.stopCamera().then(() => {
//         console.log('Camera closed !');
//         the.props.makeVisible2({ display: 'none' });
//         the.setState({camera: ''});
//     })
//     .catch((error) => {
//       console.error('Camera not started!', error);
//     });
    
//   }
 
//   stopcamera=()=> {
//     var the = this;
//     this.state.camera.stopCamera().then(() => {
//         console.log('Camera closed !');
//         the.props.makeVisible2({ display: 'none' });
//         the.setState({camera: ''})
//     })
//     .catch((error) => {
//       console.error('Camera not started!', error);
//     });
//   }
//   handleTakePhoto = (dataUri)=> {
//     $("#white-flash").addClass("do-transition");
//     var the = this;
//     setTimeout(() => {
//       the.setState({ dataUri: dataUri })
//       $("#white-flash").removeClass("do-transition")
//     }, 700);
//   }
//   handleCameraError =( error) =>{
//     console.log('handleCameraError', error);
//     this.setState({isCameraErr: true})
//   }
//   changeFacingMode = ()=>{
//     if(this.state.facing_mode == "environment"){
//       this.setState({facing_mode: FACING_MODES.USER});

//     }else{
//       this.setState({facing_mode: FACING_MODES.ENVIRONMENT});
//     } 
//     var the = this;
//     $("#white-flash").addClass("do-transition");
//     setTimeout(function(){
//       the.startCamera();
//       $("#white-flash").removeClass("do-transition")
//     },300)
//   }

//   render() {
//     var width = 400;
//     var height = 600
//     return (
//       <div style={this.props.isVisible2} className="modal__wrapper camera">
//          {this.props.isVisible2 ? this.scrollToTop() : null}
//         <div className="modal__show camera-box">
//           <img
//             className="delete__icon"
//             id="stopCameraButtonId"
//             src="/img/icon/close.svg"
//             alt=""
//           />
//           {!this.state.dataUri ?
//             <div className="overlay">
//               <video id="videoId" autoplay="true">
//               </video>
             
//                   <div className="camera-circle"></div>
//                   <div className="camera-alert-desktop">
//                     <p>No Glasses.</p>
//                     <p>Align your face.</p>
//                     <p>Do not smile.</p>
//                     <div className="takePhoto-icons">
//                       <div className="capture">
//                         <img src={capture} id="takePhotoButtonId" className="take-photo"/>
//                          <img src={flip_camera} className="camera-switch" onClick={this.changeFacingMode}/>
//                       </div>
//                     </div>
//                   </div>
//             </div>
//           : 
//             <div style={{'margin-top': '35px'}}>
//               <img src={this.state.dataUri} style={{'width': '100%'}}/>
//             </div>
//           }
//           <div id="white-flash" className="normal"></div>
//           {this.state.dataUri ? 
//             <div className="delete-confirmation-button">
//               <button className="btn button-back" onClick={this.startCamera}>Cancel</button>
//               <button className="btn button-yes" onClick={this.hadleApply}>Save</button>
//             </div>
//             :
//             null
//           }
//         </div>
//       </div>
//     );
//   }
// }

// export default CameraPopup;


import React from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import flip_camera from "./flip_camera.png";

const percentOfHeight = 80;

class CameraPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      // user_types: [],
      // first_name: "",
      // last_name: "",
      // email: "",
      // isRequesting: false,
      // OrganizationName: "",
      isMobile: this.mobileCheck(),
      dataUri: "",
      isCameraErr: false,
      selfie: true,
      cameraStarted: false,
      cameraWidth: 0,
      cameraHeight: 0
    };

    window.addEventListener("resize", this.windowResize, false);
  }

  componentDidMount() {
    this.setState({
      cameraWidth: (window.innerWidth / 100) * percentOfHeight,
      cameraHeight: (window.innerHeight / 100) * percentOfHeight
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResize);
  }

  // Check if mobile
  mobileCheck = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  // Change camera mode (front or back)
  changeFacingMode = () => {
    if (this.state.selfie) {
      this.setState({ selfie: false });
    } else {
      this.setState({ selfie: true });
    }
  };

  // Cancel photo captured
  cancelCapture = () => {
    this.setState({
      dataUri: ""
    });
  };

  // Save photo captured
  saveCapture = () => {
    let updateData = {
      dataUri: this.state.dataUri
    };
    this.props.isUpdateData(updateData);
    this.props.makeVisible2({ display: 'none' });
  };

  // Take photo
  handleTakePhoto = (dataUri) => {
    setTimeout(() => this.setState({ dataUri: dataUri }), 700);
  };

  // Handle camera start
  handleCameraStart = () => {
    if (!this.state.cameraStarted)
      this.setState({
        cameraStarted: true
      });
  };

  // Handle camera error
  handleCameraError = (error) => {
    this.setState({ isCameraErr: true });
  };

  // Window resize event listener
  windowResize = () => {
    this.setState({
      cameraWidth: (window.innerWidth / 100) * percentOfHeight,
      cameraHeight: (window.innerHeight / 100) * percentOfHeight
    });
  };

  render() {
    const { isMobile, cameraStarted, cameraWidth, cameraHeight } = this.state;
    const sizeOfCanvas = {
      height: cameraHeight,
      width: cameraWidth
    };

    return (
      <div style={this.props.isVisible2} className="modal__wrapper">
      <div style={{ display: "flex" }} className="modal__wrapper">
        <div className=" camera-box" ref={this.modalWrapper} style={{'width':'auto'}}>
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible2({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          {!this.state.dataUri ? (
            <div className="camera-container" style={sizeOfCanvas}>
              <Camera
                onTakePhoto={(dataUri) => {
                  this.handleTakePhoto(dataUri);
                }}
                onCameraStart={this.handleCameraStart}
                onCameraError={(error) => {
                  this.handleCameraError(error);
                }}
                isFullscreen={true}
                idealFacingMode={
                  this.state.selfie
                    ? FACING_MODES.USER
                    : FACING_MODES.ENVIRONMENT
                }
              />
              {!this.state.isCameraErr && cameraStarted && (
                <React.Fragment>
                  <div className="camera-circle"></div>
                  <div className="camera-alert">
                    <p>No Glasses.</p>
                    <p>Align your face.</p>
                    <p>Do not smile.</p>
                    {isMobile && (
                      <img
                        className="switch_cam"
                        src={flip_camera}
                        onClick={this.changeFacingMode}
                      />
                    )}
                  </div>
                </React.Fragment>
              )}
            </div>
          ) : (
            <img
              src={this.state.dataUri}
              className="captured-img"
              style={sizeOfCanvas}
            />
          )}
          {this.state.dataUri && (
            <div className="popup-delete-confirmation-button" style={{width: sizeOfCanvas.width}}>
              <button className="btn button-back" onClick={this.cancelCapture}>
                Cancel
              </button>
              <button className="btn button-yes" onClick={this.saveCapture}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}

export default CameraPopup;
