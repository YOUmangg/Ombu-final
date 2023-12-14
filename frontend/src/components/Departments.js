import React from "react";
import "../App.css";
import { motion } from "framer-motion";

function Departments() {
  return (
    <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0, transition: {delay: 0.5, duration: 1 }}}
    exit={{ opacity: 0, x: '-100%', transition: {duration: 0.7}}}
      className="Departments"
    >
      <h1 className="Departments-h1">Departments</h1>
      <ul className="Departmentslist">
        <li>Department of Sponsorship and Marketing</li>
        <li>Department of Technical Arts</li>
        <li>Department of Publicity and Public Relations</li>
        <li>Department of Professional Events</li>
        <li>Department of Security and Hospitality</li>
        <li>Department of Recreational Activities</li>
        <li>Department of Arts and Decoration</li>
        <li>Department of Controlz</li>
        <li>Department of Lights and Sound</li>
        <li>Department of Photography</li>
        <li>Department of Publicity and Public Affairs</li>
        <li>Department of Security and Hospitality</li>
        <li>Department of Sponsorship and Marketing</li>
        <li>Department of Technical Activities</li>
        <li>Department of Visual Effects</li>
        <li>Department of Professional Events</li>
        <li>Department of Recreational Activities</li>
        <li>Department of Firewallz</li>
      </ul>
    </motion.div>
  );
}

export default Departments;
