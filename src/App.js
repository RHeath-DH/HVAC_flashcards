import React, { useState } from "react";
import questions from "./data/questions.json";

function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const current = questions[index];

  const toggleSelect = (letter) => {
    if (current.type === "multiple") {
      setSelected((prev) =>
        prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
      );
    } else {
      setSelected([letter]);
    }
  };

  const checkAnswer = () => {
    const correct = Array.isArray(current.answer) ? [...current.answer].sort() : [current.answer];
    const selectedSorted = [...selected].sort();
    const isCorrect = JSON.stringify(selectedSorted) === JSON.stringify(correct);
    setFeedback({
      isCorrect,
      correctAnswer: correct.join(", "),
    });
  };

  const nextQuestion = () => {
    setIndex((i) => (i + 1) % questions.length);
    setSelected([]);
    setFeedback(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Flashcard {current.id}</h1>
      <p className="mb-4">{current.question}</p>
      <div className="space-y-2">
        {Object.entries(current.options).map(([letter, text]) => (
          <button
            key={letter}
            className={`block w-full text-left px-4 py-2 border rounded ${selected.includes(letter) ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => toggleSelect(letter)}
          >
            <strong>{letter}.</strong> {text}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={checkAnswer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Answer
        </button>
        <button
          onClick={nextQuestion}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      {feedback && (
        <div className="mt-4">
          {feedback.isCorrect ? (
            <p className="text-green-600 font-bold">Correct!</p>
          ) : (
            <p className="text-red-600 font-bold">
              Incorrect. Correct answer: {feedback.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;