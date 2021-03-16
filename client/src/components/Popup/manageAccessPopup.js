import React from 'react';

import { 
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';

class manageAccessPopup extends React.Component {
  constructor() {
    super();
    this.state = {
        user_types : [],
        first_name : '',
        last_name : '',
        email : '',
        isRequesting : false,
        OrganizationName: ''
    };

  }
  updateUserType(userType) {
     
  }

  handleDelete = (e)=> {
  }
  scrollToTop(){
    //  window.scrollTo(0, 0)
  }
  componentWillUnmount() {
      
    }

  render() {
    console.log("check", this.props.data)
   
    return (
        <div style={this.props.isVisible} className="modal__wrapper">
         {this.props.isVisible ? this.scrollToTop() : null}
        <div className="modal__show" style={{'background':'#fff','width':'35%','border':'3px solid #0f81dc','height':'auto','color':'#000','padding':'28px 0'}}>
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible3({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />

          <h2>Manage Access</h2>
		  <h3>{this.props.data.name}</h3>
          <label style={{'width':'50%','text-align': 'left'}}><input type="checkbox" name="superadmin" value="Super Addmin" /> Super Addmin</label>
          <label style={{'width':'50%','text-align': 'left'}}><input type="checkbox" name="apiaccess" value="API Access" /> API Access</label>
          <label style={{'width':'50%','text-align': 'left'}}><input type="checkbox" name="portelaccess" value="Simulation Portel Access" /> Simulation Portel Access</label>
          <div className="delete-confirmation-button">
            <button className="btn button-back"  onClick={() => this.props.makeVisible3({ display: 'none' })}>Revoke Access</button>            
          </div>
        </div>
      </div>
    );
  }
}

export default manageAccessPopup;
