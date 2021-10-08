import React, { Component } from 'react';
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import import_data from '../../middleware/ImportData.middleware';
import { readString } from 'react-papaparse'
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
      lineHeight: '200px',
      opacity: 0.5,
    };
    const headerStyles = {
      fontSize: '4vw',
      textAlign: 'center',
      marginTop: '3%',
  
    }
    const SubtitleStyles = {
      fontSize: '2vw',
      textAlign: 'center',
      marginBottom: '3%',
    }
    const ContentStyles = {
      fontSize: '1.6vw',
      textAlign: 'left',
      marginBottom: '3%',
      backgroundColor : '#232222'
    }
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
      <div>
        <Header style={headerStyles}>
                  Upload Strong App File
        </Header>
        <Header style={SubtitleStyles}>
                  Watch your Workout Progress with usefull Charts
        </Header>
        <div style={styles}>Click or Drag files to this area to upload</div>
        <Content style={ContentStyles}>
        1. Get your data from Strong App
        <img src='' />
        </Content>
      </div>        
    </Uploader>
    </div>
  
			)
	}
}