import React, { useState } from "react";
import questions from "./data/questions.json";

function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);

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
    const answer = Array.isArray(current.answer) ? current.answer.sort() : [current.answer];
    return JSON.stringify([...selected].sort()) === JSON.stringify(answer);
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Flashcard {current.id}</h1>
      <p className="mb-4">{current.question}</p>
      <div className="space-y-2">
        {Object.entries(current.options).map(([letter, text]) => (
          <button
            key={letter}
            className={\`block w-full text-left px-4 py-2 border rounded \${selected.includes(letter) ? 'bg-blue-100' : 'bg-white'}\`}
            onClick={() => toggleSelect(letter)}
          >
            <strong>{letter}.</strong> {text}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => alert(checkAnswer() ? "Correct!" : "Incorrect.")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Answer
        </button>
        <button
          onClick={() => {
            setIndex((i) => (i + 1) % questions.length);
            setSelected([]);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;