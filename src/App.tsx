import React from 'react';
import NavBar from './components/navbar';
import VisualizationPage from './components/visualizationpage';
import { Route, Routes } from 'react-router-dom';
import DataSetAndTechPage from './components/datasetandtechpage';
import AboutPage from './components/aboutpage';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route index path="/" Component={VisualizationPage} />
        <Route path='/dataset' Component={DataSetAndTechPage} />
        <Route path='/about' Component={AboutPage} />
      </Routes>
    </div>
  );
}

export default App;
