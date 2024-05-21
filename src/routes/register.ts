import express from "express";
// import authController from "../controllers/registerController";
import registerController from "../controllers/registerController";

const router = express.Router();

router.post("/register", registerController.register);

export default router;






// import bcrypt, { compare } from 'bcrypt';
// import { Request, Response, NextFunction, request } from 'express';
// import { UserModel } from '../models/user';
// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema ({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   type: { type: String, required: true},
//   comparePassword: { }
// });
// // const password = request.body;
// // const dbPassword 

// UserSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   if (this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = async function (candidatePassword: string) {
//   if (!this!.password) {
//     throw new Error('Password is not defined');
//   }
//   return bcrypt.compare(candidatePassword, this!.password);
// };

// const User = mongoose.model('User', UserSchema);

// export default User;