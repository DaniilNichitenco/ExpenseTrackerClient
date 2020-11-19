import React, { useContext, useEffect } from 'react';
import {
    Route, Redirect
  } from "react-router-dom";
import LeftMenu from '../Components/LeftMenu/LeftMenu';
import CalendarPage from '../Components/Pages/CalendarPage';
import HomePage from '../Components/Pages/HomePage';
import ProfilePage from '../Components/Pages/ProfilePage';
import StatisticPage from '../Components/Pages/StatisticPage';
import UserContext from '../Context/UserContext';
import UserData from '../Data/UserData';
import UserServices from '../Services/user.services/User.services';

  const AuthorizedRouter:React.FC = () => {

      let userContext = useContext(UserContext);
      useEffect(() => {
          
          const fetchAPI = async () => {
            let user:UserData = await UserServices.GetUserData(userContext.userData.userId) as UserData;
            if(user != null)
            {
                userContext.setUserData(user);
            }
          };

          fetchAPI();
      }, []);

    return(
        <React.Fragment>
            <LeftMenu />
            <div style={{paddingLeft: 256}}>
                <Route exact path="/au/home" component={HomePage} />
                <Route exact path="/au/profile" component={ProfilePage} />
                <Route exact path="/au/statistic" component={StatisticPage} />
                <Route exact path="/au/calendar" component={CalendarPage} />
                <Route render={() => <Redirect to="/au/home" />} />
            </div>
        </React.Fragment>
    );
  }

  export default AuthorizedRouter;