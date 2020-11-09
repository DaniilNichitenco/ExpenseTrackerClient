import React, { Component } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignInButton from '../Buttons/SignInButton';

const SignUpButton: React.FC = () => {

    return(
        <Box>
            <Button style={{backgroundColor: "rgba(48, 48, 48, 1)"}} color="inherit" variant="contained">
                Sign up
            </Button>
        </Box>
    );
}

export default SignUpButton;