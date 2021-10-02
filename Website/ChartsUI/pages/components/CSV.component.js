import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
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
    const styles = {
      lineHeight: '200px'
    };
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
    <Uploader 
      fileListVisible={false}
      accept=".csv" 
      multiple={false} 
      action={console.log("FAREISASA")} 
      onUpload={(file)=>{console.log(file)}}
      draggable>
                <div style={styles}>Click or Drag files to this area to upload</div>
    </Uploader>
    </div>
  
			)
	}
}