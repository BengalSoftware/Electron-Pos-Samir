export type IUnit = {
    name: string;
    status: "active" | "pending";
    note: string;
}

export type IUnitFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}