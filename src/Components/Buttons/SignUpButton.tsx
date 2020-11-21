import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const SignUpButton: React.FC = () => {

    const context = useContext(UserContext);

    return(
        <Box>
            <Button
            component={Link}
            to="/registration" 
            color="secondary" 
            variant="contained">
                Sign up
            </Button>
        </Box>
    );
}

export default SignUpButton;