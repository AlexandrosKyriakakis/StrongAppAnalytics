import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import volume_per_exercise from '../../../middleware/VolumePerExercise.middleware';
export default class VolumePerExercise extends Component {
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
		if (this.props.value !== prevProps.value) {
         const data =  volume_per_exercise( JSON.parse(this.props.allData), this.props.value );
         //console.log(data);
			//console.log(data.total_volume);
			const ctx = this.chartRef.current.getContext("2d");
			new Chart(ctx, {
					type: "line",
					data: {
				labels: data.date,
				datasets: [{ 
					data: data['volume'],
					label: "Total Volume Per Exercise",
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