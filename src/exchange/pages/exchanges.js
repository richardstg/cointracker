import React, { useState, useEffect } from "react";

import classes from "./exchanges.module.scss";
import ExchangesTable from "../components/exchangesTable/exchangesTable";
import ErrorModal from "../../shared/components/UI/errorModal/errorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";

const Exchanges = (props) => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/exchanges"
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setExchanges(responseData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getExchanges();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <h3 className={classes.title}>Top 100 Exchanges by Trust Score Rank</h3>
      {exchanges.length > 0 && <ExchangesTable exchanges={exchanges} />}
      {loading && <LoadingSpinner asOverlay />}
    </React.Fragment>
  );
};

export default Exchanges;
