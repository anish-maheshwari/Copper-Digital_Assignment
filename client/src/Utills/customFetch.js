import axios from "axios";

export const customFetch = axios.create({
  baseURL: "/api/v1", // Update based on your backend
  // baseURL: "https://voicetonotee.onrender.com/api/v1", // Update based on your backend

  withCredentials: true, // Important: Ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});
