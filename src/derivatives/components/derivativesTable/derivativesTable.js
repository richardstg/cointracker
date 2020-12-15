import React from "react";
import { Table } from "reactstrap";

import classes from "./derivativesTable.module.scss";

const DerivativesTable = (props) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>
              <p className={classes.name}>Exchange</p>
            </th>
            <th>
              <p className={classes.openInterest}>24h Open Interest</p>
            </th>
            <th>
              <p className={classes.volume}>24h Volume</p>
            </th>
            <th>
              <p className={classes.perpetuals}>Perpetuals</p>
            </th>
            <th>
              <p className={classes.futures}>Futures</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.derivatives.map((derivative) => (
            <React.Fragment>
              <tr>
                <td>
                  <div className={classes.name}>
                    <img
                      className={classes.logo}
                      alt="logo"
                      src={derivative.image}
                    />
                    <p className={classes.name}>
                      <a target="_blank" rel="noreferrer" href={derivative.url}>
                        {derivative.name}
                      </a>
                    </p>
                  </div>
                </td>
                <td>
                  <p className={classes.openInterest}>
                    {derivative.open_interest_btc}
                  </p>
                </td>
                <td>
                  <p className={classes.volume}>
                    {derivative.trade_volume_24h_btc}
                  </p>
                </td>
                <td>
                  <p className={classes.perpetuals}>
                    {derivative.number_of_perpetual_pairs}
                  </p>
                </td>
                <td>
                  <p className={classes.futures}>
                    {derivative.number_of_futures_pairs}
                  </p>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DerivativesTable;
