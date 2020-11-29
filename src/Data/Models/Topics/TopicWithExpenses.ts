import Expense from "../Expenses/Expense";

export default interface TopicWithExpenses
{
    id: number;
    name: string;
    expenses: Expense[]
}