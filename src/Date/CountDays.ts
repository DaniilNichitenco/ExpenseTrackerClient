export const CountDays = () => {
    let date:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    let countDays: number = date.getDate();

    return countDays;
}

export default CountDays;