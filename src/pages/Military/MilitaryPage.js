import React, { Component } from 'react';

import Chart from 'react-google-charts';
import "./military.css";

let stage = 0;
let oldx = 0;
let pointArray = [
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 1.72],
						[2, 5.1],
						[3, 17.6],
						[4, 10],
						[5, 39.1],
						[6, 20.56],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 1.72],
						[2, 41],
						[3, 17.1],
						[4, 32.5],
						[5, 25],
						[6, 51],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 1.72],
						[2, 36.3],
						[3, 12.6],
						[4, 45],
						[5, 30.6],
						[6, 60	],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 1.72],
						[2, 23.1],
						[3, 9.8],
						[4, 35.6],
						[5, 50],
						[6, 40],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 40.72],
						[2, 20.1],
						[3, 50.8],
						[4, 25.6],
						[5, 60],
						[6, 42],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 1.72],
						[2, 50.1],
						[3, 25.8],
						[4, 10.6],
						[5, 45],
						[6, 20],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 31.72],
						[2, 5.1],
						[3, 17.8],
						[4, 40.6],
						[5, 24],
						[6, 57],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 20.72],
						[2, 10.1],
						[3, 50.8],
						[4, 12.6],
						[5, 40],
						[6, 5],
						[7, 68.9],
					],
					[
						['x', 'p(kpa)'],
						[0, 0],
						[1, 30.72],
						[2, 19.1],
						[3, 45.8],
						[4, 34.6],
						[5, 67],
						[6, 30],
						[7, 68.9],
					]
				];

class Military extends Component {
	constructor(props) {
        super(props);
		this.rotateImage360 = this.rotateImage360.bind(this);
		this.generateGraphs = this.generateGraphs.bind(this);
		
		this.state = {
			dataPoints1: pointArray[0],
			dataPoints2: pointArray[1],
			dataPoints3: pointArray[2]
		}
	}
	
	componentDidMount() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = document.getElementById('image' + stage);
		
		img.onload = () => {
			canvas.width = document.getElementById("left-container").offsetWidth;
			canvas.height = document.getElementById("left-container").offsetHeight;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			//ctx.font = "40px Courier";
		}
		
		document.addEventListener('mousemove', this.handleMouseMove, false);
		document.addEventListener('mousehover', this.handleMouseHover, false);
		document.addEventListener('mouseup', this.handleMouseUp, false);
		
		/*setInterval(() => {
			stage++;
			if (!document.getElementById('image' + stage)) {
				stage = 0;
			}
			this.rotateImage360();
		}, 300); */
		
