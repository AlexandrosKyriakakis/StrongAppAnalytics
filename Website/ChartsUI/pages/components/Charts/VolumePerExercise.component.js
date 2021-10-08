import React, { Component } from 'react';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
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
			let beforeData = JSON.parse(this.props.allData)
			beforeData.pop()
         const data =  volume_per_exercise( beforeData, this.props.value );
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
			options: {
				scales: {
					x: {
						type: 'time',
					 },
					
					},
		  	}
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
				Total Volume on {this.props.value} over time.
				</Header>
				<Content style={ContentStyles}>

				<canvas
				style={{paddingBottom:'2%'}}
				id="myChart"
				ref={this.chartRef}
				/>

				<p style={{paddingLeft:'2%',paddingRight:'2%'}}>
					On this Chart we watch the total weight lifted on {this.props.value} over time. 
				</p>

				</Content>
			</div>
			)
		
	}
}