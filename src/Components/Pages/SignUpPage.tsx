import React, { useContext } from 'react';
import AppbarGeneric from '../Generics/AppbarGeneric';
import MenuIcon from '@material-ui/icons/Menu';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SignInButton from '../Buttons/SignInButton';
import { makeStyles, Typography } from '@material-ui/core';
import SignUpForm from '../Forms/SignUpForm';
import UserContext from '../../Context/UserContext';
import userStatus from '../../userStatus';
import AppContent from '../Content/AppContent';

const SignUpPage: React.FC = () => {
    const context = useContext(UserContext);

    const leftIcon = () => {
        
        return(
            <CreditCardRoundedIcon onClick={() => {context.changeStatus(userStatus.Unauthorized)}} />
        );
    }

    return(
        <AppContent>
            <AppbarGeneric rightButtons={<><SignInButton /></>} 
            leftMenu={leftIcon()} title="Expense Tracker Web Application"/>
            <SignUpForm />
        </AppContent>
    );
}

export default SignUpPage;