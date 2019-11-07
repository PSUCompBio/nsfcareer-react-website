import React from 'react';
import { getStatusOfDarkmode } from '../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from './Footer';

import { getUserDetailsForIRB, confirmGuardianIRBConsent } from '../apis';

import Spinner from './Spinner/Spinner';
import { formDataToJson } from '../utilities/utility';



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
            message : ''
        }

    }
  componentDidMount() {
      getUserDetailsForIRB({consent_token : this.state.consent_token})
      .then(response => {
          this.setState({
              consent_user : response.data.data.Item
          })
      })
      .catch(err => {
          console.log(err);
      })

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
          message : ''
      });
      formData = JSON.parse(formData);
      formData["guardian_signature"] = sigPad.toDataURL("base64string") ;
      console.log(formData);
      confirmGuardianIRBConsent(formData)
      .then(response => {
          if(response.data.message == "success"){
              console.log(response.data);
          }
          else{
              // error
              console.log(response.data);
          }
      })
      .catch(err => {
            console.log(err);
      })
  }
  
  updateSignature = (e) =>{
      console.log(e);
  }
  render() {
    if(Object.keys(this.state.consent_user).length ==  0 ){
        return (
            <React.Fragment>
                <Spinner />
            </React.Fragment>
        )
    }
    else {
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
                            background: "-o-linear-gradient(45deg, #174f86, #2196f3)",
                            background: "linear-gradient(45deg, #174f86, #2196f3)",
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
        <Footer />
      </React.Fragment>
  );
}
  }
}

export default IRBParentConsent;
