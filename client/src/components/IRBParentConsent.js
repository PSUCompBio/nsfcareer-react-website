import React from 'react';
import { getStatusOfDarkmode } from '../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from './Footer';

import { getUserDetailsForIRB, confirmGuardianIRBConsent } from '../apis';

import Spinner from './Spinner/Spinner';
import { formDataToJson } from '../utilities/utility';
import {
  Link
} from "react-router-dom";


let sigPad = {};
class IRBParentConsent extends React.Component {

    constructor(props){
        super(props);
        let search = window.location.search;
        let params = new URLSearchParams(search);

        let token = params.get('key') ;
        if(!token){
            token = '';
        }
        this.state = {
            consent_token : token,
            consent_user : {},
            error : '',
            message : '',
            isGuardianSigned : false
        }

    }

  componentWillMount() {

    getUserDetailsForIRB({consent_token : this.state.consent_token})
    .then(response => {
          console.log("Inside set state of irb", JSON.stringify(response));
        this.setState({
            consent_user : response.data.data.Item
        })
    })
    .catch(err => {
        console.log(err);
    })
  }

  componentDidMount() {



    // API to get the details of user whose consent is being approves
    if (getStatusOfDarkmode().status === true) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
    } else {
      const element = document.getElementsByClassName('Collapsible__contentInner');
      for (let i = 0; i < element.length; i++){
        element[i].style.background = "#fff";
        element[i].style.color = "#000";

      }
    }
  }

  handleFormSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      let formData = formDataToJson(data);
      this.setState({
          apiLoader : true,
          error : '',
          message : '',
          isLoading : true
      });
      formData = JSON.parse(formData);
      formData["guardian_signature"] = sigPad.toDataURL("base64string") ;
      console.log(formData);
      confirmGuardianIRBConsent(formData)
      .then(response => {
          if(response.data.message === "success"){


              this.setState({ isGuardianSigned : true });
              // this.props.history.push({
              //   pathname : '/Login',
              //   state : {
              //     message : "Successfully approved consent form. Please login using the credentials your ward received in the mail"
              //   }
              // })


          }
          else{
              this.setState({ isGuardianSigned : true, error : "Error while approving the consent" });
            // this.props.history.push({
            //   pathname : '/SignUp',
            //   state : {
            //     message : "Error while signing up"
            //   }
            // })
            //   // error
            //   console.log(response.data);
          }
      })
      .catch(err => {
          this.setState({ isGuardianSigned : true, error : "Error while approving the consent" });
        // this.props.history.push({
        //   pathname : '/SignUp',
        //   state : {
        //     message : "Error while signing up"
        //   }
        // })
            console.log(err);
      })
  }

  updateSignature = (e) =>{
      console.log(e);
  }
  render() {
      console.log("IS GUARDIAN SIGNED ", this.state.isGuardianSigned);
    if(Object.keys(this.state.consent_user).length ===  0 ){
        return (
            <React.Fragment>
                <Spinner />
            </React.Fragment>
        )
    }
    else {

      if(this.state.isSignUpInProgress) {
        return <Spinner/>
      }
      if(this.state.isGuardianSigned === true){
          return (
              <React.Fragment>
                  <div
                      style={{marginTop : "10vh"}}
                      className="row">
                  <div className="col-md-12 col-lg-12 padding-about__page-new text-center">
                    <div className={`section-title animated zoomIn`}>
                        {(this.state.error.length > 0) ?<span style={{color : "#dc3545", fontSize : "1.4rem"}} className="top-heading__login" >
                                Failed !
                        </span> : <span style={{color : "#24BB68", fontSize : "1.4rem"}} className="top-heading__login" >
                                Success !
                        </span>}
                        {(this.state.error.length > 0) ?<span style={{color : "black", fontSize : "1.4rem"}} className="top-heading__login" >
                            {" "}{this.state.error}
                        </span>
                        :
                        <span style={{color : "black", fontSize : "1.4rem"}} className="top-heading__login" >
                            {" "}You successfully approved the consent form. Thanks for taking part in the study.
                        </span> }



                    </div>
                </div>
                {(this.state.error.length === 0 ) ?
                    <div style={{ marginTop : "15%"}}
                        class="col-md-12 col-lg-12 text-center">
                        <p className={`animated fadeInUp about-lines`}>
                            <span style={{fontSize : "1.4rem",fontWeight : "normal"}} className="top-heading__login">
                             Please continue to <span style={{fontWeight : "800"}}><Link to="/SignUp"  >sign up</Link></span>{" "} in order to receive information about your child</span>
                        </p>
                    </div>
                    : null
                }

            </div>

              </React.Fragment>
          )
      }
    return (
      <React.Fragment>
        <div style={{ justifyContent: "center", alignItems: "center", gridTemplateColumns: "1fr auto", marginTop: "15vh"}} className="container">
            <div className="row">

                <div className="col-md-12">
                <h2 ref="h1">INFORMED CONSENT TO TAKE PART IN RESEARCH</h2>
                </div>


                <div className="col-md-12">
                    <p>
                    By signing this consent form, you indicate that you permit your child to be in this research and agree to allow his/her information to be used
                    and shared.
                    </p>
                </div>
                <div className="col-md-12">
                    <br/>
                    <h6 ref="h1">Minor's Details: </h6>

                </div>


                <div className="col-md-12">
                <form>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">First Name</label>
                            <div class="col-sm-4">
                                <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={this.state.consent_user.first_name}/>
                            </div>
                        <label for="staticEmail" class="col-sm-2 col-form-label">Last Name</label>
                            <div class="col-sm-4">
                                <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={this.state.consent_user.last_name}/>
                            </div>
                    </div>

                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Gender</label>
                            <div class="col-sm-4">
                                <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={this.state.consent_user.gender}/>
                            </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Date Of Birth (DOB)</label>
                            <div class="col-sm-4">
                                <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={this.state.consent_user.dob}/>
                            </div>
                    </div>

                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Phone Number</label>
                            <div class="col-sm-4">
                                <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={this.state.consent_user.phone_number}/>
                            </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-12">
                    <br/>
                    <h6 ref="h1">Parent/Guardian Details: </h6>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                <div className="col-md-12">
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">First Name</label>
                            <div class="col-sm-8">
                                <input type="hidden" class="form-control-plaintext" id="staticEmail" name="user_cognito_id" value={this.state.consent_user.user_cognito_id}/>
                                <input type="text" class="form-control-plaintext" id="staticEmail" name="guardian_first_name" placeholder="Enter Your First Name" required/>
                            </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">Last Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="staticEmail" name="guardian_last_name" placeholder="Enter Your Last Name" required/>
                            </div>
                    </div>
                </div>

                <div style={{marginTop : "1rem" }} className="col-md-12 col-sm-12">
                    <h6 ref="h1">Your signature here: </h6>
                    <SignatureCanvas penColor='black'
                        canvasProps={{width: 300, height: 100, className: 'sigCanvas'}}
                        ref={(ref) => { sigPad = ref}}
                        />
                </div>

                <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6">
                    <button
                        type="submit"

                        style={{
                            width: "100%",
                            background: "-webkit-linear-gradient(45deg, #174f86, #2196f3)",
                            // background: "-o-linear-gradient(45deg, #174f86, #2196f3)",
                            // background: "linear-gradient(45deg, #174f86, #2196f3)",
                            lineHeight: "50px",
                            textAlign: "left",
                            color: "#fff",
                            fontSize: "18px",
                            fontWeight: "900",
                            WebkitBoxShadow: "0 0 10px -1px rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 0 10px -1px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #fff",
                            position: "relative",
                            cursor: "pointer",
                            paddingLeft: "20px",
                            marginBottom : "5%"
                        }}
                    >Submit</button>

                        </div>


                    </div>


                </div>
                </form>

            </div>
        </div>
        {this.state.isLoading ? (
          <div className="d-flex justify-content-center center-spinner">
            <div className="spinner-border text-primary" role="status">
              <span  className="sr-only">Approving Consent !!...</span>
            </div>
          </div>
        ) : null}
        <Footer />
      </React.Fragment>
  );
}
  }
}

export default IRBParentConsent;
