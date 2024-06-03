import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContextApi from "../ContextApi";

function Reg() {
  const { setEmailActivationId } = useContext(ContextApi);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const record = { firstName, lastName, email, password };
    const fetchdata = async () => {
      await axios
        .post("/api/reg", record)
        .then((response) => {
          setEmailActivationId(response.data.apidata);
          navigate("/emailActivation");
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    };
    fetchdata();
  }

  return (
    <div>
      <div className="forCenter">
        <div className="mt-3">
          <img
            src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
            alt="media-amazon"
          />
        </div>

        <div className="mt-4">
          <form
            className="formDetails reg"
            onSubmit={handleSubmit}
          >
            <h1>Create account</h1>

            <label htmlFor="">Your first name</label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="form-control mb-3"
              required
            />

            <label htmlFor="">Your last name</label>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="form-control mb-3"
              required
            />

            <label htmlFor="">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control mb-3"
              required
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              autoComplete="on"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control mb-3"
              required
            />

            <button className="btn form-control RegBtn">
              Create your AKSHAt account
            </button>

            <h6 className="text-center text-danger">{message}</h6>

            <div className="haveAcc reg">
              <hr className="m-0" />
              <small>Already have an account?</small>
              <hr className="m-0" />

              <Link
                to={"/aLogin"}
                className="loginLink"
              >
                <button className="btn fs-6">Login now!</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reg;
