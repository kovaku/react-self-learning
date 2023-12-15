import {useState} from "react";

function HooksUseState() {

  const counterInitFirst = () => {
    console.log("Random number is requested for Random #1!")
    return Math.floor(Math.random() * 10);
  }

  const counterInitSecond = () => {
    console.log("Random number is requested for Random #2!")
    return Math.floor(Math.random() * 10);
  }

  const [count, setCount] = useState(0); //Initialization runs only at first render
  const [randomWithInitFunction, setRandomWithInitFunction] = useState(counterInitFirst); //React runs this only at first render
  const [randomWithInitFunctionWrong, setRandomWithInitFunctionWrong] = useState(counterInitSecond()); //WRONG: this way it runs at each render
  const [input, setInput] = useState("");
  const [array, setArray] = useState(["first", "second", "third"]); //Values stored in state are considered as read-only, so it should re-created at update

  const handleIncrement = () => {
    setCount(count + 1);
    console.log("This will always display the outdated value: " + count);
    //WRONG: This always see the outdated value since the count is incremented when the page is rendered
  }

  const handleIncrementTwice = () => {
    //setCount(count + 1);
    //setCount(count + 1); This won't work since react batches hook executions, so both will see the same count

    //Solution is to pass an update function to the setCount fuction that recieves the previous state
    setCount((c) => c + 1); //The convention is to use the first char of the previous value
    setCount((c) => c + 1);
  }

  const handleIncrementRandomFirst = () => {
    setRandomWithInitFunction((c) => c + 1);
  }

  const handleIncrementRandomSecond = () => {
    setRandomWithInitFunction((c) => c + 1);
  }

  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  const handleAddElement = () => {
    setArray(a => [...a, input]) //Arrays should be recreated using the existing state
  }

  return (
    <div>
      <div className="container">
        <button onClick={handleIncrement}>Increase</button>
        <button onClick={handleIncrementTwice}>Increase properly</button>
        <p>You clicked me: {count}</p>
      </div>
      <div className="container">
        <button onClick={handleIncrementRandomFirst}>Increase #1</button>
        <button onClick={handleIncrementRandomSecond}>Increase #2</button>
        <p>Random number #1: {randomWithInitFunction}</p>
        <p>Random number #2: {randomWithInitFunctionWrong}</p>
      </div>
      <div className="container">
        {/*It is bad practice to use state to manage input value, useRef could prevent the re-rendering during typing*/}
        <input value={input} onChange={handleOnChange} />
        <button onClick={handleAddElement}>Add to list</button>
        <ul>
          {array.map((element, i) => <li key={i}>{element}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default HooksUseState