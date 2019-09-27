import React from 'react';

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
              <input
                id="checkbox-1"
                className="checkbox-custom"
                name="athletes"
                type="checkbox"
              />
              Researcher
            </label>

            <input
              id="checkbox-2"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-2" className="checkbox-custom-label">
              Athlete
            </label>

            <input
              id="checkbox-3"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-3" className="checkbox-custom-label">
              Soldier
            </label>

            <input
              id="checkbox-4"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-4" className="checkbox-custom-label">
              Coach
            </label>
            <input
              id="checkbox-5"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              Military Team Leader
            </label>
            <input
              id="checkbox-5"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              Parent
            </label>
            <input
              id="checkbox-5"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              Athletic Trainer
            </label>
            <input
              id="checkbox-5"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              Medic
            </label>
            <input
              id="checkbox-5"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-5" className="checkbox-custom-label">
              Other
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
