const authHeader: () => string = () => {
    const userString = localStorage.getItem('user');
    console.log(userString);
    let token: string = "Bearer ";
    if(!userString)
    {
        return token;
    }
    const user = JSON.parse(userString);
    console.log(user.accessToken);
    if(user && user.accessToken)
    {
        console.log(user.accessToken);
        token += user.accessToken;
    }
    return token;
}

export default authHeader;