import { Box, Button, Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import SignOutForm from '../Forms/SignOutForm/SignOutForm';

const SignOutButtom: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <Box mr={3}>
            <Button color="secondary" variant="outlined" onClick={() => handleClickOpen()}>
                Sign Out
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                <SignOutForm handleClose={handleClose} />
            </Dialog>
        </Box>
    );
}

export default SignOutButtom;