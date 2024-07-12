import "./App.css";
import React, { useEffect, useState } from "react";
import apiService from "../../services/api_service";
import { Routes, Route } from "react-router-dom";
import CarNews from "../CarNews/CarNews";

function App() {
  let [carList, setCarList] = useState([]);

  useEffect(() => {
    apiService.getCars().then((data) => {
      setCarList(data);
    });
  }, []);

  if (carList === false) {
    return <h1>You have no vehicles to display</h1>;
  }
  return (
    <>
      <h1>Car go vroom</h1>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/news" element={<CarNews />} />
      </Routes>
    </>
  );
}

export default App;
