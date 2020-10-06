import React from 'react';
import Report from '../../ReportContent/ReportAxonalStrain15';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import $ from 'jquery';
var USER_TYPES = [];

class DownloadReportAxonalStrain15 extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };

  }



  render() {
    console.log("REPORT DATA", this.props.jsonfile);
    return (
      <>
        <PDFDownloadLink document={<Report {...this.props.Report} Metric={this.props.Metric} jsonfile={this.props.jsonfile}/>} className="export-cumulative-player" fileName={this.props.fileName} style={{
          color: 'white'
          }}>
           <button>  Download</button>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </>
    );
  }
}

export default DownloadReportAxonalStrain15;
