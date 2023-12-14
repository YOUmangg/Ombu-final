import React from "react";
import { motion } from "framer-motion";

//bank se bg ke liye call aaya tha
const TechAssocs = () => {
  return (
    <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0, transition: {delay: 0.5, duration: 1 }}}
    exit={{ opacity: 0, x: '-100%', transition: {duration: 0.7}}}
      className="TechAssocs"
    >
      <h1 className="h1">Technical Associations</h1>
      <ul className="techassocslist">
        <li>Alchemy(chemistry association)</li>
        <li>Association of chemical engineers</li>
        <li>Axiom (Mathematics Association)</li>
        <li>Civil Engineering Association</li>
        <li>Economics Association</li>
        <li>Mechanical and Manufacturing Association</li>
        <li>Panacea (Pharmacy Association)</li>
        <li>Phoenix(EEE, ECE & ENI Association)</li>
        <li>Spectra (Physics Association)</li>
        <li>Synapsis (Biology Association)</li>
      </ul>
    </motion.div>
  );
};

export default TechAssocs;
