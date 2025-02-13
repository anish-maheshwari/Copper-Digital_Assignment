

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"], // Restricts values to only these two
     
    },
    dueDate: {
      type: Date, // Optional deadline for task
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User3", // References the User model
   
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

