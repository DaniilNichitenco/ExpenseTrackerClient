import { isReturnStatement } from 'typescript';
import User from '../../Data/Models/User/User';
import UserForUpdate from '../../Data/Models/User/UserForUpdate';
import API from '../Api';

export const GetCurrentUserData = async () => {

    return API.get("/user/current")
        .then(response => {
            let user: User = response.data;
            
            return user;
        })
        .catch(error => {
            console.log(error);
        });

}

export const EditUser = async (userForUpdate: UserForUpdate) => {

    return await API.put('/user/', userForUpdate)
        .catch(error => {
            console.log(error);
        })
}

export const EditUserById = async (userForUpdate: UserForUpdate, userId: number) => {

    return await API.put('/user/' + userId, userForUpdate)
        .catch(error => {
            console.log(error);
        })
}

export const DeleteAccount = async () => await API.delete("/account");

export const DeleteAccountById = async (id: number) => await API.delete("/account" + id);

export default {
    GetCurrentUserData,
    EditUser,
    EditUserById,
    DeleteAccount,
    DeleteAccountById,
}