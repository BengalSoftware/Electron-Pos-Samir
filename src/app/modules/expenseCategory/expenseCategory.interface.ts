export type IExpenseCategory = {
    name: string;
    status: "active" | "pending";
    note: string;
}

export type IExpenseCategoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}