// Import the CustomApiError class and the StatusCodes module

import CustomApiError from "./CustomApi.js"; // Importing the CustomApiError class for extension
import { StatusCodes } from "http-status-codes"; // Importing the module for HTTP status codes

// Custom error class representing an UnAuthorizedError
class unAuthorizedError extends CustomApiError {
    constructor(message) {
        super(message); // Call the constructor of the extended class (CustomApiError)

        this.statusCode = StatusCodes.UNAUTHORIZED; // Set the HTTP status code to indicate unauthorized access
    }
}

export default unAuthorizedError; // Export the unAuthorizedError class for use in other files
