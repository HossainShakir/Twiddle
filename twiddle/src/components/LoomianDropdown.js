import React, { useState, useRef, useEffect } from 'react';
import loomiansData from '../data/loomians';

const LoomianDropdown = ({ currentGuess, setCurrentGuess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLoomians, setFilteredLoomians] = useState(loomiansData);
  const dropdownRef = useRef(null);

  // Handle click outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setCurrentGuess(value);
    setFilteredLoomians(loomiansData.filter(l => l.name.toLowerCase().includes(value)));
    setIsOpen(true);
  };

  const handleSelect = (loomian) => {
    setCurrentGuess(loomian.name);
    setIsOpen(false);
  };

  const calculateBST = (loomian) => {
    const { hp, energy, attack, defense, rattack, rdefense, speed } = loomian.stats;
    return hp + energy + attack + defense + rattack + rdefense + speed;
  };

  return (
    <div className="loomian-dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        placeholder="Enter Loomian name"
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="dropdown-menu">
          {filteredLoomians.map(loomian => (
            <li key={loomian.name} onClick={() => handleSelect(loomian)} className="dropdown-item">
              <div className="dropdown-name">{loomian.name}</div>
              <div className="dropdown-subdetails">
                <span>{loomian.primaryType} {loomian.secondaryType !== 'None' ? `/${loomian.secondaryType}` : ''},</span>
                <span>{loomian.heightcm} cm,</span>
                <span>{loomian.weightkg} kg,</span>
                <span>{calculateBST(loomian)} BST</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoomianDropdown;
