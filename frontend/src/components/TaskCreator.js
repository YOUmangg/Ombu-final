import React, { useState } from "react";
import useOrganizationStore from "./ZustandStates/OrganizationNameState";
import "../App.css";

//password encryption - bcrypt

const TaskCreator = () => {

  //local states
  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  const [deadline, setDeadline] = useState("");
  const [score, setScore] = useState(null);

  //global states
  const valueOrganization = useOrganizationStore((state) => state.Organization);

  //form submit function
  async function handler(e) {
    e.preventDefault();
    console.log(valueOrganization);

    const newtask = {
      name: taskname,
      username: username,
      description: description,
      roles: roles,
      deadline: deadline,
      score: score,
      organizationName: valueOrganization,
    }

    try {
      
      //check if the username is a member of the organization
      const responseMembers = await fetch("/api/Members")
      const dataMembers = await responseMembers.json();
      const found = dataMembers.find((user) => user.username === username && user.organisationName === valueOrganization)

      if (found) {

        //add the name of the person as well so that you can show it in the progress sheet
        dataMembers.map((val) => {
          if (val.username === username) {
            console.log("wereached here");
            const nameofper = val.name;
            newtask['nameofperson'] = nameofper;
            return;
          }
        })

        //create the task
        const response = await fetch("/api/Tasks", {
          method: "POST",
          body: JSON.stringify(newtask),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          //could not create task :(
          throw new Error(`Error! status: ${response.status}`);
        }
        else {
          //task created vro
          console.log("task created");
        }

      }
      else {
        //username is not a member
        console.log(valueOrganization);
        console.log("not a member");
      }
    } catch (error) {
      console.log("Error:", error);
    }

  };

  return (
    <div className="Task-creator">
      <form onSubmit={(e) => handler(e)}>
        <label className="label-task">Name of the Task:</label>
        <textarea
          value={taskname}
          onChange={(e) => setTaskname(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        ></textarea>
        <label className="label-task">Description of the Task:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            height: "80px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        ></textarea>
        <label className="label-task">Username being allotted:</label>
        <textarea
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        ></textarea>
        <label className="label-task">Roles relevant to:</label>
        <textarea
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        ></textarea>
        <label className="label-task">Deadline:</label>
        <textarea
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
          placeholder="DD/MM/YY"
        ></textarea>
        <label className="label-task">Score:</label>
        <textarea
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            resize: "none",
            overflow: "auto",
          }}
        ></textarea>
        <button type="submit" onClick={(e) => handler(e)}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreator;
