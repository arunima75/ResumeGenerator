import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import questionsArray from "./constants/questionArray";
import Questions from "./components/Progress";

// Define a regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Validation function for email
function validateEmail(email) {
  return emailRegex.test(email);
}
function App() {

  // State variables to manage the questions, answers, and the current question-answer pair
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [questionAnswer, setQuestionAnswer] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // useEffect hook to initialize the questions and set the first question-answer pair
  useEffect(() => {
    setQuestions(questionsArray);
    setQuestionAnswer(questionsArray[0]);
  }, []);

  // Function to handle the input change for the answer of the current question-answer pair
  let handleChangeInput = (e) => {
    setQuestionAnswer({
      ...questionAnswer,
      answer: e.target.value,
    });
  };

  // Function to move to the next question and store the answer in the 'answers' state
  let nextQuestion = (e) => {
    e.preventDefault();
    // Check if the current question is of type "email"
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === "email") {
      const isValidEmail = validateEmail(questionAnswer.answer);

      if (!isValidEmail) {
        alert("Please enter valid email address");
        // Display an error message or handle the invalid email input here
        return ;
      }
    }
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    questions.map((question) => {
      if (question.resumeFieldId === questionAnswer.resumeFieldId) {
        setAnswers([
          ...answers,
          { ...question, answer: questionAnswer.answer },
        ]);
      }
    });

    questions.map((qa, index) => {
      if (index <= questions.length) {
        if (qa.resumeFieldId === questionAnswer.resumeFieldId) {
          setQuestionAnswer(questions[index + 1]);
        }
      }
    });
  };

  let previousQuestion = (e) => {
    e.preventDefault();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Find the previous question by its index
      const previousQuestion = questions[currentQuestionIndex - 1];

      // Find the corresponding answer in the answers array
      const previousAnswerIndex = answers.findIndex(answer => answer.resumeFieldId === previousQuestion.resumeFieldId);

      if (previousAnswerIndex !== -1) {
        setQuestionAnswer({ ...answers[previousAnswerIndex] });
        if (answers[previousAnswerIndex].answer !== questionAnswer.answer) {
          const updatedAnswers = [...answers];
          updatedAnswers[previousAnswerIndex].answer = questionAnswer.answer;
          setAnswers(updatedAnswers);
        }

      } else {
        // If there's no previous answer, set the questionAnswer with the previous question and an empty answer
        setQuestionAnswer({ ...previousQuestion, answer: "" });
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        state: {
          questionAnswer,
          questions,
          answers,
          currentQuestionIndex,
        },
        function: {
          handleChangeInput: handleChangeInput,
          nextQuestion: nextQuestion,
          previousQuestion: previousQuestion,
        },
      }}
    >
      <div className="App" style={{
        textAlign: "center",
        margin: "2rem",
      }}>
        <h2 style={{
          textAlign: "center",
          margin: "2rem",
        }}>Resume Generator</h2>
        <Questions />
      </div>
    </AppContext.Provider>
  );
}

export default App;