export default interface ExpenseForCreate
{
    purseId: number;
    title: string;
    date?: Date;
    money: number;
    topicId: number;
}