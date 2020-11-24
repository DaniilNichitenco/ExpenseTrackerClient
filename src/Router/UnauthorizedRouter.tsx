import React, { useEffect } from 'react';
import {
    Route, Redirect, Switch, useHistory
  } from "react-router-dom";
import SignInButton from '../Components/Buttons/SignInButton';
import AppbarGeneric from '../Components/Generics/AppbarGeneric';
import SignUpPage from '../Components/Pages/SignUpPage';
import UnauthorizedPage from '../Components/Pages/UnauthorizedPage';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SignUpButton from '../Components/Buttons/SignUpButton';
import useLocalStorage from '../CustomHooks/StorageHooks/useLocalStorage';

  const UnauthorizedRouter:React.FC = () => {

    const [isAuthorized, setIsAuthorized] = useLocalStorage("authorized", false);

    const history = useHistory();
    useEffect(() => {
       
          if(isAuthorized)
          {
              history.push('/au/home');
          }
    }, []);

    const leftIcon = () => {
        
    return(
        <CreditCardRoundedIcon onClick={() => {history.push('/');}} />
        );
    }

    return(
        <React.Fragment>
            <AppbarGeneric rightButtons={<><SignInButton /><SignUpButton /></>} 
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