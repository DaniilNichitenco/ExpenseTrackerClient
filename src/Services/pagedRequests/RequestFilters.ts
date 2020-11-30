import Filter from "./Filer";

export default interface RequestFilters
{
    logicalOperators: "and" | "or";
    filters: Filter[]
}