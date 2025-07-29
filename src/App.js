import React, { useState } from "react";
import questions from "./data/questions.json";

function FlashcardApp() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = questions[index];

  const toggleChoice = (letter) => {
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

  const isCorrect = () => {
    const correct = Array.isArray(current.answer)
      ? current.answer.sort()
      : [current.answer];
    const picked = [...selected].sort();
    return JSON.stringify(correct) === JSON.stringify(picked);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % questions.length);
    setSelected([]);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Question {current.id}
        </h1>
        <p className="text-lg mb-4">{current.question}</p>
        <div className="space-y-2">
          {Object.entries(current.options).map(([letter, text]) => (
            <button
              key={letter}
              className={`w-full text-left px-4 py-2 border rounded-md transition-colors duration-150 ${
                selected.includes(letter)
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => toggleChoice(letter)}
              disabled={showAnswer}
            >
              <span className="font-semibold mr-2">{letter}.</span>
              {text}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            onClick={() => setShowAnswer(true)}
            disabled={showAnswer || selected.length === 0}
          >
            Check Answer
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        {showAnswer && (
          <div
            className={`mt-4 p-4 rounded text-white font-semibold ${
              isCorrect() ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isCorrect() ? "Correct!" : "Incorrect."}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardApp;