import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
  statusCode?: number,
  details?: any,
  errors?: any
}

const errorHandler = (error: CustomError, request: Request, response: Response, next: NextFunction) => {
  if (error.name === 'ValidationError') {
    let errorStatusCode = error.statusCode || 400;
    console.log(error);
    return response.status(errorStatusCode).send({
      type: 'ValidationError',
      details: error.details,
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    let errorStatusCode = error.statusCode || 400;
    console.log(error);
    return response.status(errorStatusCode).send({
      type: 'unique violation',
      details: error.errors,
    });
  }

  const errorMessage = error.message || 'Something went wrong!';
  let errorStatusCode = error.statusCode || 500;
  console.log(error);
  return response.status(errorStatusCode).json({
    success: false,
    status: errorStatusCode,
    message: errorMessage,
  });
};

module.exports = errorHandler;