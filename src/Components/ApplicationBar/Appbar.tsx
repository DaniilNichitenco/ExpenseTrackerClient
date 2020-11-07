import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Container, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';

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

type AppbarProps = {
    classes: Record<"title" | "root" | "menuButton", string>
};

class Appbar extends Component<AppbarProps>
{

    render() {
        const classes = this.props.classes;

        return (
            <AppBar color="primary" position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Box>
                            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="h6" className={classes.title}>Expense Tracker</Typography>
                        <SignInButton />
                        <SignUpButton />
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
}

export default () => {
    const classes = useStyles();
    return <Appbar classes={classes} />
};