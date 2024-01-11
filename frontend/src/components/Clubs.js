import React from "react";
import "../App.css";
import GeneralPage from "./IndividualPages/AllGeneralPage";
import useOrganizationStore from "./ZustandStates/OrganizationNameState";
import { Link } from "react-router-dom";
import { HistoryRouterProps } from "react-router-dom";
import { motion } from "framer-motion";

const Clubs = () => {

  //converting all into clickable buttons and on click rendering individual components by changed global state variable.
  const valueOrganization = useOrganizationStore((state) => state.Organization);
  const valueSetOrganization = useOrganizationStore((state) => state.setOrganizationState);

  const handleClick = async (x) => {
    await valueSetOrganization(x);
  }
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0, transition: { delay: 0.5, duration: 1 } }}
      exit={{ opacity: 0, x: '-100%', transition: { duration: 0.5 } }}
    >
      <div className="Clubs">
        <h1 className="Clubs-h1">Clubs</h1>
      </div>
      <ul className="clublist">
        <li><button onClick={() => handleClick("Comedy Club")}><Link to = "/AllGeneralPage">Comedy Club</Link></button></li>
        <li><button onClick={() => handleClick("Cooking Club")}><Link to = "/AllGeneralPage">Cooking Club</Link></button></li>
        <li>Dance Club</li>
        <li>Designer's Club</li>
        <li>Dramatics Club</li>
        <li>English Language Activities' Society</li>
        <li>
          <Link to="/EsportsClub">Esports Club</Link>
        </li>
        <li>Hindi Tarang</li>
        <li>Journal Club</li>
        <li>Movie Club</li>
        <li>Music Club</li>
        <li>Photog Club</li>
        <li>Quiz Club</li>
        <li>Fashion Club</li>
        <li>Sanskrit and Foreign languages Club</li>
        <li>Shades (art Club)</li>
        <li>Swaranjali</li>
        <li>VFx Club (Video effects and Editing)</li>
        <li>Ad Astra</li>
        <li>Automation and Robotics Club</li>
        <li>The Wall Street Club</li>
        <li>Crux</li>
        <li>BITS Hyderabad Consulting Group</li>
        <li>Aeolus</li>
        <li>Students for the Exploration and Development of Space</li>
        <li>IEEE</li>
        <li>Society of Automotive Engineering</li>
      </ul>
    </motion.div>
  );
};

export default Clubs;
