import React from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import classes from "./pageNavigation.module.scss";

const PageNavigation = (props) => {
  const { page } = props;

  return (
    <Pagination className={classes.pageNavigation}>
      {page !== 1 && (
        <React.Fragment>
          <PaginationItem>
            <Link to="/">
              <PaginationLink first />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link to={page === 2 ? "/" : "/" + (page - 1)}>
              <PaginationLink previous />
            </Link>
          </PaginationItem>
        </React.Fragment>
      )}
      {page > 2 && (
        <React.Fragment>
          <PaginationItem>
            <Link to="/">
              <PaginationLink>1</PaginationLink>
            </Link>
          </PaginationItem>
          <PaginationItem className={classes.disabled}>
            <Link to="/#">
              <PaginationLink>...</PaginationLink>
            </Link>
          </PaginationItem>
        </React.Fragment>
      )}
      {page !== 1 && (
        <PaginationItem>
          <Link to={page === 2 ? "/" : "/" + (page - 1)}>
            <PaginationLink>{page - 1}</PaginationLink>
          </Link>
        </PaginationItem>
      )}
      <PaginationItem className={classes.active}>
        <Link to="/#">
          <PaginationLink>{page}</PaginationLink>
        </Link>
      </PaginationItem>
      {page < 10 && (
        <React.Fragment>
          <PaginationItem>
            <Link to={"/" + (page + 1)}>
              <PaginationLink>{page + 1}</PaginationLink>
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link to={"/" + (page + 1)}>
              <PaginationLink next />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link to="/10">
              <PaginationLink last />
            </Link>
          </PaginationItem>
        </React.Fragment>
      )}
    </Pagination>
  );
};

export default PageNavigation;
