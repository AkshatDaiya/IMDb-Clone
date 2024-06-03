import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ContextApi from "../../ContextApi";

function Carousel({ genresData }) {
  const { singleDataID, setSingleDataID } = useContext(ContextApi);
  console.log("singleDataID------------------", singleDataID);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handleDetails(id) {
    setSingleDataID(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container py-5">
      <h2 className="text-light"> More like this </h2>
      <Slider {...settings}>
        {genresData
          ? genresData.map((data, index) => (
              <div key={`${data.id}-${index}`}>
                <div
                  className="card"
                  style={{ width: "17rem", height: "34rem" }}
                >
                  <img
                    src={data.image.original}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body position-relative">
                    <h5 className="m-0">{data.name}</h5>
                    <Link to={`/showDetails`}>
                      <button
                        className="StyleBTN2 position-absolute"
                        onClick={() => {
                          handleDetails(data.id);
                        }}
                      >
                        More Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
}

export default Carousel;
