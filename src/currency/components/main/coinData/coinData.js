import React from "react";
import { Table } from "reactstrap";

import classes from "./coinData.module.scss";
import formatter from "../../../../shared/utils/currencyFormatter";
import noMinus from "../../../../shared/utils/noMinus";

// // Create number formatter
// var formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",

//   // These options are needed to round to whole numbers if that's what you want.
//   minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//   maximumFractionDigits: 8, // (causes 2500.99 to be printed as $2,501)
// });

const CoinData = ({ data }) => {
  console.log(data);

  return (
    <Table className={classes.table}>
      <tbody>
        <tr>
          <th>
            <p>Price</p>
          </th>
          <td>
            <p>
              {data.market_data.current_price.usd
                ? formatter.format(data.market_data.current_price.usd)
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>Market Cap</p>
          </th>
          <td>
            <p>
              {data.market_data.market_cap.usd
                ? formatter.format(data.market_data.market_cap.usd)
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>Trading Volume</p>
          </th>
          <td>
            <p>
              {data.market_data.total_volume.usd
                ? formatter.format(data.market_data.total_volume.usd)
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>Volume / Market Cap</p>
          </th>
          <td>
            <p>
              {data.market_data.total_volume.usd &&
              data.market_data.market_cap.usd
                ? (
                    data.market_data.total_volume.usd /
                    data.market_data.market_cap.usd
                  ).toFixed(4)
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>24h Low / 24h High</p>
          </th>
          <td>
            <p>
              {data.market_data.low_24h.usd && data.market_data.high_24h.usd
                ? formatter.format(data.market_data.low_24h.usd) +
                  " / " +
                  formatter.format(data.market_data.high_24h.usd)
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>Market Cap Rank</p>
          </th>
          <td>
            <p>
              {data.market_data.market_cap_rank
                ? "#" + data.market_data.market_cap_rank
                : "?"}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>All-Time High</p>
          </th>
          <td>
            <p>
              {data.market_data.ath.usd
                ? formatter.format(data.market_data.ath.usd)
                : "?"}{" "}
              <span
                className={`${
                  data.market_data.ath_change_percentage.usd &&
                  data.market_data.ath_change_percentage.usd.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.market_data.ath_change_percentage.usd &&
                  data.market_data.ath_change_percentage.usd.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.market_data.ath_change_percentage.usd &&
                  data.market_data.ath.usd &&
                  noMinus(
                    data.market_data.ath_change_percentage.usd.toFixed(1)
                  ) + "%"}
              </span>
            </p>
            <p className={classes.date}>
              {data.market_data.ath_date.usd &&
                data.market_data.ath_date.usd.slice(0, 10)}
            </p>
          </td>
        </tr>
        <tr>
          <th>
            <p>All-Time Low</p>
          </th>
          <td>
            <p>
              {data.market_data.atl.usd
                ? formatter.format(data.market_data.atl.usd)
                : "?"}{" "}
              <span
                className={`${
                  data.market_data.atl_change_percentage.usd &&
                  data.market_data.atl_change_percentage.usd.toFixed(1) < 0 &&
                  classes.minus
                } ${
                  data.market_data.atl_change_percentage.usd &&
                  data.market_data.atl_change_percentage.usd.toFixed(1) > 0 &&
                  classes.plus
                }`}
              >
                {data.market_data.atl_change_percentage.usd &&
                  data.market_data.atl.usd &&
                  noMinus(
                    data.market_data.atl_change_percentage.usd.toFixed(1)
                  ) + "%"}
              </span>
            </p>
            <p className={classes.date}>
              {data.market_data.atl_date.usd &&
                data.market_data.atl_date.usd.slice(0, 10)}
            </p>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CoinData;
