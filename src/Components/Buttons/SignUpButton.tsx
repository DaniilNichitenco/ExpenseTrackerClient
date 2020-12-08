import React, { useContext } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import { Link } from 'react-router-dom';

interface SignUpButtonProps
{
    text?: string,
    style?: React.CSSProperties,
    textVariant? : "button" | "caption" | "h1" | "h2" | "h3" 
    | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" 
    | "body1" | "body2" | "overline" | "srOnly",
}

const SignUpButton: React.FC<SignUpButtonProps> = ({text, style, textVariant}) => {

    return(
        <Box>
            <Button
            style={style}
            component={Link}
            to="/registration" 
            color="secondary" 
            variant="contained">
                <Typography
                variant={textVariant}
                >
                    {text || "Sign Up"}
                </Typography>
            </Button>
        </Box>
    );
}

export default SignUpButton;