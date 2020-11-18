import React, { useState } from 'react';
import { Box, Button, Dialog} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SignInForm from '../Forms/SignInForm';
import ISignInFormData from '../Forms/FormDatas/ISignInFormData';

export interface BearerToken {
    accessToken: string;
}

const SignInButton:React.FC = () => {

    const [open, setOpen] = useState(false);

    const signIn = (formValues: ISignInFormData) => {
        console.log(formValues);
        handleClose();
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box mr={3}>
            <Button color="inherit" variant="outlined" onClick={() => handleClickOpen()}>
                Sign in
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignInForm handleClose={handleClose} signIn={signIn} />
            </Dialog>
        </Box>
    );
}

export default SignInButton;
