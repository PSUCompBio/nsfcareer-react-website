import React from 'react';

class GetUpdates extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
        <div className="modal__show modal_form">
          <img
            className="delete__icon"
            onClick={()=>this.props.makeVisible({display:'none'})}
            src="/img/icon/close.svg"
            alt=""
          />

          <h4 className="play-title">STAND FOR SMART PLAY</h4>
          <p>
            Learn more about outfitting your athletes with the <br /> Prevent
            Impact Monitor Mouthguard (IMM)
          </p>

          <h5>Who are you?</h5>
          <div className="checkboxes">
            <input
              id="checkbox-1"
              className="checkbox-custom"
              name="athletes"
              type="checkbox"
            />
            <label htmlFor="checkbox-1" className="checkbox-custom-label">
              Athlete
            </label>

            <input
              id="checkbox-2"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-2" className="checkbox-custom-label">
              Parent
            </label>

            <input
              id="checkbox-3"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-3" className="checkbox-custom-label">
              Coach
            </label>

            <input
              id="checkbox-4"
              className="checkbox-custom"
              name="Parent"
              type="checkbox"
            />
            <label htmlFor="checkbox-4" className="checkbox-custom-label">
              Athletic Trainer
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
                class="form-control"
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
