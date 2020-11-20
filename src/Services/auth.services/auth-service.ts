import UserForSignIn from '../../Data/Models/User/UserForSignIn';
import UserForSignUp from '../../Data/Models/User/UserForSignUp';
import API from '../Api';

export const SignIn = (userForSignIn: UserForSignIn) => {

    return API.post("/account/login", userForSignIn)
        .then(response => {
            if(response.data.accessToken) 
            {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response;
        })
        .catch(error => {
            console.log(error.response);
            return error.response;
        })
}

export const SignOut = () => {
    localStorage.removeItem("user");
}

export const SignUp = (userForSignUp: UserForSignUp) => {
    
    return API.post("/account/signup", userForSignUp)
        .then(response => {
            if(response.data.accessToken && response.status == 200)
            {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response;
        })
        .catch(error => {
            console.log(error.response);
            return error.response;
        })

}

export const GetCurrentUser = () => {

    let user = localStorage.getItem("user");
    if(user)
    {
        return JSON.parse(user);
    }
}

export default 
{
    SignIn,
    SignOut,
    SignUp,
    GetCurrentUser
}