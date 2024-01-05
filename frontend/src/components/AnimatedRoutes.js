import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Esports from "./Pages/EsportsClub";
import Login from "./Pages/LoginPage";
import StudentBodies from "./StudentBodies";
import Cellsandsoc from "./CellsAndSocieties";
import Home from "./Homepage";
import Departments from "./Departments";
import Clubs from "./Clubs";
import TechAssocs from "./TechnicalAssociations";
import EsportsClubIndividualPage from "./IndividualPages/EsportsClubIndividualPage";
import TaskCreator from "./TaskCreator";
import MembersList from "./MembersList";
import SignUpPage from "./Pages/SignUpPage";
import AddEvents from "./Pages/AddEvents";
import AddMembers from "./Pages/AddMembers";
import AddInductionNotice from "./IndividualPages/AddInductionNotice";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<Login />} />
        <Route path = "/AddInductionNotice" element = {<AddInductionNotice/>}/>
        <Route
          path="/EsportsClubIndividualPage"
          element={<EsportsClubIndividualPage />}
        />
        
        <Route path = "/AddMembers" element = {<AddMembers/>} />
        <Route path = "/SignUpPage" element = {<SignUpPage/>} />
        <Route path = "/AddEvents" element = {<AddEvents/>} />
        <Route path = "/MembersList" element = {<MembersList/>}/>
        <Route path = "/TaskCreator" element = {<TaskCreator/>}/>
        <Route path="/EsportsClub" element={<Esports />} />
        <Route path="/Homepage" element={<Home />} />
        <Route path="/Clubs" element={<Clubs />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/TechnicalAssociations" element={<TechAssocs />} />
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/StudentBodies" element={<StudentBodies />} />
        <Route path="/CellsAndSocieties" element={<Cellsandsoc />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
