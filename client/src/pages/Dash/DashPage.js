import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLB from './brain.glb';
import textureSrc from './Brain_texture1.jpg';
import yellowTextureSrc from './Br_color_2K_yellow.jpg';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';
import {Line} from 'react-chartjs-2';
import WebFont from 'webfontloader';

const options = {
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Linear Acceleration'
            },
            ticks: {
                min: 0
            }
        }],
        xAxes: [{

            scaleLabel: {
                display: true,
                labelString: 'Angular Acceleration'
            }
        }]
    }
};

const data = {
	labels: [857, 1173, 3043, 1173],
	datasets: [{
		label: "Linear VS Angular Acceleration",
		lineTension: 0.1,
		backgroundColor: '#7CB5EC',
		borderColor: '#1987DD',
		data: [23, 14, 32, 14]
	}]
};


let obj;

var manager = new THREE.LoadingManager();
var textureLoader = new THREE.TextureLoader(manager);

class DashPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			condition: false
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
		this.loadModel(GLB);
		this.startAnimationLoop();
		this.setContainerHeight();
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
		
		const canvas = document.querySelector('#brain_model_block');
		
		this.renderer = new THREE.WebGLRenderer({canvas, antialias:true});
		this.renderer.gammaOutput = true;
		this.renderer.gammaFactor = 2.2;

		this.scene = new THREE.Scene();
		//this.scene.background = new THREE.Color( 0x8FBCD4 );
		this.scene.background = new THREE.Color( "rgb(255, 255, 255)" );
		
		this.camera = new THREE.PerspectiveCamera( 25, width / height, 1, 1000 );
		this.camera.position.set(0, 0, 3);

		this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		this.light.position.copy( this.camera.position );
		this.scene.add( this.light );
		
		const ambientLight = new THREE.AmbientLight( 0x404040, 1);
		this.scene.add( ambientLight );
			
	    // prepare controls (OrbitControls)
		this.controls = new OrbitControls(this.camera, canvas);
		//this.controls.autoRotate = true;
		//this.controls.minPolarAngle = Math.PI * 0.5;
		//this.controls.maxPolarAngle  = Math.PI * 0.5;
		
		this.controls.addEventListener( 'change', this.lightUpdate );
		
		// to disable zoom
		//this.controls.enableZoom = false;

		// to disable rotation
		//this.controls.enableRotate = false;
		
		//this.controls.minDistance = 2;
		//this.controls.maxDistance = 10;
	};
	
	lightUpdate = () => {
		 this.light.position.copy( this.camera.position );
	}
  
	loadModel = (model) => {
		const scene  = this.scene;
		const me  = this;
		
		me.setState({
			isLoading: true
		});
		
		var loader = new GLTFLoader();
				
		// Load a glTF resource
		loader.load(
			// resource URL
			model,
			// called when the resource is loaded
			function ( gltf ) {
				
				scene.remove( obj );
						
				obj = gltf.scene;
								
				var map = textureLoader.load(textureSrc);
				map.encoding = THREE.sRGBEncoding;
				map.flipY = false;
				
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
					var material = new THREE.MeshPhongMaterial({map: map, cache: true});
					obj.traverse( function ( node ) {
						node.material = material;
						node.material.needsUpdate = true;
						node.castShadow = true;
						node.receiveShadow = true;
					});
					
					scene.add( gltf.scene );
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
	
	loadTexture = () => {
		
		if (this.state.isLoading) {
			return false;
		}
		
		this.setState( { condition : !this.state.condition } );
				
		const src = this.state.condition ? textureSrc : yellowTextureSrc;
		
		const me  = this;
		manager.onStart = function () {
			console.log('Loading started');
			me.setState({
				isLoading: true
			});
		};
		
		var map = textureLoader.load(src);
		map.encoding = THREE.sRGBEncoding;
		map.flipY = false;
		
		manager.onLoad = function () {
			console.log('loaded');
			me.setState({
				isLoading: false
			});
			var material = new THREE.MeshPhongMaterial({map: map, cache: true});
			obj.traverse( function ( node ) {
				node.material = material;
				node.material.needsUpdate = true;
				node.castShadow = true;
				node.receiveShadow = true;
			});
			console.log('change texture');
		};
		
	}

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

  render() {
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
						<div className="card  pt-3 pb-3 pl-2 pr-2 mb-5 animated fadeInLeft"
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
								<div className="col-md-4 d-flex align-items-center justify-content-center" >
									<canvas id="brain_model_block" style={{ width: '100%', height: '400px'}} />
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
								<div className="col-md-8 mb-5">
								   <Line data={data} options={options}/>
								</div>
							</div>
							<div className="row text-center">
								<div className="col-md-4">
								</div>
								<div className="col-md-8">
								  <button style={{
											float : "left",
											marginLeft: "50px"
										}} onClick={ this.loadTexture } id="add_remove_texture" className="btn btn-primary">Front Region</button>
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
