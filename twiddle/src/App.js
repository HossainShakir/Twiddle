import React from 'react';
import GameBoard from './components/GameBoard';
import './styles.css';
import twittleModel from './assets/icons/Twittle-model.png'; // Import the image

const App = () => {
  return (
    <div className="App">
      <div className="header-container">
        <img src={twittleModel} alt="Twiddle Model" />
        <h1>Twiddle</h1>
      </div>
      <GameBoard />
    </div>
  );
};

export default App;
