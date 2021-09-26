import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
//import totalVolume from '../middleware/totalVolume.middleware';


const papaparseOptions = {
   header: true,
   dynamicTyping: true,
   skipEmptyLines: true,
   transformHeader: header =>
     header
       .toLowerCase()
       .replace(/\W/g, '_')
 };
export default class CSV extends Component {


	
   
	componentDidMount() {

	}
	render() {
		return (

      <div>
      {this.props.changeState}
      {this.props.CSV_to_Index}
      <CSVReader
      cssClass="csv-reader-input"
      label="Select CSV with secret Death Star statistics"
      onFileLoaded={(data,fileInfo)=>{this.props.changeState();this.props.CSV_to_Index(data,fileInfo);}}
      onError={this.handleDarkSideForce}
      parserOptions={papaparseOptions}
      inputId="ObiWan"
      inputName="ObiWan"
      inputStyle={{color: 'red'}}
    />
    </div>
  
			)
	}
}