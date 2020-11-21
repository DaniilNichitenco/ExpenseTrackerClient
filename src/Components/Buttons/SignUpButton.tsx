import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import { Link } from 'react-router-dom';

interface SignUpButtonProps
{
    text?: string
}

const SignUpButton: React.FC<SignUpButtonProps> = ({text="Sign Up"}) => {

    const context = useContext(UserContext);

    return(
        <Box>
            <Button
            component={Link}
            to="/registration" 
            color="secondary" 
            variant="contained">
                {text}
            </Button>
        </Box>
    );
}

export default SignUpButton;