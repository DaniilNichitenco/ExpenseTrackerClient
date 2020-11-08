import React from 'react';
import userStatus from '../userStatus';

const UserContext = React.createContext({
    changeStatus: (newStatus: userStatus) =>{} 
})

export default UserContext;