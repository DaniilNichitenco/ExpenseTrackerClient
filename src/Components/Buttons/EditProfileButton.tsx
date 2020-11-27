import { Button, Dialog } from '@material-ui/core';
import { OverridableTypeMap } from '@material-ui/core/OverridableComponent';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';

interface EditProfileButtonProps
{
    text?: string,
    style?: React.CSSProperties
}

export const EditProfileButton: React.FC<EditProfileButtonProps> = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return(
        <React.Fragment>
            <Button
            variant="contained"
            color="secondary"
            style={props.style}
            startIcon={<SettingsIcon />}
            >
                {props.text ? props.text : "Edit profile"}
            </Button>
            <Dialog open={open} onClose={handleClose} arial-lablledby="form-dialog-title">
                {/* <SignInForm handleClose={handleClose} /> */}
            </Dialog>
        </React.Fragment>
    )
}

export default EditProfileButton;