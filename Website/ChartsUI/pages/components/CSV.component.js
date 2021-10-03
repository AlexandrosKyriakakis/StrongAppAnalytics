import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import { readString } from 'react-papaparse'
//import totalVolume from '../middleware/totalVolume.middleware';
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsText(file);
}
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

  constructor(props) {
		super(props);
		this.state = {
		  uploading:false,
      fileInfo:null
		};
	 }
	
   
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
      onUpload={file => {
        this.setState({uploading:true})
        previewFile(file.blobFile, value => {
          this.setState({fileInfo:value})
          console.log(readString(value))
        });
      }}
      draggable>
                <div style={styles}>Click or Drag files to this area to upload</div>
    </Uploader>
      <div>{this.state.fileInfo}</div>
    </div>
  
			)
	}
}