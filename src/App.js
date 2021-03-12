import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./shared/styles/app.scss";
import Market from "./market/pages/market";
import Exchanges from "./exchange/pages/exchanges";
import Currency from "./currency/pages/currency";
import Layout from "./shared/hoc/layout/Layout";
import Derivatives from "./derivatives/pages/derivatives";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Market} />
        <Route path="/exchanges" exact component={Exchanges} />
        <Route path="/derivatives" exact component={Derivatives} />
        <Route path="/:marketPageNr" exact component={Market} />
        <Route path="/coin/:currency" component={Currency} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
