import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Register(props) {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const { email, password, name } = inputs;
  const onSubmitForm = async (e) => {
    console.log("I was here");
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const ParseRes = await response.json();
      console.log(ParseRes);
      localStorage.setItem("token", ParseRes.token);
      props.setAuth(true);
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
        <h2 className="text-center">Register</h2>

        <div className="form-group">
          <label>User name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="First name"
            value={inputs.name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
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
          className="btn btn-dark shadow btn-lg btn-block mt-1"
          onClick={(e) => onSubmitForm(e)}
        >
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered <Link to="/">log in?</Link>
        </p>
      </form>
      <Footer foot ={1}/>
        
    </div>
  );
}
