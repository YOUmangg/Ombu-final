import React, { useState } from "react";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [Username, setUsername] = useState(null);
  const [Name, setName] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [Emailid, setEmailid] = useState(null);
  const [Phonenumber, setPhonenumber] = useState(null);
  const [success, setsuccess] = useState(null);

  //variables
  const Organization = "";

  async function handler(e) {
    e.preventDefault(); //preventing the default refresh on submit.


    //taking the new user details in an object.
    const newuser = {
      Username,
      Name,
      Password,
      ConfirmPassword,
      Emailid,
      Phonenumber,
      Organization,
    };

    if(Password !== ConfirmPassword) //if Password is not equal to confirm password, don't create the account and notify the user.
    {
      setsuccess("Password and ConfirmPassword should be the same");
      return;
    }

    // POST request to register the new user
    const response = await fetch("/api/Newusers", {                             
      method: "POST",
      body: JSON.stringify(newuser),
      headers: {
        "Content-type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    else {
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setEmailid("");
      setPhonenumber("");
      setsuccess("yes");
    }
  }
  
  return (
    <div>
      <form className="form" onSubmit={handler}>
        <div className="Username-div">
          <label>Username: </label>
          <input
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Username is f<Batch_Year><Last4DigitsOfYourIdNumber>. For ex: f20202487"
          ></input>
        </div>
        <div className="Name-div">
          <label>Name: </label>
          <input
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name + Last name"
          ></input>
        </div>
        {/* capitalize the input*/}
        <div className="Password-div">
          <label>Password: </label>
          <input
            type = "password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          ></input>
        </div>
        <div className="ConfirmPassword-div">
          <label>Confirm Password: </label>
          <input
            type = "password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
          ></input>
        </div>
        <div className="Emailid-div">
          <label>Email id: </label>
          <input
            value={Emailid}
            onChange={(e) => setEmailid(e.target.value)}
            placeholder="Enter your email id"
          ></input>
        </div>
        <div className="Phonenumber-div">
          <label>Phone Number: </label>
          <input
            value={Phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="too much to fill ahh"
          ></input>
        </div>
        <button className="create-account-button" onSubmit={(e) => handler}>
          Create Account!
        </button>
        {success === "yes" && <span>Account created successfully!</span>}
        {success === "Password and ConfirmPassword should be the same" && <span>Error creating account: {success}</span>}
      </form>
    </div>
  );
};

export default SignUpPage;
