import React from "react";

import pokeball from "../images/pokeball.png";
import "./Loading.css";

function Loading() {
  return (
    <>
      <div className="loading-container">
        <div className="loading-image-container">
          <img className="loading-image" src={pokeball} alt={pokeball} />
        </div>
      </div>
    </>
  );
}

export default Loading;
