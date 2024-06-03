import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AKSHAtLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    const record = { email, pass };
    const fatchdata = async () => {
      await axios
        .post("/api/login", record)
        .then((response) => {
          if (response.data.status === 200) {
            localStorage.setItem("firstName", response.data.apidata);
            navigate("/");
          }
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    };
    fatchdata();
  }

  return (
    <div className="forCenter">
      <div className="mt-3">
        <img
          src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
          alt=""
        />
      </div>

      <div className="mt-4">
        <form
          onSubmit={handleLoginSubmit}
          className="formDetails login"
        >
          <h1>Sign in</h1>

          <label htmlFor="">Email</label>
          <input
            type="email"
            autoComplete="username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control mb-3"
          />

          <span className="d-flex justify-content-between">
            <label htmlFor="">Password</label>
            <Link
              to={"/forgotPass"}
              className="small"
            >
              Forgot your password?
            </Link>
          </span>
          <input
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            className="form-control mb-3"
          />

          <h6 className="text-center text-danger">{message}</h6>

          <button
            type="submit"
            className="btn form-control RegBtn"
          >
            Sign in
          </button>

          <div className="haveAcc login">
            <hr className="m-0" />
            <small>New to AKSHAt?</small>
            <hr className="m-0" />

            <Link
              to={"/reg"}
              className="loginLink"
            >
              <button className="btn fs-6">Create your AKSHAt account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AKSHAtLogin;
