import React, { useContext, useEffect } from 'react';
import {
    Route, Redirect, Switch, useHistory
  } from "react-router-dom";
import SignOutButtom from '../Components/Buttons/SignOutButtom';
import AppContent from '../Components/Content/AppContent';
import AppbarGeneric from '../Components/Generics/AppbarGeneric';
import LeftMenu from '../Components/LeftMenu/LeftMenu';
import CalendarPage from '../Components/Pages/CalendarPage';
import HomePage from '../Components/Pages/HomePage';
import ProfilePage from '../Components/Pages/ProfilePage';
import StatisticPage from '../Components/Pages/StatisticPage';
import { GetCurrentUser } from '../Services/auth.services/auth-service';

  const AuthorizedRouter:React.FC = () => {

      const history = useHistory();

      useEffect(() => {

        const user = GetCurrentUser();
        if(user == null)
        {
          history.push('/');
        }
        
      }, []);

    return(
        <React.Fragment>
            <LeftMenu />
            <div style={{paddingLeft: 256}}>
                <AppbarGeneric rightButtons={<><SignOutButtom /></>} />
                <AppContent>
                  <Switch>
                    <Route exact path="/au/home" component={HomePage} />
                    <Route exact path="/au/profile" component={ProfilePage} />
                    <Route exact path="/au/statistic" component={StatisticPage} />
                    <Route exact path="/au/calendar" component={CalendarPage} />
                    <Redirect to="/au/home" />
                  </Switch>
                </AppContent>
            </div>
        </React.Fragment>
    );
  }

  export default AuthorizedRouter;