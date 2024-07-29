// src/components/Spoiler.jsx

import React, { useState } from 'react';

const Spoiler = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility} style={{ marginBottom: '8px' }}>
        {isVisible ? 'Hide Spoiler' : 'Reveal Spoiler'}
      </button>
      {isVisible && <div>{children}</div>}
    </div>
  );
};

export default Spoiler;
