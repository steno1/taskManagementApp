// Import required modules and files

import "express-async-errors"; // Import a module to handle asynchronous errors

import authRouter from "./routes/authRoutes.js"; // Import authentication routes
import authenticateUser from "./middleWare/Authenticate.js"; // Import authentication middleware
import connectDB from "./db/connectDB.js"; // Import function to connect to the database
import dotenv from "dotenv"; // Import dotenv for environment variables
import errorMiddleWare from "./middleWare/errorMiddleWare.js"; // Import error handling middleware
import express from "express"; // Import the Express framework
import morgan from "morgan"; // Import morgan for logging
import notFoundMiddleWare from "./middleWare/notFound.js"; // Import middleware for handling 404 Not Found errors
import taskRouter from "./routes/taskRoutes.js"; // Import task routes

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Use morgan for logging in development mode
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Root route
app.get('/', (req, res) => {
    res.send("Welcome"); // Send a welcome message for the root route
});

// Authentication routes
app.use('/api/v1/auth', authRouter); // Use the authRouter for handling authentication routes

// Task routes with authentication middleware
app.use('/api/v1/tasks', authenticateUser, taskRouter); // Use authenticateUser middleware for task routes

// Middleware for handling 404 Not Found errors
app.use(notFoundMiddleWare);

// Middleware for handling errors
app.use(errorMiddleWare);

// Set the port to listen on, default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL); // Connect to the database using the provided URL
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error); // Log any errors that occur during server startup
    }
};

start(); // Call the start function to initiate server startup
