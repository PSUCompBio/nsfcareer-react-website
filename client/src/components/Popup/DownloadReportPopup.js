import React from 'react';
import ToggleToken from '../Buttons/ToggleToken';
import { formDataToJson } from '../../utilities/utility';
import { deleteItem } from '../../apis';
import Spinner from './../Spinner/Spinner';
import share_icon from '../icons/share_icon.png';
import Report from '../ReportContent/Report0';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
var USER_TYPES = [];

class DownloadReportPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      mps_95:'',
      csdm_15:'',
      axonal_15: '',
      masxsr_15: ''
    };

  }

  scrollToTop(){
  }
  componentWillUnmount() {
      
  }
  handleChange =(e)=>{
    console.log(e.target.name,!this.state[e.target.name] ? e.target.value :'' );
    this.setState({[e.target.name]: !this.state[e.target.name] ? e.target.value :'' });
  }
  render() {
    console.log("propsData 2", this.props.Report);
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
         {this.props.isVisible ? this.scrollToTop() : null}
        <div className="download-report-box">
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
                  <td><input name="mps_95" type="checkbox" onChange={this.handleChange}/></td>
                  <td>MPS95</td>
                </tr>
                <tr>
                  <td><input name="csdm_15" type="checkbox" onChange={this.handleChange}/></td>
                  <td>CSDM<sub>15</sub></td>
                </tr>
                <tr>
                  <td><input name="axonal_15" type="checkbox" onChange={this.handleChange}/></td>
                  <td>Axonal Strain<sub>15</sub></td>
                </tr>
                <tr>
                  <td><input name="masxsr_15" type="checkbox" onChange={this.handleChange}/></td>
                  <td>MASxSR<sub>15</sub></td>
                </tr>
              </tbody>
            </table>
            <div className="report-download-buttons">
              <button><img src={share_icon} style={{width:'24px'}}/>  Share</button><br/>
              
                <PDFDownloadLink document={<Report {...this.props.Report} Metric={this.state}/>} className="export-cumulative-player" fileName={this.props.fileName} style={{
                        color: 'white'
                    }}>
                     <button>  Download</button>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                    </PDFDownloadLink>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DownloadReportPopup;
