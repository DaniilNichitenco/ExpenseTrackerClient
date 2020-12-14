import Wallet from '../../Data/Models/Wallets/Wallet';
import WalletForCreate from '../../Data/Models/Wallets/WalletForCreate';
import WalletForList from '../../Data/Models/Wallets/WalletForList';
import WalletsForUpdate from '../../Data/Models/Wallets/WalletForUpdate';
import API from '../Api';

export const getWallet = async (id: number) => {
    return API.get("/Wallets/" + id)
        .then(response => {
            const wallet: Wallet = response.data;

            return {
                data: wallet,
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

export const getAllWallets = async () => {

    return API.get("/Wallets")
        .then(response => {
            const wallets: Wallet[] = response.data;

            return {
                data: wallets,
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

export const getUserWallets = async (Id: number) => {

    return API.get('/Wallets/user/' + Id)
        .then(response => {
            const wallets: Wallet[] = response.data;

            return {
                data: wallets,
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

export const getCurrentUserWallets = async () => {

    return API.get('/Wallets/currentUser/')
        .then(response => {
            const wallets: Wallet[] = response.data;

            return {
                data: wallets,
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

export const updateWallet = async (walletsForUpdate: WalletsForUpdate) => {

    return API.put('/Wallets', walletsForUpdate)
        .then(response => {
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        })
}

export const createWallet = async (walletForUpdate: WalletForCreate) => {

    return API.post('/Wallets', walletForUpdate)
        .then(response => {
            console.log(response.data);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const deleteWallet = async (id: number) => {

    return API.delete('/Wallets/' + id)
        .then(response => {
            console.log(response);
            return {response: response};
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const getWalletsForList = async () => {
    return API.get("Wallets/list")
        .then(response => {
            let wallets: WalletForList[] = response.data;

            wallets.forEach(p => {
                p.createdAt = new Date(p.createdAt);
            });
            return{
                response: response,
                data: wallets
            };
        })
        .catch(error => {
            return{
                response: error.response,
                data: error.response.data
            };
        })
}

export const getAvailableCurrencies = async () => {
    return API.get("Wallets/available")
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

export const getAllCurrenciesAmount = async () => {
    return API.get("Wallets/AmountCurrencies")
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
    getWallet,
    getAllWallets,
    getUserWallets,
    getCurrentUserWallets,
    updateWallet,
    createWallet,
    deleteWallet,
    getWalletsForList,
    getAvailableCurrencies,
    getAllCurrenciesAmount
}
