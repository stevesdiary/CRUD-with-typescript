import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const  secret = process.env.SECRETKEY || 'Seekreetkee';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({message: `User not found for ${email}`});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({emai: user.email, password: user.password}, secret, {expiresIn: '10 days'});
      return res.status(200).send({message: "user found", user: user, token: token});
    }
    return res.status(403).send({message: 'Passwod is not correct'})
  } catch (error) {
    console.error(error);
    return res.status(403).send({ message:"Unable to login", error: error});
  }
}