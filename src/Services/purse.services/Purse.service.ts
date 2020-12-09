import Purse from '../../Data/Models/Purses/Purse';
import PurseForCreate from '../../Data/Models/Purses/PurseForCreate';
import PurseForList from '../../Data/Models/Purses/PurseForList';
import PursesForUpdate from '../../Data/Models/Purses/PurseForUpdate';
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

export const CreatePurse = async (purseForUpdate: PurseForCreate) => {

    return API.post('/Purses', purseForUpdate)
        .then(response => {
            console.log(response.data);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const DeletePurse = async (id: number) => {

    return API.delete('/Purses/' + id)
        .then(response => {
            console.log(response);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const GetPursesForList = async () => {
    return API.get("Purses/list")
        .then(response => {
            let purses: PurseForList[] = response.data;

            purses.forEach(p => {
                p.createdAt = new Date(p.createdAt);
            });
            return{
                response: response,
                data: purses
            };
        })
        .catch(error => {
            return{
                response: error.response,
                data: error.response.data
            };
        })
}

export const GetAvailableCurrencies = async () => {
    return API.get("Purses/available")
        .then(response => {

            const data: string[] = response.data;
            let currencies: {
                currencyCode: string
            }[] = [];

            if(data.length > 0)
            {
                data.forEach(c => {
                    currencies.push({
                        currencyCode: c
                    });
                });
            }

            return{
                response: response,
                data: currencies
            };
        })
        .catch(error => {

            return{
                response: error.response,
                data: error.response.data
            };
        });
}

export const GetAllCurrenciesAmount = async () => {
    return API.get("Purses/AmountCurrencies")
        .then(response => {
            return{
                response: response,
                data: response.data as number
            };
        })
        .catch(error => {
            return{
                response: error.response,
                data: error.response.data
            };
        });
}

export default {
    GetPurse,
    GetAllPurses,
    GetUserPurses,
    GetCurrentUserPurses,
    UpdatePurse,
    CreatePurse,
    DeletePurse,
    GetPursesForList,
    GetAvailableCurrencies,
    GetAllCurrenciesAmount
}
