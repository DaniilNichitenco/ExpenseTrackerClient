import React, { useState } from 'react';
import { Box, Button, Dialog} from '@material-ui/core';
import SignInForm from '../Forms/SignInForm/SignInForm';
import { useHistory } from 'react-router-dom';

export interface BearerToken {
    accessToken: string;
}


const SignInButton:React.FC = () => {

    const [open, setOpen] = useState(false);

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
                <SignInForm handleClose={handleClose} />
            </Dialog>
        </Box>
    );
}

export default SignInButton;
