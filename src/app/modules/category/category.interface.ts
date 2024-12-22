export type ICategory = {
    name: string;
    status: "active" | "pending";
    note: string;
}

export type ICategoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}