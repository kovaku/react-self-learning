import {useRef, useState} from "react";

function HooksUseRef() {

  const input = useRef(null);
  const [array, setArray] = useState(["first", "second", "third"]);

  const handleAddElement = () => {
    setArray(a => [...a, input.current.value])
  }

  return (
    <div className="container">
      {/*This way you can avoid the page to be rerendered during typing*/}
      <input ref={input}/>
      <button onClick={handleAddElement}>Add to list</button>
      <ul>
        {array.map((element, i) => <li key={i}>{element}</li>)}
      </ul>
    </div>
  );
}

export default HooksUseRef;