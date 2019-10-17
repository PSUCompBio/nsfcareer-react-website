import React from 'react';
import { uploadModelRealData } from '../../apis';
import { Button, Modal, Table } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Chart from 'react-google-charts';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GLB from './SoldierMesh.glb';
import ArrowGLB from './ArrowMesh.glb';
import './Model.css';
import { getStatusOfDarkmode } from '../../reducer';


let stage = 0;
let oldx = 0;
let pointArray = [
					// [
					// 	['x', 'p(kpa)'],
					// 	[0, 0],
					// 	[1, 1.72],
					// 	[2, 5.1],
					// 	[3, 17.6],
					// 	[4, 10],
					// 	[5, 39.1],
					// 	[6, 20.56],
					// 	[7, 68.9],
					// ],
					[
						['Time (ms)', 'Pressure (PSI)'],
			    	[-1.8,	0],
						[-1.493419355,	0.024189247],
						[-1.237935484,	0.022124731],
						[-0.905806452,	-0.033892473],
						[-0.624774194,	-0.036163441],
						[-0.39483871,	-0.038021505],
						[-0.267096774,	0.067612903],
						[-0.292645161,	0.467819355],
						[-0.241548387,	1.107406452],
						[-0.267096774,	1.69427957],
						[-0.292645161,	2.414486022],
						[-0.267096774,	3.05427957],
						[-0.292645161,	3.561152688],
						[-0.267096774,	4.200946237],
						[-0.267096774,	5.027612903],
						[-0.241548387,	6.040739785],
						[-0.241548387,	6.787406452],
						[-0.216	,7.373866667],
						[-0.03716129,	6.732421505],
						[0.013935484,	6.012008602],
						[0.090580645,	6.251389247],
						[0.167225806,	5.664103226],
						[0.192774194,	5.130563441],
						[0.218322581,	4.757023656],
						[0.269419355,	4.276610753],
						[0.320516129,	4.062864516],
						[0.422709677,	3.928705376],
						[0.473806452,	3.55495914],
						[0.499354839,	3.261419355],
						[0.627096774,	3.07372043],
						[0.703741935,	2.753101075],
						[0.729290323,	2.406227957],
						[0.75483871	,2.112688172],
						[0.805935484,	1.765608602],
						[0.933677419,	2.084576344],
						[1.010322581,	1.870623656],
						[1.035870968,	1.630417204],
						[1.214709677,	1.65563871],
						[1.214709677,	1.388972043],
						[1.214709677,	1.122305376],
						[1.291354839,	0.988352688],
						[1.316903226,	0.72147957],
					[1.393548387,	0.400860215],
					[1.495741935,	0.186701075],
					[1.495741935,	-0.026632258],
					[1.623483871,	0.239002151],
					[1.674580645,	0.558589247],
					[1.725677419,	0.158176344],
					[1.776774194,	-0.028903226],
					[1.878967742,	0.023604301],
					[1.930064516,	-0.296808602],
					[1.904516129,	-0.589935484],
					[2.006709677,	-0.804094624],
					[2.083354839,	-0.964713978],
					[2.16	,-0.538666667],
					[2.185548387,	-0.165539785],
					[2.185548387,	0.234460215],
					[2.236645161,	0.580713978],
					[2.262193548,	0.927174194],
					[2.313290323,	1.273427957],
					[2.33883871,	1.459888172],
					[2.441032258,	1.059062366],
					[2.517677419,	0.791776344],
					[2.568774194,	0.524696774],
					[2.619870968,	0.177617204],
					[2.696516129,	-0.063002151],
					[2.696516129,	-0.303002151],
					[2.77316129,	0.256378495],
					[2.747612903,	0.70991828],
					[2.798709677,	1.189505376],
					[2.798709677,	1.64283871],
					[2.77316129	,2.016378495],
					[2.798709677,	2.389505376],
					[2.824258065,	2.762632258],
					[2.824258065,	3.429298925],
					[2.926451613,	2.628473118],
					[3.028645161,	2.520980645],
					[3.207483871,	2.332868817],
					[3.258580645,	2.145789247],
					[3.335225806,	1.878503226],
					[3.335225806,	1.878503226],
					[3.437419355,	2.117677419],
					[3.462967742,	1.824137634],
					[3.514064516,	1.317058065],
					[3.56516129	,1.023311828],
					[3.692903226,	1.075612903],
					[3.820645161,	1.234580645],
					[3.871741935,	1.047501075],
					[3.948387097,	0.80688172],
					[3.973935484,	0.593341935],
					[4.101677419,	0.512309677],
					[4.152774194,	0.165230108],
					[4.203870968,	-0.048516129],
					[4.306064516,	-0.209341935],
					[4.433806452,	-0.423707527],
					[4.561548387,	-0.184739785],
					[4.689290323,	-0.345772043],
					[4.817032258,	-0.373470968],
					[4.868129032,	-0.667217204],
					[4.919225806,	-1.040963441],
					[5.021419355,	-1.388455914],
					[5.14916129	,-1.176154839],
					[5.276903226,	-0.83052043],
					[5.379096774,	-1.018012903],
					[5.557935484,	-1.126124731],
					[5.557935484,	-1.312791398],
					[5.660129032,	-1.580283871],
					[5.762322581,	-1.821109677],
					[5.890064516,	-1.475475269],
					[6.043354839,	-1.103380645],
					[6.145548387,	-0.944206452],
					[6.273290323,	-1.26523871],
					[6.426580645,	-1.586477419],
					[6.528774194,	-1.773969892],
					[6.656516129,	-1.401668817],
					[6.860903226,	-1.456653763],
					[6.937548387,	-1.137273118],
					[7.065290323,	-0.71163871],
					[7.065290323,	-0.71163871],
					[7.193032258,	-0.872670968],
					[7.371870968,	-0.927449462],
					[7.52516129	,-1.115354839],
					[7.601806452,	-1.329307527],
					[7.729548387,	-1.517006452],
					[7.857290323,	-1.224705376],
					[8.189419355,	-1.414055914],
					[8.368258065,	-1.655501075],
					[8.496	,-1.8432],
					[8.521548387,	-1.976739785],
					[8.725935484,	-1.765058065],
					[8.981419355,	-1.473789247],
					[9.083612903,	-1.26128172],
					[9.364645161,	-1.236886022],
					[9.441290323,	-0.864172043],
					[9.517935484,	-0.438124731],
					[9.594580645,	-0.225410753],
					[9.798967742,	-0.493729032],
					[9.90116129,	-0.254554839],
					[10.08,	-0.016],
					[10.18219355,	-0.176825806],
					[10.33548387,	-0.178064516],
					[10.41212903,	-0.365350538],
					[10.59096774,	-0.446795699],
					[10.84645161,	-0.315526882],
					[10.99974194,	-0.076765591],
					[11.05083871,	0.136154839],
					[11.20412903,	-0.131750538],
					[11.35741935,	-0.239655914],
					[11.61290323,	-0.135053763],
					[11.8683871	,0.076215054],
					[12.02167742,	-0.031690323],
					[12.20051613,	-0.193135484],
					[12.40490323,	-0.194787097],
					[12.58374194,	-0.569565591],
					[12.73703226,	-0.224137634],
					[12.99251613,	-0.466202151],
					[13.19690323,	-0.227853763],
					[13.37574194,	-0.389298925],
					[13.55458065,	-0.364077419],
					[13.60567742,	-0.231156989],
					[13.75896774,	-0.472395699],
					[13.93780645,	-0.527174194],
					[14.14219355,	-0.66215914],
					[14.32103226,	-0.636937634],
					[14.39767742,	-0.344223656],
					[14.57651613,	-0.319002151],
					[14.70425806,	-0.160034409],
					[14.832	,-0.3744],
					[15.11303226,	-0.536670968],
					[15.36851613,	-0.672068817],
					[15.67509677,	-0.72787957],
					[15.67509677,	-0.72787957],
					[15.95612903,	-0.756817204],
					[16.16051613,	-0.678468817],
					[16.31380645,	-0.786374194],
					[16.31380645,	-0.786374194],
					[16.54374194,	-0.708232258],
					[16.82477419,	-0.470503226],
					[17.08025806,	-0.525901075],
					[17.28464516,	-0.474219355],
					[17.33574194,	-0.314632258],
					[17.54012903,	-0.476283871],
					[17.84670968,	-0.31876129],
					],

					[
						['Time (ms)', 'Pressure (PSI)'],
			    	[-1.8,	0],
						[-1.493419355,	0.024189247],
						[-1.237935484,	0.022124731],
						[-0.905806452,	-0.033892473],
						[-0.624774194,	-0.036163441],
						[-0.39483871,	-0.038021505],
						[-0.267096774,	0.067612903],
						[-0.292645161,	0.467819355],
						[-0.241548387,	1.107406452],
						[-0.267096774,	1.69427957],
						[-0.292645161,	2.414486022],
						[-0.267096774,	3.05427957],
						[-0.292645161,	3.561152688],
						[-0.267096774,	4.200946237],
						[-0.267096774,	5.027612903],
						[-0.241548387,	6.040739785],
						[-0.241548387,	6.787406452],
						[-0.216	,7.373866667],
						[-0.03716129,	6.732421505],
						[0.013935484,	6.012008602],
						[0.090580645,	6.251389247],
						[0.167225806,	5.664103226],
						[0.192774194,	5.130563441],
						[0.218322581,	4.757023656],
						[0.269419355,	4.276610753],
						[0.320516129,	4.062864516],
						[0.422709677,	3.928705376],
						[0.473806452,	3.55495914],
						[0.499354839,	3.261419355],
						[0.627096774,	3.07372043],
						[0.703741935,	2.753101075],
						[0.729290323,	2.406227957],
						[0.75483871	,2.112688172],
						[0.805935484,	1.765608602],
						[0.933677419,	2.084576344],
						[1.010322581,	1.870623656],
						[1.035870968,	1.630417204],
						[1.214709677,	1.65563871],
						[1.214709677,	1.388972043],
						[1.214709677,	1.122305376],
						[1.291354839,	0.988352688],
						[1.316903226,	0.72147957],
					[1.393548387,	0.400860215],
					[1.495741935,	0.186701075],
					[1.495741935,	-0.026632258],
					[1.623483871,	0.239002151],
					[1.674580645,	0.558589247],
					[1.725677419,	0.158176344],
					[1.776774194,	-0.028903226],
					[1.878967742,	0.023604301],
					[1.930064516,	-0.296808602],
					[1.904516129,	-0.589935484],
					[2.006709677,	-0.804094624],
					[2.083354839,	-0.964713978],
					[2.16	,-0.538666667],
					[2.185548387,	-0.165539785],
					[2.185548387,	0.234460215],
					[2.236645161,	0.580713978],
					[2.262193548,	0.927174194],
					[2.313290323,	1.273427957],
					[2.33883871,	1.459888172],
					[2.441032258,	1.059062366],
					[2.517677419,	0.791776344],
					[2.568774194,	0.524696774],
					[2.619870968,	0.177617204],
					[2.696516129,	-0.063002151],
					[2.696516129,	-0.303002151],
					[2.77316129,	0.256378495],
					[2.747612903,	0.70991828],
					[2.798709677,	1.189505376],
					[2.798709677,	1.64283871],
					[2.77316129	,2.016378495],
					[2.798709677,	2.389505376],
					[2.824258065,	2.762632258],
					[2.824258065,	3.429298925],
					[2.926451613,	2.628473118],
					[3.028645161,	2.520980645],
					[3.207483871,	2.332868817],
					[3.258580645,	2.145789247],
					[3.335225806,	1.878503226],
					[3.335225806,	1.878503226],
					[3.437419355,	2.117677419],
					[3.462967742,	1.824137634],
					[3.514064516,	1.317058065],
					[3.56516129	,1.023311828],
					[3.692903226,	1.075612903],
					[3.820645161,	1.234580645],
					[3.871741935,	1.047501075],
					[3.948387097,	0.80688172],
					[3.973935484,	0.593341935],
					[4.101677419,	0.512309677],
					[4.152774194,	0.165230108],
					[4.203870968,	-0.048516129],
					[4.306064516,	-0.209341935],
					[4.433806452,	-0.423707527],
					[4.561548387,	-0.184739785],
					[4.689290323,	-0.345772043],
					[4.817032258,	-0.373470968],
					[4.868129032,	-0.667217204],
					[4.919225806,	-1.040963441],
					[5.021419355,	-1.388455914],
					[5.14916129	,-1.176154839],
					[5.276903226,	-0.83052043],
					[5.379096774,	-1.018012903],
					[5.557935484,	-1.126124731],
					[5.557935484,	-1.312791398],
					[5.660129032,	-1.580283871],
					[5.762322581,	-1.821109677],
					[5.890064516,	-1.475475269],
					[6.043354839,	-1.103380645],
					[6.145548387,	-0.944206452],
					[6.273290323,	-1.26523871],
					[6.426580645,	-1.586477419],
					[6.528774194,	-1.773969892],
					[6.656516129,	-1.401668817],
					[6.860903226,	-1.456653763],
					[6.937548387,	-1.137273118],
					[7.065290323,	-0.71163871],
					[7.065290323,	-0.71163871],
					[7.193032258,	-0.872670968],
					[7.371870968,	-0.927449462],
					[7.52516129	,-1.115354839],
					[7.601806452,	-1.329307527],
					[7.729548387,	-1.517006452],
					[7.857290323,	-1.224705376],
					[8.189419355,	-1.414055914],
					[8.368258065,	-1.655501075],
					[8.496	,-1.8432],
					[8.521548387,	-1.976739785],
					[8.725935484,	-1.765058065],
					[8.981419355,	-1.473789247],
					[9.083612903,	-1.26128172],
					[9.364645161,	-1.236886022],
					[9.441290323,	-0.864172043],
					[9.517935484,	-0.438124731],
					[9.594580645,	-0.225410753],
					[9.798967742,	-0.493729032],
					[9.90116129,	-0.254554839],
					[10.08,	-0.016],
					[10.18219355,	-0.176825806],
					[10.33548387,	-0.178064516],
					[10.41212903,	-0.365350538],
					[10.59096774,	-0.446795699],
					[10.84645161,	-0.315526882],
					[10.99974194,	-0.076765591],
					[11.05083871,	0.136154839],
					[11.20412903,	-0.131750538],
					[11.35741935,	-0.239655914],
					[11.61290323,	-0.135053763],
					[11.8683871	,0.076215054],
					[12.02167742,	-0.031690323],
					[12.20051613,	-0.193135484],
					[12.40490323,	-0.194787097],
					[12.58374194,	-0.569565591],
					[12.73703226,	-0.224137634],
					[12.99251613,	-0.466202151],
					[13.19690323,	-0.227853763],
					[13.37574194,	-0.389298925],
					[13.55458065,	-0.364077419],
					[13.60567742,	-0.231156989],
					[13.75896774,	-0.472395699],
					[13.93780645,	-0.527174194],
					[14.14219355,	-0.66215914],
					[14.32103226,	-0.636937634],
					[14.39767742,	-0.344223656],
					[14.57651613,	-0.319002151],
					[14.70425806,	-0.160034409],
					[14.832	,-0.3744],
					[15.11303226,	-0.536670968],
					[15.36851613,	-0.672068817],
					[15.67509677,	-0.72787957],
					[15.67509677,	-0.72787957],
					[15.95612903,	-0.756817204],
					[16.16051613,	-0.678468817],
					[16.31380645,	-0.786374194],
					[16.31380645,	-0.786374194],
					[16.54374194,	-0.708232258],
					[16.82477419,	-0.470503226],
					[17.08025806,	-0.525901075],
					[17.28464516,	-0.474219355],
					[17.33574194,	-0.314632258],
					[17.54012903,	-0.476283871],
					[17.84670968,	-0.31876129],
					],

					[
						['Time (ms)', 'Pressure (PSI)'],
			    	[-1.8,	0],
						[-1.493419355,	0.024189247],
						[-1.237935484,	0.022124731],
						[-0.905806452,	-0.033892473],
						[-0.624774194,	-0.036163441],
						[-0.39483871,	-0.038021505],
						[-0.267096774,	0.067612903],
						[-0.292645161,	0.467819355],
						[-0.241548387,	1.107406452],
						[-0.267096774,	1.69427957],
						[-0.292645161,	2.414486022],
						[-0.267096774,	3.05427957],
						[-0.292645161,	3.561152688],
						[-0.267096774,	4.200946237],
						[-0.267096774,	5.027612903],
						[-0.241548387,	6.040739785],
						[-0.241548387,	6.787406452],
						[-0.216	,7.373866667],
						[-0.03716129,	6.732421505],
						[0.013935484,	6.012008602],
						[0.090580645,	6.251389247],
						[0.167225806,	5.664103226],
						[0.192774194,	5.130563441],
						[0.218322581,	4.757023656],
						[0.269419355,	4.276610753],
						[0.320516129,	4.062864516],
						[0.422709677,	3.928705376],
						[0.473806452,	3.55495914],
						[0.499354839,	3.261419355],
						[0.627096774,	3.07372043],
						[0.703741935,	2.753101075],
						[0.729290323,	2.406227957],
						[0.75483871	,2.112688172],
						[0.805935484,	1.765608602],
						[0.933677419,	2.084576344],
						[1.010322581,	1.870623656],
						[1.035870968,	1.630417204],
						[1.214709677,	1.65563871],
						[1.214709677,	1.388972043],
						[1.214709677,	1.122305376],
						[1.291354839,	0.988352688],
						[1.316903226,	0.72147957],
					[1.393548387,	0.400860215],
					[1.495741935,	0.186701075],
					[1.495741935,	-0.026632258],
					[1.623483871,	0.239002151],
					[1.674580645,	0.558589247],
					[1.725677419,	0.158176344],
					[1.776774194,	-0.028903226],
					[1.878967742,	0.023604301],
					[1.930064516,	-0.296808602],
					[1.904516129,	-0.589935484],
					[2.006709677,	-0.804094624],
					[2.083354839,	-0.964713978],
					[2.16	,-0.538666667],
					[2.185548387,	-0.165539785],
					[2.185548387,	0.234460215],
					[2.236645161,	0.580713978],
					[2.262193548,	0.927174194],
					[2.313290323,	1.273427957],
					[2.33883871,	1.459888172],
					[2.441032258,	1.059062366],
					[2.517677419,	0.791776344],
					[2.568774194,	0.524696774],
					[2.619870968,	0.177617204],
					[2.696516129,	-0.063002151],
					[2.696516129,	-0.303002151],
					[2.77316129,	0.256378495],
					[2.747612903,	0.70991828],
					[2.798709677,	1.189505376],
					[2.798709677,	1.64283871],
					[2.77316129	,2.016378495],
					[2.798709677,	2.389505376],
					[2.824258065,	2.762632258],
					[2.824258065,	3.429298925],
					[2.926451613,	2.628473118],
					[3.028645161,	2.520980645],
					[3.207483871,	2.332868817],
					[3.258580645,	2.145789247],
					[3.335225806,	1.878503226],
					[3.335225806,	1.878503226],
					[3.437419355,	2.117677419],
					[3.462967742,	1.824137634],
					[3.514064516,	1.317058065],
					[3.56516129	,1.023311828],
					[3.692903226,	1.075612903],
					[3.820645161,	1.234580645],
					[3.871741935,	1.047501075],
					[3.948387097,	0.80688172],
					[3.973935484,	0.593341935],
					[4.101677419,	0.512309677],
					[4.152774194,	0.165230108],
					[4.203870968,	-0.048516129],
					[4.306064516,	-0.209341935],
					[4.433806452,	-0.423707527],
					[4.561548387,	-0.184739785],
					[4.689290323,	-0.345772043],
					[4.817032258,	-0.373470968],
					[4.868129032,	-0.667217204],
					[4.919225806,	-1.040963441],
					[5.021419355,	-1.388455914],
					[5.14916129	,-1.176154839],
					[5.276903226,	-0.83052043],
					[5.379096774,	-1.018012903],
					[5.557935484,	-1.126124731],
					[5.557935484,	-1.312791398],
					[5.660129032,	-1.580283871],
					[5.762322581,	-1.821109677],
					[5.890064516,	-1.475475269],
					[6.043354839,	-1.103380645],
					[6.145548387,	-0.944206452],
					[6.273290323,	-1.26523871],
					[6.426580645,	-1.586477419],
					[6.528774194,	-1.773969892],
					[6.656516129,	-1.401668817],
					[6.860903226,	-1.456653763],
					[6.937548387,	-1.137273118],
					[7.065290323,	-0.71163871],
					[7.065290323,	-0.71163871],
					[7.193032258,	-0.872670968],
					[7.371870968,	-0.927449462],
					[7.52516129	,-1.115354839],
					[7.601806452,	-1.329307527],
					[7.729548387,	-1.517006452],
					[7.857290323,	-1.224705376],
					[8.189419355,	-1.414055914],
					[8.368258065,	-1.655501075],
					[8.496	,-1.8432],
					[8.521548387,	-1.976739785],
					[8.725935484,	-1.765058065],
					[8.981419355,	-1.473789247],
					[9.083612903,	-1.26128172],
					[9.364645161,	-1.236886022],
					[9.441290323,	-0.864172043],
					[9.517935484,	-0.438124731],
					[9.594580645,	-0.225410753],
					[9.798967742,	-0.493729032],
					[9.90116129,	-0.254554839],
					[10.08,	-0.016],
					[10.18219355,	-0.176825806],
					[10.33548387,	-0.178064516],
					[10.41212903,	-0.365350538],
					[10.59096774,	-0.446795699],
					[10.84645161,	-0.315526882],
					[10.99974194,	-0.076765591],
					[11.05083871,	0.136154839],
					[11.20412903,	-0.131750538],
					[11.35741935,	-0.239655914],
					[11.61290323,	-0.135053763],
					[11.8683871	,0.076215054],
					[12.02167742,	-0.031690323],
					[12.20051613,	-0.193135484],
					[12.40490323,	-0.194787097],
					[12.58374194,	-0.569565591],
					[12.73703226,	-0.224137634],
					[12.99251613,	-0.466202151],
					[13.19690323,	-0.227853763],
					[13.37574194,	-0.389298925],
					[13.55458065,	-0.364077419],
					[13.60567742,	-0.231156989],
					[13.75896774,	-0.472395699],
					[13.93780645,	-0.527174194],
					[14.14219355,	-0.66215914],
					[14.32103226,	-0.636937634],
					[14.39767742,	-0.344223656],
					[14.57651613,	-0.319002151],
					[14.70425806,	-0.160034409],
					[14.832	,-0.3744],
					[15.11303226,	-0.536670968],
					[15.36851613,	-0.672068817],
					[15.67509677,	-0.72787957],
					[15.67509677,	-0.72787957],
					[15.95612903,	-0.756817204],
					[16.16051613,	-0.678468817],
					[16.31380645,	-0.786374194],
					[16.31380645,	-0.786374194],
					[16.54374194,	-0.708232258],
					[16.82477419,	-0.470503226],
					[17.08025806,	-0.525901075],
					[17.28464516,	-0.474219355],
					[17.33574194,	-0.314632258],
					[17.54012903,	-0.476283871],
					[17.84670968,	-0.31876129],
					]
				];
