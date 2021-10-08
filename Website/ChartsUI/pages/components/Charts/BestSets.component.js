import React, { Component } from 'react';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import Chart from 'chart.js/auto';
import best_sets from '../../../middleware/best_sets.middleware';

export default class BestSets extends Component {
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
			if (my){
				my.destroy()
			}
         const data =  best_sets( JSON.parse(this.props.allData), this.props.value );
         //console.log(data);
			//console.log(data.total_volume);
			const ctx = this.chartRef.current.getContext("2d");
			const my = new Chart(ctx, {
					type: "line",
					data: {
				labels: data.date,
				datasets: [{ 
					data: data['1RM'],
					label: "Best Sets",
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
				Best Sets of {this.props.value} over time
				</Header>
				<Content style={ContentStyles}>

				<canvas
				style={{paddingBottom:'2%'}}
				id="myChart"
				ref={this.chartRef}
				/>

				<p style={{paddingLeft:'2%',paddingRight:'2%'}}>
					On this Chart we watch the total weight lifted in a workout on {this.props.value} over time.
				</p>

				</Content>
			</div>
			)
		
	}
}