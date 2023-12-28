import React, { useState } from "react";
import useEventsStore from "../ZustandStates/EventsState";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import "./AddEvents.css";

const AddEvents = () => {

  //local states
  const [EventName, setEventName] = useState("");
  const [EventDescription, setEventDescription] = useState("");
  const [EventTime, setEventTime] = useState("");
  const [EventVenue, setEventVenue] = useState("");
  const [RegistrationLink, setRegistrationLink] = useState("");
  const [Date, setDate] = useState(null);

  //global states
  const eventHeadliner = useEventsStore((state) => state.Event);
  const seteventHeadliner = useEventsStore((state) => state.setEventState);
  const OrganizationName = useOrganizationStore((state) => state.Organization);
  const setOrganizationName = useOrganizationStore((state) => state.setOrganizationState);

  if(OrganizationName === "")
  {
    const stored = localStorage.getItem('OrganizationName');
    if(stored){
    setOrganizationName(localStorage.getItem('OrganizationName'));
    }
  }
  else{
    localStorage.setItem('OrganizationName', OrganizationName);
  }
  // localStorage.setItem('OrganizationName', OrganizationName);
  // const stored = localStorage.getItem('OrganizationName');
  // stored ? JSON.parse(stored) : '';
  // console.log(OrganizationName);

  //form submit actions
  const handler = async (e) => {
    e.preventDefault();
    const event = {
      "EventName" : EventName, 
      "EventDescription" : EventDescription, 
      "EventDate" : Date.toISOString(),
      "EventTime" : EventTime, 
      "EventVenue" : EventVenue, 
      "RegistrationLink" : RegistrationLink, 
      "OrganizationName": OrganizationName
    };
    //post directly. If you want to check for something, try checking if the exact object exists in the database or not. 
    //Also, how do you make an event automatically get deleted? well not deleted, but you need to check for the event time and
    // the current time. if the current time is greater than event time, don't display it on the homepage. //this needs to be added
    //on the homepage.
    try{
      const response = await fetch("/api/Events", {
        method : "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application/json",
        },
      });
      if(!response.ok){
        console.log("could not") //could not add the event
        throw new Error(`Error! status: ${response.status}`)
      }
      else{
        console.log("did it");
      }
    }
    catch (error){
      console.log("Error: ", error);
    }
    seteventHeadliner(EventName);
  }

  return (
    <div className="form">
      <form onSubmit = { handler}>
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
        <div className="EventDate-div">
          <label> Event Date: </label>
          < DatePicker selected={Date} onChange={(Date) => setDate(Date)} />
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
        <button type = "submit">Create New Event</button>
      </form>
    </div>
  );
};

export default AddEvents;
