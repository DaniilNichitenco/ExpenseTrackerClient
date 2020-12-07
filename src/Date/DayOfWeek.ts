export const GetDay = () => {
    let date = new Date();
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][date.getDay()] || '';
}

export default GetDay;