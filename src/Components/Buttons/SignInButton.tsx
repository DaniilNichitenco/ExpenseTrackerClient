import React, { useState } from 'react';
import { Box, Button, Dialog} from '@material-ui/core';
import SignInForm from '../Forms/SignInForm/SignInForm';

interface SignIpBottomProps
{
    text?: string
}

const SignInButton:React.FC<SignIpBottomProps> = ({text="Sign In"}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box mr={3}>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignInForm handleClose={handleClose} />
            </Dialog>
        </Box>
    );
}

export default SignInButton;
