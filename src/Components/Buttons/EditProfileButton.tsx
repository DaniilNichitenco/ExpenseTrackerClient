import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

interface EditProfileButtonProps
{
    text?: string,
    style?: React.CSSProperties,
    onClick: () => void
}

export const EditProfileButton: React.FC<EditProfileButtonProps> = (props) => {
    
    return(
        <React.Fragment>
            <Button
            variant="contained"
            color="secondary"
            style={props.style}
            onClick={props.onClick}
            startIcon={<SettingsIcon />}
            >
                {props.text ? props.text : "Edit profile"}
            </Button>
        </React.Fragment>
    )
}

export default EditProfileButton;