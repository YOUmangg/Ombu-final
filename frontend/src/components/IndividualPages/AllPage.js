import React, { useEffect, useState } from "react";
import "./EsportsClubIndividualPage.css";
import { NavLink as Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressSheet from "../ProgressSheet";
import useMembersStore from "../ZustandStates/MembersListState";
import useProgressSheetStore from "../ZustandStates/ProgressSheetState";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";

const IndividualPage = () => {

  //need to keep a variable which tells if the user logging in is an admin or not

  //local states
  const [members, setMembers] = useState("");
  const [important, setImportant] = useState("");

  //global states
  const valueMem = useMembersStore((state) => state.Members);
  const valueSet = useMembersStore((state) => state.setMembersState);
  // const valueSetProgress = useProgressSheetStore((state) => state.setProgressState);
  // const valueProgress = useProgressSheetStore((state) => state.Progress);
  const valueSetProgress = useProgressSheetStore((state) => state.setProgressState);
  const valueProgress = useProgressSheetStore((state) => state.Progress);
  const OrganizationName = useOrganizationStore((state) => state.Organization);
  const setOrganizationName = useOrganizationStore((state) => state.setOrganizationState);

  //update important points
  const handleUpdate = () => { };

  //update ongoing tasks
  const handleongoingtasks = () => { };

 //the useEffect block was not working when user pressed back from add members or some other page. so, used this async function 
 //instead.
 useEffect(() => {
  const checker = async () => {
    console.log("i reached checker");
    try {
      if (OrganizationName === '') {
      console.log("here");
      setOrganizationName(localStorage.getItem('org'));
    }
    else {
      console.log("else");
      localStorage.setItem('org', OrganizationName);
    }
  }catch{
    console.log("error");
  }
  }
  const fetchData = async () => {
    try {
      console.log("organization name new part", OrganizationName);
      const response = await fetch(`/api/Members/MembersList?OrganizationName=${OrganizationName}`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const resp2 = await fetch(`/api/Tasks/find?organization=${OrganizationName}`);
      const data2 = await resp2.json();
      console.log("this", valueProgress);
      console.log("i reached this use effect");
      valueSetProgress(data2);
    }
    catch (error) {
      console.error("error : ", error);
    }
  }
  checker();
  fetchData();
  fetchData2();
}, []);

  //giving the value of members to the global state
  const givevalue = (members) => {
     valueSet(members);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0", transition: { duration: 1 } }}
      exit={{ opacity: 0, y: "100%", transition: { duration: 0.7 } }}
      className="EsportsIndividual"
    >
      <div className="first-row">
        <div className="Important-topics">
          <h3>Important</h3>
          <textarea
            style={{
              width: "300px",
              height: "300px",
              resize: "none",
              overflow: "auto",
            }}
            onChange={(e) => setImportant(e.target.value)}
            value={important}
            placeholder="Write hot-topics for your organization here"
          ></textarea>
          <button onClick={handleUpdate}>Update Important Topics</button>
        </div>
        <img
          className="Esportsimgh"
          src="../../../EsportsClubLogo.jpg"
          alt="logo"
        />
      </div>
      <div className="createtask11">
        <Link to="../TaskCreator">
          <img
            className="createtask"
            src="../../../CreateTask.png"
            alt="addtask"
          ></img>
        </Link>
      </div>
      {givevalue(members)}
      <Link to="../MembersList">
        <button>Members List</button>
      </Link>
      {/* the below console.log() is just for checking */}
      {/* {console.log(valueMem)} */}
      <Link to="/AddEvents">
        <button>Add Events</button>
      </Link>
      <Link to="/AddMembers">
        <button>Add Members</button>
      </Link>
      <Link to = "/AddInductionNotice">
        <button>Create Induction Notice</button>
      </Link>
      <ProgressSheet></ProgressSheet>
    </motion.div>
  );
};

export default IndividualPage;
