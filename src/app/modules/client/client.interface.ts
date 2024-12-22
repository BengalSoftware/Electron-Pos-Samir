export type IClient = {
    _id: import("mongoose").Types.ObjectId | undefined;
    save: any;
    name: string,
    clientId?: string,
    contactNo: string,
    totalPurchase: number,
    totalDue: number,
    totalPayment: number,
    address?: string,
    status: "active" | "pending",
    email?: string,
    companyName?: string,
    emergencyContactNo?: string,
    profileImage?: string,
    note?: string,
}

export type IClientFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}