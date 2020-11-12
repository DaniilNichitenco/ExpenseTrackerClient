import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom";
import Sidebar from './Components/Sidebar/Sidebar';
import HomePage from './Components/Pages/HomePage';
import SignUpPage from './Components/Pages/SignUpPage';
import UnauthorizedPage from './Components/Pages/UnauthorizedPage';
import LeftMenu from './Components/LeftMenu/LeftMenu';
import ProfilePage from './Components/Pages/ProfilePage';

const App: React.FC = () => {

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        {/* <Sidebar /> */}
        <LeftMenu />
        <div style={{paddingLeft: 256, margin:0}}>
          <Switch>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/home/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/registration">
              <SignUpPage />
            </Route>
            <Route exact path="/">
              <UnauthorizedPage />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
