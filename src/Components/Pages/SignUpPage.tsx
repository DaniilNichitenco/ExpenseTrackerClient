import React from 'react';
import AppbarGeneric from '../Generics/AppbarGeneric';
import MenuIcon from '@material-ui/icons/Menu';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SignInButton from '../Buttons/SignInButton';
import { makeStyles, Typography } from '@material-ui/core';
import SignUpForm from '../Forms/SignUpForm';

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor:"rgba(140, 140, 140, 1)",
        position:"relative",
        paddingTop:100, 
        paddingBottom:100, 
        top:0,
        bottom:0, 
        left:0, 
        right:0,
        marginBottom:0
    }
}));

const SignUpPage: React.FC = () => {

    const styles = useStyles();

    return(
        <React.Fragment>
            <AppbarGeneric rightButtons={<><SignInButton /></>} 
            leftMenu={<CreditCardRoundedIcon />} title="Expense Tracker Web Application"/>
            <div className={styles.content}>
                <SignUpForm />
            </div>
        </React.Fragment>
    );
}

export default SignUpPage;