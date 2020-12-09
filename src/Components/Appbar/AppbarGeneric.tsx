import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Container, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>({
    menuButton: {
        marginRight:theme.spacing(1)
    },
    title: {
        flexGrow: 1
    },
    appbar: {
        zIndex:theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.dark
    }
}));

interface IAppbarGenericProps
{
    rightButtons?: React.ReactNode,
    leftMenu?: React.ReactNode,
    title?: string,
    appBarStyle?: React.CSSProperties,
}


const AppbarGeneric: React.FC<IAppbarGenericProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return(
        <AppBar className={classes.appbar} style={props.appBarStyle} color="primary" position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Box>
                            <IconButton onClick={() => {history.push("/");}}
                             edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                                {props.leftMenu}
                            </IconButton>
                        </Box>
                        <Typography variant="h6" className={classes.title}>{props.title}</Typography>
                        {props.rightButtons}
                     </Toolbar>
                 </Container>
             </AppBar>
    );
}

export default AppbarGeneric;
