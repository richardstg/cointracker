import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import classes from "./search.module.scss";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../UI/errorModal/errorModal";
import { formatTrendingCurrencies } from "../../../../utils/formatTrendingCurrencies";

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [trendingCurrencies, setTrendingCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [showTrending, setShowTrending] = useState(false);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(null);

  const history = useHistory();
  const searchRef = useRef(null);

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const showResultsHandler = () => {
    setShowResults(true);
  };

  const hideResultsHandler = () => {
    setShowResults(false);
  };

  const keyDownHandler = (e) => {
    /* Makes is possible for user to scroll through currencies with arrows and choose with enter*/
    if (e.keyCode === 13) {
      goToCurrency(e);
    } else if (e.keyCode === 38) {
      if (selected === 0) {
        return;
      }
      setSelected((prevState) => prevState - 1);
    } else if (e.keyCode === 40) {
      if (selected - 1 === filteredCurrencies.length) {
        return;
      }
      setSelected((prevState) => prevState + 1);
    }
  };

  const goToCurrency = (event) => {
    /* Redirect to the currencies page and reset most of the component's state */
    history.push(`/coin/${filteredCurrencies[selected].id}`);

    setSearch("");
    setShowResults(false);
    setSelected(0);
    setFilteredCurrencies([]);

    // event.target.blur();
  };

  useEffect(() => {
    const getCurrencies = async () => {
      /* Get the currencies from the API */
      let currencies = [];

      let i = 1;
      let response;
      let responseData;

      setLoading(true);
      // Can only get 100 at a time from API, therefore, loop through and save in array
      while (i <= 10) {
        try {
          response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${i}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
          );
          responseData = await response.json();

          if (!response.ok) {
            throw new Error(response.message);
          }

          currencies = [...currencies, ...responseData];
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }

        i++;
      }

      setCurrencies(currencies);
      setLoading(false);
    };

    const getTrendingCurrencies = async () => {
      /* Get the trending currencies from the API. Will be shown when search field is empty. */
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setTrendingCurrencies(formatTrendingCurrencies(responseData.coins));
      } catch (err) {
        setError(err.message);
      }
    };

    // If the currencies havn't been loaded, then get them
    if (currencies.length === 0) {
      getCurrencies();
    }

    // If the trending currencies havn't been loaded, then get them
    if (currencies.length === 0) {
      getTrendingCurrencies();
    }

    // If the user has made a search, set the filtered currencies state with that search filter, otherwise
    // set the state to the trending currencies
    if (search && currencies.length > 0) {
      setFilteredCurrencies(
        currencies.filter((currency) =>
          // Filter the currencies that will be shown in the dropdown menu
          currency.name.toLowerCase().startsWith(search.toLowerCase())
        )
      );
      setShowTrending(false);
    } else if (!search && trendingCurrencies.length > 0) {
      setFilteredCurrencies(trendingCurrencies);
      setShowTrending(true);
    }
  }, [currencies, trendingCurrencies, search]);

  useEffect(() => {
    const hideResultsOnClick = (event) => {
      /* Hide the search results when any area outside the search component is clicked */
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        hideResultsHandler();
      }
    };

    document.addEventListener("click", hideResultsOnClick);

    return () => document.removeEventListener("click", hideResultsOnClick);
  }, []);

  return (
    <div className={classes.search} ref={searchRef}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <input
        className={classes.input}
        type="search"
        placeholder="Search coin..."
        value={search}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        onFocus={showResultsHandler}
      />
      {filteredCurrencies.length > 0 && (
        <ul
          className={`${classes.dropDownMenu} ${showResults && classes.show}`}
        >
          {loading && search && (
            <div className={classes.loadingSpinner}>
              <LoadingSpinner size={5} />
            </div>
          )}
          {showTrending && (
            <h5 className={classes.trending}>Trending coins 🔥</h5>
          )}
          {filteredCurrencies.slice(0, 7).map((currency, index) => {
            return (
              <li
                key={currency.id}
                className={`${classes.dropDownItem} ${
                  currency.id === filteredCurrencies[selected].id &&
                  classes.active
                }`}
                onClick={(event) => {
                  goToCurrency(event);
                }}
                onMouseOver={() => {
                  setSelected(index);
                }}
              >
                <div className={classes.coin}>
                  <img
                    className={classes.logo}
                    alt="logo"
                    src={currency.image}
                  />{" "}
                  <p>
                    {currency.name} ({currency.symbol.toUpperCase()})
                  </p>
                </div>{" "}
                <p>
                  <span className={classes.rank}>
                    #{currency.market_cap_rank}
                  </span>
                </p>
              </li>
            );
          })}
          {filteredCurrencies.length === 0 && !loading && (
            <li className={classes.dropDownItem}>
              <p>No results.</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
