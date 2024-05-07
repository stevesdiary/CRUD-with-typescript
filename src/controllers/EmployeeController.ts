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
      return response.status(400).send({
        message: "Unable to get record due to error",
        error: error
      })
    }
  }

  createEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let {name, email, phone, DOB, DOJ } = request.body;
      const employee = new EmployeeModel({
         name, email, phone, DOB, DOJ
      });
      await employee.save();

      return response.status(201).send({
        statusCode: 201,
        message: "Employee created successfully",
        result: employee
      })
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        status: "fail",
        mesage: 'An error occoured',
        error: error
      })
    }
  }

  getEmployee = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const employee = await EmployeeModel.findById({_id: id});
      if(!employee){
        return response.status(404).send({
          message: "Record not found",
        })
      }
      
      return response.status(200).send({
        statusCode: 200,
        message: "Success",
        result: employee
      })
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        message: "Unable to get record due to error",
        error: error
      })
    }
  }

  updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const { name, email, phone, DOB, DOJ } = request.body;
      const employee = await EmployeeModel.findByIdAndUpdate(id, {
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
      })
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        message: "Unable to update record due to error",
        error: error
      })
    }
  }

  deleteEmployee = async (request: Request, response: Response ) => {
    try {
      const id = request.params;
      const record = await EmployeeModel.findByIdAndDelete({id});
      return response.status(200).send({message: "Record deleted successfully"})
    } catch (error) {
      console.log(error);
      return response.status(400).send({message: "Unable to delete record due to error", error: error})
    }
  }
}

export default new EmployeeController();