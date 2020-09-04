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

var USER_TYPES = [];

class CameraPopupDesktop extends React.Component {
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
   
    if(window.innerWidth > 480){
       console.log('width',window.innerWidth)
      width = 768 ;
      height = 576
    }
   
    return (
      <div style={this.props.isVisible2} className="modal__wrapper ">
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
                  idealFacingMode = {FACING_MODES.ENVIRONMENT}
                />
                {!this.state.isCameraErr &&
                  <React.Fragment>
                    <div className="camera-circle-desktop">

                    </div>
                    <div className="camera-alert-desktop">
                      <p>No Glasses.</p>
                      <p>Align your face.</p>
                      <p>Do not smile.</p>
                    </div>
                  </React.Fragment>
                }
              </div>
            : 
              <div style={{'margin-top': '35px'}}>
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

export default CameraPopupDesktop;
