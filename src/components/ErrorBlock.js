import React from 'react';

const ErrorBlock = ({text, error}) => {
  return (
    <div>
      <h3>{text}</h3>
      <h4>{error}</h4>
    </div>
  );
};

export default ErrorBlock;