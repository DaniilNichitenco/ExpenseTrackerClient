export default interface PurseExpensesPerDay
{
    currencyCode: string;
    expensesPerDay: {
        day: number;
        sum: number;
    }[];
}