import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import C from "../assets/C.png";
import Avatar from "./Avatar";
import axios from "axios";

export default function Chatpage() {
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user/users");
      const data = await response.json();

      const hardcodedUsers = [
        { _id: "1", username: "John" },
        { _id: "2", username: "Jane" },
        { _id: "3", username: "Doe" },
        { _id: "4", username: "Alice" },
        { _id: "5", username: "Bob" },
      ];

      setUsers([...hardcodedUsers, ...data]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user/Profile");
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <aside
        className={`flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r ${
          darkMode ? "rtl:border-l dark:bg-gray-900 dark:border-gray-700" : ""
        }`}
      >
        <a className="flex items-center justify-between">
          <p className="text-gray-500 text-xl"><b className="text-blue-700">Chat</b><b>app</b></p>
          <button
            onClick={toggleDarkMode}
            className={`p-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            } text-white rounded-md cursor-pointer`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </a>

        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className={`w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md ${
              darkMode
                ? "dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
                : "dark:focus:border-blue-300 dark:focus:border-blue-300"
            } focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {users.map((user) => (
              <a
                key={user._id}
                className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
              >
                <Avatar username={user.username} />
                <span className="mx-4 font-medium">{user.username}</span>
              </a>
            ))}
          </nav>
          <div
            className={`sticky bottom-0 flex flex-row items-center justify-between rounded-md space-x-2 bg-${
              darkMode ? "gray-700" : "gray-300"
            } p-2`}
          >
            {currentUser && (
              <div className="flex dark:text-gray-400">
                <Avatar username={currentUser.username} />
                <span className="m-2">
                  {currentUser.username}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`p-2 ${
                darkMode ? "bg-red-500" : "bg-red-700"
              } text-white rounded-md cursor-pointer`}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      <div
        className={`flex-1 p-4 overflow-y-auto ${
          darkMode ? "dark:bg-gray-800" : "dark:bg-gray-200"
        }`}
      ></div>
    </div>
  );
}
