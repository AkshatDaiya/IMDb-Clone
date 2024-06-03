import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextApi from "../ContextApi";

function EmailActivation() {
  const { emailActivationId } = useContext(ContextApi);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    const fatchdata = async () => {
      await axios
        .post(`/api/emailActivation/${emailActivationId}`, { OTP })
        .then((response) => {
          if (response.data.status === 200) {
            navigate("/aLogin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fatchdata();
  }

  return (
    <div>
      <div className="forCenter">
        <div className="mt-3">
          <img
            src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
            alt=""
          />
        </div>

        <div className="mt-4">
          <form
            className="formDetails"
            onSubmit={handleLoginSubmit}
          >
            <small> we've sent a One Time Password (OTP) to your email</small>

            <label className="mt-2">Enter OTP</label>
            <input
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              className="form-control mb-3"
            />

            <button
              type="submit"
              className="btn form-control RegBtn mb-2"
            >
              Create your AKSHAt account
            </button>

            <small>
              By creating an IMDb account, you agree to the IMDb Conditions of
              Use
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailActivation;
