import { Model } from 'mongoose';

export type IManagementOutlet = {
  name: string;
  address: string;
  branch: "main" | "outlet";
  vatRegisterNo?: string;
};

export type ManagementOutletModel = Model<
  IManagementOutlet,
  Record<string, unknown>
>;

export type IManagementOutletFilters = {
  searchTerm?: string;
};
