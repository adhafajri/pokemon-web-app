import React from "react";

import pokeball from "../images/pokeball.png";
import "./Loading.css";

function Loading({ text }) {
  return (
    <>
      <div className="loading-container">
        <div className="loading-image-container">
          <img className="loading-image" src={pokeball} alt={pokeball} />
        </div>
        {text && <div className="loading-text">{text}</div>}
      </div>
    </>
  );
}

export default Loading;
