import React from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import './dash.css';
import summary from "./summary_york_tech_35204.json";
import SelectSearch from 'react-select-search';
const insults = summary.Insults;
const ENABLE_COLOR_SPHERES = true;
const sphereGeo = new THREE.SphereGeometry(0.003, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({
	color: 0xff0000
});
const SMALL_BOUNDARY = 0.02;
const MEDIUM_BOUNDARY = 0.05;
const LARGE_BOUNDARY = 0.1;

const SMALL_COLOR = new THREE.Color(0x00b050);
const MEDIUM_COLOR = new THREE.Color(0xed7d31);
const LARGE_COLOR = new THREE.Color(0xff0000);
const X_LARGE_COLOR = new THREE.Color(0x000000);

const SMALL_GEOMETRY = new THREE.SphereGeometry(0.0015, 32, 32);
const MEDIUM_GEOMETRY = new THREE.SphereGeometry(0.002, 32, 32);
const LARGE_GEOMETRY = new THREE.SphereGeometry(0.003, 32, 32);
const X_LARGE_GEOMETRY = new THREE.SphereGeometry(0.004, 32, 32);

// let stem_json = [];
// let pariental_lobe_json = [];
// let frontal_lobe_json = [];
// let cerebellum_lobe_json = [];
// let middle_part_of_the_brain_json = [];
// let occipital_lobe_json = [];
// let temporal_lobe_json = [];
// let middle_part_of_the_brain_min_json = []

let minimumPS = [[], [], [], [], [], [], []];
let maximumPS = [[], [], [], [], [], [], []];
let csdm_15 = [[], [], [], [], [], [], []];
let csdm_5 = [[], [], [], [], [], [], []];
let csdm_10 = [[], [], [], [], [], [], []];

let previousClicked = null;
// json parse
insults.forEach((insult) => {
	if (insult["principal-max-strain"]) {
		switch (insult["principal-max-strain"]["brain-region"]) {
			case "msc":
				maximumPS[6] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[6]
				];
				break;
			case "stem":
				maximumPS[5] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[5]
				];
				break;
			case "cerebellum":
				maximumPS[4] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[4]
				];
				break;
			case "temporal":
				maximumPS[3] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[3]
				];
				break;
			case "occipital":
				maximumPS[2] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[2]
				];
				break;
			case "parietal":
				maximumPS[1] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[1]
				];
				break;
			case "frontal":
				maximumPS[0] = [
					{
						x: insult["principal-max-strain"]["location"][0],
						y: insult["principal-max-strain"]["location"][1],
						z: insult["principal-max-strain"]["location"][2],
						value: insult["principal-max-strain"]["value"],
					},
					...maximumPS[0]
				];
				break;
			default:
				break;
		}
	}
	if (insult["principal-min-strain"]) {
		switch (insult["principal-min-strain"]["brain-region"]) {
			case "msc":
				minimumPS[6] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[6]
				];
				break;
			case "stem":
				minimumPS[5] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[5]
				];
				break;
			case "cerebellum":
				minimumPS[4] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[4]
				];
				break;
			case "temporal":
				minimumPS[3] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[3]
				];
				break;
			case "occipital":
				minimumPS[2] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[2]
				];
				break;
			case "parietal":
				minimumPS[1] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[1]
				];
				break;
			case "frontal":
				minimumPS[0] = [
					{
						x: insult["principal-min-strain"]["location"][0],
						y: insult["principal-min-strain"]["location"][1],
						z: insult["principal-min-strain"]["location"][2],
						value: insult["principal-min-strain"]["value"],
					},
					...minimumPS[0]
				];
				break;
			default:
				break;
		}
	}
	if (insult["CSDM-15"]) {
		switch (insult["CSDM-15"]["brain-region"]) {
			case "msc":
				csdm_15[6] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[6]
				];
				break;
			case "stem":
				csdm_15[5] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[5]
				];
				break;
			case "cerebellum":
				csdm_15[4] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[4]
				];
				break;
			case "temporal":
				csdm_15[3] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[3]
				];
				break;
			case "occipital":
				csdm_15[2] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[2]
				];
				break;
			case "parietal":
				csdm_15[1] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[1]
				];
				break;
			case "frontal":
				csdm_15[0] = [
					{
						x: insult["CSDM-15"]["location"][0],
						y: insult["CSDM-15"]["location"][1],
						z: insult["CSDM-15"]["location"][2],
						value: insult["CSDM-15"]["value"],
					},
					...csdm_15[0]
				];
				break;
			default:
				break;
		}
	}
	if (insult["CSDM-5"]) {
		switch (insult["CSDM-5"]["brain-region"]) {
			case "msc":
				csdm_5[6] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[6]
				];
				break;
			case "stem":
				csdm_5[5] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[5]
				];
				break;
			case "cerebellum":
				csdm_5[4] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[4]
				];
				break;
			case "temporal":
				csdm_5[3] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[3]
				];
				break;
			case "occipital":
				csdm_5[2] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[2]
				];
				break;
			case "parietal":
				csdm_5[1] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[1]
				];
				break;
			case "frontal":
				csdm_5[0] = [
					{
						x: insult["CSDM-5"]["location"][0],
						y: insult["CSDM-5"]["location"][1],
						z: insult["CSDM-5"]["location"][2],
						value: insult["CSDM-5"]["value"],
					},
					...csdm_5[0]
				];
				break;
			default:
				break;
		}
	}

	if (insult["CSDM-10"]) {
		switch (insult["CSDM-10"]["brain-region"]) {
			case "msc":
				csdm_10[6] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[6]
				];
				break;
			case "stem":
				csdm_10[5] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[5]
				];
				break;
			case "cerebellum":
				csdm_10[4] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[4]
				];
				break;
			case "temporal":
				csdm_10[3] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[3]
				];
				break;
			case "occipital":
				csdm_10[2] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[2]
				];
				break;
			case "parietal":
				csdm_10[1] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[1]
				];
				break;
			case "frontal":
				csdm_10[0] = [
					{
						x: insult["CSDM-10"]["location"][0],
						y: insult["CSDM-10"]["location"][1],
						z: insult["CSDM-10"]["location"][2],
						value: insult["CSDM-10"]["value"],
					},
					...csdm_10[0]
				];
				break;
			default:
				break;
		}
	}



});

