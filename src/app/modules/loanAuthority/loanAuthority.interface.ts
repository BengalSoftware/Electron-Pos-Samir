export type ILoanAuthority = {
    name: string;
    email?: number;
    contactNo: string;
    ccLimit: number;
    account: string;
    status: "active" | "pending";
    note?: string;
    address?: string;
}

export type ILoanAuthorityFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}