import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [test, setTest] = useState({});
  console.log(localStorage.getItem("user_type"));

  async function fetchUser() {
    const user = await axios.get("http://localhost:3000/api/v1/home/user", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    setUsername(user.data.data.username);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex gap-12 flex-col">
      <div>
        <h1 className="text-xl text-blue-700">Hello,{username}</h1>
      </div>
      <div className="flex gap-12 ">
        <div className="h-72 w-72 bg-blue-400 shadow-sm rounded-xl "></div>
        <div className="h-72 w-72 bg-blue-400 shadow-sm rounded-xl "></div>
        <div className="h-72 w-72 bg-blue-400 shadow-sm rounded-xl "></div>
      </div>
    </div>
  );
};
export default Home;
