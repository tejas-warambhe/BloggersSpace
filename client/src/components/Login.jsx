import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const ParseRes = await response.json();
      // console.log(ParseRes);
      localStorage.setItem("token", ParseRes.token);
      props.setAuth(true);
      props.showAlert("Logged In Succesfully", "success");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <form
        className="container-fluid d-flex flex-column my-5 shadow"
        style={{
          backgroundColor: "white",
          width: "80%",
          height: "50%",
          borderRadius: "0.5%",
        }}
      >
        <h2 className="text-center">Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control"
            value={inputs.email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={inputs.password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block shadow mt-1"
          onClick={(e) => onSubmitForm(e)}
        >
          Login
        </button>
        <p className="forgot-password text-right">
          Not Registered yet? <Link to="/register">Register</Link>
        </p>
      </form>
      
      <Footer foot = {1}/>
    </div>
  );
}
