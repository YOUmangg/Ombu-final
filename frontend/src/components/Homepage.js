import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const Home = () => {
  return (
    <motion.div className="Home"
    initial={{ x: '100%' }}
    animate={{ x: 0, transition: {delay: 0.5, duration: 1 }}}
    exit={{ opacity: 0, x: '-100%', transition: {duration: 0.7}}}
    >
      <p>
        This is an application created by the students of BITS Pilani, Hyderabad
        Campus. Here, you can find the latest updates about all the events going
        to happen by various organizations of the campus.
      </p>
      <h1>Upcoming events</h1>
      <ul>
        <li>BGMI Tournament by Esports Club</li>
      </ul>
    </motion.div>
  );
};

export default Home;
