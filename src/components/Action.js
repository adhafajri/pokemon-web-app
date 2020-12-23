import React from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";
import forward from "../images/forward.png";
import footstep from "../images/footprints.png";
import gotcha from "../images/gotcha.png";
import "./Action.css";

function Action({ pokemon, isCatching, isSuccessful }) {
  return (
    <>
      <div className="action-pokemon-container">
        <div className="action-pokemon-image-container">
          <img
            className="action-pokemon-image"
            src={isCatching && isSuccessful ? gotcha : footstep}
            alt={isCatching && isSuccessful ? gotcha : footstep}
          />
        </div>
        <div className="action-pokemon-title">
          {isCatching && isSuccessful
            ? "SUCCESSFUL!"
            : !isCatching
            ? "RELEASED!"
            : "FAILED!"}
        </div>
        <div className="action-pokemon-subtitle">
          {isCatching && isSuccessful
            ? "Gotta catch em' all!"
            : !isCatching
            ? "Goodbye friend!"
            : "It ran away..."}
        </div>
        <div className="action-pokemon-button-container">
          {isCatching && isSuccessful ? (
            <Link
              className="action-pokemon-button"
              to={{
                pathname: "/pokemon-details",
                state: { pokemon: pokemon },
              }}
            >
              <img src={forward} alt={forward} />
            </Link>
          ) : (
            <Link
              className="action-pokemon-button"
              to={{
                pathname: "/",
              }}
            >
              <img src={back} alt={back} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Action;
