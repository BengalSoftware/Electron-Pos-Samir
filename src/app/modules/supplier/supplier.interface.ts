export type ISupplier = {
    _id: import("mongoose").Types.ObjectId | undefined;
    save: any;
    name: string,
    code: string,
    totalPurchase: number,
    totalDue: number,
    totalPayment: number,
    contactNo: string,
    status: "active" | "pending",
    email?: string,
    companyName?: string,
    emergencyContactNo?: string,
    profileImage?: string,
    address?: string,
    note?: string,
}

export type ISupplierFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}