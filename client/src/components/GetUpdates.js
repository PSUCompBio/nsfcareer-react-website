import React from 'react';
import ToggleToken from './Buttons/ToggleToken';
import { formDataToJson } from '../utilities/utility';

import { getUpdatesAndNotifications } from '../apis';

import Spinner from './Spinner/Spinner';


var USER_TYPES = [];

class GetUpdates extends React.Component {
  constructor() {
    super();
    this.state = {
        user_types : [],
        first_name : '',
        last_name : '',
        email : '',
        isRequesting : false
    };
    this.updateUserType = this.updateUserType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Function to update the array holding type of user
  updateUserType(userType) {
      console.log("BEFORE UPDATE ARRAY IS",USER_TYPES);
      if(USER_TYPES.indexOf(userType)>-1){
          // Remove the value from array
          USER_TYPES = USER_TYPES.filter(function(value, index, arr){
              return value != userType;
          });
      }
      else{
          // Add the value to array
          USER_TYPES.push(userType);
      }
      console.log("AFTER UPDATE ARRAY IS",USER_TYPES);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJsonData = formDataToJson(formData);
    const obj = JSON.parse(formJsonData);
    obj["user_type"] = USER_TYPES ;
    getUpdatesAndNotifications(obj)
    .then(response => {
        this.setState({
          isRequesting: false
        });
        console.log(response.data);
        this.clearUserTypeArray();
        if (response.data.message === 'success') {
          alert("Thank You, Our Experts will contact you shortly. You can close the dialog!")
        } else {
          // show error
          alert("Failed to subscribe!");
        }
    })
    .catch(err => {
        console.log(err);
        alert("Internal Server Error !");
    })

    console.log(obj);


    }
    scrollToTop(){
      //  window.scrollTo(0, 0)
    }
  clearUserTypeArray(){
      USER_TYPES = [];
  }

  componentWillUnmount() {
      this.clearUserTypeArray();
    }
  render() {
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
          {this.props.isVisible ? this.scrollToTop() : null}
        <div className="modal__show modal_form">
          <img
            className="delete__icon"
            onClick={() => this.props.makeVisible({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />

          <h4 className="play-title">TRANSFORM YOUR SENSOR DATA</h4>
          <p>
            Learn more about how you can use brain simulations to add value to
            your monitoring data.
          </p>


          <h5>Who are you?</h5>
          <div className="checkboxes">
            <label htmlFor="checkbox-1" className="checkbox-custom-label">
                <ToggleToken updateUserType={this.updateUserType} buttonText="Researcher"/>

            </label>


            <label htmlFor="checkbox-2" className="checkbox-custom-label">
                <ToggleToken updateUserType={this.updateUserType} buttonText="Athlete"/>
            </label>


            <label htmlFor="checkbox-3" className="checkbox-custom-label">
              <ToggleToken updateUserType={this.updateUserType} buttonText="Soldier"/>
            </label>

            <label htmlFor="checkbox-4" className="checkbox-custom-label">
              <ToggleToken updateUserType={this.updateUserType} buttonText="Coach"/>

            </label>


            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              <ToggleToken updateUserType={this.updateUserType} buttonText="Military Team Leader"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

              <ToggleToken updateUserType={this.updateUserType} buttonText="Parent"/>

            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">
                <ToggleToken updateUserType={this.updateUserType} buttonText="Athletic Trainer"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

              <ToggleToken updateUserType={this.updateUserType} buttonText="Medic"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

                <ToggleToken updateUserType={this.updateUserType} buttonText="Other"/>
            </label>
          </div>
          <form onSubmit={this.handleSubmit}>
          <div className="row pl-5 pr-5">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="First name"
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Last name"
                required
              />
            </div>
            <div className="col-sm-12 mt-3">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email address"
                required
              />

          <button type="submit" className="btn btn-block btn-success mt-3">
                Get Updates
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default GetUpdates;
