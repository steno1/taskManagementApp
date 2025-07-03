
import { BadRequestError, notFoundError, unAuthorizedError } from '../error/index.js';

import { StatusCodes } from 'http-status-codes';
import User from "../model/user.js";

const register = async (req, res) => {

  const { name, email, password } = req.body;


  if (!name) {
    throw new BadRequestError("Please provide a name");
  }

  if (!email) {
    throw new BadRequestError("Please provide an email");
  }

  if (!password) {
    throw new BadRequestError("Please provide a password");
  }

  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  const token = user.createJwt();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName
    },
    token
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide an email");
  }

  if (!password) {
    throw new BadRequestError("Please provide a password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new unAuthorizedError("User does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new unAuthorizedError("Wrong password");
  }

  const token = user.createJwt();

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token
  });
}

const update = async (req, res) => {
  const {email, name, lastName}=req.body;
  if(!email || !name || !lastName){
throw new BadRequestError("Please provide all values")
  }

const user=await User.findOne({_id:req.user.userId})
user.email=email
user.name=name
user.lastName=lastName

await user.save();

const token=user.createJwt()

res.status(StatusCodes.OK).json({
  user, token
})

}
export { register, login, update };
