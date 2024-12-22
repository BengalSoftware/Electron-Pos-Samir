import { Types } from "mongoose";
import { ICategory } from "../category/category.interface";
import { ISubCategory } from "../subCategory/subCategory.interface";

export type IProduct = {
    name: string;
    model?: string;
    productCode: string; // unique
    image: string[];
    barcodeSymbology: string;
    category: {
        id: Types.ObjectId | ICategory,
        name: string,
    };
    subcategory: {
        id: Types.ObjectId | ISubCategory,
        name: string,
    };
    brand?: string;
    unit: string; //box pc kg liter gram gram mill liter etc..
    vat: number; //total tax 
    vatType: "exclusive" | "inclusive";
    purchasePrice: number;
    discountPercentage?: number; //percentage 
    sellingPrice: number;
    note?: string;
    quantity: number;
    alertQuantity?: number;
    status: "active" | "pending";
    //suppliers 
    totalSale: number;
    // supplier: {id: Types.ObjectId | ISubCategory, name: string};
    supplier: string; //ref with supplier model 


}

export type IIProductFilters = {
    searchTerm?: string;
    name?: string;
    status?: string;
    note?: string;
}