export type ITransactionHistory = {
    reason: string;
    amount: number;
    type: "debit" | "credit";
    createdBy: string
    account: string;
    date?: string;
    status: "active" | "pending";
    note?: string;
}

export type ITransactionHistoryFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}