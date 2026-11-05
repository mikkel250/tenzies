import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice()); // using an anonymous function instead of calling the function directly ensures that React doesn't call the generateAllNewDice function on every rerender. 
  const gameWon = dice.every((die) => die.value === dice[0].value);
  const { width, height } = useWindowSize();

  const diceElements = dice.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      hold={() => hold(item.id)}
    />
  ));

  function generateAllNewDice() {
    let newDice = new Array(10).fill(0);
    newDice = newDice.map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
    return newDice;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.isHeld
          ? item
          : { ...item, value: Math.ceil(Math.random() * 6) };
      }),
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      }),
    );
  }

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {gameWon ? <Confetti width={width} height={height} /> : '' }
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
