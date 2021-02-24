import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import classes from "./currencyTable.module.scss";
import formatter from "../../../shared/utils/currencyFormatter";
import noMinus from "../../../shared/utils/noMinus";

const CurrencyTable = (props) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>
              <p className={classes.rank}>#</p>
            </th>
            <th>
              <p className={classes.coin}>Name</p>
            </th>
            <th>
              <p className={classes.price}>Price</p>
            </th>
            <th>
              <p className={classes.priceChange}>1 h</p>
            </th>
            <th>
              <p className={classes.priceChange}>24 h</p>
            </th>
            <th>
              <p className={classes.priceChange}>7 d</p>
            </th>
            <th>
              <p className={classes.marketCap}>Market Cap</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.currencies.map((currency) => (
            <tr key={currency.id}>
              <td>
                <p className={classes.rank}>{currency.market_cap_rank}</p>
              </td>
              <td>
                <div className={classes.coin}>
                  <img
                    className={classes.logo}
                    alt="logo"
                    src={currency.image}
                  />
                  <p className={classes.name}>
                    <Link to={"/coin/" + currency.id}>{currency.name}</Link>{" "}
                    <span className={classes.symbol}>
                      {currency.symbol.toUpperCase()}
                    </span>
                  </p>
                </div>
              </td>
              <td>
                <p className={classes.price}>
                  {formatter.format(currency.current_price)}
                </p>
              </td>
              <td>
                <p
                  className={`${classes.priceChange} ${
                    currency.price_change_percentage_1h_in_currency &&
                    currency.price_change_percentage_1h_in_currency.toFixed(1) <
                      0 &&
                    classes.minus
                  } ${
                    currency.price_change_percentage_1h_in_currency &&
                    currency.price_change_percentage_1h_in_currency.toFixed(1) >
                      0 &&
                    classes.plus
                  }`}
                >
                  {currency.price_change_percentage_1h_in_currency === null
                    ? "?"
                    : noMinus(
                        currency.price_change_percentage_1h_in_currency.toFixed(
                          1
                        )
                      ) + "%"}
                </p>
              </td>
              <td>
                <p
                  className={`${classes.priceChange} ${
                    currency.price_change_percentage_24h &&
                    currency.price_change_percentage_24h.toFixed(1) < 0 &&
                    classes.minus
                  } ${
                    currency.price_change_percentage_24h &&
                    currency.price_change_percentage_24h.toFixed(1) > 0 &&
                    classes.plus
                  }`}
                >
                  {currency.price_change_percentage_24h === null
                    ? "?"
                    : noMinus(currency.price_change_percentage_24h.toFixed(1)) +
                      "%"}
                </p>
              </td>
              <td>
                <p
                  className={`${classes.priceChange} ${
                    currency.price_change_percentage_7d_in_currency &&
                    currency.price_change_percentage_7d_in_currency.toFixed(1) <
                      0 &&
                    classes.minus
                  } ${
                    currency.price_change_percentage_7d_in_currency &&
                    currency.price_change_percentage_7d_in_currency.toFixed(1) >
                      0 &&
                    classes.plus
                  }`}
                >
                  {currency.price_change_percentage_7d_in_currency === null
                    ? "?"
                    : noMinus(
                        currency.price_change_percentage_7d_in_currency.toFixed(
                          1
                        )
                      ) + "%"}
                </p>
              </td>
              <td>
                <p className={classes.marketCap}>
                  {formatter.format(currency.market_cap)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CurrencyTable;
