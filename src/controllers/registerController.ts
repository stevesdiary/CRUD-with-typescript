import express, { Request, Response, NextFunction } from "express";
import { register as registerUser, login as authenticateUser } from "../service/authenticateUser";

interface AuthResult {
  user: UserDocument;
  token: string;
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, type } = req.body;
  try {
    const { user, token } = await registerUser(name, email, password, type);
    res.status(201).json({ user, token });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (request: Request, response: Response, next: NextFunction): Promise<AuthResult> => {
  const { email, password } = request.body;
  try {
    const { user, token } = await authenticateUser( email, password );
    return response.status(200).send({ user, token });
  } catch (error) {
    return next(error);
  }
}

export default { register, loginUser }