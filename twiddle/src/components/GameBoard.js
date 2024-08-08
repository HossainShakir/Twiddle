import React, { useState } from 'react';
import loomiansData from '../data/loomians';
import GuessRow from './GuessRow';
import LoomianDropdown from './LoomianDropdown';
import '../styles.css';

const GameBoard = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [targetLoomian, setTargetLoomian] = useState(loomiansData[Math.floor(Math.random() * loomiansData.length)]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHeaderAnimation, setShowHeaderAnimation] = useState(false);
  const [shareResult, setShareResult] = useState('');
  const [overlayAnimation, setOverlayAnimation] = useState('');
  const [showResultsOverlay, setShowResultsOverlay] = useState(false);

  const handleGuess = () => {
    const guess = loomiansData.find(l => l.name.toLowerCase() === currentGuess.toLowerCase());
    if (guess) {
      const hints = generateHints(guess, targetLoomian);
      setGuesses([...guesses, { guess, hints, animationClass: 'fade-down' }]);
      setCurrentGuess('');

      if (!showHeaderAnimation) {
        setShowHeaderAnimation(true);
      }

      if (guess.name === targetLoomian.name || guesses.length + 1 >= 7) {
        setOverlayAnimation('fade-down');
        setIsGameOver(true);
        setShowResultsOverlay(true);
      }

      setTimeout(() => {
        setGuesses(prevGuesses => prevGuesses.map((g, index) => 
          index === prevGuesses.length - 1 ? g : { ...g, animationClass: '' }
        ));
      }, 500);
    } else {
      alert('Loomian not found!');
    }
  };

  const generateHints = (guess, target) => {
    const compare = (a, b) => (a === b ? 'correct' : a < b ? 'higher' : 'lower');
    
    const primaryTypeHint = guess.primaryType === target.primaryType ? 'correct' :
                            (guess.primaryType === target.secondaryType && guess.secondaryType !== target.primaryType) ? 'switch' : 'wrong';
    const secondaryTypeHint = guess.secondaryType === target.secondaryType ? 'correct' :
                              (guess.secondaryType === target.primaryType && guess.primaryType !== target.secondaryType) ? 'switch' : 'wrong';
    
    return {
      primaryType: primaryTypeHint,
      secondaryType: secondaryTypeHint,
      height: compare(guess.heightcm, target.heightcm),
      weight: compare(guess.weightkg, target.weightkg),
      bst: compare(calculateBST(guess), calculateBST(target)),
    };
  };
  

  const calculateBST = (loomian) => {
    const { hp, energy, attack, defense, rattack, rdefense, speed } = loomian.stats;
    return hp + energy + attack + defense + rattack + rdefense + speed;
  };

  const startNewGame = () => {
    setOverlayAnimation('fade-up');
    setTimeout(() => {
      setGuesses([]);
      setCurrentGuess('');
      setTargetLoomian(loomiansData[Math.floor(Math.random() * loomiansData.length)]);
      setIsGameOver(false);
      setShowHeaderAnimation(false);
      setShareResult('');
      setOverlayAnimation('');
      setShowResultsOverlay(false);
    }, 500);
  };

  const closeOverlay = () => {
    setOverlayAnimation('fade-up'); // Start fade-up animation
    setTimeout(() => {
      setShowResultsOverlay(false); // Hide the results button after animation completes
      setOverlayAnimation(''); // Reset animation class
    }, 500); // Adjust delay to match the duration of your fade-up animation
  };

  const generateShareResult = () => {
    let result = `Twiddle ${isGameOver && guesses[guesses.length - 1].guess.name === targetLoomian.name ? guesses.length : 'X'}/7\n`;

    guesses.forEach(({ hints }) => {
      const type1Emoji = hints.primaryType === 'correct' ? '🟩' : hints.primaryType === 'switch' ? '➡️' : '🟥';
      const type2Emoji = hints.secondaryType === 'correct' ? '🟩' : hints.secondaryType === 'switch' ? '⬅️' : '🟥';
      const heightEmoji = hints.height === 'correct' ? '🟩' : hints.height === 'higher' ? '🔼' : '🔽';
      const weightEmoji = hints.weight === 'correct' ? '🟩' : hints.weight === 'higher' ? '🔼' : '🔽';
      const bstEmoji = hints.bst === 'correct' ? '🟩' : hints.bst === 'higher' ? '🔼' : '🔽';

      result += `${type1Emoji}${type2Emoji}${heightEmoji}${weightEmoji}${bstEmoji}\n`;
    });

    setShareResult('Result copied to clipboard!');
    navigator.clipboard.writeText(result);

    setTimeout(() => {
      setShareResult('');
    }, 2000);
  };

  return (
    <div className="game-board">
      {guesses.length > 0 && (
        <div className={`header-row ${showHeaderAnimation ? 'fade-down' : ''}`}>
          <div className="header-item"></div>
          <div className="header-item">Type 1</div>
          <div className="header-item">Type 2</div>
          <div className="header-item">Height</div>
          <div className="header-item">Weight</div>
          <div className="header-item">BST</div>
        </div>
      )}

      {guesses.map(({ guess, hints, animationClass }, index) => (
        <GuessRow key={index} guess={guess} hints={hints} animationClass={animationClass} />
      ))}
      
      {!isGameOver && (
        <div className="input-container">
          <LoomianDropdown currentGuess={currentGuess} setCurrentGuess={setCurrentGuess} />
          <button className="guess-button" onClick={handleGuess} disabled={guesses.length >= 7}>
            Guess
          </button>
        </div>
      )}
      
      {showResultsOverlay && (
        <div className={`overlay ${overlayAnimation}`}>
          <div className="overlay-content">
          <button className="close-overlay-button" onClick={closeOverlay}>Close</button>
            <h2>The Loomian to be guessed was:</h2>
            <div className="loomian-details">
              <img src={targetLoomian.icon} alt={targetLoomian.name} />
              <p>Name: {targetLoomian.name}</p>
              <p>Primary Type: {targetLoomian.primaryType}</p>
              <p>Secondary Type: {targetLoomian.secondaryType}</p>
              <p>Height: {targetLoomian.heightcm} cm</p>
              <p>Weight: {targetLoomian.weightkg} kg</p>
              <p>BST: {calculateBST(targetLoomian)}</p>
            </div>
            <button className="new-game-button" onClick={startNewGame}>Start New Game</button>
            <button className="share-button" onClick={generateShareResult}>Share</button>
            {shareResult && (
              <div className="share-result">
                <p>{shareResult}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {isGameOver && !showResultsOverlay && (
        <button className="results-button" onClick={() => {
          setOverlayAnimation('fade-down');
          setShowResultsOverlay(true);
        }}>
          Results
        </button>
      )}
    </div>
  );
};

export default GameBoard;
