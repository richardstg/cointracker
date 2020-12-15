import React from "react";

import Modal from "../modal/modal";
import classes from "./errorModal.module.scss";

const ErrorModal = (props) => {
  return (
    <Modal
      center
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={
        <button className={classes.button} onClick={props.onClear}>
          Close
        </button>
      }
      className="error"
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
