import React, { useState } from "react";
import { forms } from 'flowbite-react';
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

    console.log(newuser);
    if (Password !== ConfirmPassword) //if Password is not equal to confirm password, don't create the account and notify the user.
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
      <form class="max-w-md mx-auto" >
      <div class="relative z-0 w-full mb-5 group">
        {/* Username block */}
          <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Your Username is f<Batch_Year><Last4DigitsOfYourIdNumber>. For ex: f20202487" value = {Username} onChange={(e) => setUsername(e.target.value)} required />
          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
        </div>
        {/* Email Block */}
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value = {Emailid} onChange = {(e) => setEmailid(e.target.value)} required />
          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        {/* Password block */}
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value = {Password} onChange={(e) => setPassword(e.target.value)} required />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {/* confirm password block */}
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value = {ConfirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} required />
          <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>
        {/* Name block */}
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value = {Name} onChange={(e) => setName(e.target.value)} required />
            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          </div>
        </div>
        {/* Phone number block */}
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value = {Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
          </div>
        </div>
        <button type="submit" onClick = {(e) => handler(e)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
        <br></br>
        <br></br>
        {success === "yes" && <span>Account created successfully!</span>}
        {success === "Password and ConfirmPassword should be the same" && <span>Error creating account: {success}</span>}
      </form>
      {/* <form className="form" onSubmit={handler}>
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
        {/* <div className="Password-div">
          <label>Password: </label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          ></input>
        </div>
        <div className="ConfirmPassword-div">
          <label>Confirm Password: </label>
          <input
            type="password"
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
      </form> */} 
    </div>
  );
};

export default SignUpPage;
