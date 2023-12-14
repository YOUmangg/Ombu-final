import React, { useState } from "react";
import "./EsportsClub.css";
import { Link } from "react-router-dom";
import useOrganizationStore from "../ZustandStates/OrganizationNameState";

const Esports = () => {
  //local states
  const [index, setindex] = useState(0);

  //global states
  const valueOrganization = useOrganizationStore((state) => state.Organization);
  const valuesetOrganization = useOrganizationStore(
    (state) => state.setOrganizationState
  );

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
      <p class="Title">Esports Club</p>
      <p class="Description">
        We are the Gaming Club of BITS Pilani, Hyderabad Campus. We aim to
        strengthen the Esports and gaming community of BPHC and take our
        community to the next level.{" "}
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

export default Esports;
