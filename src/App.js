import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/button";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useFirebase } from "./context/firebase";
import Navbar from "./component/Navbar";
import List from "./pages/List";


const App = () => {
  return (
    <>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addlisting" element={<List />} />
      </Routes>
    </>
  );
};

export default App;
