import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
  } from "react-router-dom";
import AuthorizedRouter from './AutorizedRouter';
import UnauthorizedRouter from './UnauthorizedRouter';


  const MainRouter: React.FC = () => {

    return(
        <Router>
                <Switch>
                  <Route path="/au" component={AuthorizedRouter} />
                  <Route component={UnauthorizedRouter} />
                </Switch>
        </Router>
    );
  }

  export default MainRouter;