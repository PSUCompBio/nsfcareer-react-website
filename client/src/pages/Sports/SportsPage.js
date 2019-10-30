import React from 'react';
import { uploadModelRealData } from '../../apis';
import { Button, Modal, Table } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Chart from 'react-google-charts';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLB from './american_football_player.glb';
import ArrowGLB from './american_football_playe_with_vectorr.glb';
import './sports.css';
import { getStatusOfDarkmode } from '../../reducer';

let obj;
let stage = 0;
let oldx = 0;
let pointArray = [
					[
						['Time (ms)', 'Linear Acceleration'],
					 	[0, 0],
					 	[20, 15],
					 	[40, 0]
					],
					[
						['Time (ms)', 'Angular Acceleration'],
					 	[0, 0],
					 	[20, 15],
					 	[40, 0]
					],
				];
				
class SportsPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			isLoading: false,
			isModalLoading: false,
			show_graph: 'none',
			dataPoints1: pointArray[0],
			dataPoints2: pointArray[1],
			show_triangular_graph: 'none',
			triangular_graph_text: 'Brain simulation pending',
			show_triangular_graph_block: 'none',
			triangular_graph_text_color: "red",
			triangular_blinking_class: "blinking",
			show_blinking_arrow: 'block',
			show_blinking_arrow_step2: 'none',
			margin_left_trigulated: ''
		};
		
		this.generateGraphs = this.generateGraphs.bind(this);
		this.impactLoading = this.impactLoading.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.handleShowModal = this.handleShowModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	
	componentDidMount() {
		if (getStatusOfDarkmode().status === true) {
		   console.log('dfsdgds')
		   this.refs.h1.style.color = "#fff"
		}
		this.sceneSetup();
		this.loadModel(GLB, 'model');
		this.startAnimationLoop();
		
		let getHeight = document.querySelector('.navbar').clientHeight;
		document.querySelector(".sports_container").style.marginTop = getHeight + 'px' ;
	}
	
	handleShowModal = () => {
		this.setState({
			show_blinking_arrow: 'none',
			show_blinking_arrow_step2: 'block',
			margin_left_trigulated: 'margin_left_trigulated'
		});
		
		this.setState({
			modalShow: true
		});
	}
	
	handleCloseModal = () => {
		this.setState({
			modalShow: false
		});
	}
	
	onChangeHandler = (event) => {
		var fileInput = document.getElementById('file');
		var filePath = fileInput.value;
		var allowedExtensions = /(\.csv|\.xlsx|\.xls|\.CSV)$/i;
		if(!allowedExtensions.exec(filePath)){
			alert('Please upload file having extensions .csv or .xls or .xls only.');
			fileInput.value = '';
			return false;
		} 
		
		const data = new FormData();
		data.append('file', event.target.files[0]);
		
		this.setState({
			modalShow: false,
			isModalLoading: false
		});
		
		/*this.setState({
			isModalLoading: true
		});
	
		uploadModelRealData(data)
			.then((response) => {
				
				const dataPointsLinear = [];
				dataPointsLinear.push(['Time (ms)', 'Pressure (PSI)']);
				
				const dataPointsAngular = [];
				dataPointsAngular.push(['Time (ms)', 'Pressure (PSI)']);
							
				var results = response.data;
				
				for (var result in results) {
					
					const arr1 = [];
					arr1.push(results[result]['time_msec']);
					arr1.push(results[result]['linear_acceleration']);
					dataPointsLinear.push(arr1);
					
					const arr2 = [];
					arr2.push(results[result]['time_msec']);
					arr2.push(results[result]['angular_acceleration']);
					dataPointsAngular.push(arr2);
				}
				
				this.setState({
					dataPoints1: dataPointsLinear,
					dataPoints2: dataPointsAngular,
					modalShow: false,
					isModalLoading: false
				});
				
			})
			.catch((err) => {
				alert('Error: ' + err);
				this.setState({
					isModalLoading: false
				});
			});*/
	}
  
	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = window.innerWidth;
		const height = window.innerHeight;
		
		const canvas = document.querySelector('#sport_model_block');
		
		this.renderer = new THREE.WebGLRenderer({canvas, antialias:true});
		this.renderer.gammaOutput = true;
		this.renderer.gammaFactor = 2.2;

		this.scene = new THREE.Scene();
		//this.scene.background = new THREE.Color( 0x8FBCD4 );
		this.scene.background = new THREE.Color( "rgb(229, 229, 229)" );

		var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		this.scene.add( light );
		
		light = new THREE.DirectionalLight( 0xffffff );
		this.scene.add( light );

		this.camera = new THREE.PerspectiveCamera( 25, width / height, 1, 1000 );
		this.camera.position.set(0, 0, 4.8);
			
	    // prepare controls (OrbitControls)
		this.controls = new OrbitControls(this.camera, canvas);
		//this.controls.autoRotate = true;
		this.controls.minPolarAngle = Math.PI * 0.5;
		this.controls.maxPolarAngle = Math.PI * 0.5;
		
		// to disable zoom
		this.controls.enableZoom = false;

		// to disable rotation
		//this.controls.enableRotate = false;
		
		//this.controls.minDistance = 2;
		//this.controls.maxDistance = 10;
	};
  
	loadModel = (model, type) => {
		const scene  = this.scene;
		const me  = this;
		var loader = new GLTFLoader();
		
		this.setState({
			isLoading: true
		});
		
		// Load a glTF resource
		loader.load(
			// resource URL
			model,
			// called when the resource is loaded
			function ( gltf ) {
				
				scene.remove( obj );
				
				gltf.scene.position.x = 0;
				gltf.scene.position.y = 0;
				gltf.scene.position.z = 0;
				
				scene.add( gltf.scene );
				
				obj = gltf.scene;
				
				me.setState({
					isLoading: false
				});
				
				if (type === 'arrow') {
					me.setState({
						show_graph: 'block'
					});
				}
			},
			// called while loading is progressing
			function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				
				me.setState({
					isLoading: false
				});
				
				alert( 'An error happened' );
				console.log( error );
			}
		);
	};

	startAnimationLoop = () => {
		if (this.resizeRendererToDisplaySize(this.renderer)) {
			const canvas = this.renderer.domElement;
			this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
			this.camera.updateProjectionMatrix();
		}
		
		this.renderer.render(this.scene, this.camera);

		// The window.requestAnimationFrame() method tells the browser that you wish to perform
		// an animation and requests that the browser call a specified function
		// to update an animation before the next repaint
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	resizeRendererToDisplaySize = (renderer)  => {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			this.renderer.setSize(width, height, false);
		}
		return needResize;
    }

	generateGraphs = () => {
		
		this.setState({
			show_blinking_arrow: 'none',
			show_blinking_arrow_step2: 'block',
			margin_left_trigulated: 'margin_left_trigulated'
		});
		
		
		pointArray[0] = pointArray[0].map(function(element) {
			return element = element.map(function(element1) {
				if (!isNaN(element1))
				return element1*1.01;
				else
				return element1;
			});
		});
		
		pointArray[1] = pointArray[1].map(function(element) {
			return element = element.map(function(element1) {
				if (!isNaN(element1))
				return element1*1.01;
				else
				return element1;
			});
		});
				
		const dataPoints1 = pointArray[0];
		const dataPoints2 = pointArray[1];
		
		this.setState({
			dataPoints1: dataPoints1,
			dataPoints2: dataPoints2
		});
	}
	
	impactLoading = () => {
		console.log("Hello here");
		this.setState({
			show_triangular_graph: 'inline-block',
			show_blinking_arrow_step2: 'none',
			margin_left_trigulated: ''
		});
		
		const timer = setTimeout(() => {
			this.setState({
				triangular_graph_text: 'Brain simulation completed',
				show_triangular_graph_block : 'block',
				triangular_graph_text_color : 'green',
				triangular_blinking_class : '',
			});
		}, 6000);
		
		this.loadModel(ArrowGLB, 'arrow');
	}
	
	render() {
		const graph1Options = {		
		
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Linear Acceleration", titleTextStyle: {
				color: '#000000'
			}},
			//backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			colors: ['#007bff']
		};
		
		const graph2Options = {
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Angular Acceleration", titleTextStyle: {
				color: '#000000'
			}},
			//backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			colors: ['#007bff']
		};
				
		return (
		  <React.Fragment>
			<div className="sports_container align-center__about-page">
				<div className="row section_block">
					 <div className="model_container section_block col-md-8 col-sm-8 padding-about__page1 text-center ">
						<div className={`section-title animated zoomIn`}>
							<h1 ref="h1" className="font-weight-bold">ImpactFX Simulator</h1>
						</div>
						<div className="row" id="sports_canvas_container" >
							<div className="col-md-7 col-sm-7">
								<canvas id="sport_model_block" />
								{this.state.isLoading ? (
								<div className="model_loader d-flex justify-content-center center-spinner">
									<div
									  className="spinner-border text-primary"
									  role="status"
									>
									  <span  className="sr-only">Loading...</span>
									</div>
								 </div>
								) : null}
							</div>
							
							<div className="col-md-5 col-sm-5 chart_container">
								<div className="row">
									<div className="col-sm-12 cu-margin-top">
										<Chart
											chartType="AreaChart"
											data={this.state.dataPoints1}
											options={graph1Options}
											rootProps={{ 'data-testid': '1' }}
										/>
									</div>
									<div className="col-sm-12 cu-margin-top">
										<Chart
											chartType="AreaChart"
											data={this.state.dataPoints2}
											options={graph2Options}
											rootProps={{ 'data-testid': '2' }}
										/>
									</div>
								</div>
							</div>
						</div>
						
						<div className="row">
							<div style={{ display: this.state.show_triangular_graph_block }} className="animated zoomIn brain_section cu-align-center">
								<h1 ref="h1" className="font-weight-bold">Brain Simulation Results</h1>
								<div className="brain-image-container" >
									<img ref="dashboardView"
									className="img-fluid"
									src="/img/brain_image_for_triangulated_loading.png"
									alt=""
									/>
								</div>
							</div>
						</div>
						
					</div>
					<div className="col-md-4 col-sm-4 padding-about__page1">
						<div className="create_data_block">
							<h2>STEP 1: Create Data</h2>
							<div className="sub_block">
								<div className="create_dat_button_outer">
								<button type="submit" className="custom_btn btn btn-primary" onClick={this.generateGraphs}>Generate Example Demo Data</button>
									<span>OR</span>
									<button type="button" onClick={this.handleShowModal} className="custom_btn btn btn-primary" >Upload Real Data</button>
								</div>
								<div className="blink_arrow active blink_arrow-right  arrow_img animate-right-to-left" style={{ display: this.state.show_blinking_arrow }}></div>
							</div>
						</div>
						<div className="analyze_data_block">
							<h2>STEP 2: Analyze Data</h2>
							<div className="sub_block">
								<div className="analyze_button_outer">
									<div className="blink_arrow active blink_arrow-right arrow_img_step2 animate-right-to-left" style={{ display: this.state.show_blinking_arrow_step2 }}></div>
									<button type="submit" className={ "custom_btn btn btn-primary " + this.state.margin_left_trigulated } onClick={this.impactLoading}>Apply Impact Loading</button>
								</div>
								<div className="blast_block">
									<span>Max Linear Acceleration: </span>
									<span className="result_txt">50 G</span>
								</div>
								<div className="blast_block">
									<span>Max Angular Acceleration: </span>
									<span className="result_txt">5000 rad/S<sup>2</sup></span>
								</div>
								<div className="loading_block">
									<span>Loading Direction On Head: </span>
									<span className="result_txt">(0.2, 0.34, 0.65)</span>
								</div>
								<div className="cu-margin-bottom" style={{ display: this.state.show_triangular_graph }}>
									<span className={ this.state.triangular_blinking_class+" "+this.state.triangular_graph_text_color}>{ this.state.triangular_graph_text }</span>
								</div>
							</div>
						</div>
						<div style={{ display: this.state.show_triangular_graph_block }} className="section_block animated zoomIn ">
						<div className="brain_result_block">
							<h2>STEP 3: Report Brain Simulation Result</h2>
							<div className="sub_block">
								<div className="brain_button_outer">
									<button type="button" className="custom_btn btn btn-primary" >Export and Download Brain Simulation Result</button>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
				
			 </div>
			 <Modal
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				backdrop="static"
				show={this.state.modalShow}
				onHide={this.handleCloseModal}
				>
					<Modal.Header closeButton>
							<Modal.Title id="sport_contained-modal-title-vcenter">
							Upload Sensor Data
							</Modal.Title> 
					</Modal.Header>
					<Modal.Body>
						<h5>The following sensor data formats are accepted:</h5>
						<div className="row sensor_logo_blk">
							<div className="col-md-4 col-sm-4 margin-btm text-center">
								<img src="./img/prevent_biometrics.png" />
							</div>
							<div className="col-md-4 col-sm-4 margin-btm text-center">
								<img src="./img/sisu.png" />
							</div>
							<div className="col-md-4 col-sm-4 margin-btm text-center">
								<img src="./img/opro.png" />
							</div>
						</div>
						<div className="upload_file_block">
							<input type="file" id="file" name="file" accept=".csv,.xlsx,.xls" onChange={this.onChangeHandler} />
						</div>
						<div className="cpm_block">
							<p><b>Are you a sensor company?</b></p>
							<p>Our API is available that can be readily incorporated into your own platform.</p>
							<p><a href="#" target="_blank">Read More Here</a></p>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleCloseModal}>Close</Button>
					</Modal.Footer>
					{this.state.isModalLoading ? (
					<div className="modal_loader d-flex justify-content-center center-spinner">
						<div
						  className="spinner-border text-primary"
						  role="status"
						>
						  <span  className="sr-only">Loading...</span>
						</div>
					 </div>
					) : null}
				</Modal>
			<Footer />
		  </React.Fragment>
		);
	}
}

export default SportsPage;
