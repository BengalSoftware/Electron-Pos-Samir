export type IBrand = {
    name: string;
    status: "active" | "pending";
    note: string;
}

export type IBrandFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}