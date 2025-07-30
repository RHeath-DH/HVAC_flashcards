import React, { useState } from "react";
import questions from "./data/questions.json";

function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

  const current = questions[index];

  const toggleSelect = (letter) => {
    if (showResult) return;
    if (current.type === "multiple") {
      setSelected((prev) =>
        prev.includes(letter)
          ? prev.filter((l) => l !== letter)
          : [...prev, letter]
      );
    } else {
      setSelected([letter]);
    }
  };

  const checkAnswer = () => {
    const correct = Array.isArray(current.answer)
      ? current.answer
      : [current.answer];

    const selectedSorted = [...selected].sort();
    const correctSorted = [...correct].sort();

    const isCorrect =
      JSON.stringify(selectedSorted) === JSON.stringify(correctSorted);

    setFeedback(isCorrect ? "✅ Correct!" : "❌ Oops! That wasn’t right.");
    setShowResult(true);
  };

  const nextQuestion = () => {
    setIndex((i) => (i + 1) % questions.length);
    setSelected([]);
    setShowResult(false);
    setFeedback("");
  };

  const getButtonStyle = (letter) => {
    if (!showResult) {
      return selected.includes(letter) ? "bg-blue-100" : "bg-white";
    }

    const correct = Array.isArray(current.answer)
      ? current.answer
      : [current.answer];

    const isSelected = selected.includes(letter);
    const isCorrect = correct.includes(letter);

    if (isSelected && isCorrect) return "bg-green-200 border-green-600";
    if (isSelected && !isCorrect) return "bg-red-200 border-red-600";
    if (!isSelected && isCorrect) return "bg-green-100 border-green-400";

    return "bg-white";
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-2">Flashcard {current.id}</h1>
      <p className="mb-4">{current.question}</p>

      <div className="space-y-2">
        {Object.entries(current.options).map(([letter, text]) => (
          <button
            key={letter}
            onClick={() => toggleSelect(letter)}
            className={`block w-full text-left px-4 py-2 border rounded ${getButtonStyle(
              letter
            )}`}
          >
            <strong>{letter}.</strong> {text}
          </button>
        ))}
      </div>

      {showResult && (
        <div
          className={`mt-4 p-3 rounded ${
            feedback.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;