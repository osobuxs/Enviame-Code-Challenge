import React from "react";
import "./navbarMarvel.css";
import logo from "../../assets/marvel-logo.png";

function NavbarMarvel() {
  return (
    <div>
      <img
        alt=""
        src={logo}
        width="210"
        height="70"
        className="logoNav"
      />
      <h1 className="tituloNav">A continuacion una lista con los superheroes de marvel ordenado en orden alfabetico</h1>
    </div>
  );
}

export default NavbarMarvel;
