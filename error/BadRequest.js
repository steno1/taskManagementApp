// Import the CustomApiError class and the StatusCodes module

import CustomApiError from "./CustomApi.js"; // Importing the CustomApiError class for extension
import { StatusCodes } from "http-status-codes"; // Importing the module for HTTP status codes

// Custom error class representing a BadRequestError
class BadRequestError extends CustomApiError {
    constructor(message) {
        super(message); // Call the constructor of the extended class (CustomApiError)

        this.statusCode = StatusCodes.BAD_REQUEST; // Set the HTTP status code to indicate a bad request
    }
}

export default BadRequestError; // Export the BadRequestError class for use in other files
