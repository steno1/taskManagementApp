import mongoose from "mongoose";

// Define the UserSchema
const TaskSchema = new mongoose.Schema({

  // Title field
  Title: {
    type: String,
    required: [true, "Please provide title"], // Title is required
    maxlength: 100, // Maximum length of 100 characters
    trim: true // Trim any leading/trailing white space
  },


  // status field
  status: {
    type: String,
   enum:['In-Progress', 'Completed', 'Abandoned'],
   default:"In-Progress"
  },

  // Priority
  priority: {
    type: String,
   enum:['High', 'Average', 'Low'],
   default:"Average"
  },


//Task Description
Description: {
    type: String,
    required: [true, "Please provide description"], // Description is required

    trim: true // Trim any leading/trailing white space
  },

  // Task creation time
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp when a new task is created
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true, 'Please provide user']
  }

}

  );
  export default mongoose.model("Task", TaskSchema); // Export the User model for use in other modules


