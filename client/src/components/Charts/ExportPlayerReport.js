import React from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import brain from './Cumulative/brain1.glb';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import './Cumulative/dash.css';

let camera, scene, renderer, canvas, raycaster, root, sphereContainer;
let brainModel;
let aspectRatio, width, height, currentSubCamera, initialRatio, prevCanvasWidth;
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
let prevPickedObject = null;
let pickedObjectSavedColor = 0;
let defaultBarColors = [
	"#7CB5EC",
	"#7CB5EC",
	"#7CB5EC",
	"#7CB5EC",
	"#7CB5EC",
	"#7CB5EC",
	"#7CB5EC"
];

let stem_json = [];
let csf_json = [];
let frontal_lobe_json = [];
let cerebellum_lobe_json = [];
let middle_part_of_the_brain_json = [];
let occipital_lobe_json = [];
let pariental_lobe_json = [];
let temporal_lobe_json = [];
let all_spheres_json = [];

class ExportPlayerReport extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			brainStrainActive: 'principal-max-strain',
			barColors: defaultBarColors,
			loadedActionButtons: false,
			chartHovered: false,
			actionButtons: [
				{
					id: "motor_and_sensor_cortex",
					name: "Motor and Sensor Cortex",
					shortenName: "Motor& Sensor Cortex"
				},
				{
					id: "stem_btn",
					name: "Stem",
					shortenName: "Stem"
				},
				{
					id: "cerebellum_btn",
					name: "Cerebellum Lobe",
					shortenName: "Cerebellum"
				},
				{
					id: "temporal_btn",
					name: "Temporal Lobe",
					shortenName: "Temporal"
				},
				{
					id: "occipital_btn",
					name: "Occipital Lobe",
					shortenName: "Occipital"
				},
				{
					id: "pariental_btn",
					name: "Parietal Lobe",
					shortenName: "Parietal"
				},
				{
					id: "front_btn",
					name: "Frontal Lobe",
					shortenName: "Frontal"
				}
			],
			actionButtonPositions: []
		};

		this.plugins = [
			{
				afterDraw: (chart) => {
					if (this.state.loadedActionButtons) return;
					console.log('chart',chart)
					if(chart.canvas && chart.canvas != null){
						setTimeout(() => this.afterDrawChart(chart), 100);
					}
				}
			}
		];
	}

	componentDidMount() {
		// Scrolling the screen to top
		window.scrollTo(0, 0);

		this.init();

		window.addEventListener("resize", this.onWindowResize, false);
		window.addEventListener("mousemove", this.onMouseMove, false);
		window.addEventListener("mouseout", this.onMouseOut, false);
		window.addEventListener("mouseleave", this.onMouseLeave, false);
		window.addEventListener("touchstart", this.onTouchStart, false);
		window.addEventListener("touchmove", this.onTouchMove, false);
		window.addEventListener("touchend", this.onTouchEnd, false);

		this.startAnimationLoop();
	}

	componentDidUpdate() {
		if (
			!this.state.loadedActionButtons &&
			this.state.actionButtonPositions.length !== 0
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
			document.getElementById("stem_btn").addEventListener(
				"mouseover",
				function (event) {
					me.onMouseHover(
						event,
						"Brainstem_Spinal_cord_node_Brainstem_Spinal_cord"
					);
				},
				false
			);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onWindowResize);
		window.removeEventListener("mousemove", this.onMouseMove);
		window.removeEventListener("mouseout", this.onMouseOut);
		window.removeEventListener("mouseleave", this.onMouseLeave);
		window.removeEventListener("touchstart", this.onTouchStart);
		window.removeEventListener("touchmove", this.onTouchMove);
		window.removeEventListener("touchend", this.onTouchEnd);
	}

	afterDrawChart = (chart) => {
		var ctx = chart.chart.ctx;

		const rect = chart.canvas.getBoundingClientRect();
		ctx.save();
		var xAxis = chart.scales["x-axis-0"];
		var yAxis = chart.scales["y-axis-0"];
		let actionButtonPosArr = [];

		xAxis.ticks.forEach((v, i) => {
			var x = xAxis.getPixelForTick(i);
			actionButtonPosArr = [
				{
					x: x,
					y: yAxis.bottom
				},
				...actionButtonPosArr
			];
		});
		ctx.restore();

		this.setState({
			actionButtonPositions: actionButtonPosArr
		});
	};

	createLobeSheres = (type) => {
		let me = this;

		// Remove prev spheres
		me.removeSpheres();

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
	};

	showAllSpheres = () => {
		const me = this;
		all_spheres_json.forEach(function (object, index) {
			var i = parseInt(index + 1);
			me.generateSphere(object.x, object.y, object.z, "pointer" + i);
		});
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
			sphereContainer.add(sphere);
		}
	};

	removeSpheres = () => {
		if (root) {
			for (let i = sphereContainer.children.length - 1; i >= 0; i--) {
				sphereContainer.remove(sphereContainer.children[i]);
			}
		}
	};

	highlightGraphBar = (type) => {
		let barColors = defaultBarColors;
		switch (type) {
			case "Frontal_Lobe_node_Frontal_Lobe":
				barColors = [
					"rgba(255,255,102)",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC"
				];
				break;
			case "Cerebral_hemispheres_R_node_Cerebral_hemispheres_R":
				barColors = [
					"#7CB5EC",
					"rgba(255,255,102)",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC"
				];
				break;
			case "node_Mesh_16":
				barColors = [
					"#7CB5EC",
					"#7CB5EC",
					"rgba(255,255,102)",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC"
				];
				break;
			case "Temporal_Lobe_node_Temporal_Lobe":
				barColors = [
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"rgba(255,255,102)",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC"
				];
				break;
			case "Cerebellum_node_Cerebellum":
				barColors = [
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"rgba(255,255,102)",
					"#7CB5EC",
					"#7CB5EC"
				];
				break;
			case "Brainstem_Spinal_cord_node_Brainstem_Spinal_cord":
				barColors = [
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"rgba(255,255,102)",
					"#7CB5EC"
				];
				break;
			case "Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex":
				barColors = [
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"#7CB5EC",
					"rgba(255,255,102)"
				];
				break;
			default:
				break;
		}

		this.setState({
			barColors: barColors
		});
	};

	reset = () => {
		this.unHighlightPickedObject();
		pickedObject = null;
		prevPickedObject = null;

		let barColors = defaultBarColors;

		this.setState({
			barColors: barColors
		});

		this.setState({
			barColors: barColors,
			chartHovered: false
		});

		this.removeSpheres();
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
			// pick the first object. It's the closest one
			pickedObject = intersectedObjects[0].object;
			this.highlightGraphBar(pickedObject.name);

			if (prevPickedObject && prevPickedObject.name === pickedObject.name)
				return;

			this.unHighlightPickedObject();
			prevPickedObject = pickedObject;
			this.highlightPickedObject();
			this.createLobeSheres(pickedObject.name);
		} else {
			if (!this.state.chartHovered) this.reset();
		}
	};

	unHighlightPickedObject = () => {
		// restore the color if there is a picked object
		if (prevPickedObject) {
			prevPickedObject.material.emissive.setHex(pickedObjectSavedColor);
			prevPickedObject.material.opacity = defaultTransparency;
			prevPickedObject.material.emissiveIntensity = 1;
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

	init = () => {
		this.sceneSetup();

		this.cameraSetup();

		this.lightSetup();

		this.objectSetup();

		this.clearPickPosition();
	};

	startAnimationLoop = () => {
		if (brainModel && currentSubCamera)
			this.pick(pickPosition, scene, currentSubCamera);

		// canvas.width = this.threeCanvasContainer.offsetWidth;
		// canvas.height = this.threeCanvasContainer.offsetHeight;
		// console.log('an' + canvas.width);
		renderer.render(scene, camera);
		requestAnimationFrame(this.startAnimationLoop);
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

		aspectRatio =
			this.threeCanvasContainer.offsetWidth /
			this.threeCanvasContainer.offsetHeight;

		initialRatio = 1 / aspectRatio;

		width =
			(this.threeCanvasContainer.offsetWidth / amount) *
			window.devicePixelRatio;
		height =
			(this.threeCanvasContainer.offsetHeight / amount) *
			window.devicePixelRatio;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(
			this.threeCanvasContainer.offsetWidth,
			this.threeCanvasContainer.offsetHeight
		);
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

		this.setState({
			isLoading: true
		});

		// Load&Add brain
		const gltfLoader = new GLTFLoader();
		gltfLoader.load(brain,
			(gltf) => {
				root = gltf.scene;

				const box = new THREE.Box3().setFromObject(root);
				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());

				sphereContainer = new THREE.Object3D();
				root.add(sphereContainer);
				this.showUpdatedRegion();

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

				this.setState({
					isLoading: false
				});
			}
		);
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

	onWindowResize = () => {
		if (prevCanvasWidth === this.threeCanvasContainer.offsetWidth) return;

		const canvasWidth = this.threeCanvasContainer.offsetWidth;
		prevCanvasWidth = canvasWidth;
		const canvasHeight = this.threeCanvasContainer.offsetWidth * initialRatio;

		aspectRatio = canvasWidth / canvasHeight;
		width = (canvasWidth / amount) * window.devicePixelRatio;
		height = (canvasHeight / amount) * window.devicePixelRatio;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvasWidth, canvasHeight);

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

		this.setState({
			loadedActionButtons: false,
			actionButtonPositions: []
		});

		this.removeEventListeners();
	};

	onMouseHover = (event, type) => {
		if (event !== "") event.preventDefault();

		this.setState({
			chartHovered: true
		});

		pickedObject = scene.getObjectByName(type, true);
		this.highlightGraphBar(type);

		if (
			!pickedObject ||
			(prevPickedObject && prevPickedObject.name === pickedObject.name)
		)
			return;

		this.unHighlightPickedObject();
		prevPickedObject = pickedObject;
		this.highlightPickedObject();
		this.createLobeSheres(type);
	};

	onMouseMove = (event) => {
		// Set pick position
		this.setPickPosition(event);
	};

	onMouseOut = () => {
		this.setState({
			barColors: defaultBarColors,
			chartHovered: false
		});
	};

	onMouseLeave = () => {
		// Clear pick position
		this.clearPickPosition();

		this.setState({
			barColors: defaultBarColors,
			chartHovered: false
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

	removeEventListeners = () => {
		if (document.getElementById("front_btn"))
			document
				.getElementById("front_btn")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("pariental_btn"))
			document
				.getElementById("pariental_btn")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("occipital_btn"))
			document
				.getElementById("occipital_btn")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("temporal_btn"))
			document
				.getElementById("temporal_btn")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("cerebellum_btn"))
			document
				.getElementById("cerebellum_btn")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("motor_and_sensor_cortex"))
			document
				.getElementById("motor_and_sensor_cortex")
				.removeEventListener("mouseover", this.onMouseHover);
		if (document.getElementById("stem_btn"))
			document
				.getElementById("stem_btn")
				.removeEventListener("mouseover", this.onMouseHover);
	};

	handleBrainStrain = (val) => {
		let me = this;
		me.setState({
			brainStrainActive: val
		}, () => {
			me.removeSpheres();
			me.showUpdatedRegion();
		});
	}

	showUpdatedRegion = () => {

		const { brainStrainActive } = this.state;

		frontal_lobe_json = this.props.brainRegions[brainStrainActive].frontal || []
		cerebellum_lobe_json = this.props.brainRegions[brainStrainActive].cerebellum || []
		occipital_lobe_json = this.props.brainRegions[brainStrainActive].occipital || []
		pariental_lobe_json = this.props.brainRegions[brainStrainActive].parietal || []
		temporal_lobe_json = this.props.brainRegions[brainStrainActive].temporal || []
		middle_part_of_the_brain_json = this.props.brainRegions[brainStrainActive].msc || []
		stem_json = this.props.brainRegions[brainStrainActive].stem || []
		//csf_json = this.props.brainRegions[brainStrainActive].csf || []

		all_spheres_json = [];
		all_spheres_json = all_spheres_json.concat(frontal_lobe_json);
		all_spheres_json = all_spheres_json.concat(cerebellum_lobe_json);
		all_spheres_json = all_spheres_json.concat(occipital_lobe_json);
		all_spheres_json = all_spheres_json.concat(pariental_lobe_json);
		all_spheres_json = all_spheres_json.concat(temporal_lobe_json);
		all_spheres_json = all_spheres_json.concat(middle_part_of_the_brain_json);
		all_spheres_json = all_spheres_json.concat(stem_json);
		all_spheres_json = all_spheres_json.concat(csf_json);

		this.showAllSpheres();
	}

	render() {

		let me = this;

		const data = {
			labels: [0, 0, 0, 0, 0, 0, 0],
			datasets: [
				{
					label: "Events",
					lineTension: 0.1,
					backgroundColor: this.state.barColors,
					borderColor: "#1987DD",
					hoverBackgroundColor: "rgba(255,255,102)",
					hoverBorderColor: "rgba(255,255,102)",
					data: [
						parseFloat(frontal_lobe_json.length),
						parseFloat(pariental_lobe_json.length),
						parseFloat(occipital_lobe_json.length),
						parseFloat(temporal_lobe_json.length),
						parseFloat(cerebellum_lobe_json.length),
						parseFloat(stem_json.length),
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
					color: "#007bff",
					font: {
						weight: "bold",
						size: 24
					},
					formatter: function (value, context) {
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
								return stem_json.length;
							case 6:
								return middle_part_of_the_brain_json.length;
								break;
								break;
							default:
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
							labelString: "Number of MASxSR 7.5  Thresholds Exceeded"
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
							labelString: "Angular Acceleration"
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
						let event = data["datasets"][0]["data"][tooltipItem["index"]];
						switch (tooltipItem["index"]) {
							case 0:
								me.onMouseHover("", "Frontal_Lobe_node_Frontal_Lobe");
								break;
							case 1:
								me.onMouseHover(
									"",
									"Cerebral_hemispheres_R_node_Cerebral_hemispheres_R"
								);
								break;
							case 2:
								me.onMouseHover("", "node_Mesh_16");
								break;
							case 3:
								me.onMouseHover("", "Temporal_Lobe_node_Temporal_Lobe");
								break;
							case 4:
								me.onMouseHover("", "Cerebellum_node_Cerebellum");
								break;
							case 5:
								me.onMouseHover(
									"",
									"Brainstem_Spinal_cord_node_Brainstem_Spinal_cord"
								);
								break;
							case 6:
								me.onMouseHover(
									"",
									"Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex"
								);
								break;
							default:
								break;
						}

						return " " + event + " Events";
					}
				},
				displayColors: false,
				custom: function (tooltip) {
					if (tooltip.opacity > 0) {
					} else {
						me.onMouseOut("");
					}
					return;
				}
			}
		};

		const actionButtons = this.state.actionButtonPositions.map((pos, index) => {
			return (
				<button
					className="btn btn-primary lobe_btn_temp"
					id={this.state.actionButtons[index].id}
					style={{
						left: pos.x,
						width: this.chartContainer
							? this.chartContainer.getBoundingClientRect().width /
							this.state.actionButtonPositions.length -
							(window.innerWidth > window.innerHeight ? 20 : 15)
							: 0
					}}
					key={index}
				>
					<span
						style={{
							transform:
								window.innerWidth < window.innerHeight
									? "rotate(-50deg)"
									: "initial"
						}}
					>
						{window.innerWidth < window.innerHeight
							? this.state.actionButtons[index].shortenName
							: this.state.actionButtons[index].name}
					</span>
				</button>
			);
		});

		return (
			<React.Fragment>
				<div className="row text-center">
					<div className="col-md-5 d-flex align-items-center justify-content-center" >
						<div className="row" style={{ width: '100%', display: 'block',height: '100%', }} className="three_D_model_div">
							{this.state.isLoading ? (
								<div className="model_loader d-flex justify-content-center center-spinner" style={{zIndex: '999'}}>
									<div
										className="spinner-border text-primary"
										role="status"
									>
										<span className="sr-only">Loading...</span>
									</div>
								</div>
							) : null}
							<div className="col-md-12 three_D_model_div" style={{ width: '100%', height: '80%', display: 'block' }} ref={(ref) => (this.threeCanvasContainer = ref)}>
								<canvas id="c" style={{ width: '100%', height: '100%' }}></canvas>
							</div>
							<div className="col-md-12">
								<button onClick={() => this.handleBrainStrain('principal-max-strain')} className={this.state.brainStrainActive === 'principal-max-strain' ? 'brain_strain settings-buttons settings-buttons-active' : 'brain_strain settings-buttons'}>Max Principal Strain</button>
								<button onClick={() => this.handleBrainStrain('principal-min-strain')} className={this.state.brainStrainActive === 'principal-min-strain' ? 'brain_strain settings-buttons settings-buttons-active' : 'brain_strain settings-buttons'}>Min Principal Strain</button>
								<button onClick={() => this.handleBrainStrain('csdm-max')} className={this.state.brainStrainActive === 'csdm-max' ? 'brain_strain settings-buttons settings-buttons-active' : 'brain_strain settings-buttons'}>CSDM<sub>15</sub></button>
								<button onClick={() => this.handleBrainStrain('axonal-strain-max')} className={this.state.brainStrainActive === 'axonal-strain-max' ? 'brain_strain settings-buttons settings-buttons-active' : 'brain_strain settings-buttons'}>Axonal Strain<sub>15</sub></button>
								<button onClick={() => this.handleBrainStrain('masXsr-15-max')} className={this.state.brainStrainActive === 'masXsr-15-max' ? 'brain_strain settings-buttons settings-buttons-active' : 'brain_strain settings-buttons'}>MASxSR<sub>15</sub></button>
							</div>
						</div>

					</div>
					<div className="col-md-7" ref={(ref) => (this.chartContainer = ref)}>
						<Bar data={data} options={options} plugins={this.plugins} />
						<div className="action-btn-container">
							{actionButtons}
						</div>
						<div>
							<span className="brain_txt">Select a Brain Region </span>
						</div>
						<div>
							<button onClick={this.reset} className="btn btn-primary reset_btn" id="reset_btn">Reset</button>
						</div>
					</div>
				</div>

			</React.Fragment>
		);
	}
}

export default ExportPlayerReport;
