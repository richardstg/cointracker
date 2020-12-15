import React from "react";
import { Table } from "reactstrap";

import classes from "./exchangesTable.module.scss";
import formatter from "../../../shared/utils/currencyFormatter";

const ExchangesTable = (props) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>
              <p className={classes.rank}>#</p>
            </th>
            <th>
              <p className={classes.name}>Name</p>
            </th>
            <th>
              <p className={classes.trustScore}>Trust Score</p>
            </th>
            <th>
              <p className={classes.est}>Est.</p>
            </th>
            <th>
              <p className={classes.country}>Country</p>
            </th>
            <th>
              <p className={classes.volume}>Trade Volume 24h BTC</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.exchanges.map((exchange) => (
            <React.Fragment>
              <tr>
                <td>
                  <p className={classes.rank}>{exchange.trust_score_rank}</p>
                </td>
                <td>
                  <div className={classes.name}>
                    <img
                      className={classes.logo}
                      alt="logo"
                      src={exchange.image}
                    />
                    <p className={classes.name}>
                      <a target="_blank" rel="noreferrer" href={exchange.url}>
                        {exchange.name}
                      </a>
                    </p>
                  </div>
                </td>
                <td>
                  <p className={classes.trustScore}>{exchange.trust_score}</p>
                </td>
                <td>
                  <p className={classes.est}>{exchange.year_established}</p>
                </td>
                <td>
                  <p className={classes.country}>{exchange.country}</p>
                </td>
                <td>
                  <p className={classes.volume}>
                    {formatter.format(exchange.trade_volume_24h_btc)}
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

export default ExchangesTable;
