import React from 'react';
import Report from '../../ReportContent/ReportMPS95';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import $ from 'jquery';
var USER_TYPES = [];

class DownloadReportMPS95 extends React.Component {
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

export default DownloadReportMPS95;
