import React, { useState, useEffect } from "react";

import classes from "./market.module.scss";
import CurrencyTable from "../components/currencyTable/currencyTable";
import PageNavigation from "../../shared/components/pageNavigation/pageNavigation";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/errorModal/errorModal";

const Market = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(
      props.match.params.marketPageNr
        ? parseInt(props.match.params.marketPageNr)
        : 1
    );
  }, [props.match.params.marketPageNr]);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setCurrencies(responseData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCurrencies();
  }, [page]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <h3 className={classes.title}>
        {/* Top{" "}
            {props.match.params.marketPageNr
              ? props.match.params.marketPageNr + "00"
              : "100"}{" "} */}
        Coins by Market Capitalization
      </h3>
      {currencies.length > 0 && (
        <React.Fragment>
          <PageNavigation page={page} />
          <CurrencyTable currencies={currencies} />
          <PageNavigation page={page} />
        </React.Fragment>
      )}
      {loading && <LoadingSpinner asOverlay />}
    </React.Fragment>
  );
};

export default Market;
