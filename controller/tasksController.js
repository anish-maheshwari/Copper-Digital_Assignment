import Task from "../models/noteModels.js"
import { StatusCodes } from 'http-status-codes';

import mongoose from 'mongoose';
import day from 'dayjs';

//custom error
import { NotFoundError } from "../errors/customError.js";

export const getAlltasks = async (req,res)=>{
  
  const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json({tasks});
};

export const createTask = async (req, res) => {

  req.body.createdBy = req.user.userId;

  console.log('User ID:', req.body.createdBy); // Log the userId to make sure it's being set properly
  const task = await Task.create(req.body);
 
  res.status(StatusCodes.CREATED).json({ task });
};

export const singleTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.findById(id);

    res.status(200).json({ tasks });
  };

  // Delete Job
  export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const removedTask = await Task.findByIdAndDelete(id);
  
    res.status(200).json({ task: removedTask });
  };

  

  export const editTask = async (req, res) => {
    const { id } = req.params;
  
    const editedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    res.status(200).json({ task: editedTask });
  };






  
  
 