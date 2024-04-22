import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(0);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          username,
          email,
          password,
          user_type: userType,
        }
      );
      console.log(userType)
      const { token } = response.data.data;
       const { user_type } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", user_type);
      window.location.reload();

      setError("SUCCESSS");
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


  console.log(userType)
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
      <div className="w-1/3 bg-white p-10 rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <label className="block mb-2">Username</label>
          <input
            className="mb-4 w-full px-3 py-2 border border-gray-300"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <label className="block mb-2">User Type</label>
          <select
            className="mb-4 w-full px-3 py-2 border border-gray-300"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value={0}>Student</option>
            <option value={1}>Teacher</option>
          </select>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
