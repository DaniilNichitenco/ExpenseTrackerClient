import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
  } from "react-router-dom";
import SignUpPage from '../Components/Pages/SignUpPage';
import UnauthorizedPage from '../Components/Pages/UnauthorizedPage';
import AuthorizedRouter from './AutorizedRouter';

  const MainRouter: React.FC = () => {

    return(
        <Router>
            <Switch>
              <Route exact path="/registration" component={SignUpPage} />
              <Route path="/au" component={AuthorizedRouter} />
              <Route exact path="/" component={UnauthorizedPage} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
  }

  export default MainRouter;