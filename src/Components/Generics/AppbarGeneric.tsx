import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Container, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme: any) =>({
    menuButton: {
        marginRight:theme.spacing(1)
    },
    title: {
        flexGrow: 1
    },
}));

interface IAppbarGenericProps
{
    rightButtons?: React.ReactNode,
    leftMenu?: React.ReactNode,
    title?: string
}


const AppbarGeneric: React.FC<IAppbarGenericProps> = (props) => {
    const styles = useStyles();

    return(
        <AppBar style={{backgroundColor: "rgba(15, 15, 15, 1)"}} color="primary" position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Box>
                            <IconButton edge="start" color="inherit" aria-label="menu" className={styles.menuButton}>
                                {props.leftMenu}
                            </IconButton>
                        </Box>
                        <Typography variant="h6" className={styles.title}>{props.title}</Typography>
                        {props.rightButtons}
                     </Toolbar>
                 </Container>
             </AppBar>
    );
}

export default AppbarGeneric;
