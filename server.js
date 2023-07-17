// Import required modules and files

import "express-async-errors";

import authRouter from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import errorMiddleWare from "./middleWare/errorMiddleWare.js";
import express from "express";
import morgan from "morgan";
import notFoundMiddleWare from "./middleWare/notFound.js";
import taskRouter from "./routes/taskRoutes.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware to parse JSON data
app.use(express.json());

if(process.env.NODE_ENV !="production"){
app.use(morgan("dev"))
}
// Root route
app.get('/', (req, res) => {
  res.send("Welcome");
});

// Authentication routes
app.use('/api/v1/auth', authRouter);

// Task routes
app.use('/api/v1/tasks', taskRouter);

// Middleware for handling 404 Not Found errors
app.use(notFoundMiddleWare);

// Middleware for handling errors
app.use(errorMiddleWare);

// Set the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
