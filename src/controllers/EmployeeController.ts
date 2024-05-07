import { Request, Response, NextFunction } from "express";
import { EmployeeModel } from "../models/employee";

class EmployeeController{

  getAllEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const employees = await EmployeeModel.find();
      console.log(employees)
      return response.status(200).send({
        statusCode: 200,
        message: "Success",
        result: employees
      })
    } catch (error) {
      console.log(error);
      // return next(error)
    }
  }
  createEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let {name, email, phone, DOB, DOJ } = request.body;
      const employee = new EmployeeModel({
         name, email, phone, DOB, DOJ
      });
      await employee.save();
      console.log(employee);

      return response.status(201).send({
        statusCode: 201,
        message: "Employee created successfully",
        result: employee
      })
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        status: "fail",
        // mesage: error.mesage,
        error: error
      })
    }
  }

  getEmployee = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const employee = await EmployeeModel.findById({$where:{id:id}});
      console.log(employee);
      
      return response.status(200).send({
        statusCode: 200,
        message: "Success",
        result: employee
      })
    } catch (error) {
      console.log(error);
      // return next(error)
    }
  }

  // updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
  //   try {
  //     const { id } = request.params;
  //     const {name, email, phone, DOB, DOJ } = request.body;
  //     const employee = EmployeeModel.findById(id)
  //     if (employee){
  //       employee.name = name;
  //       employee.email = email;
  //       employee.phone = phone;
  //       employee.DOB = DOB;
  //       employee.DOJ = DOJ;

  //       await employee.set();
  //     };
      
  //     return response.status(200).send({
  //       statusCode: 201,
  //       message: "Employee updated successfully",
  //       result: employee
  //     })
  //   } catch (error) {
  //     console.log(error);
  //     // return next(error)
  //   }
  // }
}

export default new EmployeeController();