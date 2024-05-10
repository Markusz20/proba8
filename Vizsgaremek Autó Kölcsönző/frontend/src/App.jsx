import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
// Component import
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Login from "./components/Navbar/Login";
import Register  from "./components/Navbar/Register";
import Modositas from "./components/Navbar/Modositas";
import { ToastContainer, toast } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import CarList from "./components/CarList/CarList";
import Foglalas from "./components/Navbar/Foglalas";
import Foglalasmodositas from "./components/Navbar/Foglalasmodositas";
import Emlekezteto from "./components/Navbar/Emlekezteto";
import Ugyfeladatlap from "./components/Navbar/Ugyfeladatlap";
import Rendelesek from "./components/Navbar/Rendelesek";


const App = () => {
  
  return (
    <div className="text-black overflow-x-hidden">
      <UserProvider>    
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/foglalas" element={<Foglalas />} />
          <Route path="/foglalasmodositas" element={<Foglalasmodositas />} />
          <Route path="/modositas" element={<Modositas />} />
          <Route path="/ugyfeladatok" element={<Ugyfeladatlap />} />
          <Route path="/emlekezteto" element={<Emlekezteto />} />
          <Route path="/rendelesek" element={<Rendelesek />} 
          />
          <Route path="*" element={<Navigate to={"/"} />} />  
        </Routes>
    </Router>
      <ToastContainer />
    </UserProvider>
    </div>
  );
};

export default App;