let pointArrayClone = [[
    ['x', 'Curve1', 'Curve2', 'Curve3', 'Average'],
    [0, 0, 0, 0, 0],
    [1, 10, 5, 5, 6.3],
    [2, 23, 15, 20, 19],
    [3, 17, 9, 13, 13],
    [4, 18, 10, 19, 16],
    [5, 9, 5, 7, 6.3],
    [6, 11, 3, 7, 7],
    [7, 27, 19, 23, 23],
 ]];			
				
class ModelPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			isLoading: false,
			show_graph: 'none',
			dataPoints1: pointArray[0],
			dataPoints2: pointArray[1],
			dataPoints3: pointArray[2],
			dataPoints4: pointArrayClone[0]
		};
		
		this.generateGraphs = this.generateGraphs.bind(this);
		this.generateClone = this.generateClone.bind(this);
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
	}
	
	handleShowModal = () => {
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
	
		uploadModelRealData(data)
			.then((response) => {
				
				const dataPointsHelmet = [];
				dataPointsHelmet.push(['Time (ms)', 'Pressure (PSI)']);
				
				const dataPointsArm = [];
				dataPointsArm.push(['Time (ms)', 'Pressure (PSI)']);
				
				const dataPointsChest = [];
				dataPointsChest.push(['Time (ms)', 'Pressure (PSI)']);
				
				var results = response.data;
				
				for (var result in results) {
					
					const arr1 = [];
					arr1.push(results[result]['time_msec']);
					arr1.push(results[result]['head_pressure_psi']);
					dataPointsHelmet.push(arr1);
					
					const arr2 = [];
					arr2.push(results[result]['time_msec']);
					arr2.push(results[result]['shoulder_pressure_psi']);
					dataPointsArm.push(arr2);
					
					const arr3 = [];
					arr3.push(results[result]['time_msec']);
					arr3.push(results[result]['chest_pressure_psi']);
					dataPointsChest.push(arr3);
				}
				
				this.setState({
					dataPoints1: dataPointsHelmet,
					dataPoints2: dataPointsArm,
					dataPoints3: dataPointsChest,
					modalShow: false
				});
				
			})
			.catch((err) => {
				alert('Error: ' + err);
			});
	}
  
	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = window.innerWidth;
		const height = window.innerHeight;
		
		const canvas = document.querySelector('#model_block');
		
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
		this.controls.maxPolarAngle  = Math.PI * 0.5;
		
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
				scene.add( gltf.scene );
				
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
		
		pointArray[2] = pointArray[2].map(function(element) {
			return element = element.map(function(element1) {
				if (!isNaN(element1))
				return element1*1.01;
				else
				return element1;
			});
		});
		
		pointArrayClone[0] = pointArrayClone[0].map(function(element) {
			return element = element.map(function(element1) {
				if (!isNaN(element1))
				return element1*1.01;
				else
				return element1;
			});
		});
		
		const dataPoints1 = pointArray[0];
		const dataPoints2 = pointArray[1];
		const dataPoints3 = pointArray[2];
		const dataPoints4 = pointArrayClone[0];
		
		this.setState({
			dataPoints1: dataPoints1,
			dataPoints2: dataPoints2,
			dataPoints3: dataPoints3,
			dataPoints4: dataPoints4
		});
	}
	
	generateClone = () => {
		this.loadModel(ArrowGLB, 'arrow');
	}
	
	render() {
		const graph1Options = {
			title: "",
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Pressure (PSI)", titleTextStyle: {
				color: '#000000'
			}},
			backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			colors: ['#1fc1f7']
		};
		
		const graph2Options = {
			title: "",
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Pressure (PSI)", titleTextStyle: {
				color: '#000000'
			}},
			backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			colors: ['#51fd21']
		};
		
		const graph3Options = {
			title: "",
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Pressure (PSI)", titleTextStyle: {
				color: '#000000'
			}},
			backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			colors: ['#f01e1e']
		};
				
		const cloneOptions = {
			title: "",
			hAxis: { title: "Time (ms)", titleTextStyle: {
				color: '#000000'
			}},
			vAxis: { title: "Pressure (PSI)", titleTextStyle: {
				color: '#000000'
			}},
			backgroundColor: { fill:'transparent' },
			//tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
			legend: "none",
			pointSize: 2,
			animation: {
			    startup: true,
			    easing: 'linear',
			    duration: 500,
			},
			series: {
				0: { color: '#1c91c0' },
				1: { color: '#1c91c0' },
				2: { color: '#1c91c0' },
				3: { color: '#00008b' },
			}
		};
		
		return (
		  <React.Fragment>
			<div className="container align-center__about-page">
				<div class="row">
					 <div className="model_container col-md-8 col-sm-8 padding-about__page text-center">
						<div className={`section-title animated zoomIn`}>
							<h1 ref="h1" className="font-weight-bold">BlastFX Simulator</h1>
						</div>
						<div id="canvas_container">
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
						<div className="chart-container">
							<div className="graph1">
								<Chart
									chartType="LineChart"
									data={this.state.dataPoints1}
									options={graph1Options}
									rootProps={{ 'data-testid': '1' }}
								/>
							</div>
							<div className="graph2">
								<Chart
									chartType="LineChart"
									data={this.state.dataPoints2}
									options={graph2Options}
									rootProps={{ 'data-testid': '2' }}
								/>

							</div>
							<div className="graph3">
								<Chart
									chartType="LineChart"
									data={this.state.dataPoints3}
									options={graph3Options}
									rootProps={{ 'data-testid': '3' }}
								/>
							</div>
							<div className="graph4" style={{ display: this.state.show_graph }}>
								<Chart
									chartType="LineChart"
									data={this.state.dataPoints4}
									options={cloneOptions}
									rootProps={{ 'data-testid': '4' }}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-4 padding-about__page">
					{/*<div>
							<button type="submit" class="generate_graph btn btn-primary" onClick={this.generateGraphs}>Generate Graph</button>
						</div>
						<div>
							<button type="submit" class="tringulate_btn btn btn-primary" onClick={this.generateClone}>Generate Tringulated Loading</button>
						</div>
					<input type="file" name="file" onChange={this.onChangeHandler}/>*/}
						<div className="create_data_block">
							<h2>Create Data</h2>
							<div className="sub_block">
								<div className="button_outer">
								<button type="submit" className="custom_btn btn btn-primary" onClick={this.generateGraphs}>Generate Test Data</button>
									<span>OR</span>
									<button type="button" onClick={this.handleShowModal} className="custom_btn btn btn-primary" >Upload Real Data</button>
								</div>
							</div>
						</div>
						<div className="analyze_data_block">
							<h2>Analyze Data</h2>
							<div className="sub_block">
								<div className="analyze_button_outer">
									<button type="submit" class="custom_btn btn btn-primary" onClick={this.generateClone}>Generate Tringulated Loading</button>
								</div>
								<div className="blast_block">
									<span>Blast Magnitude: </span>
									<span className="result_txt">50 PSI</span>
								</div>
								<div className="loading_block">
									<span>Loading Direction On Head: </span>
									<span className="result_txt">(0.2, 0.34, 0.65)</span>
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
								<Modal.Title id="contained-modal-title-vcenter">
								Upload Real Data
								</Modal.Title> 
						</Modal.Header>
						<Modal.Body>
							<h5>Upload a CSV or XLSX file with the following format</h5>
							<div className="row upload_data_block">
								<div className="col-md-7 col-sm-7">
									<Table bordered >
									  <thead>
										<tr>
										  <th>Time (msec)</th>
										  <th>Head Pressure (Psi)</th>
										  <th>Shoulder Pressure (Psi)</th>
										  <th>Chest Pressure (Psi)</th>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td>t<sub>1</sub></td>
										  <td>p<sup>helmet</sup><sub>1</sub></td>
										  <td>p<sup>arm</sup><sub>1</sub></td>
										  <td>p<sup>chest</sup><sub>1</sub></td>
										</tr>
										<tr>
										  <td>t<sub>2</sub></td>
										  <td>p<sup>helmet</sup><sub>2</sub></td>
										  <td>p<sup>arm</sup><sub>2</sub></td>
										  <td>p<sup>chest</sup><sub>2</sub></td>
										</tr>
										<tr>
										 <td>.</td>
										  <td>.</td>
										  <td>.</td>
										  <td>.</td>
										</tr>
										<tr>
										  <td>t<sub>N</sub></td>
										  <td>p<sup>helmet</sup><sub>N</sub></td>
										  <td>p<sup>arm</sup><sub>N</sub></td>
										  <td>p<sup>chest</sup><sub>N</sub></td>
										</tr>
									  </tbody>
									</Table>
								</div>
								<div className="col-md-5 col-sm-5">
									<input type="file" id="file" name="file" accept=".csv,.xlsx,.xls" onChange={this.onChangeHandler} />
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleCloseModal}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
				
			 </div>
			<Footer />
		  </React.Fragment>
		);
	}
}

export default ModelPage;
