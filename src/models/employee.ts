import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: BigInt,
      required: true
    },
    DOB: {
      type: String,
    },
    DOJ: {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

export const EmployeeModel = mongoose.model('Employee', employeeSchema);