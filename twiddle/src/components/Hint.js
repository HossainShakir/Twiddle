import React from 'react';

const Hint = ({ status }) => {
  const icons = {
    correct: require('../assets/icons/DiscCorrect.png'),
    wrong: require('../assets/icons/DiscX.png'),
    higher: require('../assets/icons/DiscUp.png'),
    lower: require('../assets/icons/DiscDown.png'),
    switch: require('../assets/icons/DiscSwitch.png'),
  };

  return <img src={icons[status]} alt={status} className="hint-icon" />;
};

export default Hint;
