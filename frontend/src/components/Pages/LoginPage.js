import React, { useState, useEffect } from "react";
// import "./LoginPage.css";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
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
  const organizations = useLoginStore((state) => state.Organizations);
  const setOrganizations = useLoginStore((state) => state.setOrganizations);
  const adminsOf = useLoginStore((state) => state.Admins);
  const setadminsOf = useLoginStore((state) => state.setAdmins);

  //trying to set progress sheet here only
  const valueSetProgress = useProgressSheetStore((state) => state.setProgressState);
  //if the value of the global state of organization is empty, that means that the user has come to the login page by
  //clicking on the login button present on the top right corner. if it is not empty, then it means the user has come
  //from a particular page of an organization and therefore we set the input value of organization in the login form
  //automatically as the name of the organization where the user came from.
  useEffect(() => {
    if (organization === "") {
      if (valueOrganization !== "") {
        setOrganization(valueOrganization);
      }
    }
    else {
      valueOrganizationSet(organization);
    }
    // return () => valueOrganizationSet(""); //commenting the function coz i want the global state to hold the value
    // this runs as a cleanup code, which sets the global variable to empty after the user leaves the page.
  }, [organization], []);

  useEffect(() => {
    valueOrganizationSet(organization);
  }, [isVerified])

  // check for the username and password
  async function signincheck(e) {
    e.preventDefault();
    try {
      //check if the user has signed up 
      const responseUsers = await fetch(`/api/Newusers/find?Username=${username}`);
      const dataUsers = await responseUsers.json();
      // const found = dataUsers.find((user) => user.Username === username && user.Password === password);
      let found = dataUsers;

      //check if the user is a member of the club he is trying to log into
      if (found) {
        const responseMembers = await fetch(`/api/Members/find?Username=${username}&organisationName=${organization}`)
        const dataMembers = await responseMembers.json();

        let newfound = 0;
        if (Object.keys(dataMembers).length > 0) {
          newfound = 1;
        }

        //found. give access!
        if (newfound) {
          setisVerified(true);
          valueOrganizationSet(organization);
          valueSetUsername(username);
          try {
            const response = await fetch(`/api/Tasks/find?organization=${organization}`);
            const data = await response.json();
            valueSetProgress(data);
          }
          catch (error) {
            console.log(error);
          }
          //create a global state consisting of an array of strings, consisting of which all organizations the current
          //user is a part of. We need to check if the current organization he is trying to get into is present in the 
          //array. If yes, give access to the page, else, show the general page. [the check can go to the general page
          // or this page?]
          // let temp = organizations;
          let temptemp = new Map();
          try {
            const response = await fetch(`/api/Members/find/organizations?Username=${username}`);
            const data = await response.json();

            //pushing data to a map
            data.map((val, key) => {
              temptemp.set(val.organisationName, 1);
            })
            for (let [key, value] of temptemp) {
              organizations.add(key);
            }
            const response2 = await fetch(`/api/Members/find/organizations/admin?Username=${username}`);
            const data2 = await response2.json();
            data2.map((val, key) => {
              adminsOf.add(val.organisationName);
            })
          } catch (error) {
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
      <form className="flex max-w-md flex-col gap-4">
        {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
      </div> */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username1" value="username" />
          </div>
          <TextInput id="username1" type="username" placeholder="f2020XXXX" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="organization" value="Organization Name" />
          </div>
          <TextInput id="organization1" type="organization" placeholder="Organization Name" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit" onClick={(e) => signincheck(e)}>Submit</Button>
        {isVerified}
        {isVerified && <Link to="/AllPage">
          <Button color="success" className="submit"> Submit</Button>
        </Link>}
        <Link to="/SignUpPage">
          <Button color="blue" className="signup-button">Click here to Sign Up!</Button>
        </Link>
        {isVerified === false && <p>Either the details are incorrect or you are not a member. Please check once again!</p>}
      </form>
    </div>
  );
};

export default Login;
