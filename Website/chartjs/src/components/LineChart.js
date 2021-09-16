import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export default class LineChart extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				datasets: [{ 
					data: [86,114,106,106,107,111,133],
					label: "Total",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}, { 
					data: [70,90,44,60,83,90,100],
					label: "Accepted",
					borderColor: "#3cba9f",
					backgroundColor: "#71d1bd",
					fill: false,
				}, { 
					data: [10,21,60,44,17,21,17],
					label: "Pending",
					borderColor: "#ffa500",
					backgroundColor:"#ffc04d",
					fill: false,
				}, { 
					data: [6,3,2,2,7,0,16],
					label: "Rejected",
					borderColor: "#c45850",
					backgroundColor:"#d78f89",
					fill: false,
				}
				]
			},
		});
	}
	render() {
		return (
			<div>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}