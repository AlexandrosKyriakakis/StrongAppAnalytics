import React, {useState} from 'react';
import Demo from "./components/Navbar.component.js";
import CSV from "./components/CSV.component.js";
import {Content, Container, Footer, Header, Button} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import TotalVolume from './components/Charts/TotalVolume.component.js';
import BestSets from './components/Charts/BestSets.component.js';
import VolumePerExercise from './components/Charts/VolumePerExercise.component.js';
import PRProgression from './components/Charts/PRProgression.component.js';
import MaxConsecutiveReps from './components/Charts/MaxConsecutiveReps.component.js';
export default function App() {

  const [showCSV,setShowCSV] = useState(true);
  const [allData,setAllData] = useState();
  const CSV_to_Index = (data,fileInfo) => {
    setAllData(data);
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
            <div>
              <TotalVolume allData={JSON.stringify(allData)}/>
              <BestSets allData={JSON.stringify(allData)}/>
              <VolumePerExercise allData={JSON.stringify(allData)}/>
              <PRProgression allData={JSON.stringify(allData)}/>
              <MaxConsecutiveReps allData={JSON.stringify(allData)}/>
            </div>
            )}

        </Content>
        <Footer/>
      </Container>
    );   
}
