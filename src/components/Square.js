import React from 'react';

const Square = (props) => {
  let bgColor = '';
  let fillColor;
  if (props.value === 'X') fillColor = 'red';
  else if (props.value === 'O') fillColor = 'green';

  if (props.colorType === 0) {
    bgColor = '#D1DCDC';
  } else if (props.colorType === 1) {
    bgColor = '#F7F43E';
  }

  const handleClickSquare = () => {
    props.onClick();
  };

  return (
    <button
      onClick={handleClickSquare}
      className="square"
      style={{ color: fillColor, backgroundColor: bgColor }}
    >
      {props.value}
    </button>
  );
};

export default Square;
