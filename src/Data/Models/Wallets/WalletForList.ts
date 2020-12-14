export default interface WalletForList
{
    id: number;
    bill: number;
    currencyCode: "mdl" | "usd" | "eur";
    createdAt: Date;
}