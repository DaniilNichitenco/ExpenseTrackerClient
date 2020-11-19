import React from 'react';
import UserData from '../Data/UserData';

const data: UserData = {
    userId: 2,
    firstName: 'Daniil',
    lastName: 'Nichitenco',
    email: "daniilnikitenco@gmail.com",
    username: "lagger179",
    coutOccations: 0,
    countNotes: 0,
    textStatus: " "
}

const UserContext = React.createContext({
    userData: data,
    setUserData: (userData: UserData) => {}
});

export default UserContext;