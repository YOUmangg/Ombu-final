import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Accordion, AccordionPanel } from "flowbite-react";
// import AddInductionNotice from "./IndividualPages/AddInductionNotice.js";
// import "../App.css";
import PopUp from "./PopUp.js";

const Home = () => {
  const [allevents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allInductions, setallInductions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Events");
        const events = await response.json();
        setAllEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const resp = await fetch("/api/Inductions");
        const inductions = await resp.json();
        setallInductions(inductions);
      }
      catch (error) {
        console.error("Error fetching Inductions: ", error);
      }
    }

    fetchData();
    fetchData2();
  }, []); // The empty dependency array ensures that the effect runs once on mount
  console.log(allevents);

  const handleOnClick = (eventData) => {
    if (selectedEvent === null) {
      setSelectedEvent(eventData);
    }
    else {
      setSelectedEvent(null);
    }
  };

  const handleClosePopUp = () => {
    setSelectedEvent(null);
  }
  let date;

  return (
    <motion.div className="Home"
      initial={{ x: '100%' }}
      animate={{ x: 0, transition: { delay: 0.5, duration: 1 } }}
      exit={{ opacity: 0, x: '-100%', transition: { duration: 0.7 } }}
    >
      <div className="EandI">
      <h1>Events</h1>
      <Accordion collapseAll>
        {allevents && allevents.map((val, key) => {
          { date = val.EventDate.toString().split('T', 1) }
          return (
            <Accordion.Panel>
              <Accordion.Title>
                <b>{val.EventName}</b> by <b>{val.OrganizationName}</b>
              </Accordion.Title>
              <Accordion.Content>
                <ul>
                  <li><h4>➡️Description: {val.EventDescription}</h4></li>
                  <li><h4>➡️Venue: {val.EventVenue}</h4></li>
                  <li><h4>➡️Date: {date}</h4></li>
                  <li><h4>➡️Time: {val.EventTime}</h4></li>
                  <li><h4>➡️Registration Link: {val.RegistrationLink} </h4></li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          );
        })}
      </Accordion>
      <div><h1>Induction Notices </h1>
      <Accordion collapseAll>
        {allInductions && allInductions.map((val, key) => {
          return (
            <Accordion.Panel>
              <Accordion.Title>
                <b>{val.OrganizationName}</b>
              </Accordion.Title>
              <Accordion.Content>
                <h4>{val.Description}</h4>
                <h4>Eligibility: {val.Batches} </h4>
                <h4>Apply link: {val.Link ? val.Link : "NA"}</h4>
              </Accordion.Content>
            </Accordion.Panel>
          )
        })}
      </Accordion>
      </div>
      </div>
    </motion.div>
  );
};

export default Home;
