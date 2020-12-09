import { Box, Button, Dialog, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SignOutForm from '../Forms/SignOutForm/SignOutForm';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

interface SignOutButtomProps
{
    text?: string,
    style?: React.CSSProperties
}

const SignOutButtom: React.FC<SignOutButtomProps> = ({ text="Sign Out", style }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <Box mr={3}>
            <Button color="primary" style={style}
            // startIcon={<MeetingRoomIcon />}
            variant="contained" 
            onClick={() => handleClickOpen()}>
                <Typography>{text}</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignOutForm handleClose={handleClose} />
            </Dialog>
        </Box>
    );
}

export default SignOutButtom;