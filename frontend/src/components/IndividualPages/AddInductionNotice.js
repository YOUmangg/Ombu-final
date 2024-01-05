import React, { useState } from "react";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import "../Pages/AddEvents.css";
// import "../src/App.css";

const AddInductionNotice = () => {

  //local states
  const [Description, setDescription] = useState("");
//   const [Time, EventTime] = useState("");
  const [Venue, setVenue] = useState("");
  const [Link, setLink] = useState("");
  const [Deadline, setDeadline] = useState(null);
  const [Batches, setBatches] = useState("All");
  const [Time, setTime] = useState('7:00');

  //global states
//   const eventHeadliner = useEventsStore((state) => state.Event);
//   const seteventHeadliner = useEventsStore((state) => state.setEventState);
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
    const Induction = {
    //   "EventName" : EventName, 
      "Description" : Description, 
    //   "Deadline" : Deadline,
      "Deadline" : Deadline.toISOString(),
      "Batches" : Batches, 
      "Venue" : Venue, 
      "Link" : Link, 
      "OrganizationName": OrganizationName
    };
    //post directly. If you want to check for something, try checking if the exact object exists in the database or not. 
    //Also, how do you make an event automatically get deleted? well not deleted, but you need to check for the event time and
    // the current time. if the current time is greater than event time, don't display it on the homepage. //this needs to be added
    //on the homepage.
    try{
      const response = await fetch("/api/Inductions", {
        method : "POST",
        body: JSON.stringify(Induction),
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
    // seteventHeadliner(EventName);
  }

  return (
    <div className="form">
      <form onSubmit = { handler }>
        <div className="EventDescription-div">
        <label>Description: </label>
        <input
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        </div>
        <div className="EventDate-div">
          <label> Deadline: </label>
          <DatePicker selected={Deadline} onChange={(Deadline) => setDeadline(Deadline)} />
        </div>
        <div className="EventVenue-div">
        <label>Eligibility: </label>
        <input
          value={Batches}
          onChange={(e) => setBatches(e.target.value)}
        ></input>
        </div>
        <div className="EventVenue-div">
        <label>Venue: </label>
        <input
          value={Venue}
          onChange={(e) => setVenue(e.target.value)}
        ></input>
        </div>
        <div className="RegistrationLink-div">
        <label>Link: </label>
        <input
          value={Link}
          onChange={(e) => setLink(e.target.value)}
        ></input>
        </div>
        <button type = "submit">Create Induction Notice </button>
      </form>
    </div>
  );
};

export default AddInductionNotice;
