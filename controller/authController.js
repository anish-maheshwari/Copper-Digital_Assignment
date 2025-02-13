import { StatusCodes } from 'http-status-codes';
import User3 from "../models/userModels.js"
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utills/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customError.js';
import { comparePassword } from '../utills/passwordUtils.js';
import { createJWT } from '../utills/tokenUtils.js';

export const register = async (req, res) => {
  


    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
  
  const user = await User3.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg:"user created" });
};

export const login = async (req, res) => {

  const user = await User3.findOne({ email: req.body.email });

  const isValidUser = user && (await comparePassword(req.body.password, user.password));
if (!isValidUser) throw new UnauthenticatedError('invalid credentials');


const token = createJWT({ userId: user._id});
const oneDay = 1000 * 60 * 60 * 24;
res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
  
});

res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
};

// console.log(req.cookies);




export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};



