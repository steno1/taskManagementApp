// Import the required dependencies

import Jwt from "jsonwebtoken"; // JSON Web Token library for handling JWTs
import unAuthorizedError from "../error/unAuthorizedError.js"; // Custom error module for unauthorized access

// Middleware function for handling authentication
const auth = async (req, res, next) => {
    // Extract the headers from the incoming HTTP request
    const headers = req.headers;
    // Extract the 'Authorization' header from the headers
    const authHeader = req.headers.authorization;

    // Check if 'Authorization' header is missing or doesn't start with 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        // If not, throw an unAuthorizedError with the message "Authentication failed"
        throw new unAuthorizedError("Authentication failed");
    }

    // Extract the token from the 'Authorization' header by splitting it at the space
    // The token should be in the format: 'Bearer <actual-token>'
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the JWT library and the secret key (process.env.JWT_SECRET)
        // If the verification is successful, it will return the payload data of the token
        const Payload = Jwt.verify(token, process.env.JWT_SECRET);
        console.log(Payload)

        // Attach the payload's userId to the 'req.user' property for further use in the application
        req.user = { userId: Payload.userId };

        // Call the 'next' middleware in the chain to proceed with the request handling
        next();
    } catch (error) {
        // If there is an error during token verification, catch it here
        // Log the error message to the console for debugging purposes
        console.log("Error:", error.message);

        // Throw an unAuthorizedError with the message "Authentication failed"
        // This will be caught by the error handling middleware to handle the error gracefully
        throw new unAuthorizedError("Authentication failed");
    }
}

// Export the 'auth' middleware function to be used in other parts of the application
export default auth;
