import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import Team from "./pages/Team";

function App() {
  return (
    <>
    <div className="bg-gray-900 h-full pb-2">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="league/:id" element={<League></League>}/>
        <Route path="team/:id" element={<Team></Team>}/>
      </Routes>
      
    </div>
    </>
  );
}

export default App;
