import Jwt from "jsonwebtoken"; // Importing the JWT library for token generation
import bcrypt from "bcryptjs"; // Importing the bcrypt library for password hashing
import mongoose from "mongoose"; // Importing the mongoose library for database operations
import validator from "validator"; // Importing the validator library for email validation

// Define the UserSchema
const UserSchema = new mongoose.Schema({

  // Name field
  name: {
    type: String,
    required: [true, "Please provide name"], // Name is required
    minlength: 2, // Minimum length of 2 characters
    maxlength: 45, // Maximum length of 45 characters
    trim: true // Trim any leading/trailing white space
  },

  // Email field
  email: {
    type: String,
    required: [true, 'Please provide email'], // Email is required
    validate: {
      validator: validator.isEmail, // Using the validator library for email validation
      message: "please provide a valid email"
    },
    unique: true // Email must be unique
  },

  // Password field
  password: {
    type: String,
    required: [true, "Please provide password"], // Password is required
    minlength: 6, // Minimum length of 6 characters
    select: false // Password should not be selected by default in queries
  },

  // Last name field
  lastName: {
    type: String,
    default: "Last Name", // Default value if last name is not provided
    maxlength: 45, // Maximum length of 45 characters
    trim: true // Trim any leading/trailing white space
  }

});

// Hash the password before saving the user
UserSchema.pre('save', async function() {
 //console.log(this.modifiedPaths())
 if(!this.isModified("password"))return

  const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password using bcrypt
});

// Create a JWT token for the user
UserSchema.methods.createJwt = function() {
  return Jwt.sign(
    { userId: this.id }, // Payload data for the token
    process.env.JWT_SECRET, // Secret key used to sign the token
    { expiresIn: process.env.JWT_LIFETIME } // Expiration time for the token
  );
};
UserSchema.methods.comparePassword=async function(candidatePassword){
  const isMatch=await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model("User", UserSchema); // Export the User model for use in other modules
