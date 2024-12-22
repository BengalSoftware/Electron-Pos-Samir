export type IDepartment = {
    name: string;
    status: "active" | "pending";
    note: string;
}

export type IDepartmentFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}