import Purse from '../../Data/Models/Purses/Purse';
import PurseForUpdate from '../../Data/Models/Purses/PurseForUpdate';
import API from '../Api';

export const GetUserPurses = (userId: number) => {

    API.get('/Purses/user/' + userId)
        .then(response => {
            const purses: Purse[] = response.data;
            console.log(response);

            return purses;
        })
        .catch(error => {
            console.log(error);
        });
}

export const EditPurse = (purse: Purse) => {
    const purseForUpdate: PurseForUpdate = {
        bill: purse.bill,
        currencyCode: purse.currencyCode,
        personId: purse.personId
    }

    API.put('/Purses/' + purse.id, purseForUpdate)
        .then(response => {
            console.log(response.data);
            console.log(response);

            return response;
        })
        .catch(error => {
            console.log(error);
        })
}

export const CreatePurse = (purse: PurseForUpdate) => {

    API.post('/Purses', purse)
        .then(response => {
            console.log(response.data);
            console.log(response);

            return response.data;
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
    GetUserPurses,
    EditPurse,
    CreatePurse,
    DeletePurse
}
