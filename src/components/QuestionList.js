import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setQuestions(questions.filter((q) => q.id !== id)));
  }

  function handleChangeAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex,
      }),
    })
  
      .then((r) => r.json())
      .then((data) => {
        setQuestions(
          questions.map((q) => {
            if (q.id === id) return data;
            return q;
          })
        );
      });
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            handleChangeAnswer={handleChangeAnswer}
            question={question}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
