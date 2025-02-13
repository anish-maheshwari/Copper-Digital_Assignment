



import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskCard from "../Utills/TaskCard";
import Input from "../Utills/Input";
import Button from "../Utills/Button";
import { Search, Filter, Calendar } from "lucide-react";
import { customFetch } from "../Utills/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/task');

  
    return { tasks: Array.isArray(data.tasks) ? data.tasks : [] };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { tasks: [] };
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.trim() || "Untitled Task";
    const description = formData.get("description")?.trim();
    const dueDate = formData.get("dueDate")?.trim();
    const status = formData.get("status")?.trim() || "Pending"; // Restoring status

    if (!description) {
      return { error: "Task description cannot be empty" };
    }

    const taskData = { title, description, dueDate, status };
    const response = await customFetch.post("/task", taskData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    return { error: "Failed to add task" };
  }
};

const HomePage = () => {
  const { tasks = [] } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async (taskId) => {
    try {
      await customFetch.delete(`/task/${taskId}`);
      navigate(`/dashboard`);
    } catch (error) {
      alert("Failed to delete task.");
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/dashboard/edit/${taskId}`);
  };
  const handleView = (taskId) => {

    navigate(`/dashboard/view/${taskId}`);
  };


  const handleComplete = (taskId) => {
    navigate(`/dashboard/complete/${taskId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setAlertMessage("Task description cannot be empty!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title || "Untitled Task");
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("status", status);

    await fetcher.submit(formData, { method: "post" });

    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("");
    setAlertMessage("Task added successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
          <Button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center">
            <Filter size={18} className="mr-2" /> Sort
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleComplete={handleComplete}
              handleView={handleView}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No tasks found</p>
        )}
      </div>

      {/* Form to Add a New Task */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700">Add a New Task</h2>

        <Input
          name="title"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          name="description"
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div>
          <label className="block text-gray-600 font-medium mb-1">Due Date</label>
          <div className="relative">
            <Input
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Calendar size={20} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Pending">Pending</option>
    
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div className="mt-4 text-center text-gray-500">
            <p>{alertMessage}</p>
          </div>
        )}
        
        <Button type="submit" className="bg-blue-500 text-white mt-4 w-full">
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default HomePage;
