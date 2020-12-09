import React, { useState } from 'react';
import { Box, Button, Dialog, Typography} from '@material-ui/core';
import SignInForm from '../Forms/SignInForm/SignInForm';

interface SignIpBottomProps
{
    text?: string,
    style?: React.CSSProperties,
    textVariant? : "button" | "caption" | "h1" | "h2" | "h3" 
    | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" 
    | "body1" | "body2" | "overline" | "srOnly",
}

const SignInButton:React.FC<SignIpBottomProps> = ({text="Sign In", textVariant, style}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box mr={3}>
            <Button style={style} color="inherit" variant="outlined" onClick={handleClickOpen}>
                <Typography variant={textVariant}>{text}</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignInForm handleClose={handleClose} />
            </Dialog>
        </Box>
    );
}

export default SignInButton;
