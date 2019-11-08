import React from 'react';
import ToggleToken from './Buttons/ToggleToken';
class GetUpdates extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
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
                <ToggleToken buttonText="Researcher"/>

            </label>


            <label htmlFor="checkbox-2" className="checkbox-custom-label">
                <ToggleToken buttonText="Athlete"/>
            </label>


            <label htmlFor="checkbox-3" className="checkbox-custom-label">
              <ToggleToken buttonText="Soldier"/>
            </label>

            <label htmlFor="checkbox-4" className="checkbox-custom-label">
              <ToggleToken buttonText="Coach"/>

            </label>


            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              <ToggleToken buttonText="Military Team Leader"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

              <ToggleToken buttonText="Parent"/>

            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">
                <ToggleToken buttonText="Athletic Trainer"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

              <ToggleToken buttonText="Medic"/>
            </label>

            <label htmlFor="checkbox-5" className="checkbox-custom-label">

                <ToggleToken buttonText="Other"/>
            </label>
          </div>
          <div className="row pl-5 pr-5">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="col-sm-12 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />

              <button type="btn" className="btn btn-block btn-success mt-3">
                Get Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetUpdates;
