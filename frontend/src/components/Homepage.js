import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../App.css";
import PopUp from "./PopUp.js";

const Home = () => {
  const [allevents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once on mount
  console.log(allevents);

  const handleOnClick = (eventData) => {
     if(selectedEvent === null)
     {
      setSelectedEvent(eventData);
     }
     else{
      setSelectedEvent(null);
     }
    //  setSelectedEvent(eventData);
    //  return (<PopUp data={eventData}></PopUp>);
  };

  const handleClosePopUp = () => {
    setSelectedEvent(null);
  }


  return (
    <motion.div className="Home"
      initial={{ x: '100%' }}
      animate={{ x: 0, transition: { delay: 0.5, duration: 1 } }}
      exit={{ opacity: 0, x: '-100%', transition: { duration: 0.7 } }}
    >
      <p>
        This is an application created by the students of BITS Pilani, Hyderabad
        Campus. Here, you can find the latest updates about all the events going
        to happen by various organizations of the campus.
      </p>
      <h1>Upcoming events</h1>
      <ul>
        {allevents.map((val, key) => {
          return (
            //onClick, open a dialog box, giving more details about the event.
            <div>
            <button onClick={() => handleOnClick(val)} key={key}><strong>{val.EventName}</strong> &nbsp; by &nbsp; <strong>{val.OrganizationName}</strong> &nbsp; on &nbsp; {val.EventDate}</button>
            {selectedEvent && selectedEvent === val && (
              <div className="popup-overlay" onClick={handleClosePopUp}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <PopUp data={selectedEvent} />
                </div>
              </div>
            )}</div>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Home;
