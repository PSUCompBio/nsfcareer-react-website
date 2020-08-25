import React from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import brain from './brain1.glb';
import Footer from '../../components/Footer';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import './dash.css';

let stem_json = [{ x: -0.00903787, y: -0.316476, z: -0.0150604 }];
let frontal_lobe_json = [{ x: 0.00205875, y: -0.413274, z: -0.0556418 }];
let cerebellum_lobe_json = [{ x: 0.00679913, y: -0.313188, z: 0.0161927 }];
let middle_part_of_the_brain_json = [{ x: 0.00227188, y: -0.407034, z: -0.0116845 }];
let occipital_lobe_json = [{ x: 0.0114976, y: -0.368995, z: 0.029747 }];
let pariental_lobe_json = [{ x: 0.0057455, y: -0.413943, z: 0.0061665 }];
let temporal_lobe_json = [{ x: 0.0261539, y: -0.338157, z: -0.0565029 }];

let all_spheres_json = [];       
all_spheres_json = all_spheres_json.concat(stem_json);
all_spheres_json = all_spheres_json.concat(frontal_lobe_json);
all_spheres_json = all_spheres_json.concat(occipital_lobe_json);
all_spheres_json = all_spheres_json.concat(temporal_lobe_json);
all_spheres_json = all_spheres_json.concat(cerebellum_lobe_json);
all_spheres_json = all_spheres_json.concat(pariental_lobe_json);
all_spheres_json = all_spheres_json.concat(middle_part_of_the_brain_json);

let camera, scene, renderer, canvas, raycaster, root;
let brainModel;
let aspectRatio, width, height, currentSubCamera;
const defaultTransparency = 0.3;
const highlightTransparency = 0.4;
const defaultColor = 0x7a5a16;
const highlightColor = 0xadab24;
const highlightEmissiveIntensity = 0.6;

const amount = 2;
const space = 10;
const near = 0.1;
const far = 100;
const cameraAttArr = [
	{
		x: 0,
		y: 0,
		rotX: 0,
		rotY: -Math.PI / 2,
		rotZ: 0,
		fov: 8
	},
	{
		x: 1,
		y: 0,
		rotX: -Math.PI / 15,
		rotY: -Math.PI / 5,
		rotZ: 0,
		fov: 8
	},
	{
		x: 1,
		y: 1,
		rotX: -Math.PI / 2,
		rotY: 0,
		rotZ: 0,
		fov: 10
	}
];
const defaultCamAtt = {
	x: -1,
	y: -1,
	rotX: 0,
	rotY: 0,
	rotZ: 0,
	fov: 8
};
const pickPosition = { x: 0, y: 0 };

raycaster = new THREE.Raycaster();
let pickedObject = null;
let pickedObjectSavedColor = 0;
let defaultBarColors = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC'];

class DashPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			barColors: defaultBarColors,
			loadedActionButtons: false,
		};
	}

	componentDidMount() {
		// Scrolling the screen to top
		window.scrollTo(0, 0);

		this.sceneSetup();

		this.cameraSetup();

		this.lightSetup();

		this.objectSetup();

		this.clearPickPosition();

		window.addEventListener('resize', this.onWindowResize, false);
		window.addEventListener('mousemove', this.onMouseMove, false);
		window.addEventListener('mouseout', this.onMouseOut, false);
		window.addEventListener('mouseleave', this.onMouseLeave, false);
		window.addEventListener('touchstart', this.onTouchStart, false);
		window.addEventListener('touchmove', this.onTouchMove, false);
		window.addEventListener('touchend', this.onTouchEnd, false);

		this.startAnimationLoop();
	}

	componentDidUpdate() {
		if (
			!this.state.loadedActionButtons
		) {
			this.setState({
				loadedActionButtons: true
			});

			let me = this;

			// Highlight brain model on mouse hover on brain button
			document.getElementById("front_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(event, "Frontal_Lobe_node_Frontal_Lobe");
				},
				false
			);
			document.getElementById("pariental_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(
						event,
						"Cerebral_hemispheres_R_node_Cerebral_hemispheres_R"
					);
				},
				false
			);
			document.getElementById("occipital_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(event, "node_Mesh_16");
				},
				false
			);
			document.getElementById("temporal_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(event, "Temporal_Lobe_node_Temporal_Lobe");
				},
				false
			);
			document.getElementById("cerebellum_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(event, "Cerebellum_node_Cerebellum");
				},
				false
			);
			document.getElementById("motor_and_sensor_cortex").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(
						event,
						"Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex"
					);
				},
				false
			);
		}
	}

	startAnimationLoop = () => {
		if (brainModel && currentSubCamera)
			this.pick(pickPosition, scene, currentSubCamera);

		renderer.render(scene, camera);
		requestAnimationFrame(this.startAnimationLoop);
	};

	onMouseHover = (event, type) => {
		if (event !== "") event.preventDefault();

		if (event !== "") {
			this.highlightGraphBar(type);
		}

		this.unHighlightPickedObject();

		pickedObject = scene.getObjectByName(type, true);

		if (pickedObject) this.highlightPickedObject();

		this.createLobeSheres(type);
	};

	createLobeSheres = (type) => {
		let me = this;

		// Remove prev spheres
		me.removeSpheres(function () {
			// Add new spheres
			switch (type) {
				case "Frontal_Lobe_node_Frontal_Lobe":
					frontal_lobe_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "node_Mesh_16":
					occipital_lobe_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "Cerebral_hemispheres_R_node_Cerebral_hemispheres_R":
					pariental_lobe_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "Brainstem_Spinal_cord_node_Brainstem_Spinal_cord":
					stem_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "Temporal_Lobe_node_Temporal_Lobe":
					temporal_lobe_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "Cerebellum_node_Cerebellum":
					cerebellum_lobe_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				case "Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex":
					middle_part_of_the_brain_json.forEach(function (object, index) {
						var i = parseInt(index + 1);
						me.generateSphere(object.x, object.y, object.z, "pointer" + i);
					});
					break;
				default:
					break;
			}
		});
	};

	showAllSpheres = () => {
		const me = this;
		all_spheres_json.forEach(function (object, index) {
			var i = parseInt(index + 1);
			me.generateSphere(object.x, object.y, object.z, 'pointer' + i);
		});
	};

	highlightGraphBar = (type) => {
		let barColors = defaultBarColors;
		switch (type) {
			case 'Frontal_Lobe_node_Frontal_Lobe':
				barColors = [
					'rgba(255,255,102)',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC'
				];
				break;
			case 'Cerebral_hemispheres_R_node_Cerebral_hemispheres_R':
				barColors = [
					'#7CB5EC',
					'rgba(255,255,102)',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC'
				];
				break;
			case 'node_Mesh_16':
				barColors = [
					'#7CB5EC',
					'#7CB5EC',
					'rgba(255,255,102)',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC'
				];
				break;
			case 'Temporal_Lobe_node_Temporal_Lobe':
				barColors = [
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'rgba(255,255,102)',
					'#7CB5EC',
					'#7CB5EC'
				];
				break;
			case 'Cerebellum_node_Cerebellum':
				barColors = [
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'rgba(255,255,102)',
					'#7CB5EC'
				];
				break;
			case 'Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex':
				barColors = [
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'#7CB5EC',
					'rgba(255,255,102)'
				];
				break;
		}

		this.setState({
			barColors: barColors
		});
	};

	resetHighLight = () => {

		this.unHighlightPickedObject();

		let barColors = defaultBarColors;

		this.setState({
			barColors: barColors
		});

		// Show all spheres
		this.showAllSpheres();
	};

	pick = (normalizedPosition, pickingScene, pickingCamera) => {
		// cast a ray through the frustum
		raycaster.setFromCamera(normalizedPosition, pickingCamera);
		// get the list of objects the ray intersected
		const intersectedObjects = raycaster.intersectObjects(
			brainModel.children[0].children[0].children
		);

		if (intersectedObjects.length) {
			this.unHighlightPickedObject();
			// pick the first object. It's the closest one
			pickedObject = intersectedObjects[0].object;
			console.log(pickedObject.name);
			this.highlightPickedObject();

			this.highlightGraphBar(pickedObject.name);
			this.createLobeSheres(pickedObject.name);
		}
	};

	unHighlightPickedObject = () => {
		// restore the color if there is a picked object
		if (pickedObject) {
			pickedObject.material.emissive.setHex(pickedObjectSavedColor);
			pickedObject.material.opacity = defaultTransparency;
			pickedObject.material.emissiveIntensity = 1;
			pickedObject = undefined;
			this.cursorAdd(false);
		}
	};

	highlightPickedObject = () => {
		this.cursorAdd(true);
		// save its color
		pickedObjectSavedColor = pickedObject.material.emissive.getHex();
		// set its emissive color to flashing red/yellow
		pickedObject.material.emissiveIntensity = highlightEmissiveIntensity;
		pickedObject.material.opacity = highlightTransparency;
		pickedObject.material.emissive.setHex(highlightColor);
	};

	sceneSetup = () => {
		scene = new THREE.Scene();
		scene.background = new THREE.Color("white");

		canvas = document.querySelector("#c");

		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true
		});

		aspectRatio = canvas.clientWidth / canvas.clientHeight;
		width = (canvas.clientWidth / amount) * window.devicePixelRatio;
		height = (canvas.clientHeight / amount) * window.devicePixelRatio;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	};

	cameraSetup = () => {
		let cameras = [];

		for (let y = 0; y < amount; y++) {
			for (let x = 0; x < amount; x++) {
				let cameraAtt = cameraAttArr.filter((item) => {
					return item.x === x && item.y === y;
				});

				if (cameraAtt.length === 0) cameraAtt[0] = defaultCamAtt;

				const subCamera = new THREE.PerspectiveCamera(
					cameraAtt[0].fov,
					aspectRatio,
					near,
					far
				);
				subCamera.viewport = new THREE.Vector4(
					Math.floor(x * width + space / 2),
					Math.floor(y * height + space / 2),
					Math.ceil(width) - space,
					Math.ceil(height) - space
				);

				const subCameraContainer = new THREE.Object3D();
				subCameraContainer.add(subCamera);

				subCamera.position.x = 0;
				subCamera.position.y = 0;
				subCamera.position.z = 1;
				subCameraContainer.rotation.x += cameraAtt[0].rotX;
				subCameraContainer.rotation.y += cameraAtt[0].rotY;
				subCameraContainer.rotation.z += cameraAtt[0].rotZ;
				subCamera.updateProjectionMatrix();
				subCamera.lookAt(0, 0, 0);
				subCamera.updateMatrixWorld();
				cameras.push(subCamera);
			}
		}

		camera = new THREE.ArrayCamera(cameras);
		camera.position.z = 3;
	};

	lightSetup = () => {
		const hemLight = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1);
		scene.add(hemLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 1);
		dirLight.position.set(10, 20, 10);
		scene.add(dirLight);
	};

	generateSphere = (x, y, z, sphereName) => {
		if (root) {
			// Add pointer(s) to brain model as children
			const sphereGeo = new THREE.SphereGeometry(0.003, 32, 32);
			const sphereMat = new THREE.MeshStandardMaterial({
				color: 0xff0000
			});
			const sphere = new THREE.Mesh(sphereGeo, sphereMat);
			const pointerPos = new THREE.Vector3(x, y, z);
			// (x, y, z) --> (x, -z, y)
			sphere.position.x += pointerPos.x;
			sphere.position.y += pointerPos.z;
			sphere.position.z -= pointerPos.y;
			sphere.name = sphereName;
			root.add(sphere);
		}
	};

	removeSpheres = (callback) => {
		if (root) {
			let total = root.children.length + 1;
			for (let i = 1; i <= total; i++) {
				var selectedObject = scene.getObjectByName('pointer' + i);
				if (selectedObject)
					root.remove(selectedObject);
			}
			// root.traverse((n) => {
			// 	let match = n.name.match(/pointer/g);
			// 	if (match) {
			// 		n.visible = false;
			// 	}
			// });

			callback();
		}
	};

	objectSetup = () => {
		// Add background
		const bgGeo = new THREE.PlaneBufferGeometry(100, 100);
		const bgMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

		const background = new THREE.Mesh(bgGeo, bgMat);
		background.name = "background";
		const bg1 = background.clone();
		const bg2 = background.clone();
		const bg3 = background.clone();
		const bg4 = background.clone();
		bg1.position.set(0, 0, -2);
		bg2.position.set(-2, 0, 0);
		bg2.rotation.y = Math.PI / 2;
		bg3.position.set(2, 0, 0);
		bg3.rotation.y = -Math.PI / 2;
		bg4.position.set(0, -2, 0);
		bg4.rotation.x = -Math.PI / 2;
		scene.add(bg1);
		scene.add(bg2);
		scene.add(bg3);
		scene.add(bg4);

		let me = this;

		// Load&Add brain
		const gltfLoader = new GLTFLoader();
		gltfLoader.load(brain,
			(gltf) => {
				root = gltf.scene;

				const box = new THREE.Box3().setFromObject(root);
				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());

				this.showAllSpheres();

				root.position.x -= boxCenter.x;
				root.position.y -= boxCenter.y;
				root.position.z -= boxCenter.z;

				root.traverse((n) => {
					let match = n.name.match(/pointer/g);

					if (n.isMesh && !match) {
						n.material = n.material.clone();
						n.material.transparent = true;
						n.material.map = null;
						n.material.color.set(defaultColor);
						n.material.opacity = defaultTransparency;

						if (
							n.name !== "Brainstem_Spinal_cord_node_Brainstem_Spinal_cord" &&
							n.name !== "Cerebellum_node_Cerebellum" &&
							n.name !== "Cerebral_hemispheres_R_node_Cerebral_hemispheres_R" &&
							n.name !== "Frontal_Lobe_node_Frontal_Lobe" &&
							n.name !==
							"Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex" &&
							n.name !== "node_Mesh_16" &&
							n.name !== "Temporal_Lobe_node_Temporal_Lobe"
						)
							n.visible = false;
					}
				});

				brainModel = new THREE.Object3D();
				brainModel.add(root);
				brainModel.rotation.x = Math.PI / 2;
				brainModel.rotation.y = Math.PI;
				brainModel.rotation.z = Math.PI;

				scene.add(brainModel);
			}
		);
	};

	onWindowResize = () => {
		aspectRatio = canvas.clientWidth / canvas.clientHeight;
		width = (canvas.clientWidth / amount) * window.devicePixelRatio;
		height = (canvas.clientHeight / amount) * window.devicePixelRatio;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);

		for (let y = 0; y < amount; y++) {
			for (let x = 0; x < amount; x++) {
				const subCamera = camera.cameras[amount * y + x];

				subCamera.viewport.set(
					Math.floor(x * width + space / 2),
					Math.floor(y * height + space / 2),
					Math.ceil(width - space),
					Math.ceil(height - space)
				);

				subCamera.aspect = aspectRatio;
				subCamera.updateProjectionMatrix();
			}
		}
	};

	onMouseMove = (event) => {
		// Set pick position
		this.setPickPosition(event);
	};

	onMouseOut = () => {
		
		this.unHighlightPickedObject();

		this.setState({
			barColors: defaultBarColors
		});
	};

	onMouseLeave = () => {
		// Clear pick position
		this.clearPickPosition();

		this.setState({
			barColors: defaultBarColors
		});
	};

	onTouchStart = (event) => {
		// prevent the window from scrolling
		event.preventDefault();
		this.setPickPosition(event.touches[0]);
	};

	onTouchMove = (event) => {
		// Set pick position
		this.setPickPosition(event.touches[0]);
	};

	onTouchEnd = () => {
		// Clear pick position
		// this.clearPickPosition();
	};

	getCanvasRelativePosition = (event) => {
		const rect = canvas.getBoundingClientRect();

		return {
			x: ((event.clientX - rect.left) * canvas.width) / rect.width,
			y: ((event.clientY - rect.top) * canvas.height) / rect.height
		};
	};

	setPickPosition = (event) => {
		const pos = this.getCanvasRelativePosition(event);

		if (pos.x < 0 || pos.y < 0) return;

		for (let y = 0; y < amount; y++) {
			for (let x = 0; x < amount; x++) {
				const startX = Math.floor(x * width + space / 2);
				const endX =
					Math.floor(x * width + space / 2) + Math.ceil(width - space);
				const startY = Math.floor(y * height + space / 2);
				const endY =
					Math.floor(y * height + space / 2) + Math.ceil(height - space);

				if (
					pos.x >= startX &&
					pos.x <= endX &&
					amount * height - pos.y >= startY &&
					amount * height - pos.y <= endY
				) {
					// Current camera
					currentSubCamera = camera.cameras[amount * y + x];

					pickPosition.x = ((pos.x - x * width) / width) * 2 - 1;
					pickPosition.y =
						((pos.y - (amount - 1 - y) * height) / height) * -2 + 1;

					break;
				}
			}
		}
	};

	clearPickPosition = () => {
		// unlike the mouse which always has a position
		// if the user stops touching the screen we want
		// to stop picking. For now we just pick a value
		// unlikely to pick something
		pickPosition.x = -100000;
		pickPosition.y = -100000;
	};

	// Add cursor or not
	cursorAdd = (flag) => {
		flag
			? canvas.classList.add("cursor-pointer")
			: canvas.classList.remove("cursor-pointer");
	};

	render() {
		let me = this;

		const data = {
			labels: [857, 1173, 3043, 1173, 1200, 1400],
			datasets: [
				{
					label: 'Events',
					lineTension: 0.1,
					backgroundColor: this.state.barColors,
					borderColor: '#1987DD',
					hoverBackgroundColor: 'rgba(255,255,102)',
					hoverBorderColor: 'rgba(255,255,102)',
					data: [
						parseFloat(frontal_lobe_json.length),
						parseFloat(pariental_lobe_json.length),
						parseFloat(occipital_lobe_json.length),
						parseFloat(temporal_lobe_json.length),
						parseFloat(cerebellum_lobe_json.length),
						parseFloat(middle_part_of_the_brain_json.length)
					]
				}
			]
		};

		const options = {
			animation: false,
			responsive: true,
			plugins: {
				datalabels: {
					color: '#007bff',
					font: {
						weight: 'bold',
						size: 24
					},
					formatter: function (value, context) {
						//console.log(context.dataIndex);
						//return value;

						switch (context.dataIndex) {
							case 0:
								return frontal_lobe_json.length;
								break;
							case 1:
								return pariental_lobe_json.length;
								break;
							case 2:
								return occipital_lobe_json.length;
								break;
							case 3:
								return temporal_lobe_json.length;
								break;
							case 4:
								return cerebellum_lobe_json.length;
								break;
							case 5:
								return middle_part_of_the_brain_json.length;
								break;
						}
					}
				}
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Number of MASxSR 7.5  Thresholds Exceeded'
						},
						ticks: {
							min: 0
						}
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: false,
							labelString: 'Angular Acceleration'
						},
						ticks: {
							display: false //this will remove only the label
						}
					}
				]
			},
			legend: {
				display: false
			},
			tooltips: {
				callbacks: {
					title: function (tooltipItem, data) {
						//return data['labels'][tooltipItem[0]['index']];
					},
					label: function (tooltipItem, data) {
						let event = data['datasets'][0]['data'][tooltipItem['index']];
						switch (tooltipItem['index']) {
							case 0:
								me.onMouseHover('', 'Frontal_Lobe_node_Frontal_Lobe');
								break;
							case 1:
								me.onMouseHover('', 'Cerebral_hemispheres_R_node_Cerebral_hemispheres_R');
								break;
							case 2:
								me.onMouseHover(
									'',
									'node_Mesh_16'
								);
								break;
							case 3:
								me.onMouseHover('', 'Temporal_Lobe_node_Temporal_Lobe');
								break;
							case 4:
								me.onMouseHover('', 'Cerebellum_node_Cerebellum');
								break;
							case 5:
								me.onMouseHover(
									'',
									'Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex'
								);
								break;
						}

						return ' ' + event + ' Events';
					}
				},
				displayColors: false,
				custom: function (tooltip) {
					if (tooltip.opacity > 0) {
						//console.log( "Tooltip is showing" );
					} else {
						console.log('Tooltip is hidden');
						me.onMouseOut('');
					}
					return;
				}
			}
		};

		return (
			<React.Fragment>
				<div
					className="row text-center"
					style={{ marginTop: '100px', marginBottom: '50px' }}
				>
					<div className="col-md-1"></div>
					<div className="col-md-5 d-flex align-items-center justify-content-center">
						{this.state.isLoading ? (
							<div className="model_loader d-flex justify-content-center center-spinner">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
						<canvas
							id="c"
							style={{ width: '100%', height: '100%', display: 'block' }}
						></canvas>
					</div>
					<div className="col-md-6">
						<Bar data={data} options={options} />
						<div className="action_btn_block">
							<button className="btn btn-primary lobe_btn" id="front_btn">
								Frontal Lobe
              </button>
							<button className="btn btn-primary lobe_btn" id="pariental_btn">
								Parietal Lobe
              </button>
							<button className="btn btn-primary lobe_btn" id="occipital_btn">
								Occipital Lobe
              </button>
							<button className="btn btn-primary lobe_btn" id="temporal_btn">
								Temporal Lobe
              </button>
							<button
								className="btn btn-primary lobe_btn cerebellum_btn"
								id="cerebellum_btn"
							>
								Cerebellum Lobe
              </button>
							<button
								className="btn btn-primary lobe_btn motor_and_sensor_cortex"
								id="motor_and_sensor_cortex"
							>
								Motor and Sensor Cortex
              </button>
						</div>
						<div>
							<span className="brain_txt">Select a Brain Region </span>
						</div>
						<div>
							<button
								onClick={this.resetHighLight}
								className="btn btn-primary reset_btn"
								id="reset_btn"
							>
								Reset
              </button>
						</div>
					</div>
				</div>

				<Footer />
			</React.Fragment>
		);
	}
}

export default DashPage;