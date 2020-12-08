import React, { useEffect } from 'react';
import {
    Route, Redirect, Switch, useHistory
  } from "react-router-dom";
import SignInButton from '../Components/Buttons/SignInButton';
import AppbarGeneric from '../Components/Appbar/AppbarGeneric';
import SignUpPage from '../Components/Pages/SignUpPage';
import UnauthorizedPage from '../Components/Pages/UnauthorizedPage';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SignUpButton from '../Components/Buttons/SignUpButton';
import useLocalStorage from '../CustomHooks/StorageHooks/useLocalStorage';
import { GetCurrentUserData } from '../Services/user.services/User.service';
import { useTheme } from '@material-ui/core';

  const UnauthorizedRouter:React.FC = () => {

    const theme = useTheme();

    const history = useHistory();
    useEffect(() => {
       
        GetCurrentUserData()
            .then(res => {
                if(res.status == 200)
                {
                    history.push("/au/home");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const leftIcon = () => {
        
    return(
        <CreditCardRoundedIcon onClick={() => {history.push('/');}} />
        );
    }

    return(
        <React.Fragment>
            <AppbarGeneric appBarStyle={{backgroundColor: theme.palette.primary.dark}} 
            rightButtons={<><SignInButton />
            <SignUpButton style={{backgroundColor: theme.palette.success.main}} /></>} 
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