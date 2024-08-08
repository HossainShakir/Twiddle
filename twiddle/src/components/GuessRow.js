import React from 'react';
import Hint from './Hint';

const GuessRow = ({ guess, hints, animationClass }) => {
  const calculateBST = (loomian) => {
    const { hp, energy, attack, defense, rattack, rdefense, speed } = loomian.stats;
    return hp + energy + attack + defense + rattack + rdefense + speed;
  };

  return (
    <div className={`guess-row ${animationClass}`}>
      <img src={guess.icon} alt={guess.name} className="guess-icon" />
      <div className="guess-name">
        {guess.name}
        <div className="tooltip">
          <div><strong>Type 1:</strong> {guess.primaryType}</div>
          <div><strong>Type 2:</strong> {guess.secondaryType}</div>
          <div><strong>Height:</strong> {guess.heightcm} cm</div>
          <div><strong>Weight:</strong> {guess.weightkg} kg</div>
          <div><strong>BST:</strong> {calculateBST(guess)}</div>
        </div>
      </div>
      <div className="hint-container">
        <div className="hint-value"><Hint status={hints.primaryType} /></div>
        <div className="hint-value"><Hint status={hints.secondaryType} /></div>
        <div className="hint-value"><Hint status={hints.height} /></div>
        <div className="hint-value"><Hint status={hints.weight} /></div>
        <div className="hint-value"><Hint status={hints.bst} /></div> {/* Add BST hint */}
      </div>
    </div>
  );
};

export default GuessRow;
