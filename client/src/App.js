import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Home';
import Navbar from './components/Navbar';
import MyArticles from './components/MyArticles';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool) =>{
    setIsAuthenticated(bool);
  };

  async function verifyAuth(){
    try {

      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
        console.log(err.message);
    }
  }

  useEffect(() =>{
    verifyAuth()
  }, []);
  return (
    <>
      <Router>
        <Navbar mode="dark"/>
        <Routes>
          <Route exact path="/" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/home"/>}/>
          <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/"/>}/>
          <Route exact path="/home" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/"/>}/>
          <Route exact path="/myarticles" element = {isAuthenticated ? <MyArticles /> : <Navigate to ="/"/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;


//react router dom and toastifys