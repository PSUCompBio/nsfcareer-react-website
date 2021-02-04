import React from 'react';
import { Scatter } from 'react-chartjs-2';



class TeamStateScatterChart extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        const { team , organization, brand} = this.props.teamData;

        window.addEventListener('scroll', function(){
            var tooltipEl = document.getElementById('chartjs-tooltip');
            if (tooltipEl) {
                tooltipEl.style.opacity = 0;
                return;
            }
        });
        console.log('props', this.props);
        let values = []
        let max_axlation = this.props.MAX_ANGULAR_EXLARATION
        let mps_95 = this.props.MPS_95_DATA

        for (var i = 0; i < max_axlation.length; i++) {
            values.push({ 'x': max_axlation[i].val, 'y': mps_95[i] });
        }
        console.log('values', values)
        const data = {

            datasets: [
                {
                    label: '95% MPS Angular Acceleration',
                    data: values,
                    backgroundColor: "rgb(0 123 255 / 63%)",
                    pointRadius: 5,
                    pointHoverRadius: 10,
                }
            ]
        };

        // filter player id ...
        function filterPlayerId(values, angAcc) {
            // console.log(values, angAcc)
          return values.val == angAcc;
        }
        
        
        //Customize tooltip of chart ...
        var customTooltips = function (tooltip) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = "<table></table>"
                document.getElementById('root').appendChild(tooltipEl);
            }
            // Hide if no tooltip
            // if (tooltip.opacity === 0) {
            //     console.log('reutrn null')
            //     tooltipEl.style.opacity = 0;
            //     return;
            // }
            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltip.yAlign) {
                tooltipEl.classList.add(tooltip.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }
            function getBody(bodyItem) {
                return bodyItem.lines;
            }
            // Set Text
            if (tooltip.body) {
                var titleLines = tooltip.title || [];
                var bodyLines = tooltip.body.map(getBody);
                //PUT CUSTOM HTML TOOLTIP CONTENT HERE (innerHTML)
                var innerHtml = '<thead>';
                titleLines.forEach(function (title) {
                    innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';
                bodyLines.forEach(function (body, i) {
                    var newbody = body[0].replace('(', '');
                    newbody = newbody.replace(')', '');
                    var colors = tooltip.labelColors[i];
                    var style = 'background:' + colors.backgroundColor;
                    style += '; border-color:' + colors.borderColor;
                    style += '; border-width: 2px';
                    style += '; margin-left: 5px';
                    var angAcc = newbody.split(',')[0];
                    let player_id = max_axlation.filter((value)=>filterPlayerId(value,angAcc));
                    // console.log('player_id',player_id)
                    player_id =  player_id[0] ?  player_id[0].player_id : '';
                    angAcc = parseFloat(angAcc);
                    // console.log('angAcc',angAcc)
                    var mps = parseFloat(newbody.split(',')[1]);
                    var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                    innerHtml += '<tr><td>PlayerID:</td><td><a href="/TeamAdmin/user/dashboard/1/'+player_id+'?team='+team[0]+'&org='+organization+'&brand='+brand+'" target="_blank">'+player_id+'</a></td></tr>';
                    innerHtml += '<tr><td>Ang.Acc:</td><td>' + span + angAcc.toFixed(2) + '</td></tr>';
                    innerHtml += '<tr><td>95%MPS:</td><td>' + span + mps.toFixed(2) + '</td></tr>';
                });
                innerHtml += '</tbody>';
                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }
            var position = this._chart.canvas.getBoundingClientRect();
            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = position.left + tooltip.caretX + 'px';
            tooltipEl.style.top = position.top + tooltip.caretY + 'px';
            tooltipEl.style.fontSize = tooltip.fontSize;
            tooltipEl.style.fontStyle = tooltip._fontStyle;
            tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        }
        const options = {
            tooltips: {
                enabled: false,
                mode: 'index',
                position: 'nearest',
                custom: customTooltips
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',

                    scaleLabel: {
                        display: true,
                        fontSize: 18,
                        fontWeight: 800,

                        // labelString: 'Ang Acc (rad/s2)'
                    },
                }],
                yAxes: [{
                    type: 'linear',

                    scaleLabel: {
                        display: true,
                        fontSize: 18,
                        labelString: '95% MPS'
                    },
                }]
            },
            plugins: {
                datalabels: {
                    color: "#007bff",
                    display: false,

                },
            }
        }
        return (
            <div className="">
                <Scatter data={data} options={options} />
            </div>
        );
    }
}

export default TeamStateScatterChart;
