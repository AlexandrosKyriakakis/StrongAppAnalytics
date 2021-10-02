import React, {useState} from 'react';
import Demo from "./components/Navbar.component.js";
import CSV from "./components/CSV.component.js";
import {Content, Container, Footer, Header, Uploader, InputPicker, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
import TotalVolume from './components/Charts/TotalVolume.component.js';
import BestSets from './components/Charts/BestSets.component.js';
import VolumePerExercise from './components/Charts/VolumePerExercise.component.js';
import PRProgression from './components/Charts/PRProgression.component.js';
import MaxConsecutiveReps from './components/Charts/MaxConsecutiveReps.component.js';
import AllExercises from './middleware/AllExercises.middleware.js';
export default function App() {

  const [showCSV,setShowCSV] = useState(true);
  const [allData,setAllData] = useState();
  const [value,setValue] = useState(null);
  const [showCharts,setShowCharts] = useState(false);
  const Set_Value = (picked_exercise) =>{
    setValue(picked_exercise);
  }
  const CSV_to_Index = (data,fileInfo) => {
    setAllData(data);
    console.log(AllExercises( data ));
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
            <div>
              <CSV CSV_to_Index={CSV_to_Index} changeState={changeState}/>
              
              
            </div>
          )}
          {!showCSV && (
            <div>
              <InputPicker onEntering={()=>{setShowCharts(false)}} onEntered={()=>{setShowCharts(true)}} value={value} onChange={Set_Value} data={AllExercises( allData )} block />
              
            </div>
            )}
          {showCharts && (
            <div>
            <TotalVolume value={value} allData={JSON.stringify(allData)}/>
            <BestSets value={value} allData={JSON.stringify(allData)}/>
            <VolumePerExercise value={value} allData={JSON.stringify(allData)}/>
            <PRProgression value={value} allData={JSON.stringify(allData)}/>
            <MaxConsecutiveReps value={value} allData={JSON.stringify(allData)}/>
            </div>
          )}
        </Content>
        <Footer style={{'display': 'flex', 'justify-content': 'center', 'align-items': 'center'}} >
           <div>@StronngAppAnalytics </div>
        </Footer>
      </Container>
    );   
}

