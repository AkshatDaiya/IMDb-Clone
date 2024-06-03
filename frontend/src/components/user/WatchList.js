import React, { useContext, useEffect, useState } from "react";
import Navbar from "../partials/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ContextApi from "../../ContextApi";

function WatchList() {
  const navigate = useNavigate();
  const { setSingleDataID, addFav } = useContext(ContextApi);
  const firstName = localStorage.getItem("firstName");
  const [watchListData, setWatchListData] = useState([]);
  const WListID = addFav && Object.keys(addFav.ids);

  useEffect(() => {
    if (!firstName) {
      navigate("/login");
    }
  }, [firstName, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          WListID.map((id) => axios.get(`https://api.tvmaze.com/shows/${id}`))
        );
        const data = responses.map((response) => response.data);
        setWatchListData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (WListID && WListID.length > 0) {
      fetchData();
    }
  }, [WListID]);

  const handleDetails = (id) => {
    setSingleDataID(id);
    navigate("/showDetails");
  };

  const removeHTMLTags = (inputString) => {
    const doc = new DOMParser().parseFromString(inputString, "text/html");
    return doc.body.textContent || "";
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/deleteWL/${id}`);
      setWatchListData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="watchlistGB pt-3 mt-4">
        <div className="watchlist">
          <div className="label">
            <h3 className="px-2 pt-2">Your Watchlist</h3>
            <h6
              className="fs-5 fw-bolder px-2"
              style={{ color: "#b1a5a5" }}
            >
              <i className="fa-solid fa-lock"></i> PRIVATE
            </h6>
          </div>

          <div className="line"></div>

          {watchListData.length === 0 ? (
            <div className="watchListBlank">
              <div className="blankContent">
                <div className="addFavBtn1">+</div>
                <h5 className="mt-5">Your Watchlist is empty</h5>
                <h6 className="text-secondary text-center mt-2">
                  Add movies and shows to your Watchlist to keep track of what
                  you want to watch.
                </h6>
              </div>
            </div>
          ) : (
            watchListData.map((data) => (
              <div
                key={data.id}
                className="card m-2"
              >
                <div className="row g-0 rounded-0">
                  <div className="col-md-4">
                    <img
                      src={data.image.original}
                      className="watchListIMG img-fluid rounded-start"
                      alt={data.name}
                    />
                  </div>
                  <div className="col-md-8 position-relative">
                    <div className="card-body watchListData">
                      <Link to="/showDetails">
                        <h5
                          className="card-title m-0"
                          onClick={() => handleDetails(data.id)}
                        >
                          {data.name}
                        </h5>
                      </Link>
                      <p className="m-0">
                        <small>
                          {data.premiered} | {data.runtime}min/ep |{" "}
                          {data.genres.join(", ")}
                        </small>
                      </p>
                      <p className="card-text mt-1">
                        {removeHTMLTags(data.summary.slice(0, 240))}...
                      </p>
                    </div>

                    <button
                      className="StyleBTN3 position-absolute"
                      onClick={() => handleDetails(data.id)}
                    >
                      More Details
                    </button>

                    <button
                      className="StyleBTN4 position-absolute"
                      onClick={() => handleDelete(data._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default WatchList;
