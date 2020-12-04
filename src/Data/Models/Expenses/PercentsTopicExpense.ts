export default interface PercentsTopicExpense
{
    currencyCode: string,
    percents: {
        topic: string,
        sum: number
    }[]
}