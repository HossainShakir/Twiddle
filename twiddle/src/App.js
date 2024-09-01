import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './styles.css';
import twittleModel from './assets/icons/Twittle-model.png'; 

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <div className="header-container">
        <img src={twittleModel} alt="Twiddle Model" />
        <h1>Twiddle</h1>
      </div>
      <GameBoard />
    </div>
  );
};

export default App;
