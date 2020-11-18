import { isReturnStatement } from 'typescript';
import ISignInFormData from '../../Components/Forms/FormDatas/ISignInFormData';
import ISignUpFormData from '../../Components/Forms/FormProps/ISignUpFormData';
import User from '../../Data/Models/User/User';
import UserForUpdate from '../../Data/Models/User/UserForUpdate';
import UserData from '../../Data/UserData';
import API from '../Api';

export const GetUserData = async (id: number) => {

    return await API.get("/People/owner/" + id)
        .then(response => {
            const person = response.data;
            let userData: UserData = {
                userId: response.data.ownerId,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                username: response.data.userName,
                coutOccations: 0,
                countNotes: 0,
                textStatus: " "
            };
            console.log(response.data);
            return userData;
        })
        .catch(error => {
            console.log(error);
        });

}

export const EditUser = async (user: User) => {
    const userForUpdate: UserForUpdate = {
        firstName: user.firstName,
        lastName: user.lastName
    }

    return await API.put('/People/' + user.id, userForUpdate)
        .then(response => {
            console.log(response.data);
            console.log(response);

            return response;
        })
        .catch(error => {
            console.log(error);
        })
}

export const CreateUser = async (user: UserForUpdate) => {

    return await API.post('/People', user)
        .then(response => {
            console.log(response.data);
            console.log(response);

            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export const DeleteUser = (id: number) => {

    API.delete('/People/' + id)
        .then(response => {
            console.log(response);
        })

        .catch(error => {
            console.log(error);
        });
}

export const SignIn = async (formValues: ISignInFormData) => {
    return await API.post('/account/login', formValues)
        .then(response => {
            console.log(response);

            console.log(response.status);
            
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
}

export const SignUp = async (formValues: ISignUpFormData) => {
    return await API.post('/account/signup', formValues)
        .then(response => {
            console.log(formValues);
            console.log(response);

            return response.data.ownerId;
        })
        .catch(error => {
            console.log(error);
        })
}



export default {
    SignUp,
    SignIn,
    GetUserData,
    EditUser,
    CreateUser,
    DeleteUser
}