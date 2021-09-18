import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';

const handleForce = (data, fileInfo) => console.log(data, fileInfo);

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
      <CSVReader
      cssClass="csv-reader-input"
      label="Select CSV with secret Death Star statistics"
      onFileLoaded={handleForce}
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