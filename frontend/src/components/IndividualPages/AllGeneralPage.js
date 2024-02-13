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
      if (localStorage.setItem !== "") {
        localStorage.setItem('org', valueOrganization);
        console.log(localStorage.getItem('org'));
        orgs.forEach(element => {
          if (element === valueOrganization) {
            setCheck(true);
            return;
          }
        }
        );
      }

      //for already logged in
      // { console.log("valueOrganization") };
    }
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

  return (
    <div className="Whole">
      <br></br>
      {/* <img className = "Esportsimg" src= "../../../EsportsClubLogo.jpg" alt = "logo"/> */}
      <div className="carousel">
        <div className="flex-direction: column flex-wrap w+20">
          <h1 className="text-3xl text-blue-500">Positions of Responsibility</h1><br />
          {console.log(Data.PORs)}
          {Data.PORs && (<ul className="text-xl text-blue-100">
            {
              Data.PORs.map((por, index) =>
                <li key={index}> {por} </li>
              )
            }
          </ul>)}
        </div>
        <div className="flex-direction: column inset-20 h-80 w-80">
          <Carousel slideInterval={2000}>
            <img src="../../../EsportsClubLogo.jpg" alt="..." />
            <img src="../../../Atmos2022.png" alt="..." />
          </Carousel>

        </div>
        <div className="flex-direction: column flex-wrap">
          <h1 className="text-3xl text-blue-500 flex-wrap">Tips to get into the {valueOrganization}</h1><br />
          <p className="text-xl text-blue-100">{Data.Tips}</p>
        </div>
      </div>
      <div className="flex-direction: column justify-center items-center">
        <div><p class="Title">{Data.Name}</p></div>
        <p class="Description">
          {Data.GeneralDescription}{" "}
        </p>
      </div>
      {/* ${valueUsername} */}
      {/* //need to check if the username in the login store is a member of the particular organization or not here only.
      //If not, redirect to the login page only. */}
      <div>{console.log("here", valueUsername)}
        {valueUsername !== "" && check && ((<Link to="/AllPage"><button className="Login-button">Login</button></Link>))}
        {valueUsername === "" && ((<Link to="/LoginPage"><button className="Login-button">Login</button></Link>))}</div>
      {/* {valueUsername !== "" && ((<Link to="/LoginPage"><button className="Login-button">Login</button></Link>))} */}
    </div >)

};

{/* // onClick={() => valuesetOrganization("Esports Club")} */ }
export default GeneralPage;

//earlier code for carousel
// //clicking on the right button for the carousel [next image]
// function handleclickright() {
//   if (index === carousel.length - 1) {
//     setindex(0);
//     return;
//   } else setindex(index + 1);
// }

// //clicking on the left button for the carousel [previous image]
// function handleclickleft() {
//   if (index === 0) {
//     setindex(carousel.length - 1);
//     return;
//   } else {
//     setindex(index - 1);
//   }
// }

// //creation of carousel [array of images]
// let carousel = [];
// carousel.push("../../../EsportsClubLogo.jpg");
// carousel.push("../../../Atmos2022.png");


{/* <div className="carousel">
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
      </div> */}