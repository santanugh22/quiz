import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const CreateQuiz = async (req, res) => {
  try {
    const { topics, numberOfQuestions } = req.body;
    const prompt = `Create a quiz with ${numberOfQuestions} questions on the following topics: ${topics} in JSON format . Each question should have a question, options and answer field. The options should be an array of strings and the answer should be a string. Number of options should be 4.`;
    const questions = await model.generateContent(prompt);
    let resp = questions.response.candidates[0].content.parts[0].text;
    resp = resp.replace(/^```|```$/g, "");
    console.log(resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
