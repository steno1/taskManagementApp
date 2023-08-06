// Import the CustomApiError class and the StatusCodes module

import CustomApiError from "./CustomApi.js"; // Importing the CustomApiError class for extension
import { StatusCodes } from "http-status-codes"; // Importing the module for HTTP status codes

// Custom error class representing a NotFoundError
class notFoundError extends CustomApiError {
    constructor(message) {
        super(message); // Call the constructor of the extended class (CustomApiError)

        this.statusCode = StatusCodes.NOT_FOUND; // Set the HTTP status code to indicate a resource not found
    }
}

export default notFoundError; // Export the notFoundError class for use in other files
