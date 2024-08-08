import React from 'react';
import Hint from './Hint';

const GuessRow = ({ guess, hints }) => {
  return (
    <div className="guess-row">
      <img src={guess.icon} alt={guess.name} className="guess-icon" />
      <div className="guess-name">
        {guess.name}
        <div className="tooltip">
          <div><strong>Primary Type:</strong> {guess.primaryType}</div>
          <div><strong>Secondary Type:</strong> {guess.secondaryType}</div>
          <div><strong>Height:</strong> {guess.heightcm} cm</div>
          <div><strong>Weight:</strong> {guess.weightkg} kg</div>
        </div>
      </div>
      <div className="hint-container">
        <div className="hint-value"><Hint status={hints.primaryType} /></div>
        <div className="hint-value"><Hint status={hints.secondaryType} /></div>
        <div className="hint-value"><Hint status={hints.height} /></div>
        <div className="hint-value"><Hint status={hints.weight} /></div>
      </div>
    </div>
  );
};

export default GuessRow;
