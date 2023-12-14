import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const StudentBodies = () => {
  return (
    <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0, transition: {delay: 0.5, duration: 1 }}}
    exit={{ opacity: 0, x: '-100%', transition: {duration: 0.5}}}
      className="studbodies"
    >
      <h1>Student Bodies</h1>
      <ul className="studbodieslist">
        <li>VMC</li>
        <li>SMC</li>
        <li>RAF</li>
      </ul>
    </motion.div>
  );
};

export default StudentBodies;
