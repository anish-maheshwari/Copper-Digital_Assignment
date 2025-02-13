import "express-async-errors";

import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { body, validationResult } from 'express-validator';
import authRouter from './router/authRouter.js';

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import taskRoutes from './router/tasksRoutes.js';
import User3 from './models/userModels.js';
import Task from './models/noteModels.js';

import { StatusCodes } from "http-status-codes";
import path from 'path';



import cookieParser from "cookie-parser";
import cors from 'cors';



// Make sure you use cookie-parser in your Express app



dotenv.config();
const app = express();

if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'));}
    app.use(express.static(path.resolve('public')));
        app.use(cookieParser());
    app.use(express.json());

  
    
    app.use(cors({
      origin: ['http://localhost:5173'],
      credentials: true,
    }));

    app.get('/api/v1/test', (req, res) => {
      res.json({ msg: 'test route' });
    });


    app.use('/api/v1/auth',authRouter);
app.use('/api/v1/task',authenticateUser, taskRoutes);







app.get('/api/v1/users/admin/app-stats',authenticateUser, (req, res) => {
  // Print the value of the 'adminToken' cookie
  const adminToken = req.user;

  // Log the value of the cookie

  // Send response
  res.status(200).json({adminToken});
});





app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
  });

  
// Error Middleware
  app.use(errorHandlerMiddleware);

  const port = process.env.PORT || 5100;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }



