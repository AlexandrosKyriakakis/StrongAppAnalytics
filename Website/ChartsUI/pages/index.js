import React, {useState} from 'react';
import Demo from "./components/Navbar.component.js";
import LineChart from "./components/LineChart.component.js";
import CSV from "./components/CSV.component.js";
import {Content, Container, Footer, Header, Button} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import totalVolume from './middleware/totalVolume.middleware'

export default function App() {

  const [showCSV,setShowCSV] = useState(true);
  const [allData,setAllData] = useState();
  const CSV_to_Index = (data,fileInfo) => {
    setAllData(totalVolume(data));
  }
  const changeState = () => {
    setShowCSV(!showCSV)
  }
    return (
      <Container>
        <Header>

        <Demo/>
        </Header>
        <Content>
          {showCSV && (
            <CSV CSV_to_Index={CSV_to_Index} changeState={changeState}/>
          )}
          {!showCSV && (
            <LineChart allData={JSON.stringify(allData)}/>
            )}

        </Content>
        <Footer/>
      </Container>
    );   
}
