


import { Pencil, Trash, Eye, Calendar } from "lucide-react";

const TaskCard = ({ task, handleEdit, handleDelete, handleView }) => {
 

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{task.title.slice(0, 30)}</h3>
      <p className="text-gray-600 mt-2">{task.description.slice(0, 50)}</p>

      {/* Due Date Display */}
      <div className="flex items-center mt-2 text-gray-500 text-sm">
        <Calendar size={16} className="mr-2 text-blue-500" />
        <span className="text-gray-700 text-sm">
  <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", {
    weekday: "short", // e.g., "Mon"
    day: "2-digit", // e.g., "15"
    month: "short", // e.g., "Feb"
    year: "numeric" // e.g., "2025"
  }) : "No Due Date"}
</span>

      </div>

      <div className="mt-4 flex items-center justify-between">
      <span
  className={`px-3 py-1 rounded-full text-sm font-medium ${
    task.status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
  }`}
>
  {task.status === "Completed" ? "Completed" : "Pending"}
</span>


        <div className="flex gap-2">
          <button
            onClick={() => handleView(task._id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleEdit(task._id)}
            className="text-green-500 hover:text-green-700"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
