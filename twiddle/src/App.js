import React from 'react';
import GameBoard from './components/GameBoard';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <h1>Twiddle</h1>
      <GameBoard />
    </div>
  );
};

export default App;
