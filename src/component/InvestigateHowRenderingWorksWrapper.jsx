import {useEffect, useRef, useState} from "react";


function InvestigateHowRenderingWorks({ propValue }) {
  console.log("Rendering started...");

  let simpleVariable = Math.floor(Math.random() * 5); //On each render this is recreated
  let simpleFunction = () => {}

  let counter = useRef(0); //In case of the first render the initial value is set
  console.log("Render count: " + counter.current++);

  const [value, setValue] = useState(true); //In case of the first render the initial value is set, otherwise the stored is returned
  const [valueMutationCount, setValueMutationCount] = useState(0); //In case of the first render the initial value is set, otherwise the stored is returned
  const [stateThatIsNotGoingToChange, setStateThatIsNotGoingToChange] = useState(0); //In case of the first render the initial value is set, otherwise the stored is returned

  const toggleValue = () => { //Function with side effect, that is created for each render, but not executed during it
    console.log("Mutating state of value, current: " + value);
    setValue(v => !v); //This will trigger the rerender of the component
    console.log("Incrementing value mutation counter, current: " + valueMutationCount);
    setValueMutationCount(m => m + 1); //This will trigger the rerender of the component
    //State setter functions are batched together -> executed after the render
    console.log("This logger still see the old values for both states: " + value + ", counter: " + valueMutationCount);
    //Incrementing simple variable to trigger useEffect based on this variable
  }

  useEffect(() =>
    console.log("UseEffect without dependency array: Running on each render, since no dependencies are defined...")
  ); //No dependency array

  useEffect(() => {
    console.log("UseEffect with empty dependency array: Running on first render only... (~ComponentDidMount)");
    return () => console.log("UseEffect with empty dependency array: Running on component unmount... (~ComponentWillUnMount)");
  }, []); //No dependencies

  useEffect(
    () => console.log("UseEffect: Running on first render and state changes of dependencies defined (~ComponentDidMount | ComponentDidUpdate)")
  ,[value]);

  useEffect(
    () => console.log("UseEffect: Running on first render not on other cases, since its dependency is not changing.)")
    ,[stateThatIsNotGoingToChange]);

  useEffect(
    () => console.log("UseEffect: Running on first render and props changes (~ComponentDidMount | ComponentDidUpdate), prop value: " + propValue)
    ,[propValue]);

  useEffect(
    () => console.log("UseEffect: Running on first render and value changes (~ComponentDidMount | ComponentDidUpdate), value: " + simpleVariable)
    ,[simpleVariable]); //Simple values could be used (this case this is logged only if different value is generated)

  useEffect(
    () => console.log("UseEffect: Running on first render and fucntion changes (~ComponentDidMount | ComponentDidUpdate), value: " + simpleFunction)
    ,[simpleFunction]); //Each time the component renders a new function is created, consider to use useCallback
  
  console.log("Renderer reached the return statement.");
  return (
    <div>
      <p>Value: {value.toString()}</p>
      <p>Value mutation count: {valueMutationCount}</p>
      <button onClick={toggleValue}>Toggle</button>
    </div>
  );
}

function InvestigateHowRenderingWorksWrapper() {

  const [value, setValue] = useState(true);
  const [key, setKey] = useState(0);

  const toggle = () => {
    setValue(v => !v);
  }

  const incrementKey = () => {
    setKey(k => k + 1);
  }

  return (
    <div className="container">
      <button onClick={toggle}>Toggle from the wrapper</button>
      {/*//This is only an attribute change, doesn't trigger unmount of the child*/}
      <button onClick={incrementKey}>Change key of child</button>
      {/*//This should trigger the unmount of the child and complete rerender*/}
      <InvestigateHowRenderingWorks key={key} propValue={value}/>
    </div>
  );
}

export default InvestigateHowRenderingWorksWrapper;