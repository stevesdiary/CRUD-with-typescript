import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
      return response.send("User email is not found");
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (isMatch){
      const token = jwt.sign({ email: foundUser.email, type: foundUser.type }, secret, { expiresIn: '2 days', });
      let userWithoutPassword = await UserModel.findOne({ email}).select("-password");
      // delete foundUser['password'] = {foundUser.password};
      return response.status(200).send({ message: `Logged in successfully as ${foundUser.type}`, userWithoutPassword, token });
    }
    else {
      return response.status(403).send("Password is not correct");
    }
  } catch (error) {
    return next(error);
  }
}

export default { loginUser };