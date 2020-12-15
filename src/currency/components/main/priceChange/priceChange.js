import React from "react";
import { Table } from "reactstrap";

import classes from "./priceChange.module.scss";
import noMinus from "../../../../shared/utils/noMinus";

const PriceChange = ({ data }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>
              <p>1h</p>
            </th>
            <th>
              <p>24h</p>
            </th>
            <th>
              <p>7d</p>
            </th>
            <th>
              <p>14d</p>
            </th>
            <th>
              <p>30d</p>
            </th>
            <th>
              <p>1y</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p
                className={`${
                  data.price_change_percentage_1h_in_currency.usd &&
                  data.price_change_percentage_1h_in_currency.usd.toFixed(1) <
                    0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_1h_in_currency.usd &&
                  data.price_change_percentage_1h_in_currency.usd.toFixed(1) >
                    0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_1h_in_currency.usd
                  ? noMinus(
                      data.price_change_percentage_1h_in_currency.usd.toFixed(1)
                    ) + "%"
                  : "?"}
              </p>
            </td>
            <td>
              <p
                className={`${
                  data.price_change_percentage_24h &&
                  data.price_change_percentage_24h.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_24h &&
                  data.price_change_percentage_24h.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_24h
                  ? noMinus(data.price_change_percentage_24h.toFixed(1)) + "%"
                  : "?"}
              </p>
            </td>
            <td>
              <p
                className={`${
                  data.price_change_percentage_7d &&
                  data.price_change_percentage_7d.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_7d &&
                  data.price_change_percentage_7d.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_7d
                  ? noMinus(data.price_change_percentage_7d.toFixed(1)) + "%"
                  : "?"}
              </p>
            </td>
            <td>
              <p
                className={`${
                  data.price_change_percentage_14d &&
                  data.price_change_percentage_14d.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_14d &&
                  data.price_change_percentage_14d.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_14d
                  ? noMinus(data.price_change_percentage_14d.toFixed(1)) + "%"
                  : "?"}
              </p>
            </td>
            <td>
              <p
                className={`${
                  data.price_change_percentage_30d &&
                  data.price_change_percentage_30d.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_30d &&
                  data.price_change_percentage_30d.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_30d
                  ? noMinus(data.price_change_percentage_30d.toFixed(1)) + "%"
                  : "?"}
              </p>
            </td>
            <td>
              <p
                className={`${
                  data.price_change_percentage_1y &&
                  data.price_change_percentage_1y.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.price_change_percentage_1y &&
                  data.price_change_percentage_1y.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.price_change_percentage_1y
                  ? noMinus(data.price_change_percentage_1y.toFixed(1)) + "%"
                  : "?"}
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PriceChange;
