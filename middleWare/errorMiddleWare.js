
import { StatusCodes } from 'http-status-codes';

// Custom error middleware to handle and format errors in the application
const errorMiddleWare = (err, req, res, next) => {

  // Create a default error object with a default status code and message
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Please try again later."
  };

  // If the error is due to validation errors (mongoose validator)
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // Extract individual error messages and join them into a single string
    defaultError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
  }

  // If the error is due to a duplicate key (MongoDB unique constraint)
  if (err.code && err.code === 11000) {
    defaultError.msg = `${Object.keys(err.keyValue)[0]} field has to be unique`;
  }

  console.log(err);

  // Send a response with the formatted error message and status code
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorMiddleWare; 
