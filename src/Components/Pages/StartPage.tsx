import React, { useState } from 'react';
import SignUpPage from './SignUpPage';
import UnauthorizedPage from './UnauthorizedPage';

const StartPage:React.FC = () => {
    
    const [authorized, setAuthorized] = useState(false);

    if(!authorized)
    {
        return(
            <UnauthorizedPage/>
        );
    }
    else
    {
        return(
            <SignUpPage />
        );
    }
}

export default StartPage;