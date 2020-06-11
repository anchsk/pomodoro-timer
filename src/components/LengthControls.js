import React from "react";

//break length & session length > LengthControls
const LengthControls = ({ timerLabel, timerLength, onLengthChange}) => {
  function plusOne() {
    let length = timerLength;
    
    if (length > 0 && length < 60) {
      length = Number(length) + 1;
    }

    onLengthChange(timerLabel, length);
  }

  function minusOne() {
    let length = timerLength;
   
    if (length > 1 && length < 60) {
      length = Number(length) - 1;
    }

    onLengthChange(timerLabel, length);
  }

  return (
    <div id={timerLabel}>
      <p id={`${timerLabel}-label`}>
        {timerLabel.charAt(0).toUpperCase() + timerLabel.slice(1)}{" "}
        Length
      </p>

      <button id={`${timerLabel}-decrement`} onClick={minusOne}>
        -
      </button>

      <p id={`${timerLabel}-length`} className="timerLengthNumber">
        {timerLength}
      </p>

      <button id={`${timerLabel}-increment`} onClick={plusOne}>
        +
      </button>
    </div>
  );
};

export default LengthControls;
