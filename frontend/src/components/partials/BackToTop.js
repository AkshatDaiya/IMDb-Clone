import React, { useEffect, useState } from "react";

function BackToTop() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  function scrollUP() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      {backToTopButton && (
        <i
          className="fas fa-arrow-up-long"
          onClick={scrollUP}
        ></i>
      )}
    </div>
  );
}

export default BackToTop;
