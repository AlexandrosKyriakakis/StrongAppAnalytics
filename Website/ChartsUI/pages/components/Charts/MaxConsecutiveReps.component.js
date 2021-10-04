import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import max_consecutive_reps from '../../../middleware/MaxConsecutiveReps.middleware';

export default class MaxConsecutiveReps extends Component {
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
         const data =  max_consecutive_reps( JSON.parse(this.props.allData), this.props.value );
         //console.log(data);
			//console.log(data.total_volume);
			const ctx = this.chartRef.current.getContext("2d");
			new Chart(ctx, {
					type: "line",
					data: {
				labels: data.date,
				datasets: [{ 
					data: data['most_reps'],
					label: "Max Consecutive Reps",
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