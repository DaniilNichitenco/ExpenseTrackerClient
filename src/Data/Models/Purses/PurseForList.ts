export default interface PurseForList
{
    id: number;
    bill: number;
    currencyCode: "mdl" | "usd" | "eur";
    createdAt: Date;
}