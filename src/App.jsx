import { useState, useEffect, useRef } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceNumbers, setDiceNumbers] = useState(() => generateAllNewDice());
  const gameWon =
    diceNumbers.every((die) => die.isHeld) &&
    diceNumbers.every((die) => die.value === diceNumbers[0].value);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const newGameRef = useRef(null);

  useEffect(() => {
    newGameRef.current.focus();
  }, [gameWon]);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  useEffect(() => {
    if (gameWon) {
      setIsRunning(false);
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function hold(id) {
    setIsRunning(true);
    setDiceNumbers((oldDice) =>
      oldDice.map((num) => {
        return num.id === id ? { ...num, isHeld: !num.isHeld } : num;
      })
    );
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function rollDice() {
    if (!gameWon) {
      setDiceNumbers((oldDice) =>
        oldDice.map((num) => {
          return num.isHeld === true
            ? num
            : { ...num, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setDiceNumbers(generateAllNewDice());
      setSeconds(0);
      setIsRunning(false);
    }
  }

  const diceElements = diceNumbers.map((diceObject) => {
    return (
      <Die
        key={diceObject.id}
        value={diceObject.value}
        isHeld={diceObject.isHeld}
        hold={() => {
          hold(diceObject.id);
        }}
      />
    );
  });

  return (
    <>
      <main>
        {gameWon && (
          <Confetti
            gravity={0.3}
            wind={0}
            friction={0.99}
            numberOfPieces={200}
          />
        )}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <ul className="instructions">
          <li>Choose a number (eg: 5), select all the matching numbers</li>
          <li>Continue rolling the dice, selecting matching numbers</li>
          <li>When the board turns green, you've won!</li>
        </ul>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={rollDice} ref={newGameRef}>
          {gameWon ? "Play Again" : "Roll"}
        </button>
      </main>
      <div className="timer">Timer: {formatTime(seconds)}
        {gameWon ? <h5>Awesome! Can you beat your record of {formatTime(seconds)} seconds?</h5> : ""}
      </div>
    </>
  );
}

export default App;
