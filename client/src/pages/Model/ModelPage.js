import React from 'react';
import Footer from '../../components/Footer';

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLB from './SoldierMesh.glb';
import './Model.css';

import { getStatusOfDarkmode } from '../../reducer';

class ModelPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}
	
	componentDidMount() {
		if (getStatusOfDarkmode().status === true) {
		   console.log('dfsdgds')
		   this.refs.h1.style.color = "#fff"
		}
		this.sceneSetup();
		this.loadModel();
		this.startAnimationLoop();
	}
  
	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = window.innerWidth;
		const height = window.innerHeight;

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
		this.controls = new OrbitControls(this.camera, this.el);
		this.controls.autoRotate = true;
		this.controls.minPolarAngle = Math.PI * 0.5;
		this.controls.maxPolarAngle  = Math.PI * 0.5;
		
		// to disable zoom
		this.controls.enableZoom = false;

		// to disable rotation
		//this.controls.enableRotate = false;
		
		this.controls.minDistance = 2;
		this.controls.maxDistance = 10;

		const canvas = document.querySelector('#model_block');
		this.renderer = new THREE.WebGLRenderer({canvas, antialias:true});
		this.renderer.gammaOutput = true;
		this.renderer.gammaFactor = 2.2;
	};

  
	loadModel = () => {
		const scene  = this.scene;
		const me  = this;
		var loader = new GLTFLoader();
		
		this.setState({
			isLoading: true
		});
		
		// Load a glTF resource
		loader.load(
			// resource URL
			GLB,
			// called when the resource is loaded
			function ( gltf ) {
				scene.add( gltf.scene );
				
				me.setState({
					isLoading: false
				});

				//gltf.animations; // Array<THREE.AnimationClip>
				//gltf.scene; // THREE.Scene
				//gltf.scenes; // Array<THREE.Scene>
				//gltf.cameras; // Array<THREE.Camera>
				//gltf.asset; // Object

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

	render() {
		return (
		  <React.Fragment>
			<div id="container" className="container align-center__about-page">
			  <div className="col-md-12 col-lg-12 padding-about__page text-center">
				  <div className={`section-title animated zoomIn`}>
					<h1 ref="h1" className="font-weight-bold">3D Model</h1>
				  </div>
				   <canvas id="model_block" />
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
			 </div>
			<Footer />
		  </React.Fragment>
		);
	}
}

export default ModelPage;
