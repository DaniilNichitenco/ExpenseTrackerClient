import React from 'react';
import UserData from '../Data/UserData';

const data: UserData = {
    firstName: 'Daniil',
    lastName: 'Nichitenco',
    email: "daniilnikitenco@gmail.com",
    username: "lagger179",
    countPurses: 3,
    coutOccations: 0,
    countNotes: 0
}

const UserContext = React.createContext({
    userData: data
});

export default UserContext;