import React, { createRef, useContext } from "react";
import Pdf from "react-to-pdf";
import AppContext from "../AppContext";

let refreshPage = () => {
  window.location.reload();
};

function Resume() {

  // Create a reference for the 'Pdf' component
  const ref = createRef();
  const a4PageStyles = {
    width: "195mm", 
    height: "297mm", 
    padding: "8mm", 
    justifyContent: "space-between",
    border: "1px solid #ccc",
  };

  // Access the context using 'useContext'
  const value = useContext(AppContext);

  // Use the custom styles defined with 'makeStyles'
  debugger;
  let { answers } = value.state;
  return (
    <div>
      <div ref={ref} style={a4PageStyles}>
        {answers.map((answer) => {
          return (
            <div>
              {answer.resumeFieldId === "name" ? (
                <div
                  style={{
                    textAlign: "left",
                    color: "navy",
                    float:"left"
                  }}
                >
                  <h2>{answer.answer}</h2>
                </div>
              ) : (
                <div>
                  {answer.resumeFieldId === "email" ||
                    answer.resumeFieldId === "linkedin" ||
                    answer.resumeFieldId === "phoneNumber" ? (
                    <div
                      style={{
                        color: "black",
                        fontSize:"18px",
                        textAlign:"right",
                        marginTop:"28px"
                      }}
                    >
                      <p>{answer.answer}</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: "left", whiteSpace:"pre-line"}}>
                      {answer.answer !== undefined && (
                        <div>
                          <h3 style={{marginBottom:"0px",color:"navy"}}>{answer.resumeField}</h3>
                          <hr style={{border:"1px solid", marginTop:"0px", color:"navy"}}/>
                          <p>{answer.answer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button onClick={refreshPage} className="Nextbutton">
          Build New
        </button>
        <Pdf targetRef={ref} filename="Resume.pdf" >
          {({ toPdf }) => (
            <button onClick={toPdf} className="Nextbutton" style={{ backgroundColor: "green" }} >
              Download
            </button>
          )}
        </Pdf>
      </div>
    </div>
  );
}

export default Resume;