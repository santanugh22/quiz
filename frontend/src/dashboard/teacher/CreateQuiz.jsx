import { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], correctOption: "" },
  ]);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    if (newQuestions[index].options.length < 4) {
      newQuestions[index].options.push("");
      setQuestions(newQuestions);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", ""], correctOption: "" },
    ]);
  };

const handleSubmit = () => {
  // Validate the quiz data
  if (!quizName) {
    alert("Please enter a quiz name");
    return;
  }
  for (let i = 0; i < questions.length; i++) {
    if (
      !questions[i].question ||
      questions[i].options.length < 2 ||
      !questions[i].correctOption
    ) {
      alert(`Please complete question ${i + 1}`);
      return;
    }
  }

  // Send the quiz data to the server
  axios
    .post(
      "http://localhost:3000/api/v1/quiz/create",
      {
        quiz_name: quizName,
        questions,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => {
      alert("Quiz created successfully");
      console.log(data.data);
      setQuizName("");
      setQuestions([{ question: "", options: ["", ""], correctOption: "" }]);
    })
    .catch((err) => {
      alert(err);
    });
};
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create Quiz</h1>
      <input
        className="mb-4 w-full px-3 py-2 border border-gray-300"
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={handleQuizNameChange}
      />
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <input
            className="mb-2 w-full px-3 py-2 border border-gray-300"
            type="text"
            placeholder={`Question ${questionIndex + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              className="mb-2 w-full px-3 py-2 border border-gray-300"
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(questionIndex, optionIndex, e)
              }
            />
          ))}
          {question.options.length < 4 && (
            <button
              className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAddOption(questionIndex)}
            >
              Add Option
            </button>
          )}
          <input
            className="mb-2 w-full px-3 py-2 border border-gray-300"
            type="text"
            placeholder="Correct Option"
            value={question.correctOption}
            onChange={(e) => handleCorrectOptionChange(questionIndex, e)}
          />
        </div>
      ))}
      {questions.length < 10 && (
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      )}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateQuiz;
