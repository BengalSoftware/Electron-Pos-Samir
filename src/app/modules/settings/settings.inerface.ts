
export type ISettings = {
  // company information
  companyName: string;
  companyTagline: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;

  // prefixes
  clientPrefix: string;
  supplierPrefix: string;
  employeePrefix: string;
  productPrefix: string;
  purchasePrefix: string;
  purchaseReturnPrefix: string;
  invoicePrefix: string;
  invoiceReturnPrefix: string;
  inventoryAdjustmentPrefix: string;

  //default elements
  currencyIcon: string;
  copyrightText: string;

  // images
  favIcon?: string;
  smallLogo?: string;
  whiteLogo?: string;
  blackLogo?: string;

};

type UploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type IUploadedFiles = {
  whiteLogo?: UploadedFile[];
  blackLogo?: UploadedFile[];
  favIcon?: UploadedFile[];
  smallLogo?: UploadedFile[];
};


export type ISettingsFilters = {
  searchTerm?: string;
};
