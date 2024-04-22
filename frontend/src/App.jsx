import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import DashBoard from "./dashboard/DashBoard";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {token ? (
        <DashBoard />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
