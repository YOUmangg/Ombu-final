import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import AddInductionNotice from "./IndividualPages/AddInductionNotice.js";
import "../App.css";
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
      <div className="EandI">
        <div className="EventsHome">
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
        </div>
        <div className="InductionsHome">
          <h1>Induction Notices</h1>
          {/* {allInductions && {
            (<div>no</div>)
          }
          }; */}
          <ul>
            {allInductions && allInductions.map((val, key) => {
              return (
                <div>
                  <button>{val.OrganizationName}</button>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
