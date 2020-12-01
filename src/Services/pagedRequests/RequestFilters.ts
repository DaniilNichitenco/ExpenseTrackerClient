import Filter from "./Filer";

export default interface RequestFilters
{
    logicalOperators: 0 | 1;
    filters: Filter[]
}