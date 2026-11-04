import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

/**
 * Challenge: Create a function `hold` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 *
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 */
function App() {
  const [dice, setDice] = useState(generateAllNewDice());
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
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
