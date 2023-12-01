import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  // State to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Async function to handle user registration
  async function register(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the server's registration endpoint
      const response = await axios.post("/api/user/register", {
        username,
        password,
      });

      // Handle the response, e.g., show a success message
      console.log("Registration successful", response.data);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Registration failed", error);
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        {/* Input for username */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />

        {/* Input for password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />

        {/* Button to trigger the registration */}
        <Link to="/login" className="text-xs">
        Already have an account? Login here
      </Link>
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2 mt-1">
          Register
        </button>
      </form>

      {/* Link to the login page */}
    </div>
  );
}
