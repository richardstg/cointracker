import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import classes from "./main.module.scss";
import Chart from "./chart/chart";
import CoinData from "./coinData/coinData";
import PriceChange from "./priceChange/priceChange";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UI/errorModal/errorModal";

function isEmpty(obj) {
  /* Used to see if the coin data has been loaded */
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const Main = (props) => {
  const { currency } = props;
  const id = currency.id;

  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1],
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      /* Get the price history for the coin */
      setIsLoading(true);

      try {
        const dayResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
        );
        const day = await dayResponse.json();

        const weekResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const week = await weekResponse.json();

        const twoWeeksResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14`
        );
        const twoWeeks = await twoWeeksResponse.json();

        const monthResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );
        const month = await monthResponse.json();

        const threeMonthsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90`
        );
        const threeMonths = await threeMonthsResponse.json();

        const sixMonthsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=180`
        );
        const sixMonths = await sixMonthsResponse.json();

        const yearResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
        );
        const year = await yearResponse.json();

        const maxResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`
        );
        const max = await maxResponse.json();

        setCoinData({
          day: formatData(day.prices),
          week: formatData(week.prices),
          twoWeeks: formatData(twoWeeks.prices),
          month: formatData(month.prices),
          threeMonths: formatData(threeMonths.prices),
          sixMonths: formatData(sixMonths.prices),
          year: formatData(year.prices),
          max: formatData(max.prices),
          detail: currency,
        });
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currency, id]);

  return (
    <div className={classes.main}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Row>
        <Col lg={8}>
          <div>
            {!isEmpty(coinData) && (
              <PriceChange data={coinData.detail.market_data} />
            )}
            {!isEmpty(coinData) && <Chart data={coinData} />}
          </div>
        </Col>
        <Col lg={4}>
          {!isEmpty(coinData) && <CoinData data={coinData.detail} />}
        </Col>
      </Row>
    </div>
  );
};

export default Main;
