import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { GET_MY_POKEMONS } from "../graphql/graphql-pokeapi";
import "./Navbar.css";
import logo from "../images/logo.svg";
import compass from "../images/compass.png";
import backpack from "../images/backpack.png";
import back from "../images/back.png";

function Navbar() {
  const [isDetailsPageActive, setDetailsPageActive] = useState(false);
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 960px)` });
  const isActive = () => (match) => {
    if (match) {
      onActive(true);
    } else {
      onActive(false);
    }
    return;
  };

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          if (location.pathname === "/catch-pokemon") {
            history.replace("/");
          } else {
            setLocationKeys(([_, ...keys]) => keys);
          }
        } else {
          if (location.pathname === "/catch-pokemon") {
            history.replace("/");
          } else {
            setLocationKeys((keys) => [location.key, ...keys]);
          }
        }
        isActive();
      }
    });
  }, [locationKeys]);

  return (
    <>
      <nav
        className={!isDetailsPageActive && isMobile ? "display-none" : "navbar"}
      >
        <div className="navbar-container">
          <Link
            to="/"
            className={
              isDetailsPageActive && isMobile ? "display-none" : "navbar-logo"
            }
          >
            <img src={logo} className="img-logo" alt="logo" />
          </Link>
          <ul className={isMobile ? "navbar-menu flex-start" : "navbar-menu"}>
            <li
              className={
                isDetailsPageActive && isMobile ? "navbar-item" : "display-none"
              }
            >
              <a className="navbar-links back" onClick={handleBackClick}>
                <NavItem img={back} text="BACK" />
              </a>
            </li>
            <li
              className={
                isDetailsPageActive && isMobile ? "display-none" : "navbar-item"
              }
            >
              <NavLink
                isActive={isActive()}
                className="display-none"
                to="/pokemon-details"
              />
              <NavLink className="navbar-links" to="/" exact>
                <NavItem img={compass} text="EXPLORE" />
              </NavLink>
            </li>
            <li
              className={
                isDetailsPageActive && isMobile ? "display-none" : "navbar-item"
              }
            >
              <NavLink className="navbar-links" to="/my-pokemon-list">
                <NavItem img={backpack} text="MY POKEMON LIST" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <nav
        className={
          isDetailsPageActive || isMobile ? "navbar-bottom" : "display-none"
        }
      >
        <div className="navbar-container">
          <ul className="navbar-menu">
            <li
              className={
                isDetailsPageActive && !isMobile
                  ? "display-none"
                  : "navbar-item"
              }
            >
              <NavLink className="navbar-links" to="/" exact>
                <NavItem img={compass} text="EXPLORE" />
              </NavLink>
            </li>
            <li
              className={
                isDetailsPageActive && !isMobile
                  ? "display-none"
                  : "navbar-item"
              }
            >
              <NavLink className="navbar-links" to="/my-pokemon-list">
                <NavItem img={backpack} text="MY POKEMON LIST" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );

  function onActive(bool) {
    setDetailsPageActive(bool);
  }

  function handleBackClick() {
    history.goBack();
  }
}

function NavItem({ img, text }) {
  return (
    <>
      <img src={img} className="img-item" alt={img} />
      <p className="navbar-text">{text}</p>
    </>
  );
}

export default Navbar;
