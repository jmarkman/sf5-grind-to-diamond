import React, { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import VisualizationPage from './components/visualizationpage';
import { Route, Routes } from 'react-router-dom';
import DataSetAndTechPage from './components/datasetandtechpage';
import AboutPage from './components/aboutpage';
import { ThemeContext } from './contexts/themecontext';

const App = () => {
  const lightThemeIcon: string = "🌞";
  const darkThemeIcon: string = "🌚";
  const [theme, setTheme] = useState("dark");
  const [themeIcon, setThemeIcon] = useState(lightThemeIcon)
  
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const newThemeIcon = theme === "dark" ? darkThemeIcon : lightThemeIcon;
    setTheme(newTheme);
    setThemeIcon(newThemeIcon);
  };

  return (
    <div>
      <NavBar />
      <div className='position-fixed top-0 end-2 mb-3 me-3'>
        <button className="btn btn-lg py-2 d-flex border border-0 align-items-center" onClick={toggleTheme}>{themeIcon}</button>
      </div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route index path="/" Component={VisualizationPage} />
          <Route path='/dataset' Component={DataSetAndTechPage} />
          <Route path='/about' Component={AboutPage} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
