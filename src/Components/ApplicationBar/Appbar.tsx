import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Container, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';
import AppbarGeneric from '../Generics/AppbarGeneric';

const useStyles = makeStyles((theme: any) =>({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight:theme.spacing(1)
    },
    title: {
        flexGrow: 1
    }
}));

const Appbar: React.FC = () => {
    const styles = useStyles();

    return(
    <AppbarGeneric rightButtons={<><SignInButton /><SignUpButton /></>} 
    leftMenu={<MenuIcon />} title="Expense Tracker Web Application"/>
    );
}

export default Appbar;
