"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../models/employee");
// import errorHandler from '../middlewares/errorHandler';
class EmployeeController {
    constructor() {
        this.getAllEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employee_1.EmployeeModel.find();
                console.log("Employees found!😄");
                return response.status(200).send({
                    statusCode: 200,
                    message: "Success😄",
                    result: employees
                });
            }
            catch (error) {
                console.log(error);
                return response.status(400).send({
                    message: "Unable to get record due to error",
                    error: error
                });
            }
        });
        this.createEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, phone, DOB, DOJ } = request.body;
                const employeeExists = yield employee_1.EmployeeModel.findOne({ email: email });
                if (employeeExists) {
                    console.log("Employee record already exists");
                    return response.status(400).send({ message: 'Employee record already exists' });
                }
                const employee = new employee_1.EmployeeModel({
                    name, email: email.toLowerCase(), phone, DOB, DOJ
                });
                yield employee.save();
                return response.status(201).send({
                    statusCode: 201,
                    message: "Employee created successfully",
                    result: employee
                });
            }
            catch (error) {
                console.log(error);
                return response.status(400).send({
                    status: "fail",
                    mesage: 'An error occoured',
                    error: error
                });
            }
        });
        this.getEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const employee = yield employee_1.EmployeeModel.findById({ _id: id });
                if (!employee) {
                    return response.status(404).send({
                        message: "Record not found",
                    });
                }
                return response.status(200).send({
                    statusCode: 200,
                    message: "Success",
                    result: employee
                });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
        this.updateEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { name, email, phone, DOB, DOJ } = request.body;
                const employee = yield employee_1.EmployeeModel.findByIdAndUpdate(id, {
                    $set: {
                        name: name,
                        email: email,
                        phone: phone,
                        DOB: DOB,
                        DOJ: DOJ
                    },
                    $currentDate: { updatedAt: true }
                }, { new: true, select: '_id name email phone DOB DOJ' });
                if (!employee) {
                    return response.status(404).send({
                        message: "Employee not found",
                    });
                }
                return response.status(200).send({
                    statusCode: 200,
                    message: "Employee updated successfully",
                    result: employee
                });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
        this.deleteEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const record = yield employee_1.EmployeeModel.findByIdAndDelete({ _id: id });
                if (!record) {
                    return response.status(404).send({
                        message: `Record not found for this id: ${id}`,
                    });
                }
                console.log(record, "recoord");
                return response.status(200).send({ message: "Record deleted successfully" });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = new EmployeeController();
//# sourceMappingURL=EmployeeController.js.map