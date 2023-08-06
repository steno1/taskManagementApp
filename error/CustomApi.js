// Custom error class representing a base class for API-specific errors
class CustomApiError extends Error {
   constructor(message) {
       super(message); // Call the constructor of the extended class (Error)

       // Additional custom logic, if needed, can be added here
   }
}

export default CustomApiError; // Export the CustomApiError class for use in other files
