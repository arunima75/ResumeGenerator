import React, { useEffect, useContext } from "react";
import Question from "./Question";
import AppContext from "../AppContext";
import Resume from "./Resume";

// This function displays Linear Progress with a label
function LinearProgressWithLabel(props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", marginRight: "1rem" }}>
        <div
          style={{
            width: `${props.value}%`,
            background: "#1976D2", 
            height: "8px",
          }}
        ></div>
      </div>
      <div style={{ minWidth: "35px" }}>{`${Math.round(props.value)}%`}</div>
    </div>
  );
}

function Progress() {
  const [progress, setProgress] = React.useState(0);
  const value = useContext(AppContext);

  // Extract 'questionAnswer', 'questions', and 'answers' from the context state
  let { questionAnswer, questions, currentQuestionIndex } = value.state;

  // Calculate the progress based on the number of questions answered
  useEffect(() => {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(progress || 0);
  }, [currentQuestionIndex, questions]);

  return (
    <div>
      {currentQuestionIndex < questions.length ?(
        <LinearProgressWithLabel
          value={progress}
          style={{ margin: "1rem"}}
        />
      ) : null}
      <div style={{display: "flex", alignItems: "center", justifyContent: "center",  minHeight: "80vh",}}>
        {currentQuestionIndex > questions.length - 1 ? (
          <Resume />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh",}}>
            <Question question={questionAnswer.question} value={questionAnswer.answers}/>
          </div>
        )}
      </div>
    </div>
  );
}
export default Progress;