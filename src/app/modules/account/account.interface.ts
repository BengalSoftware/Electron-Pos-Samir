export type IAccount = {
    save: any;
    // eslint-disable-next-line no-unused-vars
    // save(arg0: { session: import("mongodb").ClientSession; }): unknown;
    // save(): unknown;
    bankName: string;
    branchName?: string;
    accountNumber: string;
    balance: number;
    date?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type IAccountFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}