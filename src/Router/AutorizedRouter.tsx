import React from 'react';
import {
    Route, Redirect
  } from "react-router-dom";
import LeftMenu from '../Components/LeftMenu/LeftMenu';
import HomePage from '../Components/Pages/HomePage';
import ProfilePage from '../Components/Pages/ProfilePage';

  const AuthorizedRouter:React.FC = () => {

    return(
        <React.Fragment>
            <LeftMenu />
            <div style={{paddingLeft: 256}}>
                <Route exact path="/au/home" component={HomePage} />
                <Route exact path="/au/profile" component={ProfilePage} />
                <Route render={() => <Redirect to="/au/home" />} />
            </div>
        </React.Fragment>
    );
  }

  export default AuthorizedRouter;