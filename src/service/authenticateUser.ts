// import { Request, Response, NextFunction } from "express";
import { UserModel, UserDocument } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRETKEY || 'secret';
const expiry = '1h'

const generateToken = (user: UserDocument) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, secretKey, { expiresIn: expiry });
};

export const register = async (name: string, email: string, password: string, type: string ) => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(`User with this email ${email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, type });
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Error( "User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    return new Error((error as Error).message);
  }
};
