import React from "react";

function QuestionItem({ question, onDeleteClick, handleChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    onDeleteClick(id);

  } 
  function changeAnswer(e) {
    handleChangeAnswer(id, parseInt(e.target.value))
    
}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}
export default QuestionItem;
