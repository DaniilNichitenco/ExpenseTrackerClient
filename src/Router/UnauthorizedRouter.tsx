import React, { useContext, useEffect } from 'react';
import {
    Route, Redirect, Switch
  } from "react-router-dom";
import SignInButton from '../Components/Buttons/SignInButton';
import AppbarGeneric from '../Components/Generics/AppbarGeneric';
import SignUpPage from '../Components/Pages/SignUpPage';
import UnauthorizedPage from '../Components/Pages/UnauthorizedPage';
import UserContext from '../Context/UserContext';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';

  const UnauthorizedRouter:React.FC = () => {

      let userContext = useContext(UserContext);
      useEffect(() => {
          
          // const fetchAPI = async () => {
          //   let user:UserData = await UserServices.GetUserData(userContext.userData.userId) as UserData;
          //   if(user != null)
          //   {
          //       userContext.setUserData(user);
          //   }
          // };

          // fetchAPI();
      }, []);

      const leftIcon = () => {
        
        return(
            <CreditCardRoundedIcon onClick={() => {}} />
        );
    }

    return(
        <React.Fragment>
            <AppbarGeneric rightButtons={<><SignInButton /></>} 
            leftMenu={leftIcon()} title="Expense Tracker Web Application"/>
            <Switch>
                <Route exact path="/registration" component={SignUpPage} />
                <Route exact path="/" component={UnauthorizedPage} />
                <Redirect to="/" />
            </Switch>
        </React.Fragment>
    );
  }

  export default UnauthorizedRouter;