export const formatTrendingCurrencies = (currencies) => {
  return currencies.map((currency) => {
    return {
      id: currency.item.id,
      symbol: currency.item.symbol,
      name: currency.item.name,
      market_cap_rank: currency.item.market_cap_rank,
      image: currency.item.thumb,
    };
  });
};
