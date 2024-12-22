import { z } from 'zod';
import { bloodGroup, gender } from '../employee/employee.constant';

const createEmployeeZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string({
      required_error: 'Name is required',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    department: z.string({
      required_error: 'Department  is required',
    }),
    designation: z.string({
      required_error: 'Designation  is required',
    }),
    salary: z.number({
      required_error: 'Salary  is required',
    }),

    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    emergencyContactNo: z.string().optional(),
    dateOfBirth: z.string().optional(),
    appointmentDate: z.string().optional(),
    joinDate: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    religion: z.string().optional(),
    commission: z.number().optional(),
    profileImage: z.string().optional(),
  }),
});

// create admin zod schema
const createAdminZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    // department: z.string({
    //   required_error: 'Department  is required',
    // }),
    department: z.string().optional(),

    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    emergencyContactNo: z.string().optional(),
    dateOfBirth: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

// create super admin zod schema
const createSuperAdminZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),

    department: z.string().optional(),

    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    emergencyContactNo: z.string().optional(),
    dateOfBirth: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  createEmployeeZodSchema,
  createAdminZodSchema,
  createSuperAdminZodSchema,
};
