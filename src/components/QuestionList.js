import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const afterDelete = questions.filter((q) => id !== q.id);
        setQuestions(afterDelete);
      });
  }
  function onChangeCorrectAnswer(id, correctIndex) {
  

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updateQuestions = questions.map((q) => {
          if (q.id === id) return data;
          return q;
        });

        setQuestions(updateQuestions);
      });
  }
  console.log(questions);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            deleteQuestion={deleteQuestion}
            onChangeCorrectAnswer={onChangeCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
