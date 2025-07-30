import React, { useState } from "react";
import questions from "./data/questions.json";

function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const current = questions[index];

  const toggleSelect = (letter) => {
    if (answered) return;
    if (current.type === "multiple") {
      setSelected((prev) =>
        prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
      );
    } else {
      setSelected([letter]);
    }
  };

  const checkAnswer = () => {
    const correct = Array.isArray(current.answer)
      ? current.answer.map((a) => a.toUpperCase()).sort()
      : [current.answer.toUpperCase()];

    const selectedSorted = [...selected].map((s) => s.toUpperCase()).sort();
    const isCorrect = JSON.stringify(selectedSorted) === JSON.stringify(correct);
    setIsCorrect(isCorrect);
    setAnswered(true);
  };

  const nextQuestion = () => {
    setIndex((i) => (i + 1) % questions.length);
    setSelected([]);
    setAnswered(false);
    setIsCorrect(null);
  };

  const getClassName = (letter) => {
    if (!answered) {
      return selected.includes(letter) ? "bg-blue-100" : "bg-white";
    }

    const correct = Array.isArray(current.answer)
      ? current.answer.map((a) => a.toUpperCase())
      : [current.answer.toUpperCase()];

    const isCorrectAnswer = correct.includes(letter);
    const isSelected = selected.includes(letter);

    if (isCorrectAnswer && isSelected) return "bg-green-200 border-green-500";
    if (isCorrectAnswer) return "bg-green-100 border-green-400";
    if (isSelected && !isCorrectAnswer) return "bg-red-200 border-red-500";
    return "bg-white";
  };

  const feedbackMessage = () => {
    if (!answered) return null;
    return isCorrect ? "✅ Great job!" : "❌ Not quite — review and try again!";
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Flashcard {current.id}</h1>
      <p className="mb-4">{current.question}</p>

      <div className="space-y-2">
        {Object.entries(current.options).map(([letter, text]) => (
          <button
            key={letter}
            onClick={() => toggleSelect(letter)}
            className={`block w-full text-left px-4 py-2 border rounded ${getClassName(letter)}`}
          >
            <strong>{letter}.</strong> {text}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {answered && (
          <div className="mb-2 font-semibold">{feedbackMessage()}</div>
        )}
        <div className="flex gap-2">
          <button
            onClick={checkAnswer}
            disabled={answered || selected.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Check Answer
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answered}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;