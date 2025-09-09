import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  
  const [diceNumbers, setDiceNumbers] = useState(() => generateAllNewDice())
  const gameWon = diceNumbers.every(die => die.isHeld) && 
  diceNumbers.every(die => die.value === diceNumbers[0].value);

  useEffect(()=> {
    const firstValue = diceNumbers[0].value;

    const allGreen = diceNumbers.every(die => die.isHeld)
    const allSameValues = diceNumbers.every(die => die.value === firstValue)

    if(allGreen && allSameValues) {
      console.log("Game won!")
    }
  }, [diceNumbers])

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-btn' onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
