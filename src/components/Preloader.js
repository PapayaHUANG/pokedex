import React, { memo } from 'react';
import '../styles/Card.css';

const Preloader = ({ children }) => {
  const spinner = <div className="spinner"></div>;

  return (
    <div className="preloaderWrap">
      {children}
      {spinner}
    </div>
  );
};

export default memo(Preloader);
