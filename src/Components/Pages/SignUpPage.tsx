import React from 'react';
import Appbar from '../ApplicationBar/Appbar';
import AppbarGeneric from '../Generics/AppbarGeneric';
import MenuIcon from '@material-ui/icons/Menu';
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';

const SignUpPage: React.FC = () => {

    return(
        <React.Fragment>
            <AppbarGeneric rightButtons={<><SignInButton /><SignUpButton /></>} 
    leftMenu={<MenuIcon />} title="Expense Tracker Web Application"/>
        </React.Fragment>
    );
}

export default SignUpPage;