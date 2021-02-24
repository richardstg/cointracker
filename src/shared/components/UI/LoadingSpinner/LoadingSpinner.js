import React from "react";

import classes from "./LoadingSpinner.module.scss";
import BeatLoader from "react-spinners/BeatLoader";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${classes.loadingSpinner} ${
        props.asOverlay && classes.loadingSpinnerOverlay
      }`}
    >
      <BeatLoader
        size={props.size || 15}
        color={"rgba(64, 70, 222, 0.6)"}
        loading={true}
      />
    </div>
  );
};

export default LoadingSpinner;
