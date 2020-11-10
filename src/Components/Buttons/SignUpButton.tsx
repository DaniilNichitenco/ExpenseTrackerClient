import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import userStatus from '../../userStatus';

const SignUpButton: React.FC = () => {

    const context = useContext(UserContext);

    return(
        <Box>
            <Button style={{backgroundColor: "rgba(48, 48, 48, 1)"}} 
            color="inherit" 
            variant="contained" onClick={() => {context.changeStatus(userStatus.SigningUp)}}>
                Sign up
            </Button>
        </Box>
    );
}

export default SignUpButton;