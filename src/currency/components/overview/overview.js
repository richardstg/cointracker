import React from "react";
import { Row, Col, Table } from "reactstrap";

import classes from "./overview.module.scss";
import Reddit from "../../../shared/components/svg/reddit";
import Facebook from "../../../shared/components/svg/facebook";
import Twitter from "../../../shared/components/svg/twitter";
import Github from "../../../shared/components/svg/github";
import formatter from "../../../shared/utils/currencyFormatter";
import noMinus from "../../../shared/utils/noMinus";

const Overview = (props) => {
  const { currency } = props;
  return (
    <div className={classes.overview}>
      <Row>
        <Col>
          <div className={classes.name}>
            <img alt="logo" src={currency.image.small} />
            <h2>
              {currency.name} ({currency.symbol.toUpperCase()})
            </h2>
          </div>
        </Col>
        <Col>
          <div className={classes.price}>
            <h2>
              {formatter.format(currency.market_data.current_price.usd)}{" "}
              <span
                className={`${classes.changePercentage24h} ${
                  currency.market_data.price_change_percentage_24h &&
                  currency.market_data.price_change_percentage_24h.toFixed(1) <
                    0 &&
                  classes.minus
                } ${
                  currency.market_data.price_change_percentage_24h &&
                  currency.market_data.price_change_percentage_24h.toFixed(1) >
                    0 &&
                  classes.plus
                }`}
              >
                {currency.market_data.price_change_percentage_24h !== null &&
                  noMinus(
                    currency.market_data.price_change_percentage_24h.toFixed(1)
                  ) + "%"}
              </span>
            </h2>
            <p></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className={classes.table}>
            <tbody>
              <tr>
                <th>
                  <p>Market Cap</p>
                </th>
                <td>
                  <p className={classes.rank}>
                    Rank #{currency.market_cap_rank}
                  </p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>Website</p>
                </th>
                <td>
                  {currency.links.homepage
                    .filter((page) => page)
                    .map((page) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className={classes.link}
                        href={page}
                      >
                        {
                          page
                            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                            .split("/")[0]
                        }
                      </a>
                    ))}
                </td>
              </tr>
              <tr>
                <th>
                  <p>Explorers</p>
                </th>
                <td>
                  {currency.links.blockchain_site
                    .filter((page) => page)
                    .map((page) => (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className={classes.link}
                        href={page}
                      >
                        {
                          page
                            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                            .split("/")[0]
                        }
                      </a>
                    ))}
                </td>
              </tr>
              <tr>
                <th>
                  <p>Community</p>
                </th>
                <td>
                  {currency.links.twitter_screen_name && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={classes.link}
                      href={
                        "https://twitter.com/" +
                        currency.links.twitter_screen_name
                      }
                    >
                      <Twitter />
                      Twitter
                    </a>
                  )}
                  {currency.links.facebook_username && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={classes.link}
                      href={
                        "https://www.facebook.com/" +
                        currency.links.facebook_username
                      }
                    >
                      <Facebook />
                      Facebook
                    </a>
                  )}
                  {currency.links.subreddit_url && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className={classes.link}
                      href={currency.links.subreddit_url}
                    >
                      <Reddit />
                      Reddit
                    </a>
                  )}
                  {currency.links.official_forum_url &&
                    currency.links.official_forum_url
                      .filter((page) => page)
                      .map((page) => (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className={classes.link}
                          href={page}
                        >
                          {
                            page
                              .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                              .split("/")[0]
                          }
                        </a>
                      ))}
                </td>
              </tr>
              <tr>
                <th>
                  <p>Source&nbsp;Code</p>
                </th>
                <td>
                  <p>
                    {currency.links.repos_url.github[0] && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className={classes.link}
                        href={currency.links.repos_url.github[0]}
                      >
                        <Github />
                        Github
                      </a>
                    )}
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Row>
            <Col>
              <div className={classes.marketData}>
                <h5>Market Cap</h5>
                <p>
                  {currency.market_data.market_cap.usd
                    ? formatter.format(currency.market_data.market_cap.usd)
                    : "?"}
                </p>
                <h5>24h Low / 24h High</h5>
                <p>
                  {currency.market_data.low_24h.usd &&
                  currency.market_data.high_24h.usd
                    ? formatter.format(currency.market_data.low_24h.usd) +
                      " / " +
                      formatter.format(currency.market_data.high_24h.usd)
                    : "?"}
                </p>
                <h5>Fully Diluted Valuation</h5>
                <p>
                  {currency.market_data.fully_diluted_valuation.usd
                    ? formatter.format(
                        currency.market_data.fully_diluted_valuation.usd
                      )
                    : "?"}
                </p>
              </div>
            </Col>
            <Col>
              <div className={classes.marketData}>
                <h5>24 Hour Trading Vol</h5>
                <p>
                  {currency.market_data.total_volume.usd
                    ? formatter.format(currency.market_data.total_volume.usd)
                    : "?"}
                </p>
                <h5>Circulating Supply</h5>
                <p>
                  {currency.market_data.circulating_supply
                    ? currency.market_data.circulating_supply
                        .toFixed()
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : "?"}
                </p>
                <h5>Max Supply</h5>
                <p>
                  {currency.market_data.max_supply
                    ? currency.market_data.max_supply
                        .toFixed()
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : "?"}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
