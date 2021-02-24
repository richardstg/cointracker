import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

import classes from "./stats.module.scss";
import Search from "./search/search";
import noMinus from "../../../utils/noMinus";
import formatter from "../../../utils/currencyFormatter";
import ErrorModal from "../../UI/errorModal/errorModal";

const Stats = () => {
  const [globalMarketStats, setGlobalMarketStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      /* Get the global market stats from the API */
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setGlobalMarketStats(responseData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getStats();
  }, []);

  return (
    <Container className={classes.container}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      {globalMarketStats && (
        <div className={classes.stats}>
          <pre>
            <p className={classes.stat}>
              Market Cap:{" "}
              <span className={classes.blue}>
                {formatter.format(globalMarketStats.total_market_cap.usd)}
              </span>
              <span
                className={`${classes.normal} ${
                  globalMarketStats.market_cap_change_percentage_24h_usd &&
                  globalMarketStats.market_cap_change_percentage_24h_usd.toFixed(
                    1
                  ) < 0 &&
                  classes.minus
                } ${
                  globalMarketStats.market_cap_change_percentage_24h_usd &&
                  globalMarketStats.market_cap_change_percentage_24h_usd.toFixed(
                    1
                  ) > 0 &&
                  classes.plus
                }`}
              >
                {" "}
                {noMinus(
                  globalMarketStats.market_cap_change_percentage_24h_usd.toFixed(
                    1
                  )
                ) + "%"}
              </span>
            </p>
          </pre>
          <pre>
            <p className={classes.stat}>
              24h Vol:{" "}
              <span className={classes.blue}>
                {formatter.format(globalMarketStats.total_volume.usd)}
              </span>
            </p>
          </pre>
          <pre>
            <p className={classes.stat}>
              Dominance:{" "}
              <span className={classes.normal}>
                {`BTC ${globalMarketStats.market_cap_percentage.btc.toFixed(
                  1
                )}% / ETH ${globalMarketStats.market_cap_percentage.eth.toFixed(
                  1
                )}%`}
              </span>
            </p>
          </pre>
        </div>
      )}
      <div className={classes.search}>
        <Search />
      </div>
    </Container>
  );
};

export default Stats;