let all_spheres_json = [];
all_spheres_json = [...maximumPS];

let camera, scene, renderer, canvas, raycaster, root, sphereContainer, labelSize = 10, isClicked = false;
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
		fov: 12
	},
	{
		x: 1,
		y: 0,
		rotX: -Math.PI / 15,
		rotY: -Math.PI / 5,
		rotZ: 0,
		fov: 12
	},
	{
		x: 1,
		y: 1,
		rotX: -Math.PI / 2,
		rotY: 0,
		rotZ: 0,
		fov: 12
	}
];
const defaultCamAtt = {
	x: -1,
	y: -1,
	rotX: 0,
	rotY: 0,
	rotZ: 0,
	fov: 10
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

class DashPage extends React.Component {
	constructor(props) {
		super(props);
		this.spheres_selected = "All";
		this.state = {
			isLoading: true,
			barColors: defaultBarColors,
			loadedActionButtons: false,
			chartHovered: false,
			spheres_selected: "All",
			colored_spheres_clicked: "All",
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
			actionButtonPositions: [],
			selectOption: [
				{ name: 'Maximum Principal Strain', value: 'max-ps' },
				{ name: 'Minimum Principal Strain', value: 'min-ps' },
				{ name: 'CSDM-15', value: 'csdm_15' },
				{ name: 'CSDM-5', value: 'csdm_5' },
				{ name: 'CSDM-10', value: 'csdm_10' },
			]
		};

		this.plugins = [
			{
				afterDraw: (chart) => {
					if (this.state.loadedActionButtons) return;

					setTimeout(() => this.afterDrawChart(chart), 2000);
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
			document.getElementById("front_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
						event,
						"Frontal_Lobe_node_Frontal_Lobe"
					);
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
			document.getElementById("pariental_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
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
			document.getElementById("occipital_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
						event,
						"node_Mesh_16"
					);
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
			document.getElementById("temporal_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
						event,
						"Temporal_Lobe_node_Temporal_Lobe"
					);
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
			document.getElementById("cerebellum_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
						event,
						"Cerebellum_node_Cerebellum"
					);
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
			document.getElementById("motor_and_sensor_cortex").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
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
			document.getElementById("stem_btn").addEventListener(
				"click",
				function (event) {
					me.onMouseClick(
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

		// const rect = chart.canvas.getBoundingClientRect();
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
	//  creat sphere according to each lobe button hover, click event
	createLobeSheres = (type) => {
		let me = this;

		// Remove prev spheres
		me.removeSpheres();

		// Add new spheres
		switch (type) {
			case "Frontal_Lobe_node_Frontal_Lobe":
				all_spheres_json[0].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "node_Mesh_16":
				all_spheres_json[2].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "Cerebral_hemispheres_R_node_Cerebral_hemispheres_R":
				all_spheres_json[1].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "Brainstem_Spinal_cord_node_Brainstem_Spinal_cord":
				all_spheres_json[5].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "Temporal_Lobe_node_Temporal_Lobe":
				all_spheres_json[3].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "Cerebellum_node_Cerebellum":
				all_spheres_json[4].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			case "Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex":
				all_spheres_json[6].forEach(function (object, index) {
					var i = parseInt(index + 1);
					me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
				});
				break;
			default:
				break;
		}
	};

	showAllSpheres = () => {
		const me = this;
		all_spheres_json.forEach((ele) => {
			ele.forEach(function (object, index) {
				var i = parseInt(index + 1);
				me.generateSphere(object.x, object.y, object.z, object.value, "pointer" + i);
			})
		});
	};

	generateSphere = (x, y, z, value, sphereName) => {
		if (root) {
			// Add pointer(s) to brain model as children
			// const sphereGeo = new THREE.SphereGeometry(0.003, 32, 32);
			// const sphereMat = new THREE.MeshStandardMaterial({
			// 	color: 0xff0000
			// });
			
			var sphere_material = sphereMat;
			var sphere_geometry = sphereGeo;
			if(value && ENABLE_COLOR_SPHERES)
			{
				sphere_material = sphereMat.clone();
				//sphere_geometry = sphereGeo.clone();
				
				if(value <= SMALL_BOUNDARY)
				{
					sphere_material.color = SMALL_COLOR;
					sphere_geometry = SMALL_GEOMETRY;
				}
				else if(value <= MEDIUM_BOUNDARY)
				{
					sphere_material.color = MEDIUM_COLOR;
					sphere_geometry = MEDIUM_GEOMETRY;
				}
				else if(value <= LARGE_BOUNDARY)
				{
					sphere_material.color = LARGE_COLOR;
					sphere_geometry = LARGE_GEOMETRY;
				}
				else if(value > LARGE_BOUNDARY)
				{
					sphere_material.color = X_LARGE_COLOR;
					sphere_geometry = X_LARGE_GEOMETRY;
				}
			}
			const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
			const pointerPos = new THREE.Vector3(x, y, z);
			// (x, y, z) --> (x, -z, y)
			sphere.position.x += pointerPos.x;
			sphere.position.y += pointerPos.z;
			sphere.position.z -= pointerPos.y;
			sphere.name = sphereName;
			sphere.value = value;

			if(this.spheres_selected == "All")
			{
				sphereContainer.add(sphere);
			}
			else if(this.spheres_selected == "Small" && sphere.material.color == SMALL_COLOR)
			{
				sphereContainer.add(sphere);
			}
			else if(this.spheres_selected == "Medium" && sphere.material.color == MEDIUM_COLOR)
			{
				sphereContainer.add(sphere);
			}
			else if(this.spheres_selected == "Large" && sphere.material.color == LARGE_COLOR)
			{
				sphereContainer.add(sphere);
			}
			else if(this.spheres_selected == "X-Large" && sphere.material.color == X_LARGE_COLOR)
			{
				sphereContainer.add(sphere);
			}
		}
	};

	removeSpheres = () => {

		if (root) {
			for (let i = sphereContainer.children.length - 1; i >= 0; i--) {
				sphereContainer.children[i].geometry.dispose();
				sphereContainer.children[i].material.dispose();
				sphereContainer.remove(sphereContainer.children[i]);
			}

		}
	};

	// lobe button click event, highlight button
	highlightButtons = (type) => {
		// let barColors = defaultBarColors;
		let buttonColors = [];
		switch (type) {
			case "Frontal_Lobe_node_Frontal_Lobe":

				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "front_btn")
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}
				});
				break;
			case "Cerebral_hemispheres_R_node_Cerebral_hemispheres_R":
				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "pariental_btn") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}
				});
				break;
			case "node_Mesh_16":
				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "occipital_btn") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}
				});
				break;
			case "Temporal_Lobe_node_Temporal_Lobe":
				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "temporal_btn") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}
				});
				break;
			case "Cerebellum_node_Cerebellum":
				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "cerebellum_btn") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}

				});
				break;
			case "Brainstem_Spinal_cord_node_Brainstem_Spinal_cord":
				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "stem_btn") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}

				});
				break;
			case "Motor_and_Sensor_Cortex_node_Motor_and_Sensor_Cortex":

				this.state.actionButtons.forEach((ele) => {
					if (ele.id === "motor_and_sensor_cortex") {
						if (isClicked) {
							document.getElementById(ele.id).style.backgroundColor = "#ffff66";
							document.getElementById(ele.id + "a").style.color = "#007bff"
						}
						else {
							document.getElementById(ele.id).style.backgroundColor = "#007bff";
							document.getElementById(ele.id + "a").style.color = "white"
						}
					}
					else {
						document.getElementById(ele.id).style.backgroundColor = "#007bff";
						document.getElementById(ele.id + "a").style.color = "white"
					}

				});
				break;
			default:
				break;
		}


		this.setState({
			buttonColors: buttonColors
		});
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
		if (isClicked) return;
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
			preserveDrawingBuffer: true,
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

		// let me = this;

		// Load&Add brain
		const gltfLoader = new GLTFLoader();
		gltfLoader.load(
			"https://assets.codepen.io/3194077/cloud-viz-brain-Aug-15-2020-V1-Optimized.glb",

			(gltf) => {
				root = gltf.scene;

				const box = new THREE.Box3().setFromObject(root);
				// const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());

				sphereContainer = new THREE.Object3D();
				root.add(sphereContainer);

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

	onMouseClick = (event, type) => {
		if (previousClicked !== type) isClicked = true;
		else isClicked = !isClicked;
		if (event !== "") event.preventDefault();
		this.setState({
			chartHovered: isClicked
		});

		pickedObject = scene.getObjectByName(type, true);
		this.highlightGraphBar(type);
		this.highlightButtons(type);

		this.unHighlightPickedObject();
		prevPickedObject = pickedObject;
		this.highlightPickedObject();
		this.createLobeSheres(type);
		previousClicked = type;

	}

	onMouseHover = (event, type) => {
		if (isClicked) return;
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
		console.log("hover")
	};

	onMouseMove = (event) => {
		// Set pick position
		this.setPickPosition(event);
	};

	onMouseOut = () => {
		if (!isClicked) {
			this.setState({
				barColors: defaultBarColors,
				chartHovered: false
			});
		}

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
	strainMetric = (e, v) => {
		// eslint-disable-next-line
		switch (v.value) {
			case "max-ps":

				all_spheres_json = [];
				all_spheres_json = [...maximumPS]
				break;
			case "min-ps":

				all_spheres_json = [];
				all_spheres_json = [...minimumPS];
				break;
			case "csdm_15":
				all_spheres_json = [];
				all_spheres_json = [...csdm_15]
				break;
			case "csdm_5":
				all_spheres_json = [];
				all_spheres_json = [...csdm_5]
				break;
			case "csdm_10":
				all_spheres_json = [];
				all_spheres_json = [...csdm_10]
				break;
		}
	}

	colored_sphere_click = (type) =>
	{
		if(this.state.colored_spheres_clicked == type )
		{
			this.setState({spheres_selected: "All", colored_spheres_clicked: "All"});
			this.spheres_selected = "All";
		}
		else
		{
			this.setState({spheres_selected: type, colored_spheres_clicked: type});
			this.spheres_selected = type;
		}

		this.removeSpheres();
		this.showAllSpheres();
	}

	colored_sphere_enter = (type) =>
	{
		if(this.state.colored_spheres_clicked != "All")
		{
			return;
		}

		this.setState({spheres_selected: type});
		this.spheres_selected = type;

		this.removeSpheres();
		this.showAllSpheres();
	}

	colored_sphere_leave = (type) =>
	{
		if(this.state.colored_spheres_clicked != "All")
		{
			return;
		}

		this.setState({spheres_selected: "All"})
		this.spheres_selected = "All";


		this.removeSpheres();
		this.showAllSpheres();
	}

	renderStrainMetricMagnitudes() {
		return (
		  <div id="strain-metric-magnitudes" style={{bottom: 25, left: '50%', transform: 'translate(-50%)', width: '100%', display: 'block', zIndex: 20, position: 'relative', textAlign: 'center'}}>	
			<div className="dot-container-small">
			<button id="small-spheres-btn" className="btn btn-primary colored-sphere-btn" style={{backgroundColor: this.state.spheres_selected == "Small" ? "#ffff66" : "#0069d9", color: this.state.spheres_selected == "Small" ? "#007bff" : "white" }}
			 onClick = {()=> {
				this.colored_sphere_click("Small")
			}}
			onMouseEnter = {()=> {
				console.log("MouseEnter")
				this.colored_sphere_enter("Small")
			}}
			onMouseLeave = {()=> {
				console.log("MouseLeave")
				this.colored_sphere_leave("All")
			}}
			>
			  <span className="green dot" />
			  <strong>Small</strong>
			  </button>
			  <div className="small-grey-text">0-2%</div></div>
			
			<div id="medium-spheres-btn" className="dot-container-small">
			<button className="btn btn-primary colored-sphere-btn" style={{backgroundColor: this.state.spheres_selected == "Medium" ? "#ffff66" : "#0069d9", color: this.state.spheres_selected == "Medium" ? "#007bff" : "white" }}
			 onClick = {()=> {
				this.colored_sphere_click("Medium")
			}}
			onMouseEnter = {()=> {
				console.log("MouseEnter")
				this.colored_sphere_enter("Medium")
			}}
			onMouseLeave = {()=> {
				console.log("MouseLeave")
				this.colored_sphere_leave("All")
			}}
			>
			  <span className="orange dot" />
			  <strong>Medium</strong>
			  </button>
			  <div className="small-grey-text">2-5%</div></div>

			<div className="dot-container-small">
			<button id="large-spheres-btn" className="btn btn-primary colored-sphere-btn" style={{backgroundColor: this.state.spheres_selected == "Large" ? "#ffff66" : "#0069d9", color: this.state.spheres_selected == "Large" ? "#007bff" : "white" }}
			onClick = {()=> {
				this.colored_sphere_click("Large")
			}}
			onMouseEnter = {()=> {
				console.log("MouseEnter")
				this.colored_sphere_enter("Large")
			}}
			onMouseLeave = {()=> {
				console.log("MouseLeave")
				this.colored_sphere_leave("All")
			}}
			>
			  <span className="red dot" />
			  <strong>Large</strong>
			  </button>
			  <div className="small-grey-text">5-10%</div></div>

			<div className="dot-container-small">
			<button id="xlarge-spheres-btn" className="btn btn-primary colored-sphere-btn" style={{backgroundColor: this.state.spheres_selected == "X-Large" ? "#ffff66" : "#0069d9", color: this.state.spheres_selected == "X-Large" ? "#007bff" : "white" }}
			 onClick = {()=> {
				this.colored_sphere_click("X-Large")
			}}
			onMouseEnter = {()=> {
				console.log("MouseEnter")
				this.colored_sphere_enter("X-Large")
			}}
			onMouseLeave = {()=> {
				console.log("MouseLeave")
				this.colored_sphere_leave("All")
			}}
			>
			  <span className="black dot" />
			  <strong>X-Large</strong>
			  </button>
			  <div className="small-grey-text">&gt;10%</div></div>
		  </div>
		);
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
						parseFloat(all_spheres_json[0].length),
						parseFloat(all_spheres_json[1].length),
						parseFloat(all_spheres_json[2].length),
						parseFloat(all_spheres_json[3].length),
						parseFloat(all_spheres_json[4].length),
						parseFloat(all_spheres_json[5].length),
						parseFloat(all_spheres_json[6].length)
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
					font: function (context) {
						var width = context.chart.width;
						labelSize = Math.round(width / 20);
						return {
							size: labelSize
						};
					},
					formatter: function (value, context) {
						switch (context.dataIndex) {
							case 0:
								return all_spheres_json[0].length;
								// eslint-disable-next-line
								break;
							case 1:
								return all_spheres_json[1].length;
								// eslint-disable-next-line
								break;
							case 2:
								return all_spheres_json[2].length;
								// eslint-disable-next-line
								break;
							case 3:
								return all_spheres_json[3].length;
								// eslint-disable-next-line
								break;
							case 4:
								return all_spheres_json[4].length;
								// eslint-disable-next-line
								break;
							case 5:
								return all_spheres_json[5].length;
								// eslint-disable-next-line
								break;
							case 6:
								return all_spheres_json[6].length;
								// eslint-disable-next-line
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
							labelString: "Number of Events",
							fontSize: labelSize / 1.8,
							fontColor: "#4c4d4d",
							fontStyle: 'bold'
						},
						ticks: {
							min: 0,
							fontSize: 12
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
						id={this.state.actionButtons[index].id + "a"}
						style={{
							transform:
								window.innerWidth < 1200
									? "rotate(-50deg)"
									: "initial"
						}}
					>
						{window.innerWidth < 992
							? this.state.actionButtons[index].shortenName
							: this.state.actionButtons[index].name}
					</span>
				</button>
			);
		});

		return (
			<React.Fragment>
				<div
					className="row text-center"
					style={{ marginTop: '150px', marginBottom: '10px' }}
				>
					<div className="col-md-1"></div>
					<div className="col-md-4 d-flex align-items-center "  >
						{this.state.isLoading ? (
							<div className="model_loader d-flex justify-content-center center-spinner">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
						<div
							style={{ width: "100%", height: "100%", display: "block" }}
							ref={(ref) => (this.threeCanvasContainer = ref)}
						>
							<canvas id="c" style={{ width: "100%", height: "100%" }}></canvas>
						</div>
					</div>
					<div className="col-md-1 interSect"></div>
					<div id="barChart" className="col-md-5" ref={(ref) => (this.chartContainer = ref)}>
						<Bar data={data} options={options} plugins={this.plugins} />
						<div className="action-btn-container">
							{actionButtons}
						</div>
						<h3 className="chartXlabel">Major Functional Brain Regions</h3>

					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-md-1"></div>
					<div className="col-md-4 d-flex align-items-center " >{this.renderStrainMetricMagnitudes()}</div>
						
				</div>
				<div className="row align-items-center">
					<div className="col-md-1"></div>
					<div className="col-md-4  align-items-center strainMetric"  >

						<div style={{ display: "inline-block" }}>
							<span className="strain_text">Strain Metric:</span>
						</div>
						<div style={{ display: "inline-block"}}>
							<SelectSearch options={this.state.selectOption} value="max-ps" name="language" placeholder="Choose" onChange={(e, v) => {
								this.strainMetric(e, v);
							}} />
						</div>

					</div>




				</div>


				{/* <Footer /> */}
			</React.Fragment>
		);
	}
}

export default DashPage;