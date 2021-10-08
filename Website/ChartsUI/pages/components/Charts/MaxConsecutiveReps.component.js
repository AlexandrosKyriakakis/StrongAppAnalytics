import React, { Component } from 'react';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
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
		const headerStyles = {
			fontSize: '2vw',
			textAlign: 'center',
			marginTop: '3%',
		 }
		 const ContentStyles = {
			fontSize: '1.6vw',
			textAlign: 'left',
			marginBottom: '3%',
			backgroundColor : '#14161b',
			paddingTop: '1%',
			paddingBottom: '2%',
			textAlign: 'left',
		 }
		//console.log(this.props.allData);
			// Render real UI ...
			return (
				<div>
				<Header style={headerStyles}>
				Max Consecutive Reps of {this.props.value} over time
				</Header>
				<Content style={ContentStyles}>

				<canvas
				style={{paddingBottom:'2%'}}
				id="myChart"
				ref={this.chartRef}
				/>

				<p style={{paddingLeft:'2%',paddingRight:'2%'}}>
					On this Chart we watch the maximum number of consecutive reps at {this.props.value} over time.
				</p>

				</Content>
			</div>
			)
		
	}
}