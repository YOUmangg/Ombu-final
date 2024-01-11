//General Page {intro page for all the organizations}

import React, { useEffect, useState } from "react";
import "../Pages/EsportsClub.css";
import { Link } from "react-router-dom";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";

const GeneralPage = () => {

  //local states
  const [index, setindex] = useState(0);
  const [Data, setData] = useState([]);

  //global states
  const valueOrganization = useOrganizationStore((state) => state.Organization);
  const valuesetOrganization = useOrganizationStore(
    (state) => state.setOrganizationState
  );

  
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await fetch(`/api/Pages/general?organizationName=${valueOrganization}`);
            const resdata = await response.json();
            console.log(resdata);
            setData(resdata);
        }catch(error)
        {
            console.error("error: ", error);
        }
    }

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
      <Link to="/LoginPage">
        <button
          onClick={() => valuesetOrganization("Esports Club")}
          className="Login-button"
        >
          Login
        </button>
      </Link>
      <br></br>
    </div>
  );
};

export default GeneralPage;
