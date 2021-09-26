import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import totalVolume from '../middleware/totalVolume.middleware';
export default class LineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  allData: {},
		  ctx:{},
		};
	 }
	
	chartRef = React.createRef();
	
	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		//console.log("Eimai mesa sthn DID UPDATE")
		if (this.props.allData !== prevProps.allData) {
			const data =  JSON.parse(this.props.allData);
			console.log(data.total_volume);
			const ctx = this.chartRef.current.getContext("2d");
			new Chart(ctx, {
					type: "bar",
					data: {
				labels: data.date,
				datasets: [{ 
					data: data.total_volume,
					label: "Total Volume",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill:false
				}
				]
			},
				});
			
		}
	 }
 	componentDidMount() {

		
		
		//console.log(this.props.allData);
	}
	render() {
		//console.log(this.props.allData);
			// Render real UI ...
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