import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password }
      );
      const { token } = response.data.data;
      const { user_type } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", user_type);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 bg-blue-500 text-white p-10 flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-4">Welcome to QuizMaster</h1>
        <p className="mb-4">
          The ultimate platform for testing your knowledge. Join us and explore
          a wide range of quizzes!
        </p>
        <a
          href="/register"
          className="bg-white text-blue-500 py-2 px-4 rounded"
        >
          Register Now
        </a>
      </div>
      <div className="flex-1 bg-white p-10 flex justify-center items-center">
        <div className="w-1/3">
          <h2 className="text-2xl mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <label className="block mb-2">Email</label>
            <input
              className="mb-4 w-full px-3 py-2 border border-gray-300"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mb-2">Password</label>
            <input
              className="mb-4 w-full px-3 py-2 border border-gray-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
              Login
            </button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default Login;
