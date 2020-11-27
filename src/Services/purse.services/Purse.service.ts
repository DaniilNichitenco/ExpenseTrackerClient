import Purse from '../../Data/Models/Purses/Purse';
import PurseForCreate from '../../Data/Models/Purses/PurseForCreate';
import PursesForUpdate from '../../Data/Models/Purses/PursesForUpdate';
import API from '../Api';

export const GetPurse = async (id: number) => {
    return API.get("/purses/" + id)
        .then(response => {
            const purse: Purse = response.data;

            return {
                data: purse,
                response: response
            }
        })
        .catch(error => {
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const GetAllPurses = async () => {

    return API.get("/purses")
        .then(response => {
            const purses: Purse[] = response.data;

            return {
                data: purses,
                response: response
            };
        })
        .catch(error =>{
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const GetUserPurses = async (Id: number) => {

    return API.get('/Purses/user/' + Id)
        .then(response => {
            const purses: Purse[] = response.data;

            return {
                data: purses,
                response: response
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const GetCurrentUserPurses = async () => {

    return API.get('/Purses/currentUser/')
        .then(response => {
            const purses: Purse[] = response.data;

            return {
                data: purses,
                response: response
            };
        })
        .catch(error => {
            console.log(error);
            return {
                response: error.response,
                data: error.response.data
            };
        });
}

export const UpdatePurse = async (pursesForUpdate: PursesForUpdate) => {

    return API.put('/Purses', pursesForUpdate)
        .then(response => {
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        })
}

export const CreatePurse = (purseForUpdate: PurseForCreate) => {

    API.post('/Purses', purseForUpdate)
        .then(response => {
            console.log(response.data);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const DeletePurse = (id: number) => {

    API.delete('/Purses/' + id)
        .then(response => {
            console.log(response);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export default {
    GetPurse,
    GetAllPurses,
    GetUserPurses,
    GetCurrentUserPurses,
    UpdatePurse,
    CreatePurse,
    DeletePurse
}
