
export type IInventoryAdjustment = {
    products: {
        _id: string;
        code: string;
        name: string;
        adjustmentQty: number;
        price: number;
        type: "increment" | "decrement";
    }[];
    code: string;
    date?: string;
    reason: string;
    status: "active" | "pending";
    note?: string;
    createdBy?: string;
}

export type IInventoryAdjustmentFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}