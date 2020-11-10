import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import StartPage from './Components/Pages/StartPage';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import Sidebar from './Components/Sidebar/Sidebar';
import HomePage from './Components/Pages/HomePage';
import SignUpPage from './Components/Pages/SignUpPage';
import UnauthorizedPage from './Components/Pages/UnauthorizedPage';

const App: React.FC = () => {

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Sidebar />
        <div style={{paddingLeft: 220}}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/registration">
              <SignUpPage />
            </Route>
            <Route exact path="/start">
              <UnauthorizedPage />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <StartPage /> */}
    </React.Fragment>
  );
}

export default App;
