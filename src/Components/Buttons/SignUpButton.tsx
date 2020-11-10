import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import userStatus from '../../userStatus';
import { Link } from 'react-router-dom';

const SignUpButton: React.FC = () => {

    const context = useContext(UserContext);

    return(
        <Box>
            <Button style={{backgroundColor: "rgba(48, 48, 48, 1)"}}
            component={Link}
            to="/registration" 
            color="inherit" 
            variant="contained">
                Sign up
            </Button>
        </Box>
    );
}

export default SignUpButton;