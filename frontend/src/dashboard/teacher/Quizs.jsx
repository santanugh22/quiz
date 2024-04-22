import { useState, useEffect } from "react";
import axios from "axios";

const Quizs = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/quiz", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setQuizzes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleViewMore = (quiz) => {
    setSelectedQuiz(quiz);
  };

  return (
    <div className="p-4" style={{ overflowY: "scroll", height: "100vh" }}>
      <h1 className="text-2xl mb-4">Quizzes</h1>
      {quizzes.map((quiz) => (
        <div
          key={quiz.quiz_id}
          className="mb-4 p-4 border border-gray-300 rounded"
        >
          <h2 className="text-xl mb-2">{quiz.quiz_name}</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleViewMore(quiz)}
          >
            View More
          </button>
        </div>
      ))}
      {selectedQuiz && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h2 className="text-xl mb-4">{selectedQuiz.quiz_name}</h2>
          {selectedQuiz.quiz_questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg mb-2">{question.question}</h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        question.correctOption === (index + 1).toString()
                          ? "green"
                          : "white",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quizs;
