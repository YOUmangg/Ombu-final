//General Page {intro page for all the organizations}

import React, { useEffect, useState } from "react";
import "../Pages/EsportsClub.css";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";
import useLoginStore from "../ZustandStates/LoginState";


const GeneralPage = () => {

  //local states
  const [index, setindex] = useState(0);
  const [Data, setData] = useState([]);
  const [check, setCheck] = useState(false); //for checking if logged in user and a part of org or not

  //global states
  const valueOrganization = useOrganizationStore((state) => state.Organization);
  const valuesetOrganization = useOrganizationStore(
    (state) => state.setOrganizationState
  );
  const valueUsername = useLoginStore((state) => state.Username);
  const valueSetUsername = useLoginStore((state) => state.setUsername);
  const orgs = useLoginStore((state) => state.Organizations);

  useEffect(() => {
    if (valueOrganization === "") {
      { console.log("yeah, null") }
      valuesetOrganization(localStorage.getItem('org'));
    }
    else {
      localStorage.setItem('org', valueOrganization);
      console.log(localStorage.getItem('org'));
      orgs.forEach(element => {
        if (element === valueOrganization) {
          setCheck(true);
          return;
        }
      });
    }

    //for already logged in
    // { console.log("valueOrganization") };
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Pages/general?organizationName=${valueOrganization}`);
        const resdata = await response.json();
        console.log(resdata);
        setData(resdata);
      } catch (error) {
        console.error("error: ", error);
      }
    }

    // check();
    fetchData();

  }, [])
  //clicking on the right button for the carousel [next image]
  function handleclickright() {
    if (index === carousel.length - 1) {
      setindex(0);
      return;
    } else setindex(index + 1);
  }

  //clicking on the left button for the carousel [previous image]
  function handleclickleft() {
    if (index === 0) {
      setindex(carousel.length - 1);
      return;
    } else {
      setindex(index - 1);
    }
  }

  //creation of carousel [array of images]
  let carousel = [];
  carousel.push("../../../EsportsClubLogo.jpg");
  carousel.push("../../../Atmos2022.png");

  return (
    <div className="Whole">
      <br></br>
      {/* <img className = "Esportsimg" src= "../../../EsportsClubLogo.jpg" alt = "logo"/> */}
      <div className="flex-direction: row inset-20 h-80 w-80">
      <Carousel slideInterval={5000}>
        <img src="../../../EsportsClubLogo.jpg" alt="..." />
        <img src="../../../Atmos2022.png" alt="..." />
        {/* <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." /> */}
      </Carousel>
    </div>
      <div className="carousel">
        <button className="left-arrow" onClick={handleclickleft}>
          <img
            src="../../../arrowleft.png"
            height={30}
            width={30}
            alt="arrowleft"
          />
        </button>
        <img
          className="Esportsimg"
          src={carousel[index]}
          alt="carousel images"
        />
        <button className="right-arrow" onClick={handleclickright}>
          <img
            src="../../../arrowright.png"
            height={30}
            width={30}
            alt="arrowright"
          />
        </button>
      </div>
      <p class="Title">{Data.Name}</p>
      <p class="Description">
        {Data.GeneralDescription}{" "}
      </p>
      {console.log(Data.PORs)}
      <h1>Positions of Responsibility</h1>
      {Data.PORs && (<ul>
        {
          Data.PORs.map((por, index) =>
            <li key={index}> {por} </li>
          )
        }
      </ul>)}
      <h1>Tips to get into the {valueOrganization}</h1>
      <p>{Data.Tips}</p>
      {/* ${valueUsername} */}
      {/* //need to check if the username in the login store is a member of the particular organization or not here only.
      //If not, redirect to the login page only. */}
      {console.log("here", valueUsername)}
      {valueUsername !== "" && check && ((<Link to="/AllPage"><button className="Login-button">Login</button></Link>))}
      {valueUsername === "" && ((<Link to="/LoginPage"><button className="Login-button">Login</button></Link>))}
      {valueUsername !== "" && ((<Link to="/LoginPage"><button className="Login-button">Login</button></Link>))}
    </div >)

};

{/* // onClick={() => valuesetOrganization("Esports Club")} */ }
export default GeneralPage;
