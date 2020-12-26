import React from 'react';
import Report from '../../ReportContent/Report0';
import { PDFDownloadLink } from '@react-pdf/renderer';


class DownloadReportCSDM15 extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };

  }



  render() {
    console.log("REPORT DATA", this.props.jsonfile);
    return (
      <>
      {this.props.jsonfile && 
        <PDFDownloadLink document={<Report {...this.props.Report} Metric={this.props.Metric} jsonfile={this.props.jsonfile}/>} className="export-cumulative-player" fileName={this.props.fileName} style={{
          color: 'white'
          }}>
           <button>  Download</button>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      }
      </>
    );
  }
}

export default DownloadReportCSDM15;
