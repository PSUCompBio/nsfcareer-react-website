import React from 'react';
import ToggleToken from '../Buttons/ToggleToken';
import { formDataToJson } from '../../utilities/utility';

import { deleteItem } from '../../apis';

import Spinner from './../Spinner/Spinner';

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

class UpdatePopup extends React.Component {
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
  // Function to update the array holding type of user
  componentDidMount() {

  }
  scrollToTop(){
    //  window.scrollTo(0, 0)
  }
  hadleApply = () =>{
    if(this.props.data.type == "rename"){
      let updateData = {
        data : this.props.data,
        OrganizationName : this.state.OrganizationName 
      }
      this.props.isUpdateData(updateData);
      this.setState({OrganizationName: ''})
    }
    if(this.props.data.type == "addOrganization"){
      let updateData = {
        data : this.props.data,
        OrganizationName : this.state.OrganizationName 
      }
      this.props.isUpdateData(updateData);
      this.setState({OrganizationName: ''})
    }
    if(this.props.data.type == "merge"){
      let updateData = {
        data : this.props.data,
        OrganizationName : this.state.OrganizationName 
      }
      this.props.isUpdateData(updateData);
      this.setState({OrganizationName: ''})
    }
  }
 
  componentWillMount() {
      
    if(this.props.data.type == "rename"){

      this.setState({OrganizationName: this.props.data.organization})
    }
  }
  handleChange = (e) =>{
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    console.log(this.props.data)
   
    return (
      <div style={this.props.isVisible2} className="modal__wrapper ">
         {this.props.isVisible2 ? this.scrollToTop() : null}
        <div className="modal__show delete-confirmation-box" style={{'height':'auto'}}>
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible2({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          {this.props.data.type == "rename" &&
            <React.Fragment>
            <h4>Rename Organization</h4>
              <Form className="mt-2">
                <FormGroup row>
                    <Col sm={12}>
                      <Row>
                        <Col sm={12}>
                          <div class="input-group">
                              <Input className="profile-input" type="text" name="OrganizationName" id="OrganizationName" value={this.state.OrganizationName}  onChange={this.handleChange} placeholder="" />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                </FormGroup>
              </Form>
            </React.Fragment>
          }
          {this.props.data.type == "addOrganization" && 
          <React.Fragment>
            <h4>Add Organization</h4>
            <Form className="mt-2">
              <FormGroup row>
                  
                  <Col sm={12}>
                    <Row>
                      <Col sm={12}>
                        <div class="input-group">
                            <Input className="profile-input" type="text" name="OrganizationName" id="OrganizationName" value={this.state.OrganizationName}  onChange={this.handleChange} placeholder="Organization Name" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
              </FormGroup>
            </Form>
            </React.Fragment>
          }
          {this.props.data.type == "merge" &&
            <React.Fragment>
              <h4>Merge Organization</h4>
              <Form className="mt-2">
                <FormGroup row>
                    <Label for="Organization" sm={12}>Select Organization</Label>
                    <Col sm={12}>
                      <Row>
                        <Col sm={12}>
                          <div class="input-group">
                             <Input className="profile-input" type="select" name="OrganizationName" id="OrganizationName"  onChange={this.handleChange}>
                                  <option value="male">Select</option>
                                {this.props.data.sensorOrgList &&
                                  this.props.data.sensorOrgList.map((org, index) => (
                                    <option value={org.organization} style={this.props.data.selectOrg == org.organization ? {'display':'none'}: {}} >{org.organization}</option>
                                  ))
                                }
                              </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
               </FormGroup>
              </Form>
            </React.Fragment>
          }
          <div className="delete-confirmation-button">
            <button className="btn button-back"  onClick={() => this.props.makeVisible2({ display: 'none' })}>Cencel</button>
            <button className="btn button-yes" onClick={this.hadleApply}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePopup;
