"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFilterableFields = exports.EmployeeSearchableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.EmployeeSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.fisrtName',
    'name.middleName',
    'name.lastName',
];
exports.EmployeeFilterableFields = [
    'searchTerm',
    'id',
    'contactNo',
    'emergencyContactNo',
    'month',
    'year',
];
