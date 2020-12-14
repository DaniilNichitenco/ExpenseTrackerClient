export default interface ExpenseForCreate
{
    walletId: number;
    title: string;
    date?: Date;
    money: number;
    topicId: number;
}