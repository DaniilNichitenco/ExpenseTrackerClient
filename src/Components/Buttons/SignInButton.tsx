import React, { useCallback, Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Dialog, FormControl, FormGroup, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SignInForm from '../Forms/SignInForm';
import UserContext from '../../Context/UserContext';

export interface BearerToken {
    accessToken: string;
}

const useStyles = makeStyles((theme: any) => ({
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: "center"
    }
}));

const SignInButton:React.FC = () => {

    const styles = useStyles();

    const [open, setOpen] = useState(false);

    const signIn = (login: string, password: string) => {
        console.log(login);
        console.log(password);
        handleClose();
    }

    const handleClickOpen = () => {
        console.log("open");
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box mr={3}>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
                Sign in
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignInForm handleClose={handleClose} signIn={signIn} />
            </Dialog>
        </Box>
    );
}

export default SignInButton;
