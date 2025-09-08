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

const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())

  const diceElements = diceNumbers.map((diceObject) => {
    return <Die key={diceObject.id} value={diceObject.value} isHeld={diceObject.isHeld}/>
  })

  return (
    <>
      <main>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-btn' onClick={() => setDiceNumbers(generateAllNewDice())}>Roll</button>
      </main>
    </>
  )
}

export default App
