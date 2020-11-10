import React, { useState } from 'react';
import SignUpPage from './SignUpPage';
import UnauthorizedPage from './UnauthorizedPage';
import userStatus from '../../userStatus';
import UserContext from '../../Context/UserContext';
import HomePage from './HomePage';

const StartPage:React.FC = () => {
    
    const [status, setStatus] = useState(userStatus.Authorized);
    
    const changeStatus = (newStatus: userStatus) => {
        setStatus(newStatus);
    }

    switch(status)
    {
        case userStatus.Authorized:
            return(
                <UserContext.Provider value={{changeStatus}}>
                    <HomePage />
                </UserContext.Provider>
            );

        case userStatus.Unauthorized:
            return(
                <UserContext.Provider value={{changeStatus}}>
                    <UnauthorizedPage/>
                </UserContext.Provider>
            );  

        case userStatus.SigningUp:
            return(
                <UserContext.Provider value={{changeStatus}}>
                    <SignUpPage />
                </UserContext.Provider>
            );

        default:
            return(
                <h1>Something went wrong...</h1>
            );
    }
}

export default StartPage;