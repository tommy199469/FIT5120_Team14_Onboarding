import * as React from "react";
import { Router, Switch, Route, Redirect } from "react-router";
import { history } from "./stores";

// Components
import { Home } from "./pages/home";
import { Subscribe } from "./pages/subscribe";

export default function Routers() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/subscribe"} exact component={Subscribe} />

        <Route path="*">
          <Redirect from={"/"} to={"/"} />
        </Route>
      </Switch>
    </Router>
  );
}
