require('dotenv').config();
import express, { Request, Response, NextFunction } from "express";
import { string } from "joi";
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret:string = process.env.SECRETKEY || "SECRETKEY";

export const authentication = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const header = request.headers['authorization'];
    let token = request.headers.authorization;
    token = header?.split(' ')[1];
    if (token == null || token.length === 0) {
      console.log("Unauthorised or wrong token");
      return response.send({ message: "Invalid or expired token" });
    }
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Oops error occoured", error: error });
  }
}

export const verifyUser = (...allowedType: any[])  => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const header = request.headers['authorization'];
      let token: string = request.headers.authorization || '';
      token = header?.split(' ')[1] || 'STRING';
      const decoded = jwt.verify(token, secret)
      
      let userType = (decoded as JwtPayload).type;
      // console.log("User", userType);
      if (allowedType.includes(userType)) {
        next();
      } else {
        console.log("Access denied to this route for users");
        response.status(401).send({
          statusCode: 401,
          message: "You are NOT authorised to access this route!",
        });
      }
    } catch (error) {
      response.status(400).send({message:"Error occoured", error: error});
    }
  }
};