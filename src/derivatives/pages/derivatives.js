import React, { useState, useEffect } from "react";

import classes from "./derivatives.module.scss";
import DerivativesTable from "../components/derivativesTable/derivativesTable";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/errorModal/errorModal";

const Derivatives = (props) => {
  const [derivatives, setDerivatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDerivatives = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/derivatives/exchanges"
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error();
        }

        setDerivatives(responseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getDerivatives();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      {derivatives.length > 0 && (
        <React.Fragment>
          <h3 className={classes.title}>
            Top Derivative Exchanges by Open Interest & Trade Volume
          </h3>
          <DerivativesTable derivatives={derivatives} />
        </React.Fragment>
      )}
      {loading && <LoadingSpinner asOverlay />}
    </React.Fragment>
  );
};

export default Derivatives;
