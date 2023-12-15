import {createContext, useContext, useState} from "react";

//Creating a context provider component
const ValueContext = createContext(0);

const HooksUseContextInner = () => {
  const value = useContext(ValueContext); //Retrieve the value from the context
  return (<p>{value}</p>); //This JSX syntax will be converted to simply React.createElement("p", {},value);
}
//Child object could be passed
const HooksUseContextInnerWrapper = ({children}) => (<div>{children}</div>); //Just to have a component in between the provider and the consumer

//Creating a context provider component

const HooksUseContext = () => {
  //State to share using context
  const [value, setValue] = useState(0);

  const increment = () => setValue(v => v + 1);

  return (
    <ValueContext.Provider value={value}>
      <div className="container">
        <button onClick={increment}>Increment value in context</button>
        <HooksUseContextInnerWrapper>
          {/*Indirect child could access states stored in context, no prop drilling is required*/}
          <HooksUseContextInner/>
        </HooksUseContextInnerWrapper>
      </div>
    </ValueContext.Provider>
  );
}

export default HooksUseContext;