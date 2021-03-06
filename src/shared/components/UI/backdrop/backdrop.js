import React from "react";

import classes from "./backdrop.module.scss";

const Backdrop = (props) =>
  props.show ? (
    <div
      className={`${classes.Backdrop} ${props.error && classes.error}`}
      onClick={props.onClick}
    ></div>
  ) : null;

export default Backdrop;
