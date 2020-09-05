import React from 'react';
import ToggleToken from '../Buttons/ToggleToken';
import { formDataToJson } from '../../utilities/utility';
import { deleteItem } from '../../apis';
import Spinner from './../Spinner/Spinner';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

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
    };

  }
  // Function to update the array holding type of user
  componentDidMount() {
    console.log('facing mode', FACING_MODES.USER)

     if(window.innerWidth > 480){
      this.setState({
        isDeskTop: true,
        dataUri: ''
      })
     }

  }
  removeImg = () =>{
    this.setState({
        dataUri: ''
      })
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
  }
  changeFacingMode =()=>{
    if(this.state.selfie){
      console.log('rear camera')
      this.setState({selfie: false})
    }else{
       console.log('selfie camera')
      this.setState({selfie: true})
    }
  }
 
  componentWillMount() {
      
  }
  handleTakePhoto = (dataUri)=> {
  
    this.setState({dataUri: dataUri})
  }
  handleCameraError =( error) =>{
    console.log('handleCameraError', error);
    this.setState({isCameraErr: true})
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
             onClick={() => this.props.makeVisible2({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          {!this.state.isDeskTop ?

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
          }
          {this.state.dataUri ? 
            <div className="delete-confirmation-button">
              <button className="btn button-back" onClick={this.removeImg}>Cancel</button>
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
