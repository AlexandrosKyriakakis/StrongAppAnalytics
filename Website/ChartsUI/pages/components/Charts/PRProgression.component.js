import React, { Component } from 'react';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import PR_progression from '../../../middleware/PRProgression.middleware';
export default class PRProgression extends Component {
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
         const data =  PR_progression( beforeData, this.props.value );
         //console.log(data);
			//console.log(data.total_volume);
			const ctx = this.chartRef.current.getContext("2d");
			new Chart(ctx, {
					type: "line",
					data: {
				labels: data.date,
				datasets: [{ 
					data: data['PR'],
					label: "PR over Time",
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
				PR Progression on {this.props.value} over Time
				</Header>
				<Content style={ContentStyles}>

				<canvas
				style={{paddingBottom:'2%'}}
				id="myChart"
				ref={this.chartRef}
				/>

				<p style={{paddingLeft:'2%',paddingRight:'2%'}}>
					On this Chart we watch how often we lift our PR or make a new one on {this.props.value}.
					<p>
						For the calculation of 1RM we used Epley formula. 
						<img style={{paddingLeft:'2%', paddingRight:'2%', filter: 'invert(1)', width: '20vw',}} src='https://wikimedia.org/api/rest_v1/media/math/render/svg/d6b2b0a5969fc4d1cc15870a866de150f4459198'/>
					 assuming
					 <img style={{paddingLeft:'2%', filter: 'invert(1)', width: '8vw',}} src='https://wikimedia.org/api/rest_v1/media/math/render/svg/d4768f00478059a96a6172f8cd280d23e64d205b'/>
					</p>
					
				</p>

				</Content>
			</div>
			)
		
	}
}