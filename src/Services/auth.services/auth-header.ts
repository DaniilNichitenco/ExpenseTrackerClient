const authHeader: () => string = () => {
    const userString = localStorage.getItem('user');
    let token: string = "Bearer ";
    if(!userString)
    {
        return token;
    }
    const user = JSON.parse(userString);
    if(user && user.accessToken)
    {
        token += user.accessToken;
    }
    return token;
}

export default authHeader;