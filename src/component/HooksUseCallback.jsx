import {useCallback, useEffect, useState} from "react";

function HooksUseCallback() {
  //State variable to trigger re-render
  const [value, setValue] = useState(0);
  const [valueOnUseCallbackDepends, setValueOnUseCallbackDepends] = useState(0);

  //Functions under test
  const simpleFunction = () => {}
  const simpleFunctionCached = useCallback(() => {},[])
  const simpleFunctionCachedWithDependency = useCallback(() => {},[valueOnUseCallbackDepends])

  //Using function w/o useCallback
  useEffect(() => console.log("useEffect is executed for each render in case of simple function, value: " + simpleFunction),
    [simpleFunction]
  ); //The value of simple functions continuously changes

  //Using function with useCallback, but w/o dependency array
  useEffect(() => console.log("useEffect is executed on first render and on change using cached function, value: " + simpleFunction),
    [simpleFunctionCached]
  ); //The value of cached function changes only if the dependency value changes

  //Using function with useCallback, but w/o dependency array
  useEffect(() => console.log("useEffect is executed on first render and on change (of dependency values) using cached function, value: " + simpleFunctionCachedWithDependency),
    [simpleFunctionCachedWithDependency]
  ); //The value of cached function changes only if the dependency value changes -> this could change


  function renderMe() {
    setValue(v => v + 1);
  }

  function triggerUseCallbackUpdate() {
    setValueOnUseCallbackDepends(v => v + 1);
  }

  return (
    <div className="container">
      <button onClick={renderMe}>render me</button>
      <button onClick={triggerUseCallbackUpdate}>update useCallback</button>
    </div>
  );
}

export default HooksUseCallback;