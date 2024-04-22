import { Routes, Route, NavLink } from "react-router-dom";
import HomeStudent from "./student/Home";
import QuizsStudent from "./student/Quizs";
import EvaluationStudent from "./student/Evaluation";
import AccountSettingsStudent from "./student/AccountSettings";
import HomeTeacher from "./teacher/Home";
import QuizsTeacher from "./teacher/Quizs";
import CreateQuiz from "./teacher/CreateQuiz";
import AccountSettingsTeacher from "./teacher/AccountSettings";

const DashBoard = () => {
  const checkUser = localStorage.getItem("user_type");
  console.log(checkUser)
  return (
    <div className="h-screen flex">
      <div className="w-64 bg-gray-800 text-white p-6 ">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl mb-4">QuizMaster</h1>
          <h3>{checkUser == 0 ? "Teacher" : "Student"}</h3>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/home"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                activeClassName="bg-blue-500 text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quizs"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                activeClassName="bg-blue-500 text-white"
              >
                Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/evaluation"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                activeClassName="bg-blue-500 text-white"
              >
                Create Quiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                activeClassName="bg-blue-500 text-white"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow bg-blue-200 p-6">
        {checkUser == 0 ? (
          <Routes>
            <Route path="home"  element={<HomeTeacher />} />
            <Route path="quizs" element={<QuizsTeacher />} />
            <Route path="evaluation" element={<CreateQuiz />} />
            <Route path="settings" element={<AccountSettingsTeacher />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="home" index element={<HomeStudent />} />
            <Route path="quizs" element={<QuizsStudent />} />
            <Route path="evaluation" element={<EvaluationStudent />} />
            <Route path="settings" element={<AccountSettingsStudent />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
