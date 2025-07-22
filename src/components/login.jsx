import React, { useState, useEffect } from "react";
import logoLight from "../assets/image/logo3.png";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState(""); // 👈 New state for backend message

  // 👇 Fetch message from backend
  useEffect(() => {
    fetch("http://172.16.23.147:8080/logins/message")
      .then((res) => res.text())
      .then((data) => {
        setServerMessage(data); // Show this message on page
        console.log("Message from backend:", data); // optional
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://172.16.23.147:8080/logins/login", {
        username,
        password,
      });

      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setErrorMessage("Identifiants invalides ou erreur du serveur.");
    }
  };

  return (
    <div className="light flex min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Logo clair" src={logoLight} className="h-25 w-90 mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>

      {/* ✅ Show Spring Boot message */}
      {serverMessage && (
        <div className="text-center text-blue-600 text-lg font-semibold mb-4">
          {serverMessage}
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} method="POST" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base placeholder-gray-400 focus:border-[#1e96fc] focus:ring-2 focus:ring-[#1e96fc] focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base placeholder-gray-400 focus:border-[#1e96fc] focus:ring-2 focus:ring-[#1e96fc] focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#1e96fc] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-[#176fbf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e96fc]"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
