import { useLoaderData } from "react-router-dom";
import { customFetch } from "../Utills/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customFetch.get(`/task/${id}`);
    return response.data.tasks; 
  } catch (error) {
    console.error("Error fetching task for view:", error);
    return null;
  }
};

const ViewPage = () => {
  const task = useLoaderData();

  if (!task) return <p>No Task found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">View Task</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{task.title}</h2>
          <p>{task.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
