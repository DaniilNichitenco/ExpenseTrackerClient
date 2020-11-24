import ExpensePerMonth from "./ExpensePerMonth";

export default interface ExpensesForYear
{
    currencyCode: string,
    expenses: ExpensePerMonth[]
}