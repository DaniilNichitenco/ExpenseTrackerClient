import { Button } from '@material-ui/core';
import { OverridableTypeMap } from '@material-ui/core/OverridableComponent';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

interface EditProfileButtonProps
{
    text?: string,
    style?: React.CSSProperties
}

export const EditProfileButton: React.FC<EditProfileButtonProps> = (props) => {

    return(
        <Button
        variant="contained"
        color="secondary"
        style={props.style}
        startIcon={<SettingsIcon />}
        >
            {props.text ? props.text : "Edit profile"}
        </Button>
    )
}

export default EditProfileButton;