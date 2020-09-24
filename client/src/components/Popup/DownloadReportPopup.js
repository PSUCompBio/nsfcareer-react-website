import React from 'react';
import ToggleToken from '../Buttons/ToggleToken';
import { formDataToJson } from '../../utilities/utility';

import { deleteItem } from '../../apis';

import Spinner from './../Spinner/Spinner';


var USER_TYPES = [];

class DownloadReportPopup extends React.Component {
  constructor() {
    super();
    this.state = {
        user_types : [],
        first_name : '',
        last_name : '',
        email : '',
        isRequesting : false
    };

  }
  // Function to update the array holding type of user

  scrollToTop(){
    //  window.scrollTo(0, 0)
  }
  componentWillUnmount() {
      
    }
  render() {
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
         {this.props.isVisible ? this.scrollToTop() : null}
        <div className="modal__show download-report-box">
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          <div className="popu-body">
            <h2>Select Injury Metric</h2>
            <p>Select all that apply</p>
            <table>
              <tbody>
                <tr>
                  <td><input type="checkbox"/></td>
                  <td>MPS95</td>
                </tr>
                <tr>
                  <td><input type="checkbox"/></td>
                  <td>CSDM<sub>15</sub></td>
                </tr>
                <tr>
                  <td><input type="checkbox"/></td>
                  <td>Axonal Strain<sub>15</sub></td>
                </tr>
                <tr>
                  <td><input type="checkbox"/></td>
                  <td>MASxSR<sub>15</sub></td>
                </tr>
              </tbody>
            </table>
            <div className="report-download-buttons">
              <button>Share</button><br/>
              <button>Download</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DownloadReportPopup;
