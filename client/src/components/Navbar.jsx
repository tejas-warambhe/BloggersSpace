import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mt-5">
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark fixed-top">
        <a className="navbar-brand" href="/home">
          BloggersSpace
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/home">
              Home <span className="sr-only">(current)</span>
            </Link>
            <Link className="nav-item nav-link" to="/myarticles">
              My Articles
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
