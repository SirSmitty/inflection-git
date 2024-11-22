import React from 'react';
import './header.css';

import wordmarkwL from '../../assets/wordmarkwL.svg'; // Adjust the path as needed

const HeaderComponent = () => {
    return (
        <div className="wordmark-header">
            <img src={wordmarkwL} alt="Inflection Wordmark" />
        </div>
    );
};

export default HeaderComponent;