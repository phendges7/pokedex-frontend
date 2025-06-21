import React from "react";
import pokeball from "../../assets/pokeball-icon.svg";

const PreLoader = () => {
  return (
    <div className="overlay-loader">
      <img src={pokeball} alt="Loading..." className="overlay-loader__image" />
    </div>
  );
};

export default PreLoader;
