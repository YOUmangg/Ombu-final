import React from "react";
import { NavLink as Link } from "react-router-dom";
import './navbar.css'
const Navbar = () => {
  return (
    <div className="bar">
      <li className="home">
        <Link to="/Homepage">Home</Link>
      </li>
      <li className="clubs">
        <Link to="/Clubs">Clubs</Link>
      </li>
      <li className="departments">
        <Link to="/Departments">Departments</Link>
      </li>
      <li className="techassocs">
        <Link to="/TechnicalAssociations">Technical Associations</Link>
      </li>
      <li className="cellsandsocieties">
        <Link to = "/CellsAndSocieties">Cells and Societies</Link>
      </li>
      <li className="studentbodies">
        <Link to = "/StudentBodies">Student Bodies</Link>
      </li>
    </div>
  );
};

export default Navbar;
