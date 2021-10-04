import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import import_data from '../middleware/ImportData.middleware';
import { readString } from 'react-papaparse'
//import totalVolume from '../middleware/totalVolume.middleware';
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsText(file);
}

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
    <Uploader

      fileListVisible={false}
      accept=".csv" 
      multiple={false} 
      onUpload={file => {
        this.setState({uploading:true})
        previewFile(file.blobFile, value => {
          this.setState({fileInfo:value})
          console.log(import_data( readString(value).data ))
          this.props.changeState()
          this.props.CSV_to_Index(import_data( readString(value).data ),this.state.fileInfo)
        });
      }}
      draggable>
                <div style={styles}>Click or Drag files to this area to upload</div>
    </Uploader>
    </div>
  
			)
	}
}