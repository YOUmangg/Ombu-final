import Navbar from "./components/Navbar/navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

//inductions can be added? 

function App() {
  function Logbutton() {
    return (
      <Link to="/LoginPage">
        <button className="Login-button">Login</button>
      </Link>
    );
  }
  return (
    <div className="App">
      <Router>
        <div className="titlebar">
          <h1 className="Ombu-top">Ombu - Bits Pilani</h1>
          <Logbutton />
        </div>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
