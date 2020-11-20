const authHeader = () => {
    const userString = localStorage.getItem('user');
    if(!userString)
    {
        return { };
    }
    const user = JSON.parse(userString);
    if(user && user.accessToken)
    {
        return {
            Authorization: 'Bearer ' + user.accessToken
        }
    }
    else
    {
        return { }
    }
}

export default authHeader;