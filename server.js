// Import required modules and files

import "express-async-errors"; // A module to handle asynchronous errors

import ExpressMongoSanitize from "express-mongo-sanitize"; // Middleware to sanitize incoming data and prevent MongoDB injection
import authRouter from "./routes/authRoutes.js"; // Import authentication routes
import authenticateUser from "./middleWare/Authenticate.js"; // Middleware to authenticate users
import connectDB from "./db/connectDB.js"; // Function to connect to the database
import { dirname } from "path";
import dotenv from "dotenv"; // Library to load environment variables from .env file
import errorMiddleWare from "./middleWare/errorMiddleWare.js"; // Middleware to handle errors
import express from "express"; // Import the Express framework
import { fileURLToPath } from "url";
import helmet from "helmet"; // Middleware to set HTTP headers for security
import morgan from "morgan"; // Middleware for logging HTTP requests
import notFoundMiddleWare from "./middleWare/notFound.js"; // Middleware to handle 404 Not Found errors
import path from "path";
import taskRouter from "./routes/taskRoutes.js"; // Import task routes
import xss from "xss-clean"; // Middleware to prevent cross-site scripting (XSS) attacks

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

app.use(helmet()); // Set secure HTTP headers
app.use(xss()); // Prevent cross-site scripting attacks
app.use(ExpressMongoSanitize()); // Sanitize incoming data to prevent MongoDB injection

const __dirname = dirname(fileURLToPath(import.meta.url)); // Get the directory name of the current module
app.use(express.static(path.resolve(__dirname, './client/build'))); // Serve static files from the client's build directory

// Use morgan for logging in development mode
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev")); // Log HTTP requests in the console in a developer-friendly format
}

// Root route
app.get('/', (req, res) => {
    res.send("Welcome"); // Send a welcome message for the root route
});

// Authentication routes
app.use('/api/v1/auth', authRouter); // Use the authRouter for handling authentication routes

// Task routes with authentication middleware
app.use('/api/v1/tasks', authenticateUser, taskRouter); // Use authenticateUser middleware for task routes

// Catch-all route to serve the React app's index.html for any other route
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
