import {useCallback, useEffect, useMemo, useState} from "react";


const ChildElement = (prop) => {
  console.log("Child element is re-rendered, name:" + prop.name);
  return (<p>{prop.value}</p>);
}

const HooksUseMemo = () => {

  //State variable to trigger re-render
  const [value, setValue] = useState(0);
  const [valueOnUseMemoDepends, setValueOnUseMemoDepends] = useState(0);

  //Some expensive function to execute
  const expensiveFunction = () => {
    console.log("Expensive calculation executed.")
    return Math.pow(valueOnUseMemoDepends, 2);
  }

  //useMemo to avoid unnecessary calculations/api calls
  const expensiveFunctionResult = useMemo(() => expensiveFunction(), [valueOnUseMemoDepends])
  //useMemo to avoid unnecessary renders
  const childComponentMemoized = useMemo(() => <ChildElement value={valueOnUseMemoDepends} name="memoized child"/>, [valueOnUseMemoDepends])


  //Caching result with useMemo, expensive calculation is only executed on first render and dependency value change
  useEffect(() => console.log("useEffect is executed for each render in case of simple function, memoized value: " + expensiveFunctionResult),
    [valueOnUseMemoDepends]
  ); //The value of the expensive function only changes if the valueOnUseMemoDepends value also changes


  function renderMe() {
    setValue(v => v + 1);
  }

  function triggerUseMemoUpdate() {
    setValueOnUseMemoDepends(v => v + 1);
  }

  return (
    <div className="container">
      <button onClick={renderMe}>render me</button>
      <button onClick={triggerUseMemoUpdate}>update useMemo</button>
      {childComponentMemoized}
      <ChildElement value={valueOnUseMemoDepends} name="normal child"/>
    </div>
  );
}

export default HooksUseMemo;