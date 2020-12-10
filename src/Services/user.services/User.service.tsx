import { isReturnStatement } from 'typescript';
import User from '../../Data/Models/User/User';
import UserForUpdate from '../../Data/Models/User/UserForUpdate';
import API from '../Api';

export const GetCurrentUserData = async () => {

    return API.get("/user/current")
        .then(response => {
            let user: User = response.data;
            console.log("GetCurrUser:" + response);
            let result = {
                data: user,
                status: response.status
            };

            return result;
        })
        .catch(error => {
            console.log(error);
            let result = {
                data: error.response.data,
                status: error.response.status
            };

            return result;
        });

}

export const EditUser = async (userForUpdate: UserForUpdate) => {

    return API.put('/user/', userForUpdate)
        .then(response => {
            return {response: response}
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
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