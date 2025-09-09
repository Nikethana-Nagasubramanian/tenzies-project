import { useState, useEffect, useRef } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  
  const [diceNumbers, setDiceNumbers] = useState(() => generateAllNewDice())
  const gameWon = diceNumbers.every(die => die.isHeld) && 
  diceNumbers.every(die => die.value === diceNumbers[0].value);

  const newGameRef = useRef(null)

  useEffect(() => {
    newGameRef.current.focus()
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => {
          return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
          }
        })
  }

  function hold(id) {
    setDiceNumbers(oldDice => oldDice.map(num => {
      return num.id === id ? {...num, isHeld: !num.isHeld } : num
    }))
  }

  function rollDice() {
    if(!gameWon) {
      setDiceNumbers(oldDice => oldDice.map(num => {
        return num.isHeld === true ? num : {...num, value: Math.ceil(Math.random() * 6)}
      }))
    }
    else
    {
      setDiceNumbers(generateAllNewDice())
    }
  }

  const diceElements = diceNumbers.map((diceObject) => {
    return <Die 
            key={diceObject.id} 
            value={diceObject.value} 
            isHeld={diceObject.isHeld} 
            hold={() => {hold(diceObject.id)}}/>
  })

  return (
    <>
      <main>
        {gameWon && <Confetti
                      gravity={0.3}
                      wind={0}  
                      friction={0.99}
                      numberOfPieces={200}
                    />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <ul className="instructions">
        <li>Choose a number (eg: 5), select all the matching numbers</li>
        <li>Continue rolling the dice, selecting matching numbers</li>
        <li>When the board turns green, you've won!</li>
      </ul>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-btn' onClick={rollDice} ref = {newGameRef}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

export default App
