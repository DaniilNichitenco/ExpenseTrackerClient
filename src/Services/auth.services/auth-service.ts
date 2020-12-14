import UserForSignIn from '../../Data/Models/User/UserForSignIn';
import UserForSignUp from '../../Data/Models/User/UserForSignUp';
import API from '../Api';

export const signIn = (userForSignIn: UserForSignIn) => {

    return API.post("/account/login", userForSignIn)
        .then(response => {
            console.log(response.data);

            if(response.data.accessToken) 
            {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("authorized", "true");
            }
            
            return response;
        })
        .catch(error => {
            console.log(error.response);
            return error.response;
        });
}

export const signOut = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
}

export const signUp = (userForSignUp: UserForSignUp) => {
    
    return API.post("/account/signup", userForSignUp)
        .then(response => {
            if(response.data.accessToken && response.status == 200)
            {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            localStorage.setItem("authorized", "true");
            return response;
        })
        .catch(error => {
            console.log(error.response);
            return error.response;
        })

}

export const getCurrentUser = () => {

    let user = localStorage.getItem("user");
    if(user && user != "undefined")
    {
        return JSON.parse(user);
    }
    return null;
}

export default 
{
    signIn,
    signOut,
    signUp,
    getCurrentUser
}