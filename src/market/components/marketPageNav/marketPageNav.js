import React from "react";
import { Link } from "react-router-dom";

import classes from "./marketPageNav.module.scss";

const MarketPageNav = (props) => {
  const handlePreviousPage = () => {
    if (props.page <= 2) {
      // Page one will correspond to the path "/"
      return "";
    } else {
      return props.page - 1;
    }
  };

  const handleNextPage = () => {
    if (props.page === 7) {
      return 7;
    } else {
      return props.page + 1;
    }
  };

  return (
    <div className={classes.marketPageNav}>
      <div
        className={`${classes.arrow} ${props.page === 1 && classes.disabled}`}
        // onClick={props.onPreviousPage}
      >
        {/* "/" + props.page !== 1 ? props.page - 1 : props.page */}
        <Link to={"/" + handlePreviousPage()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM259.515 124.485l-123.03 123.03c-4.686 4.686-4.686 12.284 0 16.971l123.029 123.029c7.56 7.56 20.485 2.206 20.485-8.485V132.971c.001-10.691-12.925-16.045-20.484-8.486z" />
          </svg>
        </Link>
      </div>
      <div
        className={`${classes.arrow} ${props.page === 7 && classes.disabled}`}
        // onClick={props.onNextPage}
      >
        {/* "/" + props.page !== 7 ? props.page + 1 :  */}
        <Link to={"/" + handleNextPage()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M48 32h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48zm140.485 355.515l123.029-123.029c4.686-4.686 4.686-12.284 0-16.971l-123.029-123.03c-7.56-7.56-20.485-2.206-20.485 8.485v246.059c0 10.691 12.926 16.045 20.485 8.486z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MarketPageNav;
