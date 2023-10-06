import React from 'react';
import NavBar from './components/navbar';
import VisualizationPage from './components/visualizationpage';
import { Route, Routes } from 'react-router-dom';
import DataSetPage from './components/datasetpage';
import AboutPage from './components/aboutpage';

const App = () => {
  return (
    <body>
      <NavBar />
      <Routes>
        <Route index path="/" Component={VisualizationPage} />
        <Route path='/dataset' Component={DataSetPage} />
        <Route path='/about' Component={AboutPage} />
      </Routes>
      {/* <SiteBody /> */}
    </body>
  );
}

export default App;
