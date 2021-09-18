import React from 'react';
import Demo from "./components/Navbar.js";
import LineChart from "./components/LineChart.js";
import CSV from "./components/CSV.js";
import {Content, Container, Footer, Header} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';

export default function App() {
  
    return (
      <Container>
        <Header>

        <Demo/>
        </Header>
        <Content>

          <CSV/>

          <LineChart />
        </Content>
        <Footer/>
      </Container>
    );   
}
