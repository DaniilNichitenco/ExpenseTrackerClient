import Purse from '../../Data/Models/Purses/Purse';
import PurseForCreate from '../../Data/Models/Purses/PurseForCreate';
import PursesForUpdate from '../../Data/Models/Purses/PursesForUpdate';
import API from '../Api';

export const GetPurse = async (id: number) => {
    return API.get("/purses/" + id)
        .then(response => {
            const purse: Purse = response.data;

            return purse;
        })
        .catch(error => {
            console.log(error);
        });
}

export const GetAllPurses = async () => {

    return API.get("/purses")
        .then(response => {
            const purses: Purse[] = response.data;

            return purses;
        })
        .catch(error =>{
            console.log(error);
        });
}

export const GetPersonPurses = async (Id: number) => {

    return API.get('/Purses/person/' + Id)
        .then(response => {
            const purses: Purse[] = response.data;

            return purses;
        })
        .catch(error => {
            console.log(error);
        });
}

export const UpdatePurse = async (pursesForUpdate: PursesForUpdate) => {

    return API.put('/Purses', pursesForUpdate)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}

export const CreatePurse = (purseForUpdate: PurseForCreate, personId: number) => {

    API.post('/Purses/person/' + personId, purseForUpdate)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

export const DeletePurse = (id: number) => {

    API.delete('/Purses/' + id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export default {
    GetPurse,
    GetAllPurses,
    GetPersonPurses,
    UpdatePurse,
    CreatePurse,
    DeletePurse
}
