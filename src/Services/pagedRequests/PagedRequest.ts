import RequestFilters from "./RequestFilters";

export default interface PagedRequest
{
    pageIndex: number;
    pageSize: number;
    columnNameForSorting?: string;
    sortDirection?: "ASC" | "DESC";
    requestFilters?: RequestFilters;
}