		this.refs.canvas.style.cursor='pointer';
	}
	
	componentWillUnmount = () => {
		document.removeEventListener('mousemove', this.handleMouseMove, false);
		document.addEventListener('mousehover', this.handleMouseHover, false);
		document.removeEventListener('mouseup', this.handleMouseUp, false);
	};
	
	handleMouseDown = event => {
		
		this.setState({
			dragging: true,
			dragStart: event.screenX,
		});
		
		this.refs.canvas.style.cursor='w-resize';
	};
	
	handleMouseUp = () => {
	    this.setState({ dragging: false });
		this.refs.canvas.style.cursor='pointer';
	};
	
	handleMouseHover = () => {
		this.refs.canvas.style.cursor='pointer';
	}
	
	handleMouseMove = event => {
	  if (this.state.dragging) {
		  
		//const position = event.screenX;
		// <-- update your image index
		
		if (event.pageX < oldx) {
            stage--;
			//console.log(stage);
			if (!document.getElementById('image' + stage)) {
				stage = 47;
			}
        } else if (event.pageX > oldx) {
           stage++;
		
			if (!document.getElementById('image' + stage)) {
				stage = 0;
			}
        }
		 
		oldx = event.pageX;
		
		this.rotateImage360();
		
	  }
	};
	
	// Rotate Image 360
    rotateImage360(e) {
        
		//console.log(stage);
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = document.getElementById('image' + stage);
		
		canvas.width = document.getElementById("left-container").offsetWidth;
		canvas.height = document.getElementById("left-container").offsetHeight;
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		//ctx.font = "40px Courier";
	}
	
	generateGraphs() {
		const dataPoints1 = pointArray[Math.floor(Math.random() * pointArray.length)];
		const dataPoints2 = pointArray[Math.floor(Math.random() * pointArray.length)];
		const dataPoints3 = pointArray[Math.floor(Math.random() * pointArray.length)];

		this.setState({
			dataPoints1: dataPoints1,
			dataPoints2: dataPoints2,
			dataPoints3: dataPoints3
		});
	}
			
    render() {
		
		const options = {
			title: "",
			hAxis: { title: "t(ms)", titleTextStyle: {
				color: '#FF0000'
			}},
			vAxis: { title: "p(kpa)", titleTextStyle: {
				color: '#FF0000'
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
		};
		
	    return (
		    <div className="main-container">
				<div className="left-container" id="left-container">
					<div id="canvas-Container">
						<div className="chart-container">
							<div className="graph1">
								<Chart
									width={'300px'}
									height={'200px'}
									chartType="LineChart"
									loader={<div>Loading Chart</div>}
									data={this.state.dataPoints1}
									options={options}
									rootProps={{ 'data-testid': '1' }}
								/>
							</div>
							<div className="graph2">
								<Chart
									width={'300px'}
									height={'200px'}
									chartType="LineChart"
									loader={<div>Loading Chart</div>}
									data={this.state.dataPoints2}
									options={options}
									rootProps={{ 'data-testid': '2' }}
								/>
								
							</div>
							<div className="graph3">
								<Chart
									width={'300px'}
									height={'200px'}
									chartType="LineChart"
									loader={<div>Loading Chart</div>}
									data={this.state.dataPoints3}
									options={options}
									rootProps={{ 'data-testid': '3' }}
								/>
							</div>
							
						</div>	
						<canvas ref="canvas" onMouseDown={this.handleMouseDown} />
					</div>
					
					<div className="hidden">
						<img id="image0" alt="img" src='360images/Render_00000.png' />
						<img id="image1" alt="img" src='360images/Render_00001.png' />
						<img id="image2" alt="img" src='360images/Render_00002.png' />
						<img id="image3" alt="img" src='360images/Render_00003.png' />
						<img id="image4" alt="img" src='360images/Render_00004.png' />
						<img id="image5" alt="img" src='360images/Render_00005.png' />
						<img id="image6" alt="img" src='360images/Render_00006.png' />
						<img id="image7" alt="img" src='360images/Render_00007.png' />
						<img id="image8" alt="img" src='360images/Render_00008.png' />
						<img id="image9" alt="img" src='360images/Render_00009.png' />
						<img id="image10" alt="img" src='360images/Render_00010.png' />
						<img id="image11" alt="img" src='360images/Render_00011.png' />
						<img id="image12" alt="img" src='360images/Render_00012.png' />
						<img id="image13" alt="img" src='360images/Render_00013.png' />
						<img id="image14" alt="img" src='360images/Render_00014.png' />
						<img id="image15" alt="img" src='360images/Render_00015.png' />
						<img id="image16" alt="img" src='360images/Render_00016.png' />
						<img id="image17" alt="img" src='360images/Render_00017.png' />
						<img id="image18" alt="img" src='360images/Render_00018.png' />
						<img id="image19" alt="img" src='360images/Render_00019.png' />
						<img id="image20" alt="img" src='360images/Render_00020.png' />
						<img id="image21" alt="img" src='360images/Render_00021.png' />
						<img id="image22" alt="img" src='360images/Render_00022.png' />
						<img id="image23" alt="img" src='360images/Render_00023.png' />
						<img id="image24" alt="img" src='360images/Render_00024.png' />
						<img id="image25" alt="img" src='360images/Render_00025.png' />
						<img id="image26" alt="img" src='360images/Render_00026.png' />
						<img id="image27" alt="img" src='360images/Render_00027.png' />
						<img id="image28" alt="img" src='360images/Render_00028.png' />
						<img id="image29" alt="img" src='360images/Render_00029.png' />
						<img id="image30" alt="img" src='360images/Render_00030.png' />
						<img id="image31" alt="img" src='360images/Render_00031.png' />
						<img id="image32" alt="img" src='360images/Render_00032.png' />
						<img id="image33" alt="img" src='360images/Render_00033.png' />
						<img id="image34" alt="img" src='360images/Render_00034.png' />
						<img id="image35" alt="img" src='360images/Render_00035.png' />
						<img id="image36" alt="img" src='360images/Render_00036.png' />
						<img id="image37" alt="img" src='360images/Render_00037.png' />
						<img id="image38" alt="img" src='360images/Render_00038.png' />
						<img id="image39" alt="img" src='360images/Render_00039.png' />
						<img id="image40" alt="img" src='360images/Render_00040.png' />
						<img id="image41" alt="img" src='360images/Render_00041.png' />
						<img id="image42" alt="img" src='360images/Render_00042.png' />
						<img id="image43" alt="img" src='360images/Render_00043.png' />
						<img id="image44" alt="img" src='360images/Render_00044.png' />
						<img id="image45" alt="img" src='360images/Render_00045.png' />
						<img id="image46" alt="img" src='360images/Render_00046.png' />
						<img id="image47" alt="img" src='360images/Render_00047.png' />
					</div>

				</div>
				<div className="right-container">
					<button className="generate-graph-section" title="Generate Graph" onClick={this.generateGraphs} >Generate Graph</button>
				</div>
			</div>
		
	    )
    }
}
export default Military
