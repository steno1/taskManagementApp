// Import necessary modules and packages

import Task from "./model/task.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

// Import the Task model for database operations
 // Import the function to connect to the database
    // Import dotenv to manage environment variables
  // Import the function to read files asynchronously

// Load environment variables from .env file
dotenv.config();

// Define the main function to start the population process
const start = async () => {
    try {
        // Connect to the MongoDB database using the provided MONGO_URL environment variable
        await connectDB(process.env.MONGO_URL);

        // Delete all existing tasks from the database
        await Task.deleteMany();

        // Read and parse the JSON data from the mock_data.json file
        const jsonProduct = JSON.parse(await readFile(new URL('./mock_data.json', import.meta.url)));

        // Create new tasks in the database using the parsed JSON data
        await Task.create(jsonProduct);

        // Log a success message to the console
        console.log("Data population success!");

        // Exit the process with a success status code
        process.exit(0);
    } catch (error) {
        // If an error occurs during the process:
        
        // Log the error message to the console
        console.error("Error:", error);

        // Exit the process with an error status code
        process.exit(1);
    }
};

// Call the main function to start the data population process
start();
