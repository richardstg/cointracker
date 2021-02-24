import React from "react";
import { Container } from "reactstrap";

import classes from "./Layout.module.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <Header />
      <Container className={classes.container}>{props.children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
