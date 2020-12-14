export default interface ExpenseForUpdate
{
    id: number;
    walletId: number;
    title: string;
    date: Date;
    money: number;
    topicId: number;
}