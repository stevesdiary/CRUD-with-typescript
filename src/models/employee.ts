import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    DOB: {
      type: String,
    },
    DOJ: {
      type: String,
      default: Date()
    },
  },
  {
    timestamps: true
  }
);

export const EmployeeModel = mongoose.model('Employee', employeeSchema);