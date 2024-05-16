require('dotenv').config();
import express, { Request, Response, NextFunction } from "express";
import jwt, {Secret} from 'jsonwebtoken';
import { request } from 'express';

// interface CustomHeaders extends Headers {
//   [key: string]: string | string[];
// }

const authentication = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send('Email and password are required')
    }
    const authHeader = (request.headers as any).get('authorization');
    const secret = process.env.SECRETKEY;
    const emailFromHeaders = request.headers
    let token = request.headers.authorization;
    if (!token) {
      console.log("No valid token here");
      return response.status(401).send("No valid token here") 
    }
    token = authHeader?.split(' ')[1];
    if (token == null || token.length === 0) {
      console.log("Unauthorised or wrong token");
      return response.send({ message: "No valid token here"});
    } 
  } catch (error) {
    console.log(error);
  }
}

export default authentication;