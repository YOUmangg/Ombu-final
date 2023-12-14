import React, { useState } from "react";
import useEventsStore from "../ZustandStates/EventsState";
import "./AddEvents.css";

const AddEvents = () => {

  //local states
  const [EventName, setEventName] = useState(null);
  const [EventDescription, setEventDescription] = useState(null);
  const [EventTime, setEventTime] = useState(null);
  const [EventVenue, setEventVenue] = useState(null);
  const [RegistrationLink, setRegistrationLink] = useState(null);

  //global states
  const eventHeadliner = useEventsStore((state) => state.Event);
  const seteventHeadliner = useEventsStore((state) => state.setEventState);

  //form submit actions
  function handler(e) {
    e.preventDefault();
    seteventHeadliner(EventName);
  }

  return (
    <div className="form">
      <form onSubmit = {(e) => handler}>
        <div className="EventName-div">
        <label >Event Name: </label>
        <input
          value={EventName}
          onChange={(e) => setEventName(e.target.value)}
        ></input>
        </div>
        <div className="EventDescription-div">
        <label>Event Description: </label>
        <input
          value={EventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></input>
        </div>
        <div className="EventTime-div">
        <label>Event Time: </label>
        <input
          value={EventTime}
          onChange={(e) => setEventTime(e.target.value)}
        ></input>
        </div>
        <div className="EventVenue-div">
        <label>Event venue: </label>
        <input
          value={EventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
        ></input>
        </div>
        <div className="RegistrationLink-div">
        <label>Registration Link: </label>
        <input
          value={RegistrationLink}
          onChange={(e) => setRegistrationLink(e.target.value)}
        ></input>
        </div>
        <button>Create New Event</button>
      </form>
    </div>
  );
};

export default AddEvents;
