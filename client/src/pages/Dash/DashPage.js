import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import brain from './brain.glb';
import modelTexture from './textures/Br_color.jpg';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';
import {Bar} from 'react-chartjs-2';
import './dash.css';


let obj;
let objects = [];
let defaultBarColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
let hoveredElement = '';

var frontal_Lobe_json = require('./Frontal_Lobe.json');
var cerebellum_Lobe_json = require('./Cerebellum_Lobe.json');
var middle_Part_of_the_Brain_json = require('./Middle_Part_of_the_Brain.json');
var Occipital_Lobe_json = require('./Occipital_Lobe.json');
var Pariental_Lobe_json = require('./Pariental_Lobe.json');
var Temporal_Lobe_json = require('./Temporal_Lobe.json');
var Brain_sphere = require('./Brain_sphere.json');

let hightlightMaterial = new THREE.MeshPhongMaterial( {
	color: 0xffff00,
	opacity: 0.5,
	transparent: true
});

let manager = new THREE.LoadingManager();
let textureLoader = new THREE.TextureLoader(manager);

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let INTERSECTED = null;

class DashPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			condition: false,
			isMouseEvent: false,
			barColors: defaultBarColors
		};
	}
	
	componentDidMount() {
		// Scrolling the screen to top
		window.scrollTo(0, 0)

		if (getStatusOfDarkmode().status === true) {
			document.getElementsByTagName('body')[0].style.background = '#171b25';
			for (let i = 1; i <= 8; i++){
				this.refs['h' + i].style.color = '#fff';
			}
		}
		
		this.sceneSetup();
		this.loadModel(brain);
		
		this.startAnimationLoop();
		this.setContainerHeight();
	
		let me = this;
		
		// Highlight brain model on mouse hover on brain model
		document.getElementById("brain_model_block_1").addEventListener('mousemove', function(event) {
			me.onMouseMove(event, '#brain_model_block_1');
		}, false);
		document.getElementById("brain_model_block_2").addEventListener('mousemove', function(event) {
			me.onMouseMove(event, '#brain_model_block_2');
		}, false);
		document.getElementById("brain_model_block_3").addEventListener('mousemove', function(event) {
			me.onMouseMove(event, '#brain_model_block_3');
		}, false);
		document.getElementById("brain_model_block_4").addEventListener('mousemove', function(event) {
			me.onMouseMove(event, '#brain_model_block_4');
		}, false);
		
		// Highlight brain model on mouse hover on brain button
		document.getElementById("front_btn").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Frontal_Lobe');
		}, false);
		document.getElementById("pariental_btn").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Pariental_Lobe');
		}, false);
		document.getElementById("occipital_btn").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Occipital_Lobe');
		}, false);
		document.getElementById("temporal_btn").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Temporal_Lobe');
		}, false);
		document.getElementById("cerebellum_btn").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Cerebellum_Lobe');
		}, false);
		document.getElementById("motor_and_sensor_cortex").addEventListener('mouseover', function(event) {
			me.onMouseHover(event, 'Middle_Part_of_the_Brain');
		}, false);
		
		// Remove Highlight brain model on mouse out from brain button
		document.getElementById("front_btn").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
		document.getElementById("pariental_btn").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
		document.getElementById("occipital_btn").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
		document.getElementById("temporal_btn").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
		document.getElementById("cerebellum_btn").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
		document.getElementById("motor_and_sensor_cortex").addEventListener('mouseout', function(event) {
			me.onMouseOut(event);
		}, false);
	}
	
	onMouseHover = ( event, type ) => {
		
		if (event !== '') event.preventDefault();
		
		objects.forEach(function(object, index) {
						
			if (object.name == type) {
				
				if (object.currentHex == undefined) {
					object.currentHex = object.material;
				}
				
				object.material = hightlightMaterial;
			}
		});
		
		if (event !== '') {
			this.highlightGraphBar(type);
		}
		
		this.createLobeSheres(type);
	}
	
	onMouseOut = ( event ) => {
		
		if (event !== '') event.preventDefault();
		
		objects.forEach(function(object, index) {
			if (object.currentHex != undefined) {
				object.material = object.currentHex;
			}
		});
		
		if (event !== '') {
			let barColors = defaultBarColors;
			
			this.setState({
				barColors: barColors
			});
		}
		
		// Remove prev spheres
		this.removeSpheres();
	}
	
	highlightGraphBar = (type) => {
		let barColors = defaultBarColors;
		
		switch(type) {
			case "Frontal_Lobe":
				barColors = ['rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
				break;
			case "Pariental_Lobe":
				barColors = ['#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
				break;
			case "Occipital_Lobe":
				barColors = ['#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
				break;
			case "Temporal_Lobe":
				barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC']
				break;
			case "Cerebellum_Lobe":
				barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC'];
				break;
			case "Middle_Part_of_the_Brain":
				barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)'];
				break;
		}
		
		this.setState({
			barColors: barColors
		});
	}
  
	setContainerHeight = () => {
		let docHeight = document.body.clientHeight;
		let headerHeight = document.querySelector('.navbar').clientHeight;
		let footerHeight = document.querySelector('.footer').clientHeight;
		let conatainerHeight = parseFloat(docHeight) - parseFloat(headerHeight) - parseFloat(footerHeight);
		document.querySelector(".dash_container").style.minHeight = conatainerHeight + 'px';
	}
	
	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = window.innerWidth;
		const height = window.innerHeight;
		
		const canvas1 = document.querySelector('#brain_model_block_1');
		this.renderer1 = new THREE.WebGLRenderer({antialias:true});
		//this.renderer1.setSize( window.innerWidth, window.innerHeight / 2 );
		this.renderer1.domElement.setAttribute("id", "canvas1");
		canvas1.appendChild( this.renderer1.domElement );
		this.renderer1.gammaOutput = true;
		this.renderer1.gammaFactor = 2.2;
		
		const canvas2 = document.querySelector('#brain_model_block_2');
		this.renderer2 = new THREE.WebGLRenderer({antialias:true});
		this.renderer2.domElement.setAttribute("id", "canvas2");
		canvas2.appendChild( this.renderer2.domElement );
		this.renderer2.gammaOutput = true;
		this.renderer2.gammaFactor = 2.2;
			
		const canvas3 = document.querySelector('#brain_model_block_3');
		this.renderer3 = new THREE.WebGLRenderer({antialias:true});
		this.renderer3.domElement.setAttribute("id", "canvas3");
		canvas3.appendChild( this.renderer3.domElement );
		this.renderer3.gammaOutput = true;
		this.renderer3.gammaFactor = 2.2;
		
		const canvas4 = document.querySelector('#brain_model_block_4');
		this.renderer4 = new THREE.WebGLRenderer({antialias:true});
		this.renderer4.domElement.setAttribute("id", "canvas4");
		canvas4.appendChild( this.renderer4.domElement );
		this.renderer4.gammaOutput = true;
		this.renderer4.gammaFactor = 2.2;
	
		this.scene = new THREE.Scene();
		//this.scene.background = new THREE.Color( 0x8FBCD4 );
		this.scene.background = new THREE.Color( "rgb(255, 255, 255)" );
		
		this.camera = new THREE.PerspectiveCamera( 25, width / height, 0.01, 1000 );
		this.camera.position.set(0, 0, 0.3);

		this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		this.light.position.copy( this.camera.position );
		this.scene.add( this.light );
		
		const ambientLight = new THREE.AmbientLight( 0x404040, 1);
		this.scene.add( ambientLight );
					
	    // prepare controls (OrbitControls)
		this.controls = new OrbitControls(this.camera, canvas1);
		//this.controls.autoRotate = true;
		//this.controls.minPolarAngle = Math.PI * 0.5;
		//this.controls.maxPolarAngle  = Math.PI * 0.5;
		
		this.controls.addEventListener( 'change', this.lightUpdate );
		
		// to disable keyboard keys
		this.controls.enableKeys = false;
		
		// to disable zoom
		//this.controls.enableZoom = false;

		// to disable rotation
		//this.controls.enableRotate = false;
		
		//this.controls.minDistance = 2;
		//this.controls.maxDistance = 10;
	};
	
	onMouseMove = ( event, type ) => {

		// calculate mouse position in normalized device coordinates
		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components
		
		event.preventDefault();
		
		console.log('event: ', event.target.id);
		
		hoveredElement = event.target.id;
		
		if (this.state.isLoading) {
			return false;
		}
		
		this.setState({
			isMouseEvent: true
		});
				
		const canvas = document.querySelector(type);
		
		// returns the size of an element and its position relative to the viewport
		let rect = canvas.getBoundingClientRect();
		
		//console.log('rect: ', rect);

		mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

	}
	
	lightUpdate = () => {
		this.light.position.copy( this.camera.position );
	}
  
	loadModel = (model) => {
		const scene  = this.scene;
		const me  = this;
		
		scene.remove( obj );
		
		me.setState({
			isLoading: true
		});
		
		let loader = new GLTFLoader();
				
		// Load a glTF resource
		loader.load(
			// resource URL
			model,
			// called when the resource is loaded
			function ( gltf ) {
						
				obj = gltf.scene;
				
				obj.traverse(function (child) {
					//console.log('child: ', child);
					if (child.isMesh) {
						objects.push(child);
					}
				});
				
				let map = textureLoader.load(modelTexture);
				map.encoding = THREE.sRGBEncoding;
				//map.flipY = false;
				
				manager.onStart = function () {
					console.log('Loading started');
					me.setState({
						isLoading: true
					});
				};
				
				manager.onLoad = function () {
					console.log('loaded');
					me.setState({
						isLoading: false
					});
					let material = new THREE.MeshPhongMaterial({map: map, transparent: true, opacity: 0.5, cache: true});
					obj.traverse( function ( node ) {
						node.material = material;
						node.material.needsUpdate = true;
						node.castShadow = true;
						node.receiveShadow = true;
					});
														
					scene.add( obj );


					Brain_sphere.forEach(function(object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
					});
					
					//me.generateSphere(0.01, 0.02, 0.05, 'sphere1');
					//me.generateSphere(-0.03, 0.02, -0.06, 'sphere2');
					//me.generateSphere(0.03, 0, -0.07, 'sphere3');
					//me.generateSphere(0.03, -0.03, 0, 'sphere4');
					//me.generateSphere(-0.03, -0.05, -0.03, 'sphere5');
					
				};
			},
			// called while loading is progressing
			function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				alert( 'An error happened' );
				console.log( error );
				me.setState({
					isLoading: false
				});
				
			}
		);
	};
	
	generateSphere = (x, y, z, sphereName) => {
		let geometry = new THREE.SphereGeometry( 0.005, 32, 32 );
		let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		let sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(x, y, z);
		sphere.name = sphereName;

		this.scene.add(sphere);
	};
	
	removeSpheres = () => {
		let k;
		for (k = 1; k <= 5; k++ ) {
			let sphereObject = this.scene.getObjectByName("sphere" + k);
			this.scene.remove(sphereObject);
		}
	};
	
	createLobeSheres = (type) => {
		let me = this;
		
		// Remove prev spheres
		me.removeSpheres();
		
		// Add new spheres
		switch(type) {
			case "Frontal_Lobe":			
				frontal_Lobe_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
			case "Pariental_Lobe":
				Pariental_Lobe_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
			case "Occipital_Lobe":
				Occipital_Lobe_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
			case "Temporal_Lobe":
				Temporal_Lobe_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
			case "Cerebellum_Lobe":
				cerebellum_Lobe_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
			case "Middle_Part_of_the_Brain":
				middle_Part_of_the_Brain_json.forEach(function(object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
				});
				break;
		}
	} 
	
	resetHighLight = () => {
		let me = this;
		
		objects.forEach(function(object, index) {
			if (object.currentHex != undefined) {
				object.material = object.currentHex;
			}
		});
		
		let barColors = defaultBarColors;
		
		this.setState({
			barColors: barColors
		});
		
		// Remove prev spheres
		me.removeSpheres();

		Brain_sphere.forEach(function(object, index) {
			var i = parseInt(index + 1);
			me.generateSphere(object.x, object.y, object.z, 'sphere'+i);
		});
		
		//me.generateSphere(0.01, 0.02, 0.05, 'sphere1');
		//me.generateSphere(-0.03, 0.02, -0.06, 'sphere2');
		//me.generateSphere(0.03, 0, -0.07, 'sphere3');
		//me.generateSphere(0.03, -0.03, 0, 'sphere4');
		//me.generateSphere(-0.03, -0.05, -0.03, 'sphere5');
	}

	startAnimationLoop = () => {
		if (this.resizeRendererToDisplaySize(this.renderer1)) {
			const canvas = this.renderer1.domElement;
			this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
			this.camera.updateProjectionMatrix();
		}
		
		if (this.state.isMouseEvent) {
		
			// update the picking ray with the camera and mouse position
			raycaster.setFromCamera( mouse, this.camera );

			// calculate objects intersecting the picking ray
			let intersects = raycaster.intersectObjects( objects );
			
			let barColors = defaultBarColors;

			if ( intersects.length > 0 ) {
							
				if ( INTERSECTED !== intersects[ 0 ].object ) {
					if ( INTERSECTED ) {
						INTERSECTED.material = INTERSECTED.currentHex;
					}
					
					INTERSECTED = intersects[ 0 ].object;


					//console.log('INTERSECTED Mesh: ', INTERSECTED.name);
					
					switch(INTERSECTED.name) {
						case "Frontal_Lobe":
							barColors = ['rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
							break;
						case "Pariental_Lobe":
							barColors = ['#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
							break;
						case "Occipital_Lobe":
							barColors = ['#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC', '#7CB5EC'];
							break;
						case "Temporal_Lobe":
							barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC', '#7CB5EC']
							break;
						case "Cerebellum_Lobe":
							barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)', '#7CB5EC'];
							break;
						case "Middle_Part_of_the_Brain":
							barColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', 'rgba(255,255,102)'];
							break;
					}
					
					this.setState({
						barColors: barColors
					});
					
					this.createLobeSheres(INTERSECTED.name);
					
					if (INTERSECTED.currentHex == undefined) {
						INTERSECTED.currentHex = INTERSECTED.material;
					}
					INTERSECTED.material = hightlightMaterial;
				}
			} else {
				if ( INTERSECTED ) {
					INTERSECTED.material = INTERSECTED.currentHex;
					this.removeSpheres();
					
					this.setState({
						barColors: barColors
					});
				}	
				INTERSECTED = null;
			}
		}

		//this.renderer1.render(this.scene, this.camera);
		
		if (hoveredElement === 'canvas1') {
			this.camera.position.set(0, 0.36, 0);
			this.controls.update();
			
			this.renderer2.render(this.scene, this.camera);
			
			this.camera.position.set(-0.3, 0.2, 0);
			this.controls.update();
			
			this.renderer3.render(this.scene, this.camera);
					
			this.camera.position.set(-0.2, 0.2, 0.2);
			this.controls.update();
			
			this.renderer4.render(this.scene, this.camera);
			
			this.camera.position.set(0, 0, 0.3);
			this.controls.update();
			
			this.renderer1.render(this.scene, this.camera);
		} else if (hoveredElement === 'canvas2') {
			
			this.camera.position.set(0, 0, 0.3);
			this.controls.update();
			
			this.renderer1.render(this.scene, this.camera);
			
			this.camera.position.set(-0.3, 0.2, 0);
			this.controls.update();
			
			this.renderer3.render(this.scene, this.camera);
					
			this.camera.position.set(-0.2, 0.2, 0.2);
			this.controls.update();
			
			this.renderer4.render(this.scene, this.camera);
			
			this.camera.position.set(0, 0.36, 0);
			this.controls.update();
			
			this.renderer2.render(this.scene, this.camera);
		} else if (hoveredElement === 'canvas3') {
			
			this.camera.position.set(0, 0, 0.3);
			this.controls.update();
			
			this.renderer1.render(this.scene, this.camera);
			
			this.camera.position.set(0, 0.36, 0);
			this.controls.update();
			
			this.renderer2.render(this.scene, this.camera);
					
			this.camera.position.set(-0.2, 0.2, 0.2);
			this.controls.update();
			
			this.renderer4.render(this.scene, this.camera);
			
			this.camera.position.set(-0.3, 0.2, 0);
			this.controls.update();
			
			this.renderer3.render(this.scene, this.camera);
		} else {
			
			this.camera.position.set(0, 0, 0.3);
			this.controls.update();
			
			this.renderer1.render(this.scene, this.camera);
			
			this.camera.position.set(0, 0.36, 0);
			this.controls.update();
			
			this.renderer2.render(this.scene, this.camera);
			
			this.camera.position.set(-0.3, 0.2, 0);
			this.controls.update();
			
			this.renderer3.render(this.scene, this.camera);
					
			this.camera.position.set(-0.2, 0.2, 0.2);
			this.controls.update();
			
			this.renderer4.render(this.scene, this.camera);
		}
				
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
			this.renderer1.setSize(width, height, false);
			this.renderer2.setSize(width, height, false);
			this.renderer3.setSize(width, height, false);
			this.renderer4.setSize(width, height, false);
		}
		return needResize;
    } 

  render() {
	  
	 let me = this;
	 
	 const data = {
		labels: [857, 1173, 3043, 1173, 1200, 1400],
		datasets: [{
			label: "Events",
			lineTension: 0.1,
			backgroundColor: this.state.barColors,
			borderColor: '#1987DD',
			hoverBackgroundColor: 'rgba(255,255,102)',
			hoverBorderColor: 'rgba(255,255,102)',
			data: [10, 8, 6, 11, 4, 7]
		}]
	};
	
	const options = {
		animation: false,
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Number of MASxSR 7.5  Thresholds Exceeded'
				},
				ticks: {
					min: 0
				}
			}],
			xAxes: [{
				scaleLabel: {
					display: false,
					labelString: 'Angular Acceleration'
				},
				ticks: {
					display: false //this will remove only the label
				}
			}]
		},
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				title: function(tooltipItem, data) {
					//return data['labels'][tooltipItem[0]['index']];
				},
				label: function(tooltipItem, data) {
			
					let event = data['datasets'][0]['data'][tooltipItem['index']];
					
					me.onMouseOut('');
				
					switch(event) {
						case 10:
							me.onMouseHover('', 'Frontal_Lobe');
							break;
						case 8:
							me.onMouseHover('', 'Pariental_Lobe');
							break;
						case 6:
							me.onMouseHover('', 'Occipital_Lobe');
							break;
						case 11:
							me.onMouseHover('', 'Temporal_Lobe');
							break;
						case 4:
							me.onMouseHover('', 'Cerebellum_Lobe');
							break;
						case 7:
							me.onMouseHover('', 'Middle_Part_of_the_Brain');
							break;
					}
					return ' ' + event + ' Events';
				}
			},
			displayColors: false,
			custom: function( tooltip ) {
				if( tooltip.opacity > 0 ) {
					//console.log( "Tooltip is showing" );
				} else {
					console.log( "Tooltip is hidden");
					me.onMouseOut('');
				}
				return;
			}
		}
	};
	  
    return (
		<React.Fragment>
			<div class="container dashboard player-top-margin-20-mobile">
				<div class="row cumm mb-5 ">
					<div class="col-md-12 col-lg-12 dash_container">
						<h1 ref="h1" style={{
								textAlign: "center",
								marginBottom : "2%"
							}} className="top-heading__login player-dashboard-title">
						  Player Dashboard
						</h1>
						<div className="card  pt-3 pb-3 pl-2 pr-2 mb-5"
						style={{
							border: "2px solid #0F81DC",
							borderRadius: "1.8rem"
						}}
						>
							<div className="row">
								<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
									<p
									ref="h1"
									className="player-dashboard-sub-head"
									>Cumulative Overview of All Events</p>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<button style={{
											marginRight : "5% !important"
										}} className="btn btn-primary pull-right sub-head-button"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> Export Player Report</button>
								</div>
							</div>

							<div className="row text-center">
								<div className="col-md-5 d-flex align-items-center justify-content-center" >
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
										<div>
											<div id="brain_model_block_1" className="brain_model"></div>
											<div id="brain_model_block_2" className="brain_model"></div><br/>
											<div id="brain_model_block_3" className="brain_model"></div>
											<div id="brain_model_block_4" className="brain_model"></div>
										</div>
								</div>
								<div className="col-md-7">
								    <Bar data={data} options={options}/>
									<div className="action_btn_block">
										<button className="btn btn-primary lobe_btn" id="front_btn">Front Lobe</button>
										<button className="btn btn-primary lobe_btn" id="pariental_btn">Parietal Lobe</button>
										<button className="btn btn-primary lobe_btn" id="occipital_btn">Occipital Lobe</button>
										<button className="btn btn-primary lobe_btn" id="temporal_btn">Temporal Lobe</button>
										<button className="btn btn-primary lobe_btn cerebellum_btn" id="cerebellum_btn">Cerebellum Lobe</button>	
										<button className="btn btn-primary lobe_btn motor_and_sensor_cortex" id="motor_and_sensor_cortex">Motor and Sensor Cortex</button>	
									</div>
									<div>
										<span className="brain_txt">Select a Brain Region </span>
										<button onClick={this.resetHighLight} className="btn btn-primary reset_btn" id="reset_btn">Reset</button>	
									</div>
								</div>
							</div>
						
						</div>
					</div>
				</div>
			</div>
		<Footer />
	</React.Fragment>
    );
  }
}

export default DashPage;
