import React, { useContext } from "react";
import AppContext from "../AppContext";
import "../App.css";

function Question() {
  const value = useContext(AppContext);

  // Extract 'questionAnswer', 'handleChangeInput', and 'nextQuestion' from the context state and function objects
  let { questionAnswer,currentQuestionIndex } = value.state;
  let { handleChangeInput, nextQuestion, previousQuestion} = value.function;
  return (
    <div>
      <form autoComplete="on" >
      {questionAnswer.type === "text" && (
        <div className="group">
          <input
            className="textbox"
            type="text"
            name={questionAnswer.resumeFieldId}
            value={questionAnswer.answer ? questionAnswer.answer : ""}
            onChange={handleChangeInput}
            required={questionAnswer.required}
          />
          <span class="highlight"></span>
	        <span class="bar"></span>
          <label> {questionAnswer.question} </label>
          </div>
        )}
        {questionAnswer.type === "phone" && (
        <div className="group">
          <input
            className="textbox"
            type="tel"
            name={questionAnswer.resumeFieldId}
            value={questionAnswer.answer ? questionAnswer.answer : ""}
            onChange={handleChangeInput}
            maxlength="10"
          />
          <span class="highlight"></span>
	        <span class="bar"></span>
          <label> {questionAnswer.question} </label>
          </div>
        )}
        {questionAnswer.type === "email" && (
        <div className="group">
          <input className="textbox"
            type="email"
            name={questionAnswer.resumeFieldId}
            value={questionAnswer.answer ? questionAnswer.answer : ""}
            onChange={handleChangeInput}
          />
          <span class="highlight"></span>
	        <span class="bar"></span>
          <label> {questionAnswer.question} </label>
          </div>
        )}
        {questionAnswer.type === "textarea" && (
          <div>
          <label >
            {questionAnswer.question}
          </label>
          <textarea
          name={questionAnswer.resumeFieldId}
          value={questionAnswer.answer ? questionAnswer.answer : ""}
          onChange={handleChangeInput}
          />
          </div>
        )}
        <div style={{ display: "block", marginTop: "1rem",}}>
          {currentQuestionIndex>0 &&(<button className="Nextbutton" type="submit" style={{marginRight:"5px"}} onClick={previousQuestion}>Previous</button>)}
          <button className="Nextbutton" type="submit" onClick={nextQuestion}> Next </button>
        </div>
      </form>
    </div>
  );
}
export default Question;