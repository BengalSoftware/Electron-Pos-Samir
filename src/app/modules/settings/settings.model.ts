import { Schema, model } from 'mongoose';
import {
  ISettings,
} from './settings.inerface';

const SettingsSchema = new Schema<ISettings>(
  {
    // company information
    companyName: {
      type: String,
      required: true
    },
    companyTagline: {
      type: String,
      required: true
    },
    companyEmail: {
      type: String,
      required: true
    },
    companyPhone: {
      type: String,
      required: true
    },
    companyAddress: {
      type: String,
      required: true
    },

    // prefixes
    clientPrefix: {
      type: String,
      required: true
    },
    supplierPrefix: {
      type: String,
      required: true
    },
    employeePrefix: {
      type: String,
      required: true
    },
    productPrefix: {
      type: String,
      required: true
    },
    purchasePrefix: {
      type: String,
      required: true
    },
    purchaseReturnPrefix: {
      type: String,
      required: true
    },
    invoicePrefix: {
      type: String,
      required: true
    },
    invoiceReturnPrefix: {
      type: String,
      required: true
    },
    inventoryAdjustmentPrefix: {
      type: String,
      required: true
    },

    //default elements
    currencyIcon: {
      type: String,
      required: true
    },
    //default elements
    copyrightText: {
      type: String,
      required: true
    },


    // images
    favIcon: {
      type: String
    },
    smallLogo: {
      type: String
    },
    whiteLogo: {
      type: String
    },
    blackLogo: {
      type: String
    }

  },
  {
    timestamps: true,
  }
);

export const Settings = model<ISettings>('Settings', SettingsSchema);
