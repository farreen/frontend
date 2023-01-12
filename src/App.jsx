import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import { BrowserRouter as Router, Route} from 'react-router-dom';
// _____________IMPORTING COMPONENTS________________
import Login  from   './components/Login';
import Register   from   './components/Register';
import Dashboard  from   './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route   path="/" element={<Login />} />
          <Route   path="/register" element={<Register />} />
          <Route   path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App