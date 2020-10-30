import React from "react";
import "./menu-icon.css";

const MenuIcon = ({ icon, handleClick }) => {
  return (
    <div className="menu-icon" onClick={handleClick}>
      <img src={icon} />
    </div>
  );
};

export default MenuIcon;
