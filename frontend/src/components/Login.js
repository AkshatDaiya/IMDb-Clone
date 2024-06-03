import React from "react";
import Navbar from "./partials/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar />
      <div className="loginPage d-flex justify-content-center">
        <div className="login">
          <div className="loginWithLinks">
            <h3>Sign in</h3>
            <Link to={"/aLogin"}>
              <i className="fa-brands fa-imdb mx-3"></i>
              <span>Sign in with AKSHAt</span>
            </Link>
            <Link>
              <i className="fa-brands fa-amazon mx-3"></i>
              <span>Sign in with Amazon</span>
            </Link>
            <Link>
              <i className="fa-brands fa-google mx-3"></i>
              <span>Sign in with Google</span>
            </Link>
            <Link>
              <i className="fa-brands fa-apple mx-3"></i>
              <span>Sign in with Apple</span>
            </Link>
            <Link>
              <i className="fa-brands fa-facebook mx-3"></i>
              <span>Sign in with Facebook</span>
            </Link>
            <hr className="divider" />
            <div className="regBtn">
              <Link to={"/reg"}>
                <button className="btn">Create a New Account</button>
              </Link>
            </div>
          </div>

          <div className="text">
            <h5>Benefits of your free AKSHAt account</h5>
            <div className="textDetails mt-3">
              <p>Personalized Recommendations</p>
              <small>Discover shows you'll love.</small>
            </div>
            <div className="textDetails">
              <p>Your Watchlist</p>
              <small>
                Track everything you want to watch and receive e-mail when
                movies open in theaters.
              </small>
            </div>
            <div className="textDetails">
              <p>Your Ratings</p>
              <small>Rate and remember everything you've seen.</small>
            </div>
            <div className="textDetails">
              <p>Contribute to AKSHAt</p>
              <small>
                Add data that will be seen by millions of people and get cool
                badges.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
