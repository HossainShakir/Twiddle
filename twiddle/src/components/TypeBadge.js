import React from 'react';
import { typeAttributes } from './colors'; // Ensure correct path

const TypeBadge = ({ type, text, style }) => {
    const { color, textColor, icon } = typeAttributes[type] || { color: 'black', textColor: 'white', icon: '' };

    return (
        <div className="type-badge" style={{ ...style, backgroundColor: color, color: textColor }}>
            {icon && <img src={icon} alt={type} style={{ width: '16px', height: '16px', marginRight: '4px' }} />}
            {text || type}
        </div>
    );
};

export default TypeBadge;
