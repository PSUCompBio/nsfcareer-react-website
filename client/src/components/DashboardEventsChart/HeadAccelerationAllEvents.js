import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import simulationLoading from '../simulationLoading.png';
// import Report from '../ReportContent/Report0';
import DownloadReportPopup from '.././Popup/DownloadReportPopup';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import {
    getSimulationDetail,getUserDataByPlayerID,getBrainImageByimageID,getAllBrainImageByimageID,
  } from '../../apis';
const options = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    fill: false,

    legend: {
        display: false
    },
    plugins: {
        datalabels: {
            // hide datalabels for all datasets
            display: false
        }
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Linear Acceleration (Gs)'
            },
            id: 'A',
            position: 'left',
           
        }, {
            scaleLabel: {
                display: true,
                labelString: 'Angular Acceleration (rad/s2)'
            },
            id: 'B',
            position: 'right',
            ticks: {
                //min: 0
            }
        }],
        xAxes: [{

            scaleLabel: {
                display: true,
                labelString: 'Time (ms)'
            }
        }]
    }
};
let isPageloaded = false
class HeadAccelerationAllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplay: { display: 'none' },
            simulationData: '',
            Brainimages: '',
            data: {
                labels: this.props.data.time,
                fill: false,
                datasets: [{
                    lineTension: 0.1,
                    label: "X Linear Acceleration",
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    yAxisID: 'A',
                    fill: false,
                    pointRadius: 0,
                    data: this.props.data.linear_acceleration['xv'] ? this.props.data.linear_acceleration['xv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Y Linear Acceleration",
                    backgroundColor: '#ff0000',
                    borderColor: '#ff0000',
                    yAxisID: 'A',
                    fill: false,
                    pointRadius: 0,
                    data: this.props.data.linear_acceleration['yv'] ? this.props.data.linear_acceleration['yv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Z Linear Acceleration",
                    backgroundColor: '#00c04a',
                    borderColor: '#00c04a',
                    yAxisID: 'A',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.linear_acceleration['zv'] ? this.props.data.linear_acceleration['zv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "X Angular Acceleration",
                    backgroundColor: '#8000a3',
                    borderColor: '#8000a3',
                    yAxisID: 'B',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.angular_acceleration['xv'],
                }, {
                    lineTension: 0.1,
                    label: "Y Angular Acceleration",
                    backgroundColor: '#ff9a00',
                    borderColor: '#ff9a00',
                    yAxisID: 'B',
                    pointRadius: 0,
                    fill: false,
                    data: this.props.data.angular_acceleration['yv'] ? this.props.data.angular_acceleration['yv'] : [],
                }, {
                    lineTension: 0.1,
                    label: "Z Angular Acceleration",
                    backgroundColor: '#000000',
                    borderColor: '#000000',
                    pointRadius: 0,
                    yAxisID: 'B',
                    fill: false,
                    data: this.props.data.angular_acceleration['zv'] ? this.props.data.angular_acceleration['zv'] : [],
                }]

            },
            dataMaxStrain: {
                labels: this.props.data.time,
                datasets: [{
                    lineTension: 0.1,
                    label: "Max. Strain Vs Time",
                    backgroundColor: '#7CB5EC',
                    borderColor: '#1987DD',
                    data: this.props.data.max_linear_acceleration,
                }]

            },
            is_selfie_simulation_file_uploaded: props.is_selfie_simulation_file_uploaded,
            imageUrl: props.imageUrl,
            buttonType: 'Finite'
        };
    }

    componentDidMount() {
        getSimulationDetail({image_id: this.props.data.sensor_data.image_id})
        .then(response => {
			var playerid = this.props.data.sensor_data.player_id;
			playerid = playerid.split("$");
			getUserDataByPlayerID({ playerid: playerid[0]})
			.then(response1 => {
                if(response.data.data.jsonOutputFile && response.data.data.jsonOutputFile != undefined){
                    response.data.data.jsonOutputFile["playerdata"] =  response1.data.data[0];
                    console.log('playerdata ----\n', response1.data.data[0])
					var imageid = this.props.data.sensor_data.image_id;
					var accountid = response1.data.data[0].account_id;
					getBrainImageByimageID({ accountid: accountid, imageid: imageid})
					.then(imageresponse1 => {
						response.data.data.jsonOutputFile["imagedata"] =  imageresponse1.data.data;
						console.log('jsondata image data ----\n', response.data.data)
						this.setState({
							simulationData: response.data.data,
						});
						let isPageloaded = false
					}) 
                    
                }
			})
            
        })
		var playerid = this.props.data.sensor_data.player_id;
		playerid = playerid.split("$");
		getUserDataByPlayerID({ playerid: playerid[0]})
		.then(response1 => {
			var imageid = this.props.data.sensor_data.image_id;
			var accountid = response1.data.data[0].account_id;
			getAllBrainImageByimageID({ accountid: accountid, imageid: imageid})
			.then(imageresponse1 => {
				console.log('jsondata image data ----\n', imageresponse1.data.data)
				this.setState({
					Brainimages: imageresponse1.data.data,
				});
			})
		})
    }

    static getDerivedStateFromProps (props, state) {
        let temp_data = state.data;
        if (props.linearUnit === 'ms') {
            options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (m/s2)';
            temp_data.datasets[0].data = props.data.linear_acceleration['xv'] ? props.data.linear_acceleration['xv'] : [];
            temp_data.datasets[1].data = props.data.linear_acceleration['yv'] ? props.data.linear_acceleration['yv'] : [];
            temp_data.datasets[2].data = props.data.linear_acceleration['zv'] ? props.data.linear_acceleration['zv'] : [];
        } else {
            options.scales.yAxes[0].scaleLabel.labelString = 'Linear Acceleration (Gs)';
            temp_data.datasets[0].data = props.data.linear_acceleration['xv-g'] ? props.data.linear_acceleration['xv-g'] : [];
            temp_data.datasets[1].data = props.data.linear_acceleration['yv-g'] ? props.data.linear_acceleration['yv-g'] : [];
            temp_data.datasets[2].data = props.data.linear_acceleration['zv-g'] ? props.data.linear_acceleration['zv-g'] : [];
        }
        return {
            data: temp_data
        };
    }
    downloadReport = (e) =>{
        this.setState({DelData: {type: 'team',data:e} })
        if (this.state.isDisplay.display === 'none') {
          this.setState({ isDisplay: {display:'block',background:'transparent'} });
        } else {
          this.setState({ isDisplay: {display:'none',background:'transparent'} });
        }
    }

    makeVisible = (data) => {
        this.setState({ isDisplay: data });
    }

    getDate = (timestamp) => {

        const plus0 = num => `0${num.toString()}`.slice(-2)
      
        const d = new Date(timestamp)
      
        const year = d.getFullYear()
        const monthTmp = d.getMonth() + 1
        const month = plus0(monthTmp)
        const date = plus0(d.getDate())
        
        return `${month}/${date}/${year}`
    }

    tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }
   
    render() {
            console.log(isPageloaded,"propsData 1\n", this.props.status);
            if (this.props.data.sensor_data['impact-time']) {
                let split = this.props.data.sensor_data['impact-time'].split(":");
                this.props.data.sensor_data['impact-time'] = split.slice(0, split.length - 1).join(":");
            }

            if (this.props.data.sensor_data['time']) {
                let split = this.props.data.sensor_data['time'].toString();
                split = split.split(":");
                this.props.data.sensor_data['time'] = split.slice(0, split.length - 1).join(":");
            }
            var fileName = '';
            if(this.props.data.sensor_data.player_id && this.props.data.sensor_data.player_id.length > 0){
                fileName = this.props.data.sensor_data.player['first-name']+'_'+ this.props.data.sensor_data.player['last-name']+'_'+ this.props.data.sensor_data.player_id.split('$')[1];  
            }
            if(!isPageloaded){
              setTimeout(()=>{ isPageloaded = true },1000)  
            }
			console.log("brainImages 1",this.state.Brainimages);
        return (
            <>
            <DownloadReportPopup isVisible={this.state.isDisplay}  makeVisible={(this.props.makeVisible)? this.props.makeVisible : this.makeVisible} Report={this.props} jsonData={this.state.simulationData.jsonOutputFile} fileName={fileName}/>
            <div className="position-relative bg-white">
                <div data-descr={this.props.data.sensor_data['player_id']} className="position-relative pl-2 pr-2">
                    <div className="brain-card-pt-2-5 row pl-4 pr-4 pb-4 dark-bg text-center ">
                         <div className="div-chart-labels"> 
                            <label className="chart-label label-1"><span></span> X Linear Acceleration</label>
                            <label className="chart-label label-2"><span></span> Y Linear Acceleration</label>
                            <label className="chart-label label-3"><span></span> Z Linear Acceleration</label>
                            <label className="chart-label label-4"><span></span> X Angular Acceleration</label>
                            <label className="chart-label label-5"><span></span> Y Angular Acceleration</label>
                            <label className="chart-label label-6"><span></span> Z Angular Acceleration</label>
                            
                        </div>
                        <div className="Individual-Head-Acceleration-player-dash-chart">
                        {/*eslint-disable-next-line*/}
                            <Line id="goodCanvas1"  data={this.state.data} options={options} redraw={true} aria-label="Cumulative Overview of All Events" role="chart"/>
                        </div>
                        <div className="Individual-Head-Acceleration-player-dash-image   ">
                            <div className="col-md-12">
                                <div>
                                    {/*
                                        <div className="loader">
                                            <p>Brain Simulation <br/> Pending...</p>
                                        </div>
                                    */}
                                   <div style={{'display': 'inline-flex','width': '100%'}}>
									   { /*<button className={this.state.buttonType === "Machine" ? "btn btn-primary player-dashboard-machinelearning-button settings-buttons-active" : "btn btn-primary player-dashboard-machinelearning-button"} onClick={()=>this.setState({buttonType:"Machine" })}>Machine Learning</button> */ }
                                    <button className={this.state.buttonType === "Finite" ? "btn btn-primary  settings-buttons-active" : "btn btn-primary"} style={{'margin-left':'1%'}} onClick={()=>this.setState({buttonType:"Finite" })}>Finite Element Modeling</button>
                                   </div>    
								   {this.sliderImages1}								   
										{this.state.Brainimages ?
										
											<div class={"branimage"}>
											<Carousel class={"branimage"}>	
										{this.state.Brainimages.CSDM_5 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.CSDM_5} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.CSDM_10 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.CSDM_10} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.CSDM_15 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.CSDM_15} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.CSDM_30 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.CSDM_30} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.MPS_95 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.MPS_95} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.MPSR_120 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.MPSR_120} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.MPSxSR_28 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.MPSxSR_28} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.MPSxSR_95 != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.MPSxSR_95} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.axonal_strain_max != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.axonal_strain_max} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.masXsr_15_max != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.masXsr_15_max} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.maximum_PSxSR != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.maximum_PSxSR} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.principal_min_strain != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.principal_min_strain} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.principal_max_strain != "Image not found" ?
											<Carousel.Item><img className={`img-fluid ${'svg'}`} width="100%" height="60%" src={this.state.Brainimages.principal_max_strain} alt="" /></Carousel.Item>
										: null
										}
										{this.state.Brainimages.CSDM_5 == "Image not found" && this.state.Brainimages.CSDM_10 == "Image not found" && this.state.Brainimages.CSDM_15 == "Image not found" && this.state.Brainimages.CSDM_30 == "Image not found" && this.state.Brainimages.MPS_95 == "Image not found" && this.state.Brainimages.MPSR_120 == "Image not found" && this.state.Brainimages.MPSxSR_28 == "Image not found" && this.state.Brainimages.MPSxSR_95 == "Image not found" && this.state.Brainimages.axonal_strain_max == "Image not found" && this.state.Brainimages.masXsr_15_max == "Image not found" && this.state.Brainimages.maximum_PSxSR == "Image not found"  && this.state.Brainimages.principal_min_strain == "Image not found"  && this.state.Brainimages.principal_max_strain == "Image not found"  ?
										
											<div style={{'width':'100%','height':'200px'}}>
												<p style={{'font-size': '48px','margin-top': '23%'}}> Image not found </p>
											</div>
																				
										:null 
										
										}
											</Carousel>
											</div>
											: 
											<div style={{'width':'100%','height':'200px'}}>
												<i class={"fa fa-spinner fa-spin"} style={{'font-size': '48px','margin-top': '23%'}}></i>
											</div>
										}
                                     {
                                    !this.props.data.sensor_data ?
                                       null

                                     : 
                                    <Link  to={{
                                            pathname: '/Details/'+this.props.data.sensor_data.image_id+'/'+this.props.player_id+'/'+this.props.state.cognito_user_id+'?org='+this.props.organization+'&t='+this.props.team+'&brand='+this.props.brand,
                                            
                                           state:{
                                            state: this.props.state,
                                            data:this.props.data,
					                           simulationImage: this.state.simulationData.simulationImage,
                                           } 

                                        }} target="_blank"><button className="btn btn-primary ">View Details</button></Link>
                                    }
                                    <button className="btn btn-primary " style={{'margin-top': '5px'}} onClick={this.downloadReport}>Export Report
                                    {/*<PDFDownloadLink document={<Report jsonData={this.state.simulationData.jsonOutputFile} {...this.props} />} className="export-cumulative-player" fileName={fileName} style={{
                                        color: 'white'
                                    }}>
                                     Export Impact Report
                                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                                    </PDFDownloadLink>*/}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
        
    }
}

export default HeadAccelerationAllEvents;
