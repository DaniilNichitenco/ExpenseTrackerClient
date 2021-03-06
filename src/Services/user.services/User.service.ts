import User from '../../Data/Models/User/User';
import UserForUpdate from '../../Data/Models/User/UserForUpdate';
import UserForUpdateAccount from '../../Data/Models/User/UserForUpdateAccount';
import API from '../Api';
import PagedRequest from '../pagedRequests/PagedRequest';
import PagedResult from '../pagedRequests/PagedResult';

export const getCurrentUserData = async () => {

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

export const getUserById = async (id: number) => {

    return API.get("/user/" + id)
        .then(response => {
            let user: User = response.data;
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

export const getPagedUsers = async (request: PagedRequest) => {

    if(request.requestFilters == undefined)
    {
        request.requestFilters = {
            filters: [],
            logicalOperators: 0
        }
    }
    if(request.columnNameForSorting == undefined)
    {
        request.columnNameForSorting = "Id";
        request.sortDirection = "ASC";
    }
    if(request.sortDirection == undefined)
    {
        request.sortDirection = "ASC";
    }
    
    return API.post("User/PaginatedSearch", request)
        .then(response => {
            let result: PagedResult<User> = response.data;

            return {
                response: response,
                data: result
            };
        })
        .catch(error => {
            console.log(error);

            return {
                response:error.response,
                data: error.response.data
            };
        });
}

export const editUser = async (userForUpdate: UserForUpdate) => {

    return API.put('/user/', userForUpdate)
        .then(response => {
            return {response: response}
        })
        .catch(error => {
            console.log(error);
            return {response: error.response};
        });
}

export const editUserById = async (userForUpdate: UserForUpdate, userId: number) => {

    return await API.put('/user/' + userId, userForUpdate)
        .catch(error => {
            console.log(error);
        })
}

export const updateAccount = async (user: UserForUpdateAccount) => {
    return API.post("/Account", user)
        .then(response => {
            
            return {
                response: response,
                data: response.data.message
            }
        })
        .catch(error => {
            
            return {
                response: error.response,
                data: error.response.data.message
            }
        });
}

export const deleteAccount = async () => await API.delete("/account");

export const deleteAccountById = async (id: number) => await API.delete("/account/" + id);

export default {
    getCurrentUserData,
    editUser,
    editUserById,
    deleteAccount,
    deleteAccountById,
    getUserById,
    updateAccount,
    getPagedUsers
}