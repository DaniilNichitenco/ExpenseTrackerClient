import React from 'react';
import { number } from 'yup';
import UserData from '../Data/UserData';

const data: UserData = {
    userId: 2,
    firstName: 'Daniil',
    lastName: 'Nichitenco',
    email: "daniilnikitenco@gmail.com",
    username: "lagger179",
    coutOccations: 0,
    countNotes: 0
}

const UserContext = React.createContext({
    userData: data
});

export default UserContext;