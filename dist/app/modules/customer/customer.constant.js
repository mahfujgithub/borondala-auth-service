"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerFilterableFields = exports.customerSearchableFields = exports.gender = void 0;
exports.gender = ['male', 'female', 'non-binary'];
exports.customerSearchableFields = ['id', 'email', 'contact', "name.firstName", "name.middleName", "name.lastName", "presentAddress"];
exports.customerFilterableFields = ['searchTerm', 'id', 'email', "contact", "presentAddress",];
