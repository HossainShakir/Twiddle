import React, { useState } from 'react';
import loomiansData from '../data/loomians';
import GuessRow from './GuessRow';
import LoomianDropdown from './LoomianDropdown';
import '../styles.css';

const GameBoard = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [targetLoomian] = useState(loomiansData[Math.floor(Math.random() * loomiansData.length)]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = () => {
    const guess = loomiansData.find(l => l.name.toLowerCase() === currentGuess.toLowerCase());
    if (guess) {
      const hints = generateHints(guess, targetLoomian);
      setGuesses([...guesses, { guess, hints }]);
      setCurrentGuess('');

      if (guess.name === targetLoomian.name || guesses.length + 1 >= 6) {
        setIsGameOver(true);
      }
    } else {
      alert('Loomian not found!');
    }
  };

  const generateHints = (guess, target) => {
    const compare = (a, b) => (a === b ? 'correct' : a < b ? 'higher' : 'lower');

    return {
      primaryType: guess.primaryType === target.primaryType ? 'correct' : 'wrong',
      secondaryType: guess.secondaryType === target.secondaryType ? 'correct' : 'wrong',
      height: compare(guess.heightcm, target.heightcm),
      weight: compare(guess.weightkg, target.weightkg),
    };
  };

  return (
    <div className="game-board">
      {/* Header Row */}
      <div className="header-row">
        <div className="header-item"></div> {/* Empty cell for Loomian icon */}
        <div className="header-item">Type 1</div>
        <div className="header-item">Type 2</div>
        <div className="header-item">Height</div>
        <div className="header-item">Weight</div>
      </div>
      
      {/* Guess Rows */}
      {guesses.map(({ guess, hints }, index) => (
        <GuessRow key={index} guess={guess} hints={hints} />
      ))}
      
      {/* Input Container */}
      {!isGameOver && (
        <div className="input-container">
          <LoomianDropdown currentGuess={currentGuess} setCurrentGuess={setCurrentGuess} />
          <button className="guess-button" onClick={handleGuess} disabled={guesses.length >= 6}>
            Guess
          </button>
        </div>
      )}
      
      {/* Game Over */}
      {isGameOver && (
        <div className="target-loomian">
          <h2>The Loomian to be guessed was:</h2>
          <div className="loomian-details">
            <img src={targetLoomian.icon} alt={targetLoomian.name} />
            <p>Name: {targetLoomian.name}</p>
            <p>Primary Type: {targetLoomian.primaryType}</p>
            <p>Secondary Type: {targetLoomian.secondaryType}</p>
            <p>Height: {targetLoomian.heightcm} cm</p>
            <p>Weight: {targetLoomian.weightkg} kg</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
