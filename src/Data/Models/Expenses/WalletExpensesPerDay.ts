export default interface WalletExpensesPerDay
{
    currencyCode: string;
    expensesPerDay: {
        day: number;
        sum: number;
    }[];
}