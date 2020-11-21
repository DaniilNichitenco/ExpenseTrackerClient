import { isReturnStatement } from 'typescript';
import User from '../../Data/Models/User/User';
import UserForUpdate from '../../Data/Models/User/UserForUpdate';
import API from '../Api';

export const GetCurrentUserData = async () => {

    return API.get("/People/personinfo")
        .then(response => {
            let user: User = response.data;
            
            return user;
        })
        .catch(error => {
            console.log(error);
        });

}

export const EditUser = async (userForUpdate: UserForUpdate) => {

    return await API.put('/People/', userForUpdate)
        .catch(error => {
            console.log(error);
        })
}

export const CreatePerson = async (userForUpdate: UserForUpdate, userId: number) => {

    return API.post('/People/' + userId, userForUpdate)
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export const DeletePerson = async (id: number) => {

    await API.delete('/People/' + id)
        .catch(error => {
            console.log(error);
        });
}

export const DeleteUser = async () => await API.delete("/account");

export default {
    GetCurrentUserData,
    CreatePerson,
    EditUser,
    DeletePerson,
    DeleteUser
}