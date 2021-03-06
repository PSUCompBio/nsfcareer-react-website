import React from 'react';

import share_icon from '../icons/share_icon.png';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Container, DropdownButton, Dropdown, Button, Table } from 'react-bootstrap';
// import "react-datepicker/dist/react-datepicker.css";
import Report from '../ReportContent/ExportCustomReport';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import {
  filterStrainMetric
} from '../../apis';

class DownloadReportPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      mps_95:'',
      csdm_15:'',
      axonal_15: '',
      masxsr_15: '',
      ischecked: true,
      isDownloadenable: false,
      startDate: new Date(),
      endDate: new Date(),
      selectedItem: 'All Time',
      merticsImage: '',
      brand: '',
      user_cognito_id: '',
      organization: '',
      player_id: '',
      team : ''
    };

  }

  scrollToTop(){
  }
  componentDidMount() {


  }

  downFullImage = () => {
    let title = 'Maximum Principal Strain'
    let canvas = document.querySelector("#c");
    const c = document.createElement('canvas');
    c.width = 930;
    c.height = 350;
    let width = canvas.width;
    let height = canvas.height ;
    const plotCanvas = document.querySelector(".chartjs-render-monitor");
    console.log("plotcanvas", canvas.width, canvas.height)
    c.getContext('2d').font = "20px Arial";
    // c.getContext('2d').fillText('Location of ' + title, 300, 37);
    c.getContext('2d').drawImage(canvas, 0, 0, width , height, 0, 0, 400, 250);
    c.getContext('2d').drawImage(plotCanvas, 0, 0, plotCanvas.width, plotCanvas.height , 400, 0, 500, 230);
    let dc = c.toDataURL();
   
    // var link = document.createElement("a");
    // link.download = "full_image.png";
    // link.href = dc;
    // link.target = "_blank";
    // link.click();
    // return dc;
    this.setState({merticsImage: dc});
    //  console.log('dc',dc)
    // return dc;
    // var the = this;
    // htmlToImage.toPng(document.getElementById('my-event-image'))
    // .then(function (dataUrl) {
    //   // console.log(dataUrl, 'my-node.png');

    // });
  }


	handleChange =(e)=>{
		this.setState({ischecked: false})
		this.downFullImage();
		// console.log("namevalue",e.target.name,!this.state[e.target.name] ? e.target.value :'' );
		this.setState({[e.target.name]: !this.state[e.target.name] ? e.target.value :'' });
		let the = this;
		setTimeout(()=>{    
		if(the.state['mps_95'] == 'on'){
			console.log("mps_95", the.state['mps_95']);
			the.setState({isDownloadenable: true});
			the.setState({ischecked: true});
		}else if(the.state['csdm_15'] == 'on'){
			console.log("csdm_15", the.state['csdm_15']);
			the.setState({isDownloadenable: true});
			the.setState({ischecked: true});
		}else{
			the.setState({isDownloadenable: false});
			the.setState({ischecked: true});
		}
		},1000)
	}

  filterStrainMetric=()=>{
    const { brand, user_cognito_id, organization, player_id, team } = this.props.data.data;
    console.log('data',this.props.data.data)
    // if(data){
    //   this.setState({
    //     brand: data.brand,
    //     user_cognito_id: data.user_cognito_id,
    //     organization: data.organization,
    //     player_id: data.player_id,
    //     team : data.team
    //   })
    // }
    filterStrainMetric({ brand: brand, user_cognito_id: user_cognito_id, organization: organization, player_id: player_id, team: team })
    .then(res=>{
      console.log('res',res);
    }).catch(err=>{
      console.log('err',err)
    })
  }

  render() {
    console.log("propsData 3", this.props);
    const { startDate, endDate, selectedItem, ischecked } = this.state;
    console.log('ischecked',ischecked)
    let fileName = "unknown.pdf";
    if(this.props.data.data){
      fileName = this.props.data.data.player['first-name']+'_'+this.props.data.data.player['last-name']+'_'+this.props.data.data.org_id.split('-')[1]+'.pdf';
    }

    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
        
        <div className="download-custom-report-box">
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />
          <Row className="head">
            <Col md={12} lg={12}>
              {/*<h2>Select Dates</h2>*/}
              
            </Col>
            <Row className="datepickers">
              <Col md={3}>
                <p
                  style={{
                    'font-size': '20px',
                    'font-weight': '600'
                  }}
                >
                Select Dates
                </p>
              </Col>
              <Col md={3} style={{'text-align': 'left'}}>
                <DropdownButton id="dropdown-basic-button" title={selectedItem}>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Today'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Today</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Yesterday'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Yesterday</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Last 7 Days'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Last 7 Days</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Last 30 Days'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Last 30 Days</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'This Month'})} style={{'pointer-events': 'none','opacity': '0.5'}}>This Month</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Last Month'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Last Month</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'Custom Range'})} style={{'pointer-events': 'none','opacity': '0.5'}}>Custom Range</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.setState({selectedItem: 'All Time'})}>All Time</Dropdown.Item>

                </DropdownButton>
              </Col>
              {selectedItem === 'Custom Range' && 
                <>
                  <Col md={3}>
                    <DatePicker 
                      selected={startDate} 
                      onChange={(date) => this.setState({startDate: date})} 
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </Col>
                  <Col md={3}>
                    <DatePicker 
                      selected={endDate} 
                      onChange={(date) => this.setState({endDate: date})} 
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </Col>
                </>
              }
              {selectedItem !== 'Custom Range' && 
                <>
                  {/*<Col md={2}>
                    <Button variant="success" onClick={this.filterStrainMetric}>APPLY</Button>
                  </Col>
                  <Col md={2}>
                    <Button variant="secondary">CANCEL</Button>
                  </Col>*/}
                </>
              }
            </Row>
            <Row className="datepickers">
              <Col md={3}>
              </Col>
              {selectedItem === 'Custom Range' && 
                <>
                  <Col md={2} style={{'text-align': 'left'}}>
                    <Button variant="success" onClick={this.filterStrainMetric}>APPLY</Button>
                  </Col>
                  <Col md={2} style={{'text-align': 'left'}}>
                    <Button variant="secondary">CANCEL</Button>
                  </Col>
                </>
              }

            </Row>
          </Row>
          <Row style={{'width':'100%','color': 'black'}}>
              <Col md={3}>
                <p className="select-metric-h">
                Select Strain Metric
                </p>
              </Col>
              <Col md={9} className="select-metric-container">
                <p>Select all that apply</p>
                 <Table >
                  <tbody>
                    <tr>
                      <td><input name="mps_95" type="checkbox" onChange={this.handleChange}/></td>
                      <td>MPS</td>
                      <td><input name="csdm_15" type="checkbox" onChange={this.handleChange} /></td>
                      <td>CSDM<sub>15</sub></td>
                    </tr>
                    <tr>
                      <td><input name="axonal_15" type="checkbox" onChange={this.handleChange} disabled/></td>
                      <td style={{'color': '#b3b3b3'}}>Axonal Strain<sub>15</sub></td>
                      <td><input name="masxsr_15" type="checkbox" onChange={this.handleChange} disabled/></td>
                      <td style={{'color': '#b3b3b3'}}>MASxSR<sub>15</sub></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
          </Row>
            <Row style={{'width':'100%','color': 'black'}}>
              <Col md={3}>
              </Col>
              <Col md={4}>
                <button className="Download-button-custom-report " style={{'margin-top': '6px'}}><img src={share_icon} style={{width:'24px'}} alt="share_icon" />  Share</button><br/>
              </Col>
              <Col md={4}>
				  {this.state.isDownloadenable ?
				  <>
					{ischecked &&
					  <PDFDownloadLink document={<Report Metric={this.state} jsonfile={this.props.data.brainRegions} data={this.props.data.data} />} className="export-cumulative-player" fileName={fileName} style={{
						color: 'white'
						}}>
						  <button className="Download-button-custom-report" style={{'margin-top': '6px'}}>Download</button>
						{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
					  </PDFDownloadLink>
					}
					 {!ischecked ? (
						  <div className="d-flex justify-content-center center-spinner">
							<div
							  className="spinner-border text-primary"
							  role="status"
							>
							  <span className="sr-only">Loading...</span>
							</div>
						  </div>
						) : null}
					</>
					:
					<>
					{ischecked &&
					 <button className="Download-button-custom-report" style={{'margin-top': '6px','opacity': '0.7'}}>Download</button>
					 }
					  {!ischecked ? (
						  <div className="d-flex justify-content-center center-spinner">
							<div
							  className="spinner-border text-primary"
							  role="status"
							>
							  <span className="sr-only">Loading...</span>
							</div>
						  </div>
						) : null}
					 </>
				  }
               
              </Col>
            </Row>
        </div>
      </div>
    );
  }
}

export default DownloadReportPopup;
