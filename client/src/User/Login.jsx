import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  // State to store username and password for login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Async function to handle user login
  async function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the server's login endpoint
      const response = await axios.post('/api/user/login', {
        username: loginUsername,
        password: loginPassword,
      });

      // Handle the response, e.g., set user authentication state
      console.log("Login successful", response.data);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Login failed", error);
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleLogin}>
        {/* Input for username */}
        <input
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />

        {/* Input for password */}
        <input
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />

        {/* Button to trigger the login */}
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Login
        </button>
      </form>
    </div>
  );
}
