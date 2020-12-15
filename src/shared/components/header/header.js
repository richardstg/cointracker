import React from "react";

import classes from "./header.module.scss";
import Navigation from "./navigation/navigation";
import Stats from "./stats/stats";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.navigation}>
        <Navigation />
      </div>
      <div className={classes.stats}>
        <Stats />
      </div>
    </header>
  );
};

export default Header;
