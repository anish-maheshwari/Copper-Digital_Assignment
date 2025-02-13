import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FirstPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center px-6">
      {/* Header Section */}
    {/* Header Section */}
<motion.h1
  className="text-6xl font-extrabold text-gray-900 mb-6 mt-12 text-center"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Welcome to 
  <span className="bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
    {" "}To-Do By Copper Digital
  </span>
</motion.h1>
<motion.p
  className="text-lg text-gray-600 mt-2 text-center mb-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.6 }}
>
  Organize your tasks seamlessly and boost your productivity!
</motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/login">
          <button className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-indigo-700 transition duration-300 shadow-lg">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8 w-full max-w-5xl">
        {[
          { title: "Add Tasks", desc: "Easily add tasks to your to-do list.", img: "6109208.png" },
          { title: "Organize", desc: "Manage and prioritize your tasks.", img: "organise.png" },
          { title: "Track Progress", desc: "Mark tasks as completed and stay on track.", img: "taskprogress.png" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">{feature.desc}</p>
            <img src={feature.img} alt={feature.title} className="w-20 h-20 mx-auto mb-4" />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 w-full mt-auto text-center">
        <p>&copy; 2025 To-Do Application anish_maheshwarii</p>
      </footer>
    </div>
  );
};


export default FirstPage;
