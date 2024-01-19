import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { NavLink as Link } from "react-router-dom";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import useProgressSheetStore from "../ZustandStates/ProgressSheetState";
import useLoginStore from "../ZustandStates/LoginState";

const Login = () => {
  //you can pass the organization name directly here? if not passed any
  //create an if condition to set the state as empty.

  //local states
  const [organization, setOrganization] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setisVerified] = useState(null);

  //global states
  const valueOrganization = useOrganizationStore((state) => state.Organization);
  const valueOrganizationSet = useOrganizationStore((state) => state.setOrganizationState);
  const valueUsername = useLoginStore((state) => state.Username);
  const valueSetUsername = useLoginStore((state) => state.setUsername);
  //trying to set progress sheet here only
  const valueSetProgress = useProgressSheetStore((state) => state.setProgressState);

  //if the value of the global state of organization is empty, that means that the user has come to the login page by
  //clicking on the login button present on the top right corner. if it is not empty, then it means the user has come
  //from a particular page of an organization and therefore we set the input value of organization in the login form
  //automatically as the name of the organization where the user came from.
  useEffect(() => {
    if (valueOrganization !== "") {
      setOrganization(valueOrganization);
    }
    // return () => valueOrganizationSet(""); //commenting the function coz i want the global state to hold the value
    // this runs as a cleanup code, which sets the global variable to empty after the user leaves the page.
  }, []);

  async function task() {
    // e.preventDefault();
    valueOrganizationSet(organization);

  }
  // check for the username and password
  async function signincheck() {

    try {
      //check if the user has signed up 
      const responseUsers = await fetch("/api/Newusers");
      const dataUsers = await responseUsers.json();
      const found = dataUsers.find((user) => user.Username === username && user.Password === password);

      //check if the user is a member of the club he is trying to log into
      if (found) {
        // const responseMembers = await fetch("/api/Members");
        const responseMembers = await fetch(`/api/Members/find?Username=${username}&organisationName=${organization}`)
        const dataMembers = await responseMembers.json();
        // const newfound = dataMembers.find((user) => user.username === username && user.organisationName === organization);

        let newfound = 0;
        if(Object.keys(dataMembers).length > 0)
        {
          newfound = 1;
        }
        
        //found. give access!
        if (newfound) {
          setisVerified(true);
          valueOrganizationSet(organization); 
          valueSetUsername(username);
          localStorage.setItem('Username', username);
          try {
            const response = await fetch("/api/Tasks");
            const data = await response.json();
            valueSetProgress(data);
          }
          catch (error) {
            console.log(error);
          }
        } else {
          setisVerified(false);
        }

        if (!newfound) {
          console.log("user not a member or username and password are incorrect");
        }
      }
      else {
        setisVerified(false);
        console.log("not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="login-page">
      <label>
        Organization: &nbsp;
        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        ></input>
      </label>
      <label>
        Username:{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
      <br></br>
      <label>
        Password:&nbsp;
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <div className="submit-and-signup">
        <button onClick={signincheck}> Verify details</button>
        {isVerified && task}
        {isVerified && <Link to="/AllPage">
          <button className="submit"> Submit</button>
        </Link>}
        <Link to="/SignUpPage">
          <button className="signup-button">Click here to Sign Up!</button>
        </Link>
      </div>
      {isVerified === false && <p>Either the details are incorrect or you are not a member. Please check once again!</p>}
    </div>
  );
};

export default Login;
