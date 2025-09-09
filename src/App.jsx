import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from "nanoid"

function App() {
  
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
    console.log("You clicked: " + id)
    setDiceNumbers(oldDice => oldDice.map(num => {
      return num.id === id ? {...num, isHeld: !num.isHeld } : num
    }))
  }

  const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())

  function rollDice() {
    setDiceNumbers(oldDice => oldDice.map(num => {
      return num.isHeld === true ? num : {...num, value: Math.ceil(Math.random() * 6)}
    }))
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-btn' onClick={rollDice}>Roll</button>
      </main>
    </>
  )
}

export default App
