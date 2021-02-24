import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

import classes from "./navigation.module.scss";
import Logo from "../../svg/logo";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Navbar className={`${classes.navbar}`} expand="lg" dark>
        <NavLink className={classes.navbarBrand} to="/">
          <Logo className={classes.logo} /> <h5>CoinTracker</h5>
        </NavLink>
        <NavbarToggler
          className={`${classes.toggler} ${isOpen && classes.open}`}
          onClick={toggle}
        >
          <div className={classes.icon}></div>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem className={classes.NavItem}>
                <NavLink
                  className={classes.navLink}
                  // activeClassName={classes.activeNavLink}
                  to="/"
                  exact
                >
                  Market
                </NavLink>
              </NavItem>
              <NavItem className={classes.NavItem}>
                <NavLink
                  className={classes.navLink}
                  // activeClassName={classes.activeNavLink}
                  to="/exchanges"
                  exact
                >
                  Exchanges
                </NavLink>
              </NavItem>
              <NavItem className={classes.NavItem}>
                <NavLink
                  className={classes.navLink}
                  // activeClassName={classes.activeNavLink}
                  to="/derivatives"
                  exact
                >
                  Derivatives
                </NavLink>
              </NavItem>
            </React.Fragment>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Navigation;
