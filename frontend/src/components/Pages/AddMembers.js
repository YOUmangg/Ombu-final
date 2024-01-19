import React from "react";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import "./AddMembers.css";
import { useState } from "react";

const AddMembers = () => {
    //global states
    const valueOrganization = useOrganizationStore((state) => state.Organization);

    //local storage session or session storage? what to use?
    // var sessorg;
    console.log(valueOrganization);
    // sessionStorage.setItem('sessorg', valueOrganization); doesn't survive refresh!
    var sessorg;
    localStorage.setItem('sessorg', valueOrganization);

    //local states
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [admin, setadmin] = useState(false);
    const [roles, setroles] = useState("");
    const [memstatus, setmemstatus] = useState(0);

    //add new member
    async function addMember(e) {
        e.preventDefault();

        const addmember = { "name": name, "username": username, "roles": roles, "isAdmin": admin, "organisationName": valueOrganization };
        console.log(addmember);
        //verify if the user exists
        try {
            const resp = await fetch(`/api/Newusers/find?Username=${addmember.username}`);
            const found22 = await resp.json();
            console.log(found22);
            console.log("yea");

            //if user exists, add to the organization
            if (Object.keys(found22).length > 0) {
                console.log("Here");
                addmember.phonenumber = found22.Phonenumber;

                //check if the user is already a member?
                const responseMembers = await fetch(`/api/Members/find?Username=${addmember.username}&organisationName=${valueOrganization}`);
                const found = await responseMembers.json();

                if (found) {
                    if (Object.keys(found).length > 0) {
                        //notify that the user is already a member of the organization
                        console.log("consumed");
                        setmemstatus(2); //user is already a member
                        return;
                    }
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
                console.log("notfound");
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
                <label>
                    Username:
                    <input value={username} onChange={(e) => setusername(e.target.value)}></input>
                </label>
                <label>
                    Name:
                    <input value={name} onChange={(e) => setname(e.target.value)}></input>
                </label>
                <label>
                    POR(true or false)?:
                    <input value={admin} onChange={(e) => setadmin(e.target.value)}></input>
                </label>
                <label>
                    Roles:
                    <input value={roles} onChange={(e) => setroles(e.target.value)}></input>
                </label>
                <label>
                    Organization Name: {localStorage.getItem('sessorg')}
                    {/* {console.log(sessionStorage.getItem('sessorg'))} */}
                </label>
                <button className="add-member-button" onClick={(e) => addMember(e)}>Add New member</button>
                {memstatus === 1 && <p>Successfully added the user as a member!</p>}
                {memstatus === 2 && <p>User is already a member of {valueOrganization}!</p>}
                {memstatus === 3 && <p>Could not add the user as a member. Contact technical mistri umang <email>@f20202487@hyderabad.bits-pilani.ac.in</email></p>}
                {memstatus === 4 && <p>The user does not exist</p>}
            </form>
        </div>
    );
};

export default AddMembers;
