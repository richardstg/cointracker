import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./currency.module.scss";
import Overview from "../components/overview/overview";
import Main from "../components/main/main";
import ErrorModal from "../../shared/components/UI/errorModal/errorModal";

const Currency = (props) => {
  const [currency, setCurrency] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCurrency = async () => {
      /* Get the currency from the API */
      try {
        // setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${props.match.params.currency}?market_data=true`
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error();
        }

        setCurrency(responseData);
        // setLoading(false);
      } catch (err) {
        // setLoading(false);
        setError(err);
      }
    };

    getCurrency();
  }, [props.match.params.currency]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      {currency && (
        <div className={classes.navigation}>
          <p>
            <Link to="/">Coins</Link> > {currency.name}
          </p>
        </div>
      )}
      {currency && <Overview currency={currency} />}
      {currency && <Main currency={currency} />}
    </React.Fragment>
  );
};

export default Currency;
