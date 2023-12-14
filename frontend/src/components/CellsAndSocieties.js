import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { motion } from "framer-motion";

const Cellsandsoc = () => {
  return (
    <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0, transition: {delay: 0.5, duration: 1 }}}
    exit={{ opacity: 0, x: '-100%', transition: {duration: 0.5}}}
      className="cellsandsoc"
    >
      <h1 className="cellsandsoc-h1">Cells and Societies</h1>
      <ul className="cellsandsoclist">
        <li>BITS Mental Health Support Group</li>
        <li>Trader's Society</li>
        <li>E-cell</li>
        <li>I-cell</li>
        <li>ACC - Academic Counselling Cell</li>
        <li>SARC - Students Alumni Relations Cell</li>
        <li>TEDx BITSHyderabad</li>
      </ul>
    </motion.div>
  );
};

export default Cellsandsoc;
