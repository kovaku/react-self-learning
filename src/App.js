import './App.css';
import HooksUseState from "./component/HooksUseState";
import HooksUseRef from "./component/HooksUseRef";
import HooksUseEffect from "./component/HooksUseEffect";
import InvestigateHowRenderingWorksWrapper from "./component/InvestigateHowRenderingWorksWrapper";
import HooksUseCallback from "./component/HooksUseCallback";
import HooksUseMemo from "./component/HooksUseMemo";
import HooksUseContext from "./component/HooksUseContext";

function App() {
  return (
    <div>
      <HooksUseState/>
      <HooksUseRef/>
      <HooksUseEffect/>
      <HooksUseCallback/>
      <HooksUseMemo/>
      <HooksUseContext/>
      <InvestigateHowRenderingWorksWrapper propValue="test"/>
    </div>
  );
}

export default App;
