export type IReports = {
    save: any;
    // eslint-disable-next-line no-unused-vars
    // save(arg0: { session: import("mongodb").ClientSession; }): unknown;
    // save(): unknown;
    bankName: string;
    branchName?: string;
    reportsNumber: string;
    balance: number;
    date?: string;
    status: "active" | "pending";
    note?: string;
    image?: string;
}

export type IReportsFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}