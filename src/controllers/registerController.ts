import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import bcrypt from 'bcrypt';

const register = async (request: Request, response: Response, next: NextFunction) => {
  const { name, email, password, type } = request.body;
  try {
    if (!email || ! password || !type || !name) {
      return response.send("Email, Name, password and type are required");
    }
    const userExists = await UserModel.findOne({email});
    if(userExists){
      return response.status(400).send({message: `Employee record for ${email} already exists, login with your email and password`})
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

const loginUser = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;
  try {
    const secret = process.env.SECRETKEY || 'secretstring';
    console.log(secret)
    if (!email || !password ) {
      return response.send("Login with registered email and password");
    }
    const foundUser = await UserModel.findOne({ email });
    console.log(foundUser);
    if (!foundUser){
      return response.send("User email is not correct");
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (isMatch){
      const token = jwt.sign({ email: foundUser.email, password: foundUser.type }, secret, { expiresIn: '2 days', });
      let userWithoutPassword = await UserModel.findOne({ email}).select("-password");
    
      return response.status(200).send({ message: 'Logged in successfully', user: userWithoutPassword, token });
    }
    else {
      return response.status(403).send("Password is not correct");
    }
  } catch (error) {
    return next(error);
  }
}

export default { register, loginUser }