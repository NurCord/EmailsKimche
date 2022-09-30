import React from "react";
import NavBar from './components/navbar/NavBar'
import Form from './components/form/Form';
import ScrollImag from './components/scrollimg/ScrollImag';
import {AppContainer, AppContainerFormNavBar} from './StyledApp'

function App() {
  return (
    <AppContainer >
      <AppContainerFormNavBar>
        <NavBar/>
        <Form/>
      </AppContainerFormNavBar>
      <ScrollImag/>
    </AppContainer>
  );
}

export default App;
