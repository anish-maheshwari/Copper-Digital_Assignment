


import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { customFetch } from "../Utills/customFetch";
import Input from "../Utills/Input";
import Button from "../Utills/Button";
import { Calendar } from "lucide-react";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customFetch.get(`/task/${id}`);
    return response.data.tasks;
  } catch (error) {
    console.error("Error fetching Task for edit:", error);
    return null;
  }
};

const EditPage = () => {
  const task = useLoaderData();
  const navigate = useNavigate();

  // Initialize state as empty and update when data is available
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  // Update state once task data is available
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : ""); // Ensuring date format
      setStatus(task.status || "");
    }
  }, [task]); // Runs when `task` changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { title, description, dueDate, status };
      await customFetch.patch(`/task/${task._id}`, formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (!task) return <p>Task not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
          <Input name="title" type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input name="description" type="text" placeholder="Task Content" value={description} onChange={(e) => setDescription(e.target.value)} required />
          
          <div>
            <label className="block text-gray-600 font-medium mb-1">Due Date</label>
            <div className="relative">
              <Input name="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Calendar size={20} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Status</label>
            <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Button type="submit" className="bg-blue-500 text-white">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
