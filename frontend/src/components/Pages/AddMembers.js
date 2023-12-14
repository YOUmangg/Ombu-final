import React from "react";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import "./AddMembers.css";
import { useState } from "react";

const AddMembers = () => {
    //global states
    const valueOrganization = useOrganizationStore((state) => state.Organization);

    //local states
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [admin, setadmin] = useState(false);
    const [roles, setroles] = useState("");
    const [memstatus, setmemstatus] = useState(0);

    //add new member
    async function addMember(e) {
        e.preventDefault();

        const addmember = { name: name, username: username, roles: roles, isAdmin: admin, organisationName: valueOrganization };

        //verify if the user exists
        try {
            const responseUsers = await fetch("/api/Newusers");
            const dataUsers = await responseUsers.json();
            const found = dataUsers.find((user) => user.Username === username && user.Name === name);

            //if user exists, add to the organization
            if (found) {

                //add the phonenumber of the person as well so that you can show it in the members list
                dataUsers.map((val) => {
                    if(val.Username === username){
                    const phonenumber = val.Phonenumber;
                    addmember.phonenumber = phonenumber;
                    return;
                }
            })
                //check if the user is already a member?
                const responseMembers = await fetch("/api/Members");
                const dataMembers = await responseMembers.json();
                const found = dataMembers.find((user) => user.username === username && user.organisationName === valueOrganization)

                if(found)
                {
                    //notify that the user is already a member of the organization
                    console.log("consumed");
                    setmemstatus(2); //user is already a member
                    return;
                }

                //not a member, add the person
                const response = await fetch("/api/Members", {
                    method: "POST",
                    body: JSON.stringify(addmember),
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                if (!response.ok) {
                    setmemstatus(3);   //could not add the user as member
                    throw new Error(`Error! status: ${response.status}`);
                }
                else {
                    setmemstatus(1);   //successfully added the user as member
                    console.log("successbaby");
                }
            }
            else {
                setmemstatus(4);      //the user doesn't exist
                console.log("notfound")
            }
        } catch (error) {
            console.log("Error:", error);
        }
        // what do different memstatus values mean: 
        //1 means successful addition of the user as a member
        //2 means user is already a member
        //3 means could not add the user due to some reasons
        //4 means the user does not exist.

    }

    return (
        <div className="whole-form">
            <form className="form">
                <div className="Username">
                    Username:
                    <input value={username} onChange={(e) => setusername(e.target.value)}></input>
                </div>
                <div className="Name">
                    Name:
                    <input value={name} onChange={(e) => setname(e.target.value)}></input>
                </div>
                <label>
                    POR(true or false)?:
                    <input value={admin} onChange={(e) => setadmin(e.target.value)}></input>
                </label>
                <label>
                    Roles:
                    <input value={roles} onChange={(e) => setroles(e.target.value)}></input>
                </label>
                <label>
                    Organization Name: {valueOrganization}
                </label>
                <button className = "add-member-button" onClick={(e) => addMember(e)}>Add New member</button>
                {memstatus === 1 && <p>Successfully added the user as a member!</p>}
                {memstatus === 2 && <p>User is already a member of {valueOrganization}!</p>}
                {memstatus === 3 && <p>Could not add the user as a member. Contact technical team</p>}
                {memstatus === 4 && <p>The user does not exist</p>}
            </form>
        </div>
    );
};

export default AddMembers;
