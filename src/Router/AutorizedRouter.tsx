import { CircularProgress, Grid, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
    Route, Redirect, Switch, useHistory
  } from "react-router-dom";
import SignOutButtom from '../Components/Buttons/SignOutButtom';
import AppContent from '../Components/Content/AppContent';
import AppbarGeneric from '../Components/Appbar/AppbarGeneric';
import LeftMenu from '../Components/LeftMenu/LeftMenu';
import HomePage from '../Components/Pages/HomePage';
import ProfilePage from '../Components/Pages/ProfilePage';
import StatisticPage from '../Components/Pages/StatisticPage';
import useSessionStorage from '../CustomHooks/StorageHooks/useSessionStorage';
import User from '../Data/Models/User/User';
import { SignOut } from '../Services/auth.services/auth-service';
import { GetCurrentUserData } from '../Services/user.services/User.service';
import HomeIcon from '@material-ui/icons/Home';
import PursesPage from '../Components/Pages/PursesPage';

  const AuthorizedRouter:React.FC = () => {

      const history = useHistory();
      const [isLoading, setIsLoading] = useState(true);
      const [userData, setUserData] = useSessionStorage<User | undefined>(
        "userData", undefined);
      const theme = useTheme();

      useEffect(() => {
            GetCurrentUserData().then(result => {
              if(result.status == 200)
              {
                let user = result.data as User;
                setUserData(user);
                setIsLoading(false);
              }
              else
              {
                SignOut();
                history.push('/');
              }
            })
            .catch(error => {
              console.log(error);
              history.push('/');
            });
      }, []);

      const leftIcon = () => {
        
        return(
            <HomeIcon onClick={() => {history.push('/au/home');}} />
            );
        }

    if(isLoading || userData == undefined)
    {
      return (
        <Grid container xs={12} justify="center">
          <CircularProgress color="secondary" />
        </Grid>
      );
    }

    return(
        <React.Fragment>
            <LeftMenu />
            <div style={{paddingLeft: 256}}>
                <AppbarGeneric leftMenu={leftIcon()} title="Expense Tracker Web Application"
                appBarStyle={{backgroundColor: theme.palette.primary.dark}}
                rightButtons={<><SignOutButtom style={{backgroundColor: theme.palette.primary.light, width: 100}} /></>} />
                <AppContent>
                  <Switch>
                    <Route exact path="/au/home" component={HomePage} />
                    <Route exact path="/au/profile" component={ProfilePage} />
                    <Route exact path="/au/statistic" component={StatisticPage} />
                    <Route exact path="/au/purses" component={PursesPage} />
                    <Redirect to="/au/home" />
                  </Switch>
                </AppContent>
            </div>
        </React.Fragment>
    );
  }

  export default AuthorizedRouter;