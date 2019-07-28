import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAlert, MDBInput, MDBCard, MDBCardBody,MDBIcon, MDBCardFooter } from 'mdbreact';
import './Profile.css'
import {uploadProfilePic,getUserDetails,getProfilePicLink} from '../../apis'

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      isLoading : true,
      user : {},
      isFileBeingUploaded : false,
      isUploading : false
    }
  }
  onChangeHandler=(event)=>{

    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

}
onClickHandler = () => {
  const data = new FormData() 
  this.setState({isFileBeingUploaded : true});
  this.setState({isUploading : true});
  data.append('profile_pic', this.state.selectedFile)
  uploadProfilePic(data).then((response)=>{
    console.log(response);
    
    if(response.data.message=="success"){
      // Fetch only image url again
      getProfilePicLink(JSON.stringify({user_cognito_id : this.state.user.user_cognito_id})).then((res)=>{
        console.log(res.data);
        // this.setState({...this.state.user, profile_picture_url: res.data.profile_picture_url});  
        // this.setState({profile_picture_url : res.data.profile_picture_url})
        this.setState({isUploading : false});
        this.setState(prevState => {
          prevState = JSON.parse(JSON.stringify(this.state.user));
          prevState.profile_picture_url = res.data.profile_picture_url;
          if(res.data.avatar_url != undefined && res.data.avatar_url.length !=0){
            prevState.avatar_url = res.data.avatar_url;
            prevState.is_selfie_image_uploaded = true;
            prevState.is_selfie_model_uploaded = true;
          }
          return {user: prevState}
       })

      
      }).catch((err)=>{
        console.log(err);
        
      })
    }
    else{
console.log(response);

    }  
  }).catch((err)=>{
    console.log(err);
    
  })
}

isProfilePictureExists = () => {
  if(this.state.user.profile_picture_url !=""){
    return true;
  }
  else{
    return false;
  }
}

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
if(this.state.isLoading){

  return <div className="topspace"><h1 >User Profile</h1><h2>Loading...</h2></div>
}
return <React.Fragment>
<MDBCard className="topspace">
  <MDBCardBody>

    <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
            <div className="well well-sm">
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                      {!this.isProfilePictureExists()?<div><MDBInput
                      name="profile_pic"
                      icon="file"
                      type="file"
                      onChange={this.onChangeHandler}/><p className="grey-text">* jpeg, jpg & png only</p> <MDBBtn color="light-green" onClick={this.onClickHandler}>Upload</MDBBtn></div>
                    :
                    <div>
                      <img src={this.state.user.profile_picture_url} alt="" className="img-rounded img-responsive" />
                      <MDBInput
                      name="profile_pic"
                      icon="file"
                      type="file"
                      onChange={this.onChangeHandler}/><p className="grey-text">* jpeg, jpg & png only</p>  
                      {
                    this.state.isUploading ? 
                    <div className="d-flex justify-content-center center-spinner">
                         <div className="spinner-border text-primary" role="status" >
        <span className="sr-only">Uploading...</span>
      </div>
             </div>:null
                  }
                      <MDBBtn color="light-green" onClick={this.onClickHandler}>Upload</MDBBtn>
                      
                      </div>
                    
                      }
                        
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <h4>
                            {this.state.user.first_name} {this.state.user.last_name}</h4>
                        
                        <p>
                            <i className="glyphicon glyphicon-envelope"></i>{this.state.user.email}
                            <br />
                            <i className="glyphicon glyphicon-globe"></i>Age : {this.state.user.age}
                            <br />
                            <i className="glyphicon glyphicon-globe"></i>Sex : {this.state.user.gender}
                            <br />
                            <i className="glyphicon glyphicon-gift"></i>{this.state.user.phone_number}</p>
                            <br />
                            <span>Selfie Uploaded </span>{this.state.user.is_selfie_image_uploaded? <MDBIcon icon="check-circle" className="green-text pr-3"/> :<MDBIcon icon="times-circle" className="red-text pr-3"/> } 
                            <br />
                            <span>3D Avatar Generated </span>{this.state.user.is_selfie_model_uploaded? <React.Fragment><MDBIcon icon="check-circle" className="green-text pr-3"/> <br /> <a href={this.state.user.avatar_url} className="btn btn-primary">Download Avatar</a> </React.Fragment> 
                            
                            :<MDBIcon icon="times-circle" className="red-text pr-3"/> } 
                    </div>
                </div>
            </div>
        </div>
    </div>
  </MDBCardBody>
  </MDBCard></React.Fragment>

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getUserDetails().then((response) => {
      console.log(response.data);
        this.setState({ user: response.data.data, isLoading: false });
    }).catch((error) => {
        this.setState({ user: {}, isLoading: false });
    })
}

}

export default Profile;
