import React, { useState } from "react";
import "./ButtonArray.css";

const ButtonArray = ({ commonNames, buttonStyle }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (text) => {
    setSelectedButton(text === selectedButton ? null : text);
    console.log(text);
  };

  return (
    <div className="button-array">
      {commonNames.map((text, index) => (
        <div key={index} className="button-container">
          <button style={buttonStyle} onClick={() => handleButtonClick(text)}>
            {text}
          </button>
          {selectedButton === text && (
            <div className="additional-info">
              <p>Additional information for {text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonArray;
