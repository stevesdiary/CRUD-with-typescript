import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcrypt';

export const register = async (request: Request, response: Response, next: NextFunction) => {
  const { name, email, password, type } = request.body;
  try {
    if (!email || !password || !type || !name) {
      return response.send("Email, Name, password and type are required");
    }
    const userExists = await UserModel.findOne({email});
    if(userExists){
      return response.status(400).send({message: `Employee record for ${email} already exists, login with your email and password `})
    }
    const encryptedPassword  = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ name, email: email.toLowerCase(), password: encryptedPassword, type});
    await user.save();
    response.status(201).send({message: `User ${name} registered successfully`, user});
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default register;