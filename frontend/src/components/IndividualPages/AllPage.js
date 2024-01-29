import React, { useEffect, useState } from "react";
import "./EsportsClubIndividualPage.css";
import { NavLink as Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Table } from 'flowbite-react';
import ProgressSheet from "../ProgressSheet";
import useMembersStore from "../ZustandStates/MembersListState";
import useProgressSheetStore from "../ZustandStates/ProgressSheetState";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";

const IndividualPage = () => {

  //need to keep a variable which tells if the user logging in is an admin or not

  //local states
  const [members, setMembers] = useState("");
  const [important, setImportant] = useState("");
  const [progress, setProgress] = useState("");
  const [isAdmin, setisAdmin] = useState(false); //set this to true or false to show update / create tasks features on
  //the page

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
  const handleUpdate = async () => { 
    try {
      console.log("imp before send", important);
      const response = await fetch(`/api/Pages/hottopics?organizationName=${OrganizationName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ HotTopics: important }),
      });

      if (response.ok) {
        const updatedData = await response.json().HotTopics;
        setImportant(updatedData);
        console.log("response was ok");
      } else {
        console.error('Error updating field');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
    console.log("temp", important);
  };

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
      } catch {
        console.log("error");
      }
    }
    const page = async () => {
      try {
        const response = await fetch(`/api/Pages/page?organizationName=${OrganizationName}`);
        const data = await response.json();
        console.log("data.hot", data.HotTopics);
        if (data) 
        {
          setImportant(data.HotTopics);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    }
    //MembersList
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

    //progress Sheet
    const fetchData2 = async () => {
      try {
        const resp2 = await fetch(`/api/Tasks/find?organization=${OrganizationName}`);
        const data2 = await resp2.json();
        console.log("this", valueProgress);
        console.log("i reached this use effect");
        setProgress(data2);
        console.log("progress set to", progress);
        valueSetProgress(data2);
      }
      catch (error) {
        console.error("error : ", error);
      }
    }
    checker();
    page();
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
          <Button onClick={handleUpdate}>Update Important Topics</Button>
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
        <Button>Members List</Button>
      </Link>
      {/* the below console.log() is just for checking */}
      {/* {console.log(valueMem)} */}
      <Link to="/AddEvents">
        <Button>Add Events</Button>
      </Link>
      <Link to="/AddMembers">
        <Button>Add Members</Button>
      </Link>
      <Link to="/AddInductionNotice">
        <Button>Create Induction Notice</Button>
      </Link>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            Username
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Tasks done
          </Table.HeadCell>
          <Table.HeadCell>
            Score
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {progress && progress.map((val, key) => {
            return(
              // console.log("reachedddddd");
            <Table.Row key ={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* console.log("reacheddd too"); */}
                <Table.Cell>{val.username}</Table.Cell>
                <Table.Cell>{val.nameofperson}</Table.Cell>
                <Table.Cell>{val.name}</Table.Cell>
                <Table.Cell>{val.score}</Table.Cell>
            </Table.Row>
          );
          })}
        </Table.Body>
      </Table>
      {/* <ProgressSheet></ProgressSheet> */}
    </motion.div>
  );
};

export default IndividualPage;